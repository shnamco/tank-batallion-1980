import { loginReq, signUpReq } from '../dataTypes';

export class Api {
  constructor(public baseUrl: string) {}

  login = (data: loginReq): Promise<string & { reason: string }> => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
      headers: {
        'content-type': 'application/json'
      }
    };

    return fetch(`${this.baseUrl}/auth/signin`, options).then((res) => {
      if (!res.ok) {
        return res.json();
      }

      return res.text();
    });
  };

  signUp = (data: signUpReq): Promise<Response> => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
      headers: {
        'content-type': 'application/json'
      }
    };

    return fetch(`${this.baseUrl}/auth/signup`, options).then((res) => {
      return res.json();
    });
  };

  getProfile = (): Promise<Response> => {
    return fetch(`${this.baseUrl}/auth/user`).then((res) => {
      return res.json();
    });
  };
}

const yandxApi = new Api('https://ya-praktikum.tech/api/v2');

export { yandxApi };
