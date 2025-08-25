import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookModel } from './models/book.model';
import { IResponse } from 'src/interfaces/success-response';
import { AuthorsService } from 'src/authors/authors.service';
import { getSuccessRes } from 'src/utils/getSuccessResponse';
import { AuthorModel } from 'src/authors/models/author.model';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(BookModel) private readonly bookModel: typeof BookModel,
    private readonly authorService: AuthorsService
  ) { }

  async create(createBookDto: CreateBookDto): Promise<IResponse> {
    await this.authorService.findOne(createBookDto.author_id);
    const book = await this.bookModel.create(createBookDto);
    return getSuccessRes(book, 201);
  }

  async findAll(): Promise<IResponse> {
    const books = await this.bookModel.findAll({ include: { model: AuthorModel } });
    return getSuccessRes(books);
  }

  async findOne(id: number): Promise<IResponse> {
    const book = await this.bookModel.findByPk(id, { include: { model: AuthorModel } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return getSuccessRes(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<IResponse> {
    if (updateBookDto.author_id) {
      await this.authorService.findOne(updateBookDto.author_id);
    }
    const book = await this.bookModel.update(updateBookDto, { where: { id }, returning: true });
    if (book[0] === 0) {
      throw new NotFoundException('Book not found');
    }
    return getSuccessRes(book[1][0]);
  }

  async remove(id: number): Promise<IResponse> {
    const book = await this.bookModel.destroy({ where: { id } });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return getSuccessRes({});
  }
}
