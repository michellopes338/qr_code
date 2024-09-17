import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedException, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ConfigModule } from '@nestjs/config';
import * as compression from 'compression';

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
  app.use(
    compression({
      filter: () => {
        return true;
      },
      threshold: 0,
    }),
  );

  const allowlist = [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://qr-code-front-pi.vercel.app',
    'https://qr-code-front-pqaqgkkvl-michellopes338s-projects.vercel.app',
    'https://5173-michellopes-qrcodefront-qjtjy5qrxql.ws-us116.gitpod.io'
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (allowlist.includes(origin)) {
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
