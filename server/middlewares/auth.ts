import { Context, Next } from 'koa';
import axios from 'axios';

const PRAKTIKUM_AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth/user';

export const auth = async (ctx: Context, next: Next): Promise<void> => {
  ctx.state.user = null;

  const authData = {
    authCookie: ctx.cookies.get('authCookie'),
    uuid: ctx.cookies.get('uuid')
  };
  const cookies = Object.entries(authData)
    .map(([key, value]) => `${key}=${value}`)
    .join(';');
  try {
    const { data } = await axios.get(PRAKTIKUM_AUTH_ENDPOINT, {
      headers: { Cookie: cookies }
    });
    ctx.state.user = data;

    console.log(data);
  } catch (err) {
    ctx.state.user = null;
  }
  await next();
};
