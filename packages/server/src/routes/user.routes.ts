import * as UserController from '../controllers/user.controller';
import { Router } from 'express';

export const user = Router();

user.get('', async (req, res, next) => {
  try {
    res.json(await UserController.findAll());
  } catch (e) {
    next(e);
  }
});
