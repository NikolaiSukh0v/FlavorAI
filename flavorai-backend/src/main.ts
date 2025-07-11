// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,     
  }));
   app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], 
    credentials: true,
  });
  await app.listen(4000);
}
bootstrap();
