import { Router } from "express";
import { pageError } from '../error/page-not-found.error.js';
import adminRouter from './admin.routes.js';
import sallerRouter from './saller.routes.js';

const router = Router();

router
    .use('/admin', adminRouter)
    .use('/saller', sallerRouter)
    .use(pageError)

export default router;