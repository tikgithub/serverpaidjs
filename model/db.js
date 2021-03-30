const mysql = require('mysql');
const dbConfig = require('../config/db.config.js');

//Create Connection
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE
});


//Open Conecction
connection.connect(
    error=>{
        if(error) throw error;
        console.log('Database connected');
    }
    
);

module.exports = connection;