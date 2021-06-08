import { sequelize } from './src/sequelize';
import { Theme } from './src/models/theme';
import fs from 'fs';
import https from 'https';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { authorization } from './src/middlewares/authorization';
import routes from './src/routes';

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

app.use(
  cors({
    credentials: true,
    origin: isDevelopment ? 'https://local.ya-praktikum.tech:8080' : 'https://neapol-tanks-4.ya-praktikum.tech:8080'
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(authorization);

app.use('/api', routes);

const port = process.env.PORT || 8080;

const certificateIsExist =
  isDevelopment &&
  fs.existsSync(__dirname + '/src/certificates/local.ya-praktikum.tech-key.pem') &&
  fs.existsSync(__dirname + '/src/certificates/local.ya-praktikum.tech.pem');

(async () => {
  await sequelize.sync({ force: true });

  await Theme.create({ name: 'dark' } as Theme);
  await Theme.create({ name: 'light' } as Theme);

  if (certificateIsExist) {
    https
      .createServer(
        {
          key: fs.readFileSync(__dirname + '/src/certificates/local.ya-praktikum.tech-key.pem'),
          cert: fs.readFileSync(__dirname + '/src/certificates/local.ya-praktikum.tech.pem')
        },
        app
      )
      .listen(port, () => {
        // eslint-disable-next-line no-console
        console.log('Application is started on localhost HTTPS:', port);
      });
  } else {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log('Application is started on localhost HTTP:', port);
    });
  }
})();
