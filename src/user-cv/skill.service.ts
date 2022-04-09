/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CvEntity } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillEntity } from './entities/skill.entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
    @InjectRepository(CvEntity)
    private readonly cvRepository: Repository<CvEntity>,
  ) {}

  async create(createSkillDto: CreateSkillDto) {
    const cv: CvEntity[] = await Promise.all(
      createSkillDto.cv.map((item) => this.preloadCvsFromId(item)),
    );
    const skill: SkillEntity =  this.skillRepository.create({
      ...createSkillDto,
      cv,
    });
    return this.skillRepository.save(skill);
  }
  private async preloadCvsFromId(id: string): Promise<CvEntity> {
    return await this.cvRepository.findOneBy({id});
  }

  async findAll() {
    return await this.skillRepository.find();
  }

  async findOne(id: string) {
    return await this.skillRepository.findOneBy({id});
  }

  async update(id: string, updateSkillDto: UpdateSkillDto) {
    const newSkill = await this.skillRepository.preload({ id, ...updateSkillDto });
    if (newSkill) {
      return this.skillRepository.save(newSkill);
    } else {
      throw new NotFoundException(`Le skill d'id ${id} n'existe pas `);
    }
  }

  async remove(id: string) {
    return await this.skillRepository.softDelete(id);
  }
}