import { isValidObjectId } from "mongoose";
import { AppError } from '../error/AppError.js';
import { successRes } from '../utils/success-res.js';

export class BaseController {
    constructor(model) {
        this.model = model;
    }

    create = async (req, res, next) => {
        try {
            const data = await this.model.create(req.body);
            return successRes(res, data, 201);
        } catch (error) {
            next(error);
        }
    }

    findAll = async (_, res, next) => {
        try {
            const data = await this.model.find();
            return successRes(res, data);
        } catch (error) {
            next(error);
        }
    }

    findById = async (req, res, next) => {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                throw new AppError('Invalid ObjectId', 400);
            }
            const data = await this.model.findById(id);
            if (!data) {
                throw new AppError('Not found', 404);
            }
            return successRes(res, data);
        } catch (error) {
            next(error);
        }
    }

    update = async (req, res, next) => {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                throw new AppError('Invalid ObjectId', 400);
            }
            const data = await this.model.findByIdAndUpdate(id, req.body, { new: true });
            if (!data) {
                throw new AppError('Not found', 404);
            }
            return successRes(res, data);
        } catch (error) {
            next(error);
        }
    }

    delete = async (req, res, next) => {
        try {
            const id = req.params?.id;
            if (!isValidObjectId(id)) {
                throw new AppError('Invalid ObjectId', 400);
            }
            const data = await this.model.findByIdAndDelete(id);
            if (!data) {
                throw new AppError('Not found', 404);
            }
            return successRes(res, {});
        } catch (error) {
            next(error);
        }
    }
}