/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { SkillEntity } from './entities/skill.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(CvEntity)
    private readonly cvRepository: Repository<CvEntity>,
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createCvDto: CreateCvDto) {

    const skills: SkillEntity[] = await Promise.all(
      createCvDto.designation.map((item) =>
        this.preloadDesignationByName(item),
      ),
    );

    const user: UserEntity = await this.userRepository.findOneBy({id: createCvDto.idUser});

    if (user) {
      const obj = { ...createCvDto, skills, user };
      const cv: CvEntity = this.cvRepository.create(obj);
      return await this.cvRepository.save(cv);
    }

    return new NotFoundException(
      `user with id : ${createCvDto.idUser} not found ! `,
    );
  }


  async preloadDesignationByName(designation: string): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOneBy({ designation });
    return skill ? skill : this.skillRepository.create({ designation, cv: [] });
  }

  async findAll() {
    return await this.cvRepository.find();
  }

  async findOne(id: string) {
    return await this.cvRepository.findOneBy({id});
  }

  async update(id: string, updateCvDto: UpdateCvDto) {
    const newCv = await this.cvRepository.preload({ id, ...updateCvDto });
    if (newCv) {
      return this.cvRepository.save(newCv);
    } else {
      throw new NotFoundException(`Le cv d'id ${id} n'existe pas `);
    }
  }

  async remove(id: string) {
    return await this.cvRepository.softDelete(id);
  }
}