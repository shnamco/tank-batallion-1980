export default {
  PORT: 5432,
  USER: 'postgres',
  PASSWORD: 'postgres',
  DB: 'postgres',
  HOST: 'host.docker.internal',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
