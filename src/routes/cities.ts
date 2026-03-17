import { FastifyPluginAsync } from 'fastify';
import { FavoriteCity } from '../entities/FavoriteCity.js';

const citiesRoute: FastifyPluginAsync = async (fastify) => {

    // GET /cities
    fastify.get('/cities', async () => {
        return fastify.orm.em.find(FavoriteCity, {});
    });

    // GET /cities/:id
    fastify.get('/cities/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const city = await fastify.orm.em.findOne(FavoriteCity, { id });

        if (!city) {
            return reply.code(404).send({ error: 'City not found' });
        }

        return city;
    });

    // POST /cities
    fastify.post('/cities', async (request, reply) => {
        const body = request.body as {
            city: string;
            country: string;
            latitude: number;
            longitude: number;
        };

        const city = fastify.orm.em.create(FavoriteCity, body);
        fastify.orm.em.persist(city);
        await fastify.orm.em.flush();


        return reply.code(201).send(city);
    });

    // PUT /cities/:id
    fastify.put('/cities/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const body = request.body as Partial<{
            city: string;
            country: string;
            latitude: number;
            longitude: number;
        }>;

        const city = await fastify.orm.em.findOne(FavoriteCity, { id });

        if (!city) {
            return reply.code(404).send({ error: 'City not found' });
        }

        fastify.orm.em.assign(city, body);
        await fastify.orm.em.flush();

        return reply.send(city);
    });

    // DELETE /cities/:id
    fastify.delete('/cities/:id', async (request, reply) => {
        const { id } = request.params as { id: number };
        const city = await fastify.orm.em.findOne(FavoriteCity, { id });

        if (!city) {
            return reply.code(404).send({ error: 'City not found' });
        }

        fastify.orm.em.remove(city);
        await fastify.orm.em.flush();

        return reply.code(204).send();
    });
};

export default citiesRoute;
