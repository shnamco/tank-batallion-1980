export default {
  HOST: 'localhost',
  USER: 'evtikhovich',
  PASSWORD: '123',
  DB: 'postgres',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
