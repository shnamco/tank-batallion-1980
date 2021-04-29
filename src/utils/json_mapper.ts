import { ResponseProxy } from '../interfaces/api';

// eslint-disable-next-line
export const JSONMapper = async (data: Promise<Response>): Promise<ResponseProxy<any>> => {
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
