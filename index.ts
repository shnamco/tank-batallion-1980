import 'reflect-metadata';
import https from 'https';
import fs from 'fs';
import { app } from './server/server';

const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

const getCertificates = (isDevelopment: boolean): { key: Buffer; cert: Buffer } => {
  if (isDevelopment) {
    return {
      key: fs.readFileSync('server/certificates/local.ya-praktikum.tech-key.pem'),
      cert: fs.readFileSync('server/certificates/local.ya-praktikum.tech.pem')
    };
  }
  return {
    key: fs.readFileSync('server/certificates/privkey.pem'),
    cert: fs.readFileSync('server/certificates/fullchain.pem')
  };
};

const certificates = getCertificates(isDevelopment);

const isCertExist = certificates.cert && certificates.key;

(async () => {
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
