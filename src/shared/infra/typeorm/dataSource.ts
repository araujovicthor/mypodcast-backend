import 'dotenv/config';

import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
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
