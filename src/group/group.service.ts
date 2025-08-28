import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { University } from 'src/university/entities/university.entity';
import { getSuccessRes } from 'src/utils/getSuccessRes';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groupRepo: Repository<Group>,
    @InjectRepository(University)
    private readonly universityRepo: Repository<University>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const existsGroup = await this.groupRepo.findOne({
      where: { name: createGroupDto.name },
    });
    if (existsGroup) {
      throw new ConflictException('Group already exists');
    }
    const university = await this.universityRepo.findOne({
      where: { id: createGroupDto.universityId },
    });
    if (!university) {
      throw new NotFoundException('University not found');
    }
    const newGroup = this.groupRepo.create({
      ...createGroupDto,
      university,
    });
    await this.groupRepo.save(newGroup);
    return getSuccessRes(newGroup, 201);
  }

  async findAll() {
    const groups = await this.groupRepo.find({
      relations: { university: true, students: true },
      select: {
        id: true,
        name: true,
        university: {
          id: true,
          name: true,
          location: true,
        },
        students: {
          id: true,
          full_name: true,
          email: true,
          age: true
        }
      },
      order: { createdAt: 'DESC' },
    });
    return getSuccessRes(groups);
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: { university: true, students: true },
      select: {
        id: true,
        name: true,
        university: {
          id: true,
          name: true,
          location: true,
        },
        students: {
          id: true,
          full_name: true,
          email: true,
          age: true
        }
      },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return getSuccessRes(group);
  }

  // updateni tushunish uchun videoning 1:30:00 vaqtini ko'ring 😂
  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const { name, universityId } = updateGroupDto;
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: { university: true },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    if (name) {
      const existsGroup = await this.groupRepo.findOne({ where: { name } });
      if (existsGroup && existsGroup.id != id) {
        throw new ConflictException('Group already exists');
      }
    }
    let university = group.university;
    if (universityId) {
      const existsUniversity = await this.universityRepo.findOne({
        where: { id: universityId },
      });
      if (!existsUniversity) {
        throw new NotFoundException('University not found');
      }
      university = existsUniversity;
      delete updateGroupDto.universityId;
    }
    await this.groupRepo.update({ id }, { ...updateGroupDto, university });
    const updatedGroup = await this.groupRepo.findOne({
      where: { id },
      relations: { university: true },
    });
    return getSuccessRes(updatedGroup ?? group);
  }

  async remove(id: number) {
    const group = await this.groupRepo.delete({ id });
    if (!group.affected) {
      throw new NotFoundException('Group not found');
    }
    return getSuccessRes({});
  }
}
