import { defineEntity, p } from '@mikro-orm/core';

export const FavoriteCity = defineEntity({
  name: 'FavoriteCity',
  tableName: 'favorite_city',
  properties: {
    id: p.integer().primary(),
    city: p.string(),
    country: p.string(),
    latitude: p.float(),
    longitude: p.float(),
  },
});
