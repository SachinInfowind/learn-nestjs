import {
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MESSAGE } from './common/utils/responseMessages';
import { encryptedValue, parseCsv } from './common/commonFunctions';
import { CreateUserDto } from './application/dto/user.dto';
import { UserService } from './application/services/user.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('upload-bulk')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload CSV file',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'file',
          format: 'file', // Important: This tells Swagger it's a file upload
        },
      },
    },
  })
  async uploadInBulk(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1048576 }),
          new FileTypeValidator({ fileType: 'text/csv' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      const data = await parseCsv(file.buffer);
      let num = 0;
      for (const user of data) {
        const emailExists = await this.userService.findSingleUserEmail(
          user.email,
        );
        const usernameExists = await this.userService.findUserByUsername(
          user.username,
        );
        if (!usernameExists && !emailExists) {
          const userObject: CreateUserDto = {
            name: user.name as string,
            dob: user.dob as string,
            email: user.email as string,
            username: user.username as string,
            password: encryptedValue(user.password),
          };
          const newUser = await this.userService.create(userObject);
          if (newUser) {
            num++;
          }
        }
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: `${num} ${MESSAGE.USER_INSERTED}`,
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
