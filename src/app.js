import express from 'express';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import sequelize from './db/index.js';
import { config } from 'dotenv';
config();

const app = express();
const PORT = Number(process.env.API_PORT);

export class Application {
    static async connectDB() {
        try {
            await sequelize.authenticate();
            console.log('Database connected');

            await sequelize.sync({ alter: true });
            console.log('Tables synced...');
        } catch (error) {
            console.error('Error on connecting to the database:', error);
            process.exit(1);
        }
    }

    static async startApp() {
        await this.connectDB();

        app.use(express.json());

        app.use('/users', userRouter);
        app.use('/posts', postRouter);

        app.listen(PORT, () => console.log('Server running on port', PORT));
    }
}
