const express = require('express');
const { connect,disconnect } = require('./mongoose-db');
require('dotenv').config()

const app = express();

const startServer = async () =>{
    try{
        await connect();
        app.listen(process.env.PORT||"3000",()=>{
            console.log("Server is running in Port: ",process.env.PORT)
        })
        await disconnect();
    }
    catch(err){
        console.log("Error in connecting to database")
        process.exit(1); // Exit the process if the database connection fails
    }
}

startServer()
