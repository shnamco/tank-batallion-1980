export type loginReq = {
  login: string;
  password: string;
};

export type reason = {
  reason: string;
};

export type response = {
  status: number;
  response: string | reason;
};

export type signUpReq = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type profile = {
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

  login = async (data: loginReq): Promise<response> => {
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

  signUp = async (data: signUpReq): Promise<response> => {
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

  getProfile = async (): Promise<response> => {
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

const authApi = new Api('https://ya-praktikum.tech/api/v2');

export { authApi };
