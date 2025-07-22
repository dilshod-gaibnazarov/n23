import Admin from '../models/admin.model.js';
import { BaseController } from './base.controller.js';
import crypto from '../utils/Crypto.js';
import validator from '../validation/AdminValidation.js';
import token from '../utils/Token.js';
import config from '../config/index.js';

class AdminController extends BaseController {
    constructor() {
        super(Admin);
    }

    async createAdmin(req, res) {
        try {
            const { error } = validator.create(req.body);
            if (error) {
                return res.status(422).json({
                    statusCode: 422,
                    message: error?.details[0]?.message ?? 'Error input validation'
                });
            }
            const { username, email, password } = req.body;
            const existsUsername = await Admin.findOne({ username });
            if (existsUsername) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Username already exists'
                });
            }
            const existsEmail = await Admin.findOne({ email });
            if (existsEmail) {
                return res.status(409).json({
                    statusCode: 409,
                    message: 'Email address already exists'
                });
            }
            const hashedPassword = await crypto.encrypt(password);
            const admin = await Admin.create({
                username,
                email,
                hashedPassword
            });
            return res.status(201).json({
                statusCode: 201,
                message: 'success',
                data: admin
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async signIn(req, res) {
        try {
            const { error } = validator.signin(req.body);
            if (error) {
                return res.status(422).json({
                    statusCode: 422,
                    message: error?.details[0]?.message ?? 'Error input validation'
                });
            }
            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            const isMatchPassword = await crypto.decrypt(password, admin?.hashedPassword ?? '');
            if (!isMatchPassword) {
                return res.status(400).json({
                    statusCode: 400,
                    message: 'Username or password incorrect'
                });
            }
            const payload = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            };
            const accessToken = token.generateAccessToken(payload);
            const refreshToken = token.generateRefreshToken(payload);
            token.writeToCookie(res, 'refreshTokenAdmin', refreshToken, 30);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {
                    token: accessToken,
                    admin
                }
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async generateNewToken(req, res) {
        try {
            const refreshToken = req.cookies?.refreshTokenAdmin;
            if (!refreshToken) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token not found'
                });
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token expire'
                });
            }
            const admin = await Admin.findById(verifiedToken?.id);
            if (!admin) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Forbidden user'
                });
            }
            const paylod = {
                id: admin._id, role: admin.role, isActive: admin.isActive
            }
            const accessToken = token.generateAccessToken(paylod);
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {
                    token: accessToken
                }
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    async signOut(req, res) {
        try {
            const refreshToken = req.cookies?.refreshTokenAdmin;
            if (!refreshToken) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token not found'
                });
            }
            const verifiedToken = token.verifyToken(refreshToken, config.TOKEN.REFRESH_TOKEN_KEY);
            if (!verifiedToken) {
                return res.status(401).json({
                    statusCode: 401,
                    message: 'Refresh token expire'
                });
            }
            const admin = await Admin.findById(verifiedToken?.id);
            if (!admin) {
                return res.status(403).json({
                    statusCode: 403,
                    message: 'Forbidden user'
                });
            }
            res.clearCookie('refreshTokenAdmin');
            return res.status(200).json({
                statusCode: 200,
                message: 'success',
                data: {}
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: error.message || 'Internal server error'
            });
        }
    }
}

export default new AdminController();
