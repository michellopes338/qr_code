import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TreinamentosModule } from './treinamentos/treinamentos.module';
import { PrismaService } from './prisma.service';
import { AutocompleteModule } from './autocomplete/autocomplete.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// import { JwtAuthUserGuard } from './auth/guards/jwt.guard';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EmployeesModule } from './employees/employees.module';
import { RolesGuard } from './auth/guards/role.guard';
// import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    TreinamentosModule,
    AutocompleteModule,
    UsersModule,
    AuthModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    // { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
