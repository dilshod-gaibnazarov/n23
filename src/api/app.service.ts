import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from 'src/infrastructure/exception/all-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Application {
  static async main(): Promise<void> {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.useGlobalFilters(new AllExceptionFilter());

    const api = 'api/v1';
    app.setGlobalPrefix(api);
    const configSwagger = new DocumentBuilder()
      .setTitle('Nasiya APP')
      .setVersion('1.0.0')
      .addBearerAuth({
        type: 'http',
        scheme: 'Bearer',
        in: 'Header',
      })
      .build();
    const documentFactory = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup(api, app, documentFactory);

    app.listen(config.API_PORT, () =>
      console.log('Server running on port', config.API_PORT),
    );
  }
}
