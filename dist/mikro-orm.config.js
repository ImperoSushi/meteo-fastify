import { defineConfig } from '@mikro-orm/mysql';
export default defineConfig({
    entities: ['./dist/entities'],
    entitiesTs: ['./src/entities'],
    dbName: 'weather',
    user: 'weather_user',
    password: 'extark2025',
    host: 'localhost',
    port: 3306,
});
