import { FastifyInstance } from 'fastify';
import { MikroORM } from '@mikro-orm/core';

declare module 'fastify' {
    interface FastifyInstance {
        orm: MikroORM;
    }
}