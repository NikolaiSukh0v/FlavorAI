
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({ origin: 'http://localhost:3000', credentials: true });


  app.useStaticAssets(join(__dirname, '..', 'public'), {
  prefix: '/uploads', 
  });

  await app.listen(4000);
}
bootstrap();
