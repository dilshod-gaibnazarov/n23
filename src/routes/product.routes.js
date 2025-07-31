import { Router } from "express";
import controller from '../controllers/product.controller.js';

const router = Router();

router
    .post('/', controller.createProduct)
    .get('/', controller.findAll)
    .get('/:id', controller.findById)

export default router;