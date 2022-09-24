import config from 'config';
import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';

const dbConfig: any = config.get('database');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  entities: [Event],
  subscribers: [],
  migrations: ['migrations/**/*{.ts,.js}'],
});

export default AppDataSource;
