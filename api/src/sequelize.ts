import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import dbConfig from './config/db.config';
import { Theme } from './models/theme';
import { UserTheme } from './models/user_theme';

export const sequelize = new Sequelize({
  port: dbConfig.PORT || 5432,
  username: dbConfig.USER || 'postgres',
  password: dbConfig.PASSWORD || 'postgres',
  database: dbConfig.DB || 'postgres',
  host: dbConfig.HOST,
  dialect: (dbConfig.dialect || 'postgres') as Dialect,
  models: [UserTheme, Theme]
});
