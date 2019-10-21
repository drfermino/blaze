import jsforce from 'jsforce';

const user = {
  updateUserRole (conn,userId,roleId) {
    try {
      return conn.sobject("User").update({ 
        Id : userId,
        UserRoleId : roleId
      }, function(err, ret) {
        if (err || !ret.success) { return err; }
      });
    } catch (e) {
        return {e};
    } 
  },

  async listUsers (conn) {
    try {
      return await conn.sobject("Account").update({ 
        Id : '0010x00000bOQ5IAAW',
        Site : 'Updated Account #1'
      }, function(err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
      });
    } catch (e) {
        return {e};
    } 
  },

  listRoles (conn) {
    try {
//      let response;
      return conn.query("SELECT Id, Name FROM UserRole", function(err, result) {
        if (err) { return err; }
//        return response = result.records;
        return result.records;
      }); 
//      return response; 
    } catch (e) {
      return {e};
    } 
  }
}

export default user;