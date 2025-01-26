const { MongoClient } = require('mongodb');

const url = process.env.MONGOURL || 'mongodb://localhost:27017/';
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

let dbInstance;

const connect = async () => {
    try {
        if (!dbInstance) {
            console.log("Connecting to the database...");
            await client.connect();
            dbInstance = client.db(process.env.DBNAME); // Replace 'DBNAME' with your actual database name if not using environment variables
            console.log("Connected to the database successfully.");
            return dbInstance;
        }
        return dbInstance;
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        throw err;
    }
};

function getDb (){
    if (!dbInstance) {
        throw new Error('Database not connected');
    }
    return dbInstance;
}

const disconnect = async () => {
    try {
        if (client) {
            await client.close();
            console.log("Database connection closed.");
        }
    } catch (err) {
        console.error("Failed to close the database connection:", err);
        throw err;
    }
};

module.exports = { connect, getDb, disconnect };
