import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { University } from './entities/university.entity';
import { Repository } from 'typeorm';
import { getSuccessRes } from 'src/utils/getSuccessRes';

@Injectable()
export class UniversityService {
  constructor(
    @InjectRepository(University)
    private readonly universityRepo: Repository<University>,
  ) { }

  async create(createUniversityDto: CreateUniversityDto) {
    const newUniversity = this.universityRepo.create(createUniversityDto);
    await this.universityRepo.save(newUniversity);
    return getSuccessRes(newUniversity, 201);
  }

  async findAll() {
    const universities = await this.universityRepo.find({
      relations: {
        groups: {
          students: true
        }
      },
      select: {
        id: true,
        name: true,
        location: true,
        groups: {
          id: true,
          name: true,
          students: {
            id: true,
            full_name: true,
            email: true,
            age: true
          }
        },
      },
      order: { createdAt: 'DESC' },
    });
    return getSuccessRes(universities);
  }

  async findOne(id: number) {
    const university = await this.universityRepo.findOne({
      where: { id },
      relations: {
        groups: {
          students: true
        }
      },
      select: {
        id: true,
        name: true,
        location: true,
        groups: {
          id: true,
          name: true,
          students: {
            id: true,
            full_name: true,
            email: true,
            age: true
          }
        },
      },
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    return getSuccessRes(university);
  }

  async update(id: number, updateUniversityDto: UpdateUniversityDto) {
    await this.universityRepo.update({ id }, updateUniversityDto);
    const university = await this.universityRepo.findOne({ where: { id } });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    return getSuccessRes(university);
  }

  async remove(id: number) {
    const university = await this.universityRepo.delete({ id });
    if (!university.affected) {
      throw new NotFoundException('University not found');
    }
    return getSuccessRes({});
  }
}
