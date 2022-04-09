/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCvDto {
  @IsNotEmpty()
  idUser: string;
  @IsString({ each: true })
  designation: string[];
  @IsString()
  name: string;
  @IsString()
  firstname: string;
  @IsNumber()
  age: number;
  @IsString()
  cin: string;
  @IsString()
  job: string;
  @IsString()
  path: string;
}
