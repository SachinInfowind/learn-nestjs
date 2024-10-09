import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../infrastructure/schemas/user.schema';
import { Error, Model } from 'mongoose';
import { CreateUserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/userUpdateProfile';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
  async findUserByUsername(username: string, id = ''): Promise<any> {
    try {
      let user: CreateUserDto;
      if (id == '') {
        user = await this.userModel.findOne({ username: username }).exec();
      } else {
        user = await this.userModel.findOne({
          _id: { $ne: id },
          username: username,
        });
      }
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
  async findByUserameOrEmail(identifier: string): Promise<any> {
    try {
      return await this.userModel
        .findOne({
          $or: [{ username: identifier }, { email: identifier }],
        })
        .lean();
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
  async findUserById(id: string): Promise<any> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
  async updateUser(id: string, update: UpdateUserDto): Promise<any> {
    try {
      return await this.userModel.findByIdAndUpdate(
        id,
        { $set: update },
        { new: true },
      );
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
  async deleteUser(id: string): Promise<any> {
    try {
      return await this.userModel.updateOne(
        { _id: id },
        { $set: { isDeleted: true } },
      );
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
  async findAllUsers(): Promise<any> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  }
}
