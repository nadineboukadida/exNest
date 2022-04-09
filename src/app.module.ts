/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PremierModule } from './premier/premier.module';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { devConfig } from './config/dev.config';
import { prodConfig } from './config/prod.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo/Entity/todo.entity';
import { Todo } from './todo/Model/todo.model';
import { UserCvModule } from './user-cv/user-cv.module';

@Module({
  imports: [
    PremierModule,
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [process.env.NODE_ENV == 'development' ? devConfig : prodConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gl322',
      autoLoadEntities: true,
      synchronize: true,
      debug: true,
    }),
    UserCvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
