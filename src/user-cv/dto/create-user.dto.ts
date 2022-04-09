/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
