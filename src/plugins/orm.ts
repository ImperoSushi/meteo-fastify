import fp from 'fastify-plugin';
import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config.js';

export default fp(async (fastify) => {
  try {
    const orm = await MikroORM.init(config);

    const em = orm.em.fork();

    fastify.decorate('orm', orm);
    fastify.decorate('em', em);

    fastify.addHook('onClose', async () => {
      await orm.close();
    });

    fastify.log.info('ORM initialized successfully');
  } catch (error) {
    fastify.log.error(error, 'Failed to initialize ORM');
    throw error;
  }
});
