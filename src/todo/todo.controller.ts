/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Patch, Delete, Param, Query} from '@nestjs/common';
import { TodoService } from './todo.service';
import { SearchTodoDto } from './dto/search-todo.dto'
import { StatsTodoDto } from './dto/stats-todo.dto'
import { AddTodoDto } from './dto/add-todo.dto'
import { TodoEntity } from './Entity/todo.entity'
import { UpdateTodoDto } from './update-todo.dto'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult'

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@Query() searchTodo: SearchTodoDto): Promise<TodoEntity[]> {
    return this.todoService.findAll(searchTodo);
  }
  
  @Get("/stats")
  getTodoStats(@Query() statsTodo: StatsTodoDto): Promise<any> {
    return this.todoService.getTodoStats(statsTodo)
  }

  @Get("/:id")
  getTodoById(@Param('id') id: string): Promise<TodoEntity> {
    return this.todoService.findOneById(id);
  }


  @Post()
  addTodo(@Body() todo: AddTodoDto): Promise<TodoEntity> {
    return this.todoService.addTodo(todo);
  }

  @Patch('/:id')
  updateTodo(@Param('id') id: string, @Body() newTodo: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoService.updateTodo(newTodo, id);
  }

  @Delete('/:id')
  DeleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.deleteTodo(id);
  }
 
}
