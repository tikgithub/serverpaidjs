var admin = require('firebase-admin');
var serviceAccount = require('../config/mypaied-firebase-adminsdk-mvxb4-f584f6f949.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mypaied-default-rtdb.firebaseio.com"
});

module.exports = app => {

    // const interceptedMiddleware = require('../middleware/tokenvalidate_middleware.js')(app);
    const paymentController = require('../controller/payment.controller.js');
    const registerController = require("../controller/register.controller.js");
    const userController = require("../controller/user.controller.js");

    var interceptFunc = (function (req, res, next) {
        console.log("Token " + req.headers.authorization);
        //Check the token is exsit ??
        var authorization = req.headers.authorization; // assign the token string to variable
        //check if the token is exist?
        if (authorization == "") {
            return res.send({ message: "Token is invalid, please check again", status: 401, description: "Un-Authorization Token" });
        }
        //Check with google Firebase for verify the token
        authorization=authorization.substring(7,authorization.length);

        admin.auth().verifyIdToken(authorization).then((decodedToken)=>{
            const uid = decodedToken.uid;
            console.log("UID for token " + uid);
            //get email from token
            console.log("Email: " + decodedToken.email);
            res.locals.emailSession = decodedToken.email;
            next();
            
        }).catch((err)=>{
            console.log("FirebaseAuth Error " + err.message);
            return res.status(401).send({ message: "Token is invalid, please check again", status: 401, description: "Un-Authorization Token"});
        });
        
    });

    //Payment Routing
    app.get("/api/payments", interceptFunc, paymentController.findAll);
    app.post("/api/payment", interceptFunc, paymentController.create);
    app.get("/api/payment/:id", interceptFunc, paymentController.findById);
    app.delete("/api/payment/:id", interceptFunc, paymentController.delete);
    app.get("/api/payment/:offset/:rowcount", interceptFunc, paymentController.getPageInation);

    //Register route
    app.post("/api/register", registerController.create);
    //User route
    app.get("/api/user/getUserbyEmail", interceptFunc,userController.login);
}