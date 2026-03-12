import { MySqlDriver } from '@mikro-orm/mysql';
import { FavoriteCity } from './src/entities/FavoriteCity.js';

export default {
  entities: [FavoriteCity],
  dbName: 'weather',
  user: 'weather_user',
  password: 'extark2025',
  host: 'localhost',
  port: 3306,
  driver: MySqlDriver,
};
