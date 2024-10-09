import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;
  @IsNotEmpty()
  dob: string;
  username: string;
}
