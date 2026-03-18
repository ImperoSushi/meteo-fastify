import { FastifyPluginAsync } from 'fastify';
import { FavoriteCity } from '../entities/FavoriteCity.js';

const citiesRoute: FastifyPluginAsync = async (fastify) => {

    // GET /cities/search
    fastify.get('/cities/search', async (request, reply) => {
        const { search } = request.query as { search: string };

        if (!search || search.length < 2) {
            return [];
        }

        const cities = await fastify.em.find(FavoriteCity, {
            city: { $ilike: `%${search}%` }
        });

        return cities;
    });

    // GET /cities
    fastify.get('/cities', async () => {
        return await fastify.em.find(FavoriteCity, {});
    });

    // GET /cities/:id
    fastify.get('/cities/:id', async (request, reply) => {
        const { id } = request.params as { id: number };

        const city = await fastify.em.findOne(FavoriteCity, { id });

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
            temperature?: number;
            description?: string;
        };

        const city = fastify.em.create(FavoriteCity, body);

        fastify.em.persist(city);
        await fastify.em.flush();

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
            temperature: number;
            description: string;
        }>;

        const city = await fastify.em.findOne(FavoriteCity, { id });

        if (!city) {
            return reply.code(404).send({ error: 'City not found' });
        }

        fastify.em.assign(city, body);
        await fastify.em.flush();
        return city;
    });

    // DELETE /cities/:id
    fastify.delete('/cities/:id', async (request, reply) => {
        const { id } = request.params as { id: number };

        const city = await fastify.em.findOne(FavoriteCity, { id });

        if (!city) {
            return reply.code(404).send({ error: 'City not found' });
        }

        fastify.em.remove(city);
        await fastify.em.flush();

        return reply.code(204).send();
    });
};

export default citiesRoute;
