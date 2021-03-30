
module.exports = app => {

   // const interceptedMiddleware = require('../middleware/tokenvalidate_middleware.js')(app);
    const paymentController = require('../controller/payment.controller.js');

    var interceptFunc = app.use(function(req,res, next){
        console.log("Middleware passed");
        next();
    });

    //Payment Routing
    app.get("/payments", interceptFunc, paymentController.findAll);
}