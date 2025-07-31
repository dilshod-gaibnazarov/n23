import Product from "../models/product.model.js";
import { BaseController } from './base.controller.js';
import Category from '../models/category.model.js';
import Saller from '../models/saller.model.js';
import { successRes } from "../utils/success-res.js";

class ProductController extends BaseController {
    constructor() {
        super(Product, ['sallerId', 'categoryId']);
    }

    async createProduct(req, res, next) {
        try {
            const { categoryId, sallerId } = req.body;
            await BaseController.checkById(Category, categoryId);
            await BaseController.checkById(Saller, sallerId);
            const product = await Product.create(req.body);
            return successRes(res, product, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
