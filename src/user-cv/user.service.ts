/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    return this.userRepository.findOneBy({id});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const newUser = await this.userRepository.preload({ id, ...updateUserDto });
    if (newUser) {
      return await this.userRepository.save(newUser);
    } else {
      throw new NotFoundException(`Le user d'id ${id} n'existe pas `);
    }
  }

  async remove(id: string) {
    return this.userRepository.softDelete(id);
  }
}