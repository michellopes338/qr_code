import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
    }),
  );

  app.use(helmet());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://qr-code-front-pi.vercel.app/',
      'qr-code-front-pqaqgkkvl-michellopes338s-projects.vercel.app',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
