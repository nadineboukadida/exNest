import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
  controllers: [UserController, CvController, SkillController],
  providers: [UserService, CvService, SkillService],
})
export class UserCvModule {}
