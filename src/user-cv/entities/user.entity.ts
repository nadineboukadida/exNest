/* eslint-disable prettier/prettier */
import { CvEntity } from './cv.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: false })
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => CvEntity, (cv) => cv.user)
  cv: CvEntity[];
}