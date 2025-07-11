import { connect } from "mongoose";
import { config } from "dotenv";
config();

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (error) {
        console.log('Error on connecting to the database', error);
        process.exit(1);
    }
}
