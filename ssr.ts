import express, { Request, Response } from 'express';
import 'babel-polyfill';
import path from 'path';
import serverRenderMiddleware from './src/server-render-middleware';

const app = express();
const PORT = 4000;

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', serverRenderMiddleware);

app.listen(PORT, () => {
  console.log(`App on http://localhost:${PORT}`);
});

export { app };
