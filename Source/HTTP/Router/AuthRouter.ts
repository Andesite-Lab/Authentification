import { FastifyInstance } from 'fastify';

import { AbstractRouter } from '@/HTTP/Router';
import { AuthHandler } from '@/HTTP/Handler';

export class AuthRouter extends AbstractRouter<AuthHandler> {
    constructor(routerPrefix: string = '/auth') {
        super(new AuthHandler(), routerPrefix);
    }

    protected initRoutes(fastify: FastifyInstance): void {
        fastify.route({
            method: 'POST',
            url: '/register',
            handler: this._handler.register,
            schema: {
                tags: ['Auth'],
                summary: 'Register a new user',
                security: []
            },
            attachValidation: true
        });
    }
}
