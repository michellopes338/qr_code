import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
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

  const whitelist = [
    'http://localhost:5173',
    'https://qr-code-front-pi.vercel.app/',
    'https://qr-code-front-pqaqgkkvl-michellopes338s-projects.vercel.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new UnauthorizedException('Not Allowed By CORS'));
      }
    },
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
    methods: 'GET, POST, PATCH, ELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
