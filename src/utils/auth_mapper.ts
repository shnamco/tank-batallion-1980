import { ResponseProxy } from '../interfaces/api';

export const AuthMapper = async <T>(data: Promise<Response>): Promise<ResponseProxy<T>> => {
  const res = await data;

  try {
    const response = res.status === 200 ? await res.text() : await res.json();

    return {
      status: res.status,
      response
    };
  } catch (err) {
    throw new Error(err);
  }
};
