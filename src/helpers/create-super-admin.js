import Admin from '../models/admin.model.js';
import crypto from '../utils/Crypto.js';
import { connectDB } from '../db/index.js';
import { disconnect } from 'mongoose';
import config from '../config/index.js';

(async function () {
    try {
        await connectDB();
        const hashedPassword = await crypto.encrypt(config.SUPERADMIN.PASSWORD)
        await Admin.create({
            username: config.SUPERADMIN.USERNAME,
            email: config.SUPERADMIN.EMAIL,
            hashedPassword,
            role: 'SUPERADMIN'
        });
        console.log('Super admin success created');
        await disconnect();
    } catch (error) {
        console.log('Error on creating super amdin', error);
    }
}());
