import 'reflect-metadata';
import https from 'https';
import fs from 'fs';
import { app } from './server/server';

const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV === 'development';

const getCertificates = (): { key: Buffer; cert: Buffer } => {
  return {
    key: fs.readFileSync(__dirname + '/src/certificates/local.ya-praktikum.tech-key.pem'),
    cert: fs.readFileSync(__dirname + '/src/certificates/local.ya-praktikum.tech.pem')
  };
};

const certificates = getCertificates();

const isCertExist = certificates.cert && certificates.key;

(async () => {
  if (isCertExist && isDevelopment) {
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
