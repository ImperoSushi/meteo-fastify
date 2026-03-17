import { FastifyPluginAsync } from 'fastify';
import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config.js';

const ormPlugin: FastifyPluginAsync = async (fastify) => {
  try {
    const orm = await MikroORM.init(config);
    fastify.orm = orm;

    fastify.addHook('onClose', async () => {
      await orm.close();
    });

    fastify.log.info('ORM initialized successfully');
  } catch (error) {
    fastify.log.error(error as Error, 'Failed to initialize ORM');
    throw error;
  }
};

export default ormPlugin;
