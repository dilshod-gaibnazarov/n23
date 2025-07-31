import { Router } from "express";
import controller from '../controllers/category.controller.js';
import { uploadFile } from '../middlewares/file-upload.js';

const router = Router();

router
    .post('/', uploadFile.single('file'), controller.createCategory)
    .get('/', controller.findAll)
    .get('/:id', controller.findById)
    
export default router;