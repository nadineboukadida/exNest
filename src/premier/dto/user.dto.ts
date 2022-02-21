import { TodoStatusEnum } from '../../todo/enums/todo-status.enum';
import { IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  name: string;
  @IsNotEmpty()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
