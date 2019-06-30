
import { UserService } from './user.service';
import { UserTokenService } from './token/user-token.service';
import { UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let userTokenService: UserTokenService;
  let userService: UserService;

  beforeEach(() => {
    userTokenService = new UserTokenService();
    userService = new UserService(userTokenService);
  });

  describe('login', () => {
    it('Should return token', () => {
      expect(userService.login('admin@admin.ru', '12345678')).toHaveLength(32);
    });

    it('should throw an error', () => {
      expect(() => {
        userService.login('wrong@email', '12345678');
      }).toThrowError(UnauthorizedException);
    });
  });
});
