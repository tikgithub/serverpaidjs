const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

//Config app to request as applicatin/json
app.use(bodyParser.json());
//Config app to request form/xxx
app.use(bodyParser.urlencoded({extended: true}));

//Simple route or first page route
app.get('/',(req,res)=>{
    res.json({message:'NodeJS Server is ready to use'});
});
//Setting up the server port
app.listen(3000,()=>{
    console.log('Server is running at port 3000');
});