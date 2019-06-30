import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../../../common/user/user.service';

@Controller('v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post('login')
  login(@Body('email') email: string, @Body('password') password: string) {
    const token = this.userService.login(email, password);
    return { token };
  }
}
