const Register = require('../model/register.model.js');

exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({message:"Content type problem!!"});
    }
    const registerObject = new Register({
        email: req.body.email,
        photo: req.body.photo
    });
    
    Register.create(registerObject,(err,data)=>{
        if(err) res.status(500).send({message:"Error " || err.message});
        else res.json(data);
    });
}