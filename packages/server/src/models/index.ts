import dbConfig from '../config/db.config';
import { Dialect, Sequelize } from 'sequelize';
import tutorials from './tutorial.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// @ts-ignore
const db: { Sequelize: any, sequelize: Sequelize, tutorials: any } = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = tutorials(sequelize, Sequelize);

export default db;
