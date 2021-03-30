const Payment = require("../model/payment.model.js");

exports.findAll = (req, res)=>{
    Payment.findAll((err, data)=>{
        //Send error report as json
        if(err) res.status(500).send({message:'error sql'});
        //Return data from database
        else
            res.send(data);

    });
};