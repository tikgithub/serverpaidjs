const sql = require("./db.js");

//Create model
const Register = function(register){
    this.email = register.email;
    this.photo = register.photo;
}

Register.create = (newData, result)=>{
    sql.query("insert into User (email,photo) values (?,?)",
    [newData.email, newData.photo],
    (err, data)=>{
        if(err){
            console.log("Error " || err.message);
            result(null,err);
            return;
        }
        console.log("Response ", data);
        result(null, data);
    });
};


module.exports = Register

