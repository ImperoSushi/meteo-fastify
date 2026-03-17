import { FavoriteCity } from '../entities/FavoriteCity.js';
import * as XLSX from 'xlsx';
const exportRoute = async (fastify) => {
    // GET /export_excel
    fastify.get('/export_excel', async (request, reply) => {
        try {
            const cities = await fastify.orm.em.find(FavoriteCity, {});
            const worksheet = XLSX.utils.json_to_sheet(cities);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Favorite Cities');
            const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            reply.header('Content-Disposition', 'attachment; filename="favorite_cities.xlsx"');
            return buffer;
        }
        catch (error) {
            fastify.log.error(error);
            return reply.code(500).send({ error: 'Failed to generate Excel file' });
        }
    });
};
export default exportRoute;
