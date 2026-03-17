const meteoRoute = async (fastify) => {
    fastify.get('/meteo', async (request, reply) => {
        return { status: 'ok', message: 'API Meteo attiva' };
    });
};
export default meteoRoute;
