import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../model/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    const reqBody = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: hash,
    };
    const newUser = new this.userModel(reqBody);
    return newUser.save();
  }

  async getOne(email): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    delete user.password;
    return user;
  }
}
