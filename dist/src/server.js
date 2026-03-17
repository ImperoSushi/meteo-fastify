import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
// IMPORT ROUTES
import ormPlugin from './plugins/orm';
import citiesRoute from './routes/cities';
import weatherRoute from './routes/weather';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fastify = Fastify({
    logger: true
});
// STATIC FILES
fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../public'),
    prefix: '/public/'
});
// TEMPLATE ENGINE
fastify.register(fastifyView, {
    engine: { handlebars },
    root: path.join(__dirname, '../views')
});
// PLUGIN ORM
fastify.register(ormPlugin);
// ROUTES
fastify.register(citiesRoute);
fastify.register(weatherRoute);
// HOME (opzionale)
fastify.get('/', async (req, reply) => {
    return reply.view('index.hbs');
});
// START SERVER
fastify.listen({ port: 3000 }).then(() => {
    console.log('Server avviato su http://localhost:3000 💩');
});
