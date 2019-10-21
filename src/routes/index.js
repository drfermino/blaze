import express from 'express';
var router = express.Router();
import sfLogin from '../controllers/authenticate/sfLogin';
import sfUser from '../controllers/salesforce/sfUser';
import jsforce from 'jsforce';
import prettyHtml  from 'json-pretty-html';


const oauth2 = new jsforce.OAuth2({
  loginUrl : 'https://test.salesforce.com',
  clientId : '3MVG9zlTNB8o8BA35qAXhYdoCQvSAAE4004dyN7Jb6CewzXPDFrO0SPmG8Rwu9Od6WJlkohHEWZTHfWT4jdY6',
  clientSecret : '968A1B8EC4136A2384B91322C631A4F774FCC9D30DFD99C344693EA2C9E1E074',
  redirectUri : 'https://127.0.0.1:3000/oauth2/callback'
});

const conn = new jsforce.Connection({
  oauth2 : oauth2,
  loginUrl : 'https://test.salesforce.com'
});

// Session variable
var sess ="";

function isAuthenticated(req, res, next) {
  // do any checks you want to in here

  // you can do this however you want with whatever variables you set up
  if (sess.accessToken)
      return next();

  res.redirect('/login');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
    res.render('index', { 
      users: [{id: '1', name: 'Diego'}, {id: '2', name: 'João'}],
      profiles: [{id: '1', name: 'Atendente'}, {id: '2', name: 'Gerente'}] });
});

/* Manage User */
router.get('/users', isAuthenticated, async function (req, res, next) {
  if(!sess.roles) {
    const roles = await sfUser.listRoles(conn);
    sess.roles = [];
  
    roles.forEach(function(role){
      sess.roles.push({id: role.Id, name: role.Name})
    });  
  }

  res.render('users', { 
    roles: sess.roles});
});

router.post('/users', isAuthenticated, async (req, res, next) => {
  let status = 0, alertMsg;
  const sfRes = await sfUser.updateUserRole(conn,req.body.inputUser, req.body.inputRole).catch(err => {
   // console.log(JSON.stringify(err));
    alertMsg = err;
    status = -1;
  });
  if (sfRes && sfRes.success) {
    alertMsg = 'Papel atualizado para ' + findValue(sess.roles, req.body.inputRole) + '.'; 
    status = 1;
  }
  res.render('users', { 
    roles: sess.roles,
    status: status,
    alertMsg: alertMsg
  });
});

router.get('/users/list', (req, res, next) => {
  let users = [{id: '1', name: 'Diego'}, {id: '2', name: 'João'}];
  if (sess.user) {
    users.unshift({id: sess.user.user_id, name: sess.user.display_name})
  }
  res.json({  
    success: true, 
    users: users
  });
});

router.get('/metadata', (req, res, next) => {
  res.render('metadata');
});

router.get('/metadata/describe', isAuthenticated, async (req, res, next) => {
  if (!sess.metadata) {
    sess.metadata = [];
    await conn.metadata.describe('46.0', function(err, metadata) {
      if (err) { return console.error('err', err); }
      metadata.metadataObjects.forEach(function(item){
        sess.metadata.push({name: item.xmlName});
      });  
    });
  }
  res.render('metadata', {html: JSON.stringify(sess.metadata, undefined, 2), metaList: sess.metadata});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  sess = req.session;
  if (!sess.accessToken) {
    res.render('login', { error: false, logged: sess.accessToken ? true : false});
  } else {
    res.render('index');
  }
});

/* Login user */
router.post('/login', async (req, res, next) => {
  sess = req.session;
  const username = req.body.username;

  const lres = await sfLogin.login(username, req.body.password, conn);

  if (!lres.err) {
    sess.accessToken = lres.accessToken;
    sess.instanceUrl = lres.instanceUrl;
    sess.user = await sfLogin.identity(conn);
    
    res.redirect('/');
  }
  else {
    res.render('login', { errorMsg: lres.err, error: true });
  }
});

// OAuth2
router.get('/oauth2/auth', function(req, res) {
  res.redirect(sfLogin.getAuthorizationUrl(oauth2));
});

// OAuth2 callback
router.get('/oauth2/callback', function(req, res) {
  sess = req.session;
  var code = req.query.code;

  conn.authorize(code, async function(err, userInfo) {
    if (err) { return console.error('Erro: '+err); }
    
    sess.accessToken = conn.accessToken;
    sess.instanceUrl = conn.instanceUrl;
    sess.user = await sfLogin.identity(conn);

    res.render('success');
  });
});

function findValue(arr, id) {
    return arr.find( x => x.id === id).name;
}

export default router;
