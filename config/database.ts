import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '127.0.0.1',
  port: Number(process.env.POSTGRES_PORT) || 8000,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  synchronize: true,
  logging: true,
  entities: [Event],
  subscribers: [],
  migrations: [],
});

export default AppDataSource;
