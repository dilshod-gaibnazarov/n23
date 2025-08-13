import controller from '../controllers/users.controller.js';

export class UserRouter {
    static router(fastify, _options) {
        fastify.post('/', controller.create)
            .get('/', controller.findAll)
            .get('/:id', controller.findById)
            .patch('/:id', controller.update)
            .delete('/:id', controller.remove)
    }
}