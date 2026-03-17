import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import fastifyFormbody from '@fastify/formbody';
import fastifyCors from '@fastify/cors';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

// IMPORT ROUTES
import ormPlugin from './plugins/orm.js';
import citiesRoute from './routes/cities.js';
import weatherRoute from './routes/weather.js';
import exportRoute from './routes/export.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
  logger: true
});

// CORS
fastify.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
});

// BODY PARSER
fastify.register(fastifyFormbody);

// PLUGIN ORM
fastify.register(ormPlugin);

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

// ROUTES
fastify.register(citiesRoute);
fastify.register(weatherRoute);
fastify.register(exportRoute);

// ERROR HANDLING
fastify.setErrorHandler(async (error: any, request, reply) => {
  fastify.log.error(error);

  if (error.statusCode) {
    return reply.code(error.statusCode).send({ error: error.message || 'Unknown error' });
  }

  return reply.code(500).send({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message || 'Unknown error' : undefined
  });
});

fastify.get('/', async (req, reply) => {
  return reply.view('index.hbs');
});



// START SERVER
fastify.listen({ port: 3000 }).then(() => {
  console.log('Server avviato su http://localhost:3000 💩');
});
