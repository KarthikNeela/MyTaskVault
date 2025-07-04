const mysql=require("mysql2");
require('dotenv').config(); // reads .env file and adds those varibles into process.env

const db=mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

db.connect(
    (err)=>{
        if(err){
            console.error('❌ Error connecting to MySQL:', err.message);
        } else{
            console.log('✅ Connected to MySQL database');
        }
    }
);

module.exports=db;