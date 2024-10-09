import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  dob: string;
  @IsNotEmpty()
  username: string;
}
