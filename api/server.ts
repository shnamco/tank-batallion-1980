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

const getCertificates = (isDevelopment: boolean): { key: Buffer; cert: Buffer } => {
  if (isDevelopment) {
    return {
      key: fs.readFileSync(__dirname + '/src/certificates/local.ya-praktikum.tech-key.pem'),
      cert: fs.readFileSync(__dirname + '/src/certificates/local.ya-praktikum.tech.pem')
    };
  }
  return {
    key: fs.readFileSync(__dirname + '/src/certificates/privkey.pem'),
    cert: fs.readFileSync(__dirname + '/src/certificates/fullchain.pem')
  };
};

app.use(
  cors({
    credentials: true,
    origin: ['https://local.ya-praktikum.tech:3000', 'https://neapol-tanks-4.ya-praktikum.tech']
  })
);
app.use(cookieParser());
app.use(express.json());

app.use(authorization);

app.use('/api', routes);

const port = process.env.PORT || 8080;

const certificates = getCertificates(isDevelopment);

const isCertExist = certificates.cert && certificates.key;

(async () => {
  await sequelize.sync({ force: true });

  await Theme.create({ name: 'dark' } as Theme);
  await Theme.create({ name: 'light' } as Theme);

  if (isCertExist) {
    https.createServer(certificates, app).listen(port, () => {
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
