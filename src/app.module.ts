import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniversityModule } from './university/university.module';
import { GroupModule } from './group/group.module';
import { StudentModule } from './student/student.module';
import { University } from './university/entities/university.entity';
import { Group } from './group/entities/group.entity';
import { Student } from './student/entities/student.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: String(process.env.DB_URI),
      synchronize: true,
      autoLoadEntities: true,
      entities: [University, Group, Student],
    }),
    UniversityModule,
    GroupModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
