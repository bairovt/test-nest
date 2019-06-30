import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './versions/v1/controllers/user.controller';
import { V1Module } from './versions/v1/v1.module';
import { UnauthorizedException } from '@nestjs/common';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        V1Module,
      ],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('login', () => {
    it('should return token', () => {
      const userController = app.get<UserController>(UserController);
      expect(userController.login('admin@admin.ru', '12345678')).toHaveProperty('token');
    });

    it('should throw an error', () => {
      const userController = app.get<UserController>(UserController);
      expect(() => {
        userController.login('wrong@email', '12345678');
      }).toThrowError(UnauthorizedException);
    });
  });
});
