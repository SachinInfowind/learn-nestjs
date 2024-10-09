import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  const config = new DocumentBuilder()
    .setTitle('Users example')
    .setDescription('A documentation for CRUD operation in nestjs')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const documentation = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentation, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.listen(3000);
}
bootstrap();
