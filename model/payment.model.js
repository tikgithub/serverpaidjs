const sql = require('./db.js');

//Create construture
const Payment = function(payment){
    this.id = payment.id;
    this.item = payment.item;
    this.pay_date = payment.pay_date;
    this.detail = payment.detail;
    this.photo = payment.photo;
    this.email = payment.email;
    this.amount = payment.amount;
};

Payment.findAll = result =>{
    sql.query("Select * from payment",(err,res)=>{
        if(err){
            console.log("Error",err);
            result(null,err);
            return;
        }
        console.log(null,res);
        result(null,res);
    });
}


module.exports = Payment;