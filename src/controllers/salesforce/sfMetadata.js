import jsforce from 'jsforce';

const metadata = {
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

  describeMetadata (conn) {
    try {
        return conn.metadata.describe('46.0', function(err, metadata) {
            if (err) { return console.error('err', err); }
            /*let mdt = metadata;
            metadata = [];
            mdt.metadataObjects.forEach(function(item){
                metadata.push({name: item.xmlName});
            });*/
        });
    } catch (e) {
      return {e};
    } 
  },

  listMetadata (conn, mdt) {
    try {
        return conn.metadata.list([{type: mdt, folder: null}], '46.0', function(err, metadata) {
            if (err) { return console.error('err', err); }
            /*let mdt = metadata;
            metadata = [];
            mdt.metadataObjects.forEach(function(item){
                metadata.push({name: item.xmlName});
            }) ;*/
        });
    } catch (e) {
      return {e};
    } 
  }
}

export default metadata;