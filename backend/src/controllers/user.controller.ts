import {
  Controller,
  Get,
  Logger,
  Req
} from '@nestjs/common';
import { User } from '../model/user.schema';
import { UserService } from '../service/user.service';

@Controller('/api/v1/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService
  ) { }

  @Get('/me')
  async getUser(@Req() req): Promise<User> {
    return this.userService.getOne(req.user.email);
  }
}
