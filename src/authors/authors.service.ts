import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AuthorModel } from './models/author.model';
import { IResponse } from 'src/interfaces/success-response';
import { getSuccessRes } from 'src/utils/getSuccessResponse';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(AuthorModel) private readonly authorModel: typeof AuthorModel,
  ) { }

  async create(createAuthorDto: CreateAuthorDto): Promise<IResponse> {
    const existsEmail = await this.authorModel.findOne({
      where: { email: createAuthorDto.email },
    });
    if (existsEmail) {
      throw new ConflictException('Email already exists');
    }
    const newAuthor = await this.authorModel.create(createAuthorDto);
    return getSuccessRes(newAuthor, 201);
  }

  async findAll(): Promise<IResponse> {
    const authors = await this.authorModel.findAll({ include: { all: true } });
    return getSuccessRes(authors);
  }

  async findOne(id: number): Promise<IResponse> {
    const author = await this.authorModel.findByPk(id, { include: { all: true } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return getSuccessRes(author);
  }

  async update(
    id: number,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<IResponse> {
    if (updateAuthorDto.email) {
      const existsEmail = await this.authorModel.findOne({
        where: { email: updateAuthorDto.email },
      });
      if (existsEmail && existsEmail?.id != id) {
        throw new ConflictException('Email already exists');
      }
    }
    const author = await this.authorModel.update(updateAuthorDto, {
      where: { id },
      returning: true,
    });
    if (author[0] === 0) {
      throw new NotFoundException('Author not found');
    }
    return getSuccessRes(author[1][0]);
  }

  async remove(id: number): Promise<IResponse> {
    const author = await this.authorModel.destroy({ where: { id } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return getSuccessRes({});
  }
}
