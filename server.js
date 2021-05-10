const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
// // Add headers
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

//Config app to request as applicatin/json
app.use(bodyParser.json());
//Config app to request form/xxx
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors('*'));
//Simple route or first page route
app.get('/',(req,res)=>{
    res.json({message:'NodeJS Server is ready to use'});
});


require('./route/route.js')(app);
//Setting up the server port
app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running at port 3000');
});
