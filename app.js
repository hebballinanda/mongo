const express = require('express');
const bodyParser = require('body-parser');
const { connect,disconnect } = require('./mongo-db');
const postRoutes = require('./routes/posts');
require('dotenv').config()

const app = express();

app.use(express.json());

app.use('/posts',postRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack); 

    console.log(err);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error', 
    });
});

const startServer = async () =>{
    try{
        await connect();
        app.listen(process.env.PORT||"3000",()=>{
            console.log("Server is running in Port: ",process.env.PORT)
        })
    }
    catch(err){
        console.log("Error in connecting to database")
        process.exit(1); // Exit the process if the database connection fails
    }
}

startServer()
