import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ISuccessResponse } from 'src/interfaces/success-response';
import { getSuccessRes } from 'src/utils/getSuccessResponse';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<ISuccessResponse> {
    const existsEmail = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existsEmail) {
      throw new ConflictException('Email already exists');
    }
    const newUser = await this.userModel.create(createUserDto);
    return getSuccessRes(newUser, 201);
  }

  async findAll(): Promise<ISuccessResponse> {
    const users = await this.userModel.find().populate('posts');
    return getSuccessRes(users);
  }

  async findOne(id: string): Promise<ISuccessResponse> {
    const user = await this.userModel.findById(id).populate('posts');
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return getSuccessRes(user);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ISuccessResponse> {
    const { email } = updateUserDto;
    if (email) {
      const existsEmail = await this.userModel.findOne({ email });
      if (existsEmail && existsEmail.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return getSuccessRes(user);
  }

  async remove(id: string): Promise<ISuccessResponse> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return getSuccessRes({});
  }
}
