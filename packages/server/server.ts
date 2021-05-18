import { createServer } from 'http';
import { app } from './src/app';
import { sequelize } from './src/sequelize';

const port = process.env.PORT || 8080;

(async () => {
  await sequelize.sync({ force: true });

  createServer(app).listen(port, () => console.info(`Server running on port ${port}`));
})();
