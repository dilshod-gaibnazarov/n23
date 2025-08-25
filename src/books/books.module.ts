import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookModel } from './models/book.model';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [SequelizeModule.forFeature([BookModel]), AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
