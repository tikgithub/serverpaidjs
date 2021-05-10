
const Login = require('../model/weblogin.model');
const serviceFirebase = require('../config/mypaidapikey.json');
var firebase = require('firebase');
firebase.initializeApp(serviceFirebase);

exports.login = (req, res) => {
//console.log("Email : " + req.body.email + ", Password: " + req.body.password);
    try {
        firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((result) => {


            result.user.getIdToken(true).then((value) => {
                res.json({ 
                    "email": result.user.email, 
                    "token": value, 
                    "providerId": result.user.providerId });
            });

        });
    } catch (error) {
        res.json(error);
    }

    // var data = Login.login(req.body);
    // res.json(data);
}