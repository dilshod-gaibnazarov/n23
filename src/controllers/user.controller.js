import { User } from '../models/index.model.js';

class UserController {
    async create(req, res) {
        try {
            const existsEmail = await User.findOne({ where: { email: req.body.email } });
            if (existsEmail) {
                return res.status(409).json({
                    error: {
                        message: 'Email address already exists'
                    }
                });
            }
            const newUser = await User.create(req.body);
            return res.status(201).json({
                statusCode: 201,
                data: newUser
            });
        } catch (error) {
            console.log('Dangg', error)
            return res.status(500).json({
                error: {
                    message: error.message
                }
            })
        }
    }

    async findAll(_req, res) {
        const users = await User.findAll({ order: [['createdAt', 'DESC']], include: { all: true } });
        return res.status(200).json({
            statusCode: 200,
            data: users
        });
    }

    async findOne(req, res) {
        const user = await User.findByPk(req.params.id, { include: { all: true } });
        if (!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: user
        });
    }

    async update(req, res) {
        const user = await User.update(req.body, { where: { id: req.params.id }, returning: true });
        if (user[0] === 0) {
            return res.status(404).json({
                error: {
                    message: 'User not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: user[1][0]
        });
    }

    async remove(req, res) {
        const user = await User.destroy({ where: { id: req.params.id } });
        if (!user) {
            return res.status(404).json({
                error: {
                    message: 'User not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: {}
        });
    }
}

export default new UserController();
