
const Login = require('../model/weblogin.model');
const serviceFirebase = require('../config/mypaidapikey.json');
var firebase = require('firebase');
firebase.initializeApp(serviceFirebase);

exports.login = (req, res) => {
    firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password).then((result) => {
        result.user.getIdToken(true).then((value) => {
            try {
                res.json({
                    "email": result.user.email,
                    "token": value,
                    "providerId": result.user.providerId
                });
            } catch (error) {
                console.log(error);
            }
           
        });
    });
}