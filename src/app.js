import Fastify from 'fastify';
import { UserRouter } from './routes/users.route.js';

const fastify = Fastify({
    logger: false // prod = true
});

fastify.register(UserRouter.router, { prefix: '/users' });

export class Application {
    static async start() {
        try {
            await fastify.listen({ port: 3000 });
            console.log('Server running on port', 3000);
        } catch (error) {
            fastify.log.error(error);
            process.exit(1);
        }
    }
}
