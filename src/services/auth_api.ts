import { environment } from '../environment/environment';
import { Profile } from './profile_api';
import { ResponseProxy } from '../interfaces/api';
import { HTTPClient } from '@utils/http_client';
import { JSONMapper } from '@utils/json_mapper';
import { AuthMapper } from '@utils/auth_mapper';

export type SignUpReq = Omit<Profile, 'id' | 'display_name' | 'avatar'>;

export type LoginReq = {
  login: string;
  password: string;
};

export type Reason = {
  reason: string;
};

class Api {
  constructor(public baseUrl: string, private httpClient: HTTPClient) {}

  public login = (data: LoginReq): Promise<ResponseProxy<string | Reason>> => {
    const response = this.httpClient.post(`${this.baseUrl}/auth/signin`, {
      data,
      headers: { 'Content-Type': 'application/json' }
    });

    return AuthMapper<string | Reason>(response);
  };

  public signUp = async (data: SignUpReq): Promise<ResponseProxy<string | Reason>> => {
    const response = this.httpClient.post(`${this.baseUrl}/auth/signup`, {
      data,
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper<string | Reason>(response);
  };

  public getProfile = async (): Promise<ResponseProxy<Reason | Profile>> => {
    const response = this.httpClient.get(`${this.baseUrl}/auth/user`, {
      data: {},
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper<Reason | Profile>(response);
  };

  public logout = (): Promise<ResponseProxy<unknown>> => {
    const response = this.httpClient.post(`${this.baseUrl}/auth/logout`, {
      data: {},
      headers: { 'Content-Type': 'application/json' }
    });

    return AuthMapper<unknown>(response);
  };
}

export const authApi = new Api(environment.praktikum, new HTTPClient());
