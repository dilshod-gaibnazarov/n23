import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { getSuccessRes } from 'src/utils/getSuccessRes';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { email, groupId } = createStudentDto;
    const group = await this.groupRepo.findOne({ where: { id: groupId } });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    const existsEmail = await this.studentRepo.findOne({ where: { email } });
    if (existsEmail) {
      throw new ConflictException('Email already exists');
    }
    const newStudent = this.studentRepo.create({
      ...createStudentDto,
      group,
    });
    await this.studentRepo.save(newStudent);
    return getSuccessRes(newStudent, 201);
  }

  async findAll() {
    const students = await this.studentRepo.find({
      relations: {
        group: {
          university: true,
        },
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        age: true,
        group: {
          id: true,
          name: true,
          university: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
      order: { createdAt: 'DESC' },
    });
    return getSuccessRes(students);
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: {
        group: {
          university: true,
        },
      },
      select: {
        id: true,
        full_name: true,
        email: true,
        age: true,
        group: {
          id: true,
          name: true,
          university: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return getSuccessRes(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const { email, groupId } = updateStudentDto;
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: { group: true },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    if (email) {
      const existsEmail = await this.studentRepo.findOne({ where: { email } });
      if (existsEmail && existsEmail.id != id) {
        throw new ConflictException('Email address already exists');
      }
    }
    let group = student.group;
    if (groupId) {
      const existsGroup = await this.groupRepo.findOne({
        where: { id: groupId },
      });
      if (!existsGroup) {
        throw new NotFoundException('University not found');
      }
      group = existsGroup;
      delete updateStudentDto.groupId;
    }
    await this.studentRepo.update({ id }, { ...updateStudentDto, group });
    const updatedStudent = await this.studentRepo.findOne({
      where: { id },
      relations: { group: true },
    });
    return getSuccessRes(updatedStudent ?? student);
  }

  async remove(id: number) {
    const student = await this.studentRepo.delete({ id });
    if (!student.affected) {
      throw new NotFoundException('Student not found');
    }
    return getSuccessRes({});
  }
}
