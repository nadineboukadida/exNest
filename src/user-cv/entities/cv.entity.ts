import { SkillEntity } from './skill.entity';
import { UserEntity } from './user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CvEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  age: number;
  @Column()
  cin: string;
  @Column()
  job: string;
  @Column()
  path: string;
  @JoinTable()
  @ManyToOne(() => UserEntity, (user) => user.cv, { cascade: true })
  user: UserEntity;
  @JoinTable()
  @ManyToMany(() => SkillEntity, (skill) => skill.cv, { cascade: true })
  skills: SkillEntity[];
}
