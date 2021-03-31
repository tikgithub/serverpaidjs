const sql = require("../model/db.js");

//Creating model class
const User = function (user) {
    this.email = user.email;
    this.photo = user.photo;
}

//Define service layer method

User.getDataByEmail = (email, result) => {
    //connect with database
    console.log("data from mobile " + email);
    sql.query("select * from User where email=?", [email], (err, data) => {
        if (err) { console.log("Error " + err.message); result(null, err); return; }
        console.log("Getting data successful", data);
        result(null, data);
    })
}

module.exports = User;