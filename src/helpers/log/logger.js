import winston from 'winston';
import 'winston-mongodb';
import config from '../../config/index.js';

const customTime = winston.format((info) => {
    const date = new Date();
    info.timestamp = date.toLocaleString('en-GB', { timeZone: 'Asia/Tashkent', hour12: false });
    return info;
});

const logger = winston.createLogger({
    transports: [
        // file log
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),


        // mongodb log
        new winston.transports.MongoDB({
            db: config.MONGO_URI,
            collection: 'errorLogs',
            level: 'error'
        })
    ],
    format: winston.format.combine(
        customTime(),
        winston.format.json()
    )
});

export default logger;
