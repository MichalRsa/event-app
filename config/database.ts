import { DataSource } from 'typeorm';
import { Event } from '../entity/event.entity';
import config from 'config';
import { User } from '../entity/user.entity';

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
  entities: [Event, User],
  subscribers: [],
  migrations: ['migrations/**/*{.ts,.js}'],
});

export default AppDataSource;
