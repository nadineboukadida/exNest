/* eslint-disable prettier/prettier */
import { CvEntity } from './cv.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  designation: string;
  @ManyToMany(() => CvEntity, (cv) => cv.skills)
  cv: CvEntity[];
}