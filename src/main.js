import express from 'express';
import config from './config/index.js';
import { connectDB } from './db/index.js';
import router from './routes/index.routes.js';
import cookieParser from 'cookie-parser';
import { globalErrorHandle } from './error/global-error-handle.js';
import helmet from 'helmet';

const app = express();
const PORT = config.PORT || 2000;

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

await connectDB();

app.use('/api', router);

app.use(globalErrorHandle);

app.listen(PORT, () => console.log('Server running on port', PORT));
