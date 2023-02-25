import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

@Injectable()
export class isAuthenticated implements NestMiddleware {
  private readonly logger = new Logger(isAuthenticated.name);

  constructor(
    private readonly jwt: JwtService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = await this.jwt.verify(token);
        const user = await this.userService.getOne(decoded.email);
        if (user) {
          req.user = user;
          next();
        } else {
          throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
      } else {
        throw new HttpException('No token found', HttpStatus.NOT_FOUND);
      }
    } catch {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
