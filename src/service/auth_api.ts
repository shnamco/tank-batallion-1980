import { environment } from '../environment/environment';

export type LoginReq = {
  login: string;
  password: string;
};

export type Reason = {
  reason: string;
};

export type Resp = {
  status: number;
  response: string | Reason;
};

export type SignUpReq = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type Profile = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  email: string;
  phone: string;
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

    const response = await res.json();

    return {
      status: res.status,
      response
    };
  };

  getProfile = async (): Promise<Resp> => {
    const options = {
      method: 'GET',
      credentials: 'include' as RequestCredentials
    };

    const res = await fetch(`${this.baseUrl}/auth/user`, options);
    const response = await res.json();

    return {
      status: res.status,
      response
    };
  };

  logout = (): Promise<Response> => {
    const options = {
      method: 'POST',
      credentials: 'include' as RequestCredentials
    };

    return fetch(`${this.baseUrl}/auth/logout`, options);
  };
}

const authApi = new Api(environment.praktikum);

export { authApi };
