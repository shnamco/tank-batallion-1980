import express, { Express } from 'express';
import { createServer, Server } from 'https';
import { readFileSync } from 'fs';

const server: Express = express();

const options = {
  key: readFileSync(__dirname + '/certificates/local.ya-praktikum.tech-key.pem'),
  cert: readFileSync(__dirname + '/certificates/local.ya-praktikum.tech.pem')
};

server.get('/*', (req: any, res: any) => {
  res.send('ok');
});

export const getApp = (isDev: boolean): Server | Express => {
  if (isDev) {
    return createServer(options, server);
  }
  return server;
};
