import jsforce from 'jsforce';

// Session variable
var sess ="";

const login = {
    async login (user,password,conn) {
        try {
            return await conn.login(user,password, async (err,res) => {
                if (err) { 
                    return console.log('Erro Login: '+err);
                }
                res.accessToken = conn.accessToken;
                res.instanceUrl = conn.instanceUrl;
            });
        } catch (e) {
            return {err: e};
        } 
    },

    getAuthorizationUrl (oauth2) {
        try {
            return oauth2.getAuthorizationUrl({ scope : 'api id web' });
        } catch (e) {
            return {err: e};
        } 
    },

    async identity (conn) {
        try {
            return await conn.identity(function(err, res) {
                if (err) { return err; }
              });
        } catch (e) {
            return {err: e};
        }         
    }
}

export default login;