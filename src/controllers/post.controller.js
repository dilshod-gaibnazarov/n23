import { Post } from '../models/index.model.js';

class PostController {
    async create(req, res) {
        const newPost = await Post.create(req.body);
        return res.status(201).json({
            statusCode: 201,
            data: newPost
        });
    }

    async findAll(_req, res) {
        const posts = await Post.findAll({ order: [['createdAt', 'DESC']], include: {all: true} });
        return res.status(200).json({
            statusCode: 200,
            data: posts
        });
    }

    async findOne(req, res) {
        const post = await Post.findByPk(req.params.id, {include: {all: true}});
        if (!post) {
            return res.status(404).json({
                error: {
                    message: 'Post not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: post
        });
    }

    async update(req, res) {
        const post = await Post.update(req.body, { where: { id: req.params.id }, returning: true });
        if (post[0] === 0) {
            return res.status(404).json({
                error: {
                    message: 'Post not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: post[1][0]
        });
    }

    async remove(req, res) {
        const post = await Post.destroy({ where: { id: req.params.id } });
        if (!post) {
            return res.status(404).json({
                error: {
                    message: 'Post not found'
                }
            });
        }
        return res.status(200).json({
            statusCode: 200,
            data: {}
        });
    }
}

export default new PostController();
