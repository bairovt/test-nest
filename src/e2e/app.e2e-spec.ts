import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { V1Module } from '../versions/v1/v1.module';
import { INestApplication } from '@nestjs/common';

describe('Tokens app', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [V1Module],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`POST '/v1/user/login' with incorrect credentials`, () => {
    const expectedResponse = {
      statusCode: 401,
      error: 'Unauthorized',
    };

    return request(app.getHttpServer())
      .post('/v1/user/login')
      .send({ email: 'admin@admin.ru', password: 'wrong_password' })
      .expect(401)
      .expect(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
