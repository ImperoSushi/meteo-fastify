import { FavoriteCity } from '../entities/FavoriteCity.js';
const citiesRoute = async (fastify) => {
    // GET /cities/search
    fastify.get('/cities/search', async (request, reply) => {
        const { search } = request.query;
        if (!search || search.length < 2) {
            return reply.send([]);
        }
        const cities = await fastify.orm.em.find(FavoriteCity, {
            city: { $ilike: `%${search}%` }
        });
        return cities;
    });
    // GET /cities
    fastify.get('/cities', async () => {
        try {
            return await fastify.orm.em.find(FavoriteCity, {});
        }
        catch (error) {
            fastify.log.error(error);
            return { error: 'Database error' };
        }
    });
    // GET /cities/:id
    fastify.get('/cities/:id', async (request, reply) => {
        const { id } = request.params;
        const city = await fastify.orm.em.findOne(FavoriteCity, { id });
        if (!city) {
            return reply.code(404).send({ error: 'City not found' });
        }
        return city;
    });
    // POST /cities
    fastify.post('/cities', async (request, reply) => {
        const body = request.body;
        const city = fastify.orm.em.create(FavoriteCity, body);
        fastify.orm.em.persist(city);
        await fastify.orm.em.flush();
        return reply.code(201).send(city);
    });
    // PUT /cities/:id
    fastify.put('/cities/:id', async (request, reply) => {
        const { id } = request.params;
        const body = request.body;
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
        const { id } = request.params;
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
