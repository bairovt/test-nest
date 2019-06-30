import { UserTokenService } from './user-token.service';

describe('UserTokenService', () => {
  let userTokenService: UserTokenService;

  beforeEach(() => {
    userTokenService = new UserTokenService();
  });

  describe('create token', () => {
    it('Should create and return token', () => {
      const token = userTokenService.createToken('some@admin.ru');
      expect(token).toHaveLength(32);
      const createdUserToken = userTokenService.userTokens.find(userToken => userToken.userEmail === 'some@admin.ru');
      expect(createdUserToken).toBeInstanceOf(Object);
    });
  });
});
