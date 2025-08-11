import userModel from '../services/users.service.js';

class UserController {
    async create(ctx) {
        const existsEmail = await userModel.findOne('email', ctx.request.body.email);
        if (existsEmail) {
            ctx.throw(409, 'Email address already exists');
        }
        const newUser = await userModel.create(ctx.request.body);
        ctx.status = 201;
        ctx.body = newUser;
    }

    async findAll(ctx) {
        const users = await userModel.findAll();
        ctx.status = 200;
        ctx.body = users;
    }

    async findById(ctx) {
        const user = await userModel.findById(ctx.params.id);
        if (!user) {
            ctx.throw(404, 'User not found')
        }
        ctx.status = 200;
        ctx.body = user;
    }

    async update(ctx) {
        const user = await userModel.update(ctx.params.id, ctx.request.body);
        if (!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.status = 200;
        ctx.body = user;
    }

    async delete(ctx) {
        const user = await userModel.delete(ctx.params.id);
        if (!user) {
            ctx.throw(404, 'User not found');
        }
        ctx.status = 200;
        ctx.body = {};
    }
}

export default new UserController();
