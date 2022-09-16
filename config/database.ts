import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'host.docker.internal',
  port: Number(process.env.POSTGRES_PORT) || 8000,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
  synchronize: true,
  logging: true,
  entities: [Event],
  subscribers: [],
  migrations: ['migrations/**/*{.ts,.js}'],
});

export default AppDataSource;
