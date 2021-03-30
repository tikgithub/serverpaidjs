const express = require('express');
const bodyParser = require('body-parser');

var admin = require('firebase-admin');
var serviceAccount = require('./config/mypaied-firebase-adminsdk-mvxb4-f584f6f949.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mypaied-default-rtdb.firebaseio.com"
});

const app = express();

//Config app to request as applicatin/json
app.use(bodyParser.json());
//Config app to request form/xxx
app.use(bodyParser.urlencoded({extended: false}));

//Simple route or first page route
app.get('/',(req,res)=>{
    res.json({message:'NodeJS Server is ready to use'});
});

require('./route/route.js')(app);
//Setting up the server port
app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});