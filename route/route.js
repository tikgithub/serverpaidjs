
module.exports = app => {

   // const interceptedMiddleware = require('../middleware/tokenvalidate_middleware.js')(app);
    const paymentController = require('../controller/payment.controller.js');
    const registerController = require("../controller/register.controller.js");

    var interceptFunc = (function(req,res, next){
        console.log("Middleware passed");
        next();
    });

    //Payment Routing
    app.get("/payments", interceptFunc, paymentController.findAll);
    app.post("/payment", interceptFunc, paymentController.create);
    app.get("/payment/:id", interceptFunc, paymentController.findById);
    app.delete("/payment/:id",interceptFunc, paymentController.delete);
    app.get("/payment/:offset/:rowcount", interceptFunc, paymentController.getPageInation);

    //Register route
    app.post("/register", registerController.create);
}