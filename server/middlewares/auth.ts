import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  req.app.locals.user = null;

  const authData = {
    authCookie: req.cookies.authCookie,
    uuid: req.cookies.uuid
  };
  const cookies = Object.entries(authData)
    .map(([key, value]) => `${key}=${value}`)
    .join(';');
  try {
    const { data } = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
      headers: { Cookie: cookies }
    });
    req.app.locals.user = data;
  } catch (err) {
    req.app.locals.user = null;
  }
  await next();
};
