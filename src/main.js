import express from 'express';
import groupRouter from './routes/groups.routes.js';
import studentRouter from './routes/students.routes.js';
import { config } from 'dotenv';
config();

const app = express();
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use('/groups', groupRouter);
app.use('/students', studentRouter);

app.listen(PORT, () => console.log('sever running on port', PORT));
