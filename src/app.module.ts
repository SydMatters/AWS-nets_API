import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    ConfigModule.forRoot({
      validationSchema: Joi?.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        POSTGRES_HOST: Joi?.string().required(),
        POSTGRES_PORT: Joi?.number().required(),
        POSTGRES_USER: Joi?.string().required(),
        POSTGRES_PASSWORD: Joi?.string().required(),
        POSTGRES_DB: Joi?.string().required(),
        PORT: Joi?.number(),
      })
    }),
    UsersModule,
    ProjectsModule,
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}