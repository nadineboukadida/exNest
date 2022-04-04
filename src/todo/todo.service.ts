import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from "typeorm";
import { TodoEntity } from './Entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './update-todo.dto';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';
import { TodoStatusEnum } from './enums/todo-status.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  addTodo(todo: Partial<TodoEntity>): Promise<TodoEntity> {
    return this.todoRepository.save(todo);
  }

  async updateTodo(
    updateTodoDto: UpdateTodoDto,
    id: string,
  ): Promise<TodoEntity> {
    const newTodo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (newTodo) {
      return this.todoRepository.save(newTodo);
    } else {
      throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
    }
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }
  async softDeleteTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  async softRestoreTodo(id: string) {
    const result = await this.todoRepository.restore(id);
    if (result.affected) {
      return result;
    }
    throw new NotFoundException(`Le todo d'id ${id} n'existe pas `);
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const criterias = [];
    const page = searchTodoDto.page || 1
    const offset = searchTodoDto.offset || 10

    if (searchTodoDto.status) {
      criterias.push({ status: searchTodoDto.status });
    }
    if (searchTodoDto.criteria) {
      criterias.push({ name: Like(`%${searchTodoDto.criteria}%`) });
      criterias.push({ description: Like(`%${searchTodoDto.criteria}%`) });
    }
    if (criterias.length) {
      return this.todoRepository.find({ withDeleted: true, where: criterias ,
         take : page , skip: offset});
    }
    return this.todoRepository.find({ withDeleted: true});
  }

  // findByStatus(status :TodoStatusEnum ) {
  //   return this.
  // }
}
