import { Router } from 'express';
import { ThemeAPI } from '../controllers/theme.controller';

export const themesRoutes = (router: Router): void => {
  const themesRouter: Router = Router();

  themesRouter.post('/', ThemeAPI.create).get('/', ThemeAPI.find);

  router.use('/theme', themesRouter);
};
