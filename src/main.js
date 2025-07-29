import express from 'express';
import config from './config/index.js';
import { connectDB } from './db/index.js';
import router from './routes/index.routes.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandle } from './error/global-error-handle.js';
import helmet from 'helmet';
import cors from 'cors';
import { join } from 'path';

const app = express();
const PORT = config.PORT || 2000;

app.use(cors({
    origin: '*'
}));
app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use('/api/uploads', express.static(join(process.cwd(), '../uploads')));

await connectDB();

app.use('/api', router);

app.use(globalErrorHandle);

app.listen(PORT, () => console.log('Server running on port', PORT));
