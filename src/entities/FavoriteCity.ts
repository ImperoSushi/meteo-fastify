import { defineEntity, p } from '@mikro-orm/core';

export const FavoriteCity = defineEntity({
  name: 'FavoriteCity',
  tableName: 'favorite_city_fastify',
  properties: {
    id: p.integer().primary(),
    city: p.string(),
    country: p.string(),
    latitude: p.float(),
    longitude: p.float(),
    temperature: p.float().nullable(),
    description: p.string().nullable(),
  },
});
