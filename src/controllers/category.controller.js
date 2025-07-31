import { AppError } from "../error/AppError.js";
import Category from "../models/category.model.js";
import { successRes } from "../utils/success-res.js";
import { BaseController } from "./base.controller.js";

class CategoryController extends BaseController {
    constructor() {
        super(Category, ['products']);
    }

    async createCategory(req, res, next) {
        try {
            const { name } = req.body;
            const existsCategory = await Category.findOne({ name });
            if (existsCategory) {
                throw new AppError('Category already exists', 409);
            }
            const category = await Category.create({
                name,
                image: req?.file?.filename ?? ''
            });
            return successRes(res, category, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default new CategoryController();