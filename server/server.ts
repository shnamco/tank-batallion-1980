import express, { Express } from 'express';
import { createServer, Server } from 'https';
import cookieParser from 'cookie-parser';
import { readFileSync } from 'fs';
import { authMiddleware } from './middlewares/auth';

const server: Express = express();

const options = {
  key: readFileSync(__dirname + '/certificates/local.ya-praktikum.tech-key.pem'),
  cert: readFileSync(__dirname + '/certificates/local.ya-praktikum.tech.pem')
};

server.use(cookieParser());

server.get('/*', authMiddleware);

server.get('/*', (req, res) => {
  res.send('ok');
});

export const getApp = (isDev: boolean): Server | Express => {
  if (isDev) {
    return createServer(options, server);
  }
  return server;
};
