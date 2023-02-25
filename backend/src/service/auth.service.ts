import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../model/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) { }

  async signin(user: User): Promise<any> {
    const foundUser = await this.userModel
      .findOne({ email: user.email })
      .exec();
    if (foundUser) {
      const passwordMatch = await this.userModel
        .findOne()
        .select('password')
        .exec();

      if (bcrypt.compare(user.password, passwordMatch.password)) {

        const { firstName, lastName, email, createdDate } = foundUser;
        const payload = { email };
        return {
          token: this.jwtService.sign(payload, { expiresIn: '24h' }),
          user: {
            firstName,
            lastName,
            email,
            createdDate,
          },
        };
      }
      return new HttpException(
        'Incorrect username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return new HttpException(
      'Incorrect username or password',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
