import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    super();
  }

  async validate(user: User): Promise<any> {
    const foundUser = await this.authService.signin(user);
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
