import {ConfigService, registerAs} from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {DataSource, DataSourceOptions} from "typeorm";
import { config } from 'dotenv';
config();

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  synchronize: false,
  logging: configService.get("NODE_ENV") !== 'production',
  migrationsTableName: 'migration',
  autoLoadEntities: true,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [
    __dirname + '/migration/**/*.ts',
    __dirname + '/migration/**/*.js',
  ],
});

export default new DataSource(
  typeOrmConfig(new ConfigService()) as DataSourceOptions
);