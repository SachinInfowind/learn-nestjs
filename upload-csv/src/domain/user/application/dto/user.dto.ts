import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.',
  })
  password: string;
}
