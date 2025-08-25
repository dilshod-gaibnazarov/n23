import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthorsModule } from './authors/authors.module';
import { AuthorModel } from './authors/models/author.model';
import { BooksModule } from './books/books.module';
import { BookModel } from './books/models/book.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USER),
      password: String(process.env.DB_PASS),
      database: String(process.env.DB_NAME),
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models: [AuthorModel, BookModel],
    }),
    AuthorsModule,
    BooksModule,
  ],
})
export class AppModule {}
