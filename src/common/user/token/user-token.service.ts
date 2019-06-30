import { Injectable } from '@nestjs/common';
import { UserToken } from './user-token';
import * as randomstring from 'randomstring';

@Injectable()
export class UserTokenService {
  public userTokens: UserToken[] = [];

  createToken(userEmail: string): string {
    const token = randomstring.generate();
    const newUserToken = new UserToken(userEmail, token);
    const foundIndex = this.userTokens.findIndex(userToken => userToken.userEmail === userEmail);
    if (foundIndex === -1) {
      this.userTokens.push(newUserToken);
    } else {
      this.userTokens[foundIndex] = newUserToken;
    }
    return token;
  }
}
