import { Request } from 'express';
import { Document } from 'mongoose';

export interface CreateUserResponse extends Document {
  name: string;
  email: string;
  dob: string;
  password: string;
  username: string;
}

export interface CustomRequest extends Request {
  userInfo: any;
}
