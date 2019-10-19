var login =function(user,password){
    console.log(user,password)
        if(user==="admin@admin" && password==="admin"){
            return true;
        }
        else{
            return false;
        }
    }

export default login;