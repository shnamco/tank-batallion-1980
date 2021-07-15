import path from 'path';
import express from 'express';
import compression from 'compression';
import 'babel-polyfill';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/auth';
import { renderMiddleware } from './middlewares/render';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(authMiddleware);
app.get('/*', renderMiddleware);

export { app };
