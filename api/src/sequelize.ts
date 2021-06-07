import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';
import dbConfig from './config/db.config';
import { Theme } from './models/theme';
import { UserTheme } from './models/user_theme';

export const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  port: dbConfig.PORT,
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  models: [UserTheme, Theme]
});
