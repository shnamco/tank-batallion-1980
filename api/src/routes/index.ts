import { Router } from 'express';
import theme from './theme.routes';

const routes = Router();

routes.use('/theme', theme);

export default routes;
