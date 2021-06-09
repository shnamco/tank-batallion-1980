import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import dbConfig from './config/db.config';
import { Theme } from './models/theme';
import { UserTheme } from './models/user_theme';

const isDev = process.env.NODE_ENV === 'development';

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  port: dbConfig.PORT,
  host: isDev ? 'localhost' : dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  models: [UserTheme, Theme]
});
