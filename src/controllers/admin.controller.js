import Admin from '../models/admin.model.js';
import { BaseController } from './base.controller.js';
import crypto from '../utils/Crypto.js';
import token from '../utils/Token.js';
import config from '../config/index.js';
import { AppError } from '../error/AppError.js';
import { successRes } from '../utils/success-res.js';

class AdminController extends BaseController {
    constructor() {
        super(Admin);
    }

    async createAdmin(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const existsUsername = await Admin.findOne({ username });
            if (existsUsername) {
                throw new AppError('Username already exists', 409);
            }
            const existsEmail = await Admin.findOne({ email });
            if (existsEmail) {
                throw new AppError('Email address already exists', 409);
            }
            const hashedPassword = await crypto.encrypt(password);
            const admin = await Admin.create({
                username,
                email,
                hashedPassword
            });
            return successRes(res, admin, 201);
        } catch (error) {
            next(error);
        }
    }

    async signIn(req, res, next) {
        try {
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            const isMatchPassword = await crypto.decrypt(password, admin?.hashedPassword ?? '');
            if (!isMatchPassword) {
                throw new AppError('Username or password incorrect', 400);
            }
            const payload = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            };
            const accessToken = token.generateAccessToken(payload);
            const refreshToken = token.generateRefreshToken(payload);
            token.writeToCookie(res, 'refreshTokenAdmin', refreshToken, 30);
            return successRes(res, {
                token: accessToken,
                admin
            });
        } catch (error) {
            next(error);
        }
    }

    async generateNewToken(req, res, next) {
        try {
            const refreshToken = req.cookies?.refreshTokenAdmin;
            if (!refreshToken) {
                throw new AppError('Authorization error', 401);
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401);
            }
            const admin = await Admin.findById(verifiedToken?.id);
            if (!admin) {
                throw new AppError('Forbidden user', 403);
            }
            const paylod = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }
            const accessToken = token.generateAccessToken(paylod);
            return successRes(res, {
                token: accessToken
            });
        } catch (error) {
            next(error);
        }
    }

    async signOut(req, res, next) {
        try {
            const refreshToken = req.cookies?.refreshTokenAdmin;
            if (!refreshToken) {
                throw new AppError('Refresh token not found', 401);
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_KEY);
            if (!verifiedToken) {
                throw new AppError('Refresh token expire', 401);
            }
            const admin = await Admin.findById(verifiedToken?.id);
            if (!admin) {
                throw new AppError('Forbidden user', 403);
            }
            res.clearCookie('refreshTokenAdmin');
            return successRes(res, {});
        } catch (error) {
            next(error);
        }
    }

    // damage 
    async updateAdmin(req, res, next) {
        try {
            const id = req.params?.id;
            const admin = await this.checkById(id);
            const { username, email, password } = req.body;
            if (username) {
                const exists = await Admin.findOne({ username });
                if (exists && exists.username !== username) {
                    throw new AppError('Username already exists', 409);
                }
            }
            if (email) {
                const exists = await Admin.findOne({ email });
                if (exists && exists.email !== email) {
                    throw new AppError('Email address already exists', 409);
                }
            }
            let hashedPassword = admin.hashedPassword;
            if (password) {
                if (req.user?.role != admin.role) {
                    throw new AppError('Not access to change password for admin', 403);
                }
                hashedPassword = await crypto.encrypt(password);
                delete req.body.password;
            }
            const updatedAdmin = await Admin.findByIdAndUpdate(id, {
                ...req.body, hashedPassword
            }, { new: true });
            return successRes(res, updatedAdmin);
        } catch (error) {
            next(error);
        }
    }

    async updatePasswordForAdmin(req, res, next) {
        try {
            const id = req.params?.id;
            const admin = await BaseController.checkById(Admin, id);
            const { oldPassword, newPassword } = req.body;
            const isMatchPassword = await crypto.decrypt(oldPassword, admin.hashedPassword);
            if (!isMatchPassword) {
                throw new AppError('Incorrect old password', 400);
            }
            const hashedPassword = await crypto.encrypt(newPassword);
            const updatedAdmin = await Admin.findByIdAndUpdate(id, { hashedPassword }, { new: true });
            return successRes(res, updatedAdmin);
        } catch (error) {
            next(error);
        }
    }

    async forgetPassword(req, res, next){
        
    }
}

export default new AdminController();
