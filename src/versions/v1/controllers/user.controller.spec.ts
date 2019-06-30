import { UserController } from './user.controller';
import { UserService } from '../../../common/user/user.service';
import { UserTokenService } from '../../../common/user/token/user-token.service';

describe('UserController', () => {
  let userTokenService: UserTokenService;
  let userService: UserService;
  let userController: UserController;

  beforeEach(() => {
    userTokenService = new UserTokenService();
    userService = new UserService(userTokenService);
    userController = new UserController(userService);
  });

  describe('login', () => {
    it('Should return token', () => {
      expect(userController.login('admin@admin.ru', '12345678')).toHaveProperty('token');
    });
  });
});
