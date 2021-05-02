const Payment = require("../model/payment.model.js");

exports.findAll = (req, res) => {
    let email = res.locals.emailSession;
    Payment.findAll(email, (err, data) => {
        if (err) res.status(500).send({ message: 'error sql' });
        //Return data from database
        else
            res.json(data);

    });
};

exports.getPageInation = (req, res) => {
    let email = res.locals.emailSession;
    Payment.getPageInation([req.params, email], (err, data) => {
        if (err) res.status(500).send({
            message: "Error " || err.message
        });
        else res.json(data);
    });
};

exports.getDataByDate = (req, res) =>{
    let email = res.locals.emailSession;
    Payment.getDataByDate([req.params, email],(err,data) =>{
        if(err) res.status(500).send({
            message: "Error " || err.message
        })
        else res.json(data);
    });
};

exports.totalMonthlyPay = (req, res) => {
    let email = res.locals.emailSession;
    Payment.totalMonthlyPay(email, (err, data) => {
        if (err) res.status(500).send({
            message: "Error " || err.message
        });
        else res.json(data);
    });
};

exports.findById = (req, res) => {
    Payment.findById(req.params.id, (err, data) => {
        if (err) res.status(500).send({ message: 'error ' || err.message });
        else res.json(data);
    });
}

exports.delete = (req, res) => {
    Payment.delete(req.params.id, (err, data) => {
        if (err) res.status(500).send({ message: "Error " || err });
        else res.json(data);
    });
}


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content Type Problem!!" });
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

    Payment.create(payment, (err, data) => {
        if (err) {
            res.status(500).send({ message: err.message || "Send error report" });
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    let email = res.locals.emailSession;
    
    if(req.body.item == undefined){
        res.status(400).send({message:"Content Type Problem!!"});
    }

    //Create Payment Object
    const payment = new Payment({
        email : email,
        item : req.body.item,
        pay_date : req.body.pay_date,
        detail: req.body.detail,
        photo: req.body.photo,
        amount: req.body.amount,
        id: req.params.id
    });

    console.log(payment);

    Payment.update(payment,(err,data)=>{
        if(err){
            res.status(500).send({message: err.message || "Send error report"});
        }else{
            res.json(data);
        }
    });
};