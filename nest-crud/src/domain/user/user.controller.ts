import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { MESSAGE } from './common/utils/responseMessages';
import { comparePassword, encryptedValue } from './common/commonFunctions';
import { CreateUserDto } from './application/dto/user.dto';
import { UserService } from './application/services/user.service';
import { LoginDto } from './application/dto/userLogin.dto';
import * as jwt from 'jsonwebtoken';
import { User } from './domain/entities/user.entity';
import { UpdateUserDto } from './application/dto/userUpdateProfile';
import { CustomRequest } from './interface/userinteerface';
import { Response } from 'express';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async signUp(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    try {
      const { name, dob, email, password, username } = CreateUserDto;
      const emailExists = await this.userService.findSingleUserEmail(email);
      if (emailExists) {
        throw new HttpException(
          MESSAGE.EMAIL_ALREDYEXISTS,
          HttpStatus.CONFLICT,
        );
      }
      const usernameExists =
        await this.userService.findUserByUsername(username);
      if (usernameExists) {
        throw new HttpException(
          MESSAGE.USERNAME_ALREADYEXISTS,
          HttpStatus.CONFLICT,
        );
      }
      const userObject = {
        name: name as string,
        dob: dob as string,
        email: email as string,
        username: username as string,
        password: encryptedValue(password),
      };
      const response = await this.userService.create(userObject);
      return {
        statusCode: HttpStatus.CREATED,
        message: MESSAGE.USER_CREATED,
        user: response,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        // Re-throw if it's already an HttpException
        throw error;
      }
      throw new HttpException(
        MESSAGE.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/login')
  async signIn(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    try {
      const { identifier, password } = loginDto;
      const user: User =
        await this.userService.findByUserameOrEmail(identifier);
      if (!user) {
        throw new HttpException(MESSAGE.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
      }
      if (user.isDeleted) {
        throw new HttpException(MESSAGE.USER_DELETED, HttpStatus.BAD_REQUEST);
      }
      const isPasswordCorrect = comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        throw new HttpException(
          MESSAGE.INCORRECT_PASSWORD,
          HttpStatus.UNAUTHORIZED,
        );
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: `${24}h`,
      });
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.LOGGEDIN_SUCCESS,
        token,
        user: { ...user, password: undefined },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        // Re-throw if it's already an HttpException
        throw error;
      }
      throw new HttpException(
        MESSAGE.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('/update')
  async updateProfile(
    @Req() req: CustomRequest,
    @Body() updateProfile: UpdateUserDto,
  ) {
    try {
      const { userInfo } = req;
      const { name, dob, username } = updateProfile;
      const usernameExists = await this.userService.findUserByUsername(
        username,
        userInfo.id,
      );
      if (usernameExists) {
        throw new HttpException(
          MESSAGE.USERNAME_ALREADYEXISTS,
          HttpStatus.CONFLICT,
        );
      }
      const updatedData = {
        ...(username && { username }),
        ...(name && { name }),
        ...(dob && { dob }),
      };
      const updatedUser = await this.userService.updateUser(
        userInfo.id,
        updatedData,
      );
      return {
        statusCode: HttpStatus.OK,
        message: MESSAGE.ACCOUNT_UPDATED,
        updatedUser,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        // Re-throw if it's already an HttpException
        throw error;
      }
      throw new HttpException(
        MESSAGE.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete')
  async deleteAccount(
    @Req() req: CustomRequest,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const { userInfo } = req;
      const user: User = await this.userService.findUserById(userInfo.id);
      if (user.isDeleted) {
        throw new HttpException(MESSAGE.USER_DELETED, HttpStatus.BAD_REQUEST);
      }
      await this.userService.deleteUser(userInfo.id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: MESSAGE.ACCOUNT_DELETED_SUCCESS,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        // Re-throw if it's already an HttpException
        throw error;
      }
      throw new HttpException(
        MESSAGE.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-users')
  async getAllUsers() {
    try {
      const users = await this.userService.findAllUsers();
      return {
        statusCode: HttpStatus.OK,
        data: users,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        // Re-throw if it's already an HttpException
        throw error;
      }
      throw new HttpException(
        MESSAGE.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
