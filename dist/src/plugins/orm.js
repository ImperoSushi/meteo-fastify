import { MikroORM } from '@mikro-orm/core';
import config from '../../mikro-orm.config.js';
const ormPlugin = async (fastify) => {
    const orm = await MikroORM.init(config);
    fastify.decorate('orm', orm);
    fastify.addHook('onClose', async () => {
        await orm.close();
    });
};
export default ormPlugin;
