const sql = require('./db.js');

//Create construture
const Payment = function (payment) {
    this.id = payment.id;
    this.item = payment.item;
    this.pay_date = payment.pay_date;
    this.detail = payment.detail;
    this.photo = payment.photo;
    this.email = payment.email;
    this.amount = payment.amount;
};

Payment.findAll = (email, result) => {
    sql.query("Select * from payment  Where email = ? order by pay_date desc", email, (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }
        console.log(null, res);
        result(null, res);
    });
};

Payment.totalMonthlyPay = (email, result) => {
    console.log(email);
    sql.query("SELECT sum(amount) as total, month(curdate()) as _month FROM freedbtech_mypaiddb.payment where month(pay_date) = month(curdate()) and email = ? ", email, (err, res) => {
        if (err) {
            console.log("Error", err);
            result(null, err);
            return;
        }
        console.log(null, res);
        result(null, res);
    });
}

Payment.getPageInation = ([params, email], result) => {
    sql.query("SELECT * FROM payment Where email =? order by pay_date DESC limit ?,?;",
        [
            email,
            parseInt(params.offset),
            parseInt(params.rowcount)
        ],
        (err, data) => {
            if (err) {
                console.log("Erorr ", err);
                result(null, err);
                return;
            }
            console.log(data);
            result(null, data);
        });
}

Payment.getDataByDate = async ([params, email], result) => {
    var newFromDate = params.fromdate.split('-').reverse().join('-');
    var newToDate = params.todate.split('-').reverse().join('-');
    console.log(newFromDate, newToDate);

    var dataLists = new Promise(resolve => {
        sql.query("SELECT * FROM payment Where email = ? and pay_date between ? and ? order by pay_date DESC",
            [
                email,
                newFromDate,
                newToDate
            ],
            (err, data) => {
                if (err) {
                    console.log("Erorr ", err);
                    result(null, err);
                    return;
                }
                resolve(data);
            });
    });

    var sumAmount = new Promise(resolve => {
        sql.query("Select Sum(amount) as total from payment Where email = ? and pay_date between ? and ? order by pay_date", [
            email,
            newFromDate,
            newToDate
        ],
            (err, data) => {
                if (err) {
                    console.log("Erorr ", err);
                    result(null, err);
                    return;
                }
                resolve(data);
            });
    });


    console.log('after query');
    var sendData = {
        "total": await sumAmount,
        "listdata": await dataLists
    };
    console.log(await sumAmount);
    result(null, sendData);

};

function getTime() {
    setTimeout(() => {
        console.log('function execute');
    }, 5000);
};

Payment.update = (updateData, result) => {
    console.log(updateData);
    sql.query("Update payment set item=?, pay_date=?, detail=?, photo=?, email=?, amount=? where id=?", 
    [
        updateData.item,
        updateData.pay_date,
        updateData.detail,
        updateData.photo,
        updateData.email,
        updateData.amount,
        updateData.id
    ],
    (err, data) => {
        if(err){
            console.log("Erorr ", err);
            result(null, err);
            return; 
        }
        console.log("Payment data update succesful", { return: data });
        result(null, err);
    });
}

Payment.delete = (id, result) => {
    sql.query("Delete from payment where id=?", [id], (err, data) => {
        if (err) {
            console.log("Error ", err);
            return;
        } else {
            console.log("Payment data delete sucessful", { reutrn: data });
            result(null, data);
        }
    });
};

Payment.findById = (id, result) => {
    sql.query("Select * from payment where id=?", [id], (err, data) => {
        if (err) {
            console.log("Error ", err);
            return;
        } else {
            console.log("Getting data ok");
            result(null, data);
        }
    });
};

Payment.create = (newData, result) => {
    sql.query("Insert into payment (item, pay_date,detail,photo,email,amount) value (?,?,?,?,?,?) ",
        [
            newData.item,
            newData.pay_date,
            newData.detail,
            newData.photo,
            newData.email,
            newData.amount
        ]
        , (err, data) => {
            if (err) {
                console.log("Error: ", err);
                result(err, null);
                return;
            }
            console.log("Payment data Create Succesful", { return: data });
            result(null, { return: data });

        });
};


module.exports = Payment;