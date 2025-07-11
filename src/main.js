import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import countryRouter from './routes/country.route.js';
config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

await connectDB();

app.use('/country', countryRouter);

app.listen(PORT, () => console.log('Server is running on port', PORT));
