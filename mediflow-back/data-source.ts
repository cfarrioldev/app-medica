import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';
import { SeederOptions } from 'typeorm-extension';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port:  +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],   // <- patrón seguro
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  factories: ['database/factories/**/*{.ts,.js}'],
  seeds: ['database/seeds/**/*{.ts,.js}'],
} as DataSourceOptions & SeederOptions);

