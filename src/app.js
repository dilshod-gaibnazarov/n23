import express from 'express';
import { join } from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
// import expressWinston from 'express-winston';

// import logger from './helpers/log/logger.js';
import router from './routes/index.routes.js';
import { globalErrorHandle } from './error/global-error-handle.js';
import { connectDB } from './db/index.js';

export async function application(app) {
    app.use(cors({
        origin: '*'
    }));

    app.use(helmet());

    app.use(express.json());

    app.use(cookieParser());

    app.use('/api/uploads', express.static(join(process.cwd(), '../uploads')));

    await connectDB();

    app.use('/api', router);

    // app.use(expressWinston.errorLogger({
    //     winstonInstance: logger
    // }));
    
    app.use(globalErrorHandle);
}