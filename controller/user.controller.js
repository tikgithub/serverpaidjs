const User = require("../model/user.model.js");

exports.login = (req, res)=>{
    // if(!req.body) res.status(400).send({message: "Bad Request Params"});
    // //Assign value to object from request
    // const registerModel = {
    //     email: req.body.email,
    //     password: req.body.password
    // }

    //Send data to service layer

    User.getDataByEmail(res.locals.emailSession,(err,data)=>{
        if(err){res.status(500).send({message: "Error "  + err.message})}
        else{res.send(data[0]);}

    });

};