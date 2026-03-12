import Fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import handlebars from 'handlebars'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fastify = Fastify({ logger: true })


fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/public/',
})

fastify.register(fastifyView, {
  engine: { handlebars },
  root: path.join(__dirname, 'views'),
  layout: false
})

fastify.get('/', (req, reply) => {
  return reply.view('index.hbs')
})

fastify.listen({ port: 3000 })
