const Payment = require("../model/payment.model.js");

exports.findAll = (req, res)=>{
    Payment.findAll((err, data)=>{
        //Send error report as json
        if(err) res.status(500).send({message:'error sql'});
        //Return data from database
        else
            res.json(data);

    });
};

exports.getPageInation = (req, res)=>{
    Payment.getPageInation([req.params], (err,data)=>{
        if(err) res.status(500).send({
            message: "Error " || err.message
        });
        else res.json(data);
    });
};

exports.findById = (req, res)=>{
    Payment.findById(req.params.id,(err,data)=>{
        if(err) res.status(500).send({message:'error ' || err.message});
        else res.json(data);
    });
}

exports.delete = (req, res)=>{
    Payment.delete(req.params.id, (err,data)=>{
        if(err) res.status(500).send({message:"Error " || err});
        else res.json(data);
    });
}


exports.create = (req, res)=>{
    if(!req.body){
        res.status(400).send({message: "Content Type Problem!!"});
    }
    //Create new payment
    const payment = new Payment({
        email: req.body.email,
        item: req.body.item,
        pay_date: req.body.pay_date,
        detail: req.body.detail,
        photo: req.body.photo,
        amount: req.body.amount
    });

    Payment.create(payment,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Send error report"});
        }else{
            res.send(data);
        }
    });
};