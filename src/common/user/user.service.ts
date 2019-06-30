import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user';
import { UserTokenService } from './token/user-token.service';

@Injectable()
export class UserService {
  private users = [
    new User('admin@admin.ru', '12345678'),
    new User('user@user.ru', '87654321'),
  ];

  constructor(
    private readonly userTokenService: UserTokenService,
  ) { }

  login(email: string, password: string): string {
    const foundUser = this.users.find(user => user.email === email && user.password === password);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return this.userTokenService.createToken(foundUser.email);
  }
}
