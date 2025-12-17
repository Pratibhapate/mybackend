const mysql = require("mysql2");
const connection = mysql.createConnection(
    {
        user: process.env.DB_USER ,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
    }
)
connection.connect(function(error){
    if(error){
        console.log("Error", error.sqlMessage)
    }
    else{
        console.log("Database is Connected")
    }
})
module.exports = connection;
