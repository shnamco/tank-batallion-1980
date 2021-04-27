import path from 'path';
import express from 'express';
import serverRenderMiddleware from './server-render-middleware';

const ssr = express();

ssr.use(express.static(path.resolve(__dirname, '../dist')));

ssr.get('/*', serverRenderMiddleware);

export { ssr };
