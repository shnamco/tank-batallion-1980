import { ResponseProxy } from '@utils/api';
import { environment } from '../environment/environment';

class OauthApi {
  constructor(public baseUrl: string) {}

  signIn = async (data: SignInWithData): Promise<ResponseProxy<unknown>> => {
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await fetch(`${this.baseUrl}/oauth/yandex`, options);

    try {
      const response = await res.text();

      return {
        status: res.status,
        response
      };
    } catch (err) {
      throw new Error(err);
    }
  };

  serviceId = async (url: string): Promise<ResponseProxy<{ service_id: string }>> => {
    const options = {
      method: 'GET',
      credentials: 'include' as RequestCredentials
    };

    const res = await fetch(`${this.baseUrl}/oauth/yandex/service-id?redirect_uri=${url}`, options);

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
}

export const oauthApi = new OauthApi(environment.praktikum);

export interface SignInWithData {
  code: string;
  redirect_uri: string;
}
