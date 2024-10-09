import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../infrastructure/schemas/user.schema';
import { Error, Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    console.log('UserModel:', userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      return error;
    }
  }
  async findSingleUserEmail(email: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
  async findUserByUsername(username: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ username: username }).exec();
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
}
