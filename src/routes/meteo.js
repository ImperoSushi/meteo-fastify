import fastify from "fastify";

export default async function (fastify, opts) {

    fastify.get('/meteo', async(request, reply) => {
        return {status: 'ok', message: 'API Meteo attiva'}
    })
}