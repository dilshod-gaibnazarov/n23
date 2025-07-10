import express from 'express';
import { connectDB } from './db/index.js';
import userRouter from './routes/users.route.js';
import { config } from 'dotenv';
config();

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json());
app.use('/users', userRouter);

await connectDB();

app.listen(PORT, () => console.log('server running on port', PORT));
