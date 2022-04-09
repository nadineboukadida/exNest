/* eslint-disable prettier/prettier */
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { IsEnum, IsOptional } from 'class-validator';

export class SearchTodoDto {
  @IsOptional()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
  @IsOptional()
  page : number;
  @IsOptional()
  offset : number;
}
