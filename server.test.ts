import request from 'supertest';
import server from './server';
import AppDataSource from './config/testDatabase';
import eventController from './controller/eventController';

console.log('NODE_ENV', process.env.NODE_ENV);

afterAll(() => {
  AppDataSource.destroy();
});

describe('API is running and gives reponse', () => {
  it('GET /', async () => {
    await request(
      await server(AppDataSource, [eventController(AppDataSource)]).then(
        (app) => app
      )
    )
      .get('/')
      .expect('Content-Type', /text\/html; charset=utf-8/)
      .expect(200);
    // More logic goes here
  });
});
