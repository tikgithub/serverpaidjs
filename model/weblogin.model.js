//create model class
const Login = function(login){
    this.email = login.email;
    this.password = login.password;
}


Login.login = (data)=>{
    return data.email + data.password;
}

module.exports = Login;