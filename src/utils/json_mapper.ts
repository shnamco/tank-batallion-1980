import { ResponseProxy } from '../interfaces/api';

export const JSONMapper = async <T>(data: Promise<Response>): Promise<ResponseProxy<T>> => {
  const res = await data;

  try {
    const response = await res.json();

    return {
      status: res.status,
      response
    };
  } catch (err) {
    throw new Error(err);
  }
};
