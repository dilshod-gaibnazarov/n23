import { DBService } from '../services/db.service.js';

export class BaseController extends DBService {
    constructor(table) {
        super(table);
    }

    create = async (request, reply) => {
        const data = await this.createDB(request.body);
        return reply.code(201).send({
            statusCode: 201,
            message: 'success',
            data
        });
    }

    findAll = async (_, reply) => {
        const data = await this.findAllDB();
        return reply.code(200).send({
            statusCode: 200,
            message: 'success',
            data
        });
    }

    findById = async (request, reply) => {
        const data = await this.findByIdDB(request.params.id);
        if (!data) {
            return reply.code(404).send({
                error: {
                    message: 'not found'
                }
            });
        }
        return reply.code(200).send({
            statusCode: 200,
            message: 'success',
            data
        });
    }

    update = async (request, reply) => {
        const data = await this.updateDB(request.params.id, request.body);
        if (!data) {
            return reply.code(404).send({
                error: {
                    message: 'not found'
                }
            });
        }
        return reply.code(200).send({
            statusCode: 200,
            message: 'success',
            data
        });
    }

    remove = async (request, reply) => {
        const data = await this.removeDB(request.params.id);
        if (!data) {
            return reply.code(404).send({
                error: {
                    message: 'not found'
                }
            });
        }
        return reply.code(200).send({
            data: {}
        });
    }
}