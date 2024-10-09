import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { MESSAGE } from '../common/utils/responseMessages';
import { CustomRequest } from '../interface/userinteerface';
@Injectable()
export class VerifyToken implements NestMiddleware {
  use(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const token = req.header('authorization');
      if (token) {
        const decodeToken = jwt.verify(
          token,
          process.env.JWT_SECRET_KEY as string,
        );
        req.userInfo = decodeToken;
        next();
      } else {
        throw new HttpException(MESSAGE.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        // Re-throw if it's already an HttpException
        throw error;
      }
      throw new HttpException(
        MESSAGE.TOKEN_EXPIRES_TIMEOUT,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
