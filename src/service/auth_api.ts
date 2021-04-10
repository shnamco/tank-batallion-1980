import { praktikumApiUrl } from '../environment/praktikumApiUrl';
import { Profile } from './profile_api';

export type SignUpReq = Omit<Profile, 'id' | 'display_name' | 'avatar'>;

export type LoginReq = {
  login: string;
  password: string;
};

export type Reason = {
  reason: string;
};

export type Resp = {
  status: number;
  response: string | Reason | Profile;
};

class Api {
  constructor(public baseUrl: string) {}

  login = async (data: LoginReq): Promise<Resp> => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await fetch(`${this.baseUrl}/auth/signin`, options);

    try {
      if (res.status === 200) {
        const response = await res.text();

        return {
          status: res.status,
          response
        };
      } else {
        const response = await res.json();

        return {
          status: res.status,
          response
        };
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  signUp = async (data: SignUpReq): Promise<Resp> => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await fetch(`${this.baseUrl}/auth/signup`, options);

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

  getProfile = async (): Promise<Resp> => {
    const options = {
      method: 'GET',
      credentials: 'include' as RequestCredentials
    };

    const res = await fetch(`${this.baseUrl}/auth/user`, options);

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

  logout = (): Promise<Response | void> => {
    const options = {
      method: 'POST',
      credentials: 'include' as RequestCredentials
    };

    return fetch(`${this.baseUrl}/auth/logout`, options).catch((err) => {
      throw new Error(err);
    });
  };
}

const authApi = new Api(praktikumApiUrl.praktikum);

export { authApi };
