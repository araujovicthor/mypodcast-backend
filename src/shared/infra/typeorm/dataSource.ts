import 'dotenv/config';

import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  // host: process.env.DATABASE_HOST,
  // port: 5432,
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_DB,
  migrations: [
    process.env.NODE_ENV === 'prod'
      ? 'dist/shared/infra/typeorm/migrations/*.js'
      : './src/shared/infra/typeorm/migrations/*.ts',
  ],
  entities: [
    process.env.NODE_ENV === 'prod'
      ? 'dist/modules/**/entities/*.js'
      : './src/modules/**/entities/*.ts',
  ],
  migrationsRun: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
