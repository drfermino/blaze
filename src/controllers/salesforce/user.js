import jsforce from 'jsforce';

const user = {
  async updateUserProfile (userId,profileId,conn) {
    try {
      return await conn.sobject("Account").update({ 
        Id : '0010x00000bOQ5IAAW',
        Site : 'Updated Account #1'
      }, function(err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
        console.log('Updated Successfully : ' + ret.id);
      });
    } catch (e) {
        return {err: e};
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
        return {err: e};
    } 
  },

  async listRoles (conn) {
    try {
      let response;
      await conn.query("SELECT Id, Name FROM UserRole", function(err, result) {
        if (err) { return err; }
        response = result.records;
      }); 
      return response; 
    } catch (e) {
      return {err: e};
    } 
  }
}

export default user;