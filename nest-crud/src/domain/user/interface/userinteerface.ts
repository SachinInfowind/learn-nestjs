import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';
import { Request } from 'express';
import { Document } from 'mongoose';

export interface CreateUserResponse extends Document {
  name: string;
  email: string;
  dob: string;
  password: string;
  username: string;
  message?: string;
}

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export interface CustomRequest extends Request {
  userInfo: any;
}
