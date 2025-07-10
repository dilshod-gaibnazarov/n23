import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();

const client = new MongoClient(process.env.MONGO_URI);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db();
        console.log('Database connected');
    } catch (error) {
        console.log('Error on connecting to database', error.message);
    }
};

export { connectDB, db };
