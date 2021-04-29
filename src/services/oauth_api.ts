import { ResponseProxy } from '../interfaces/api';
import { environment } from '../environment/environment';
import { HTTPClient } from '@utils/http_client';
import { JSONMapper } from '@utils/json_mapper';

export interface SignInWithData {
  code: string;
  redirect_uri: string;
}

class OauthApi {
  constructor(private baseUrl: string, private httpClient: HTTPClient) {}

  public signIn = async (data: SignInWithData): Promise<ResponseProxy<unknown>> => {
    const response = this.httpClient.post(`${this.baseUrl}/oauth/yandex`, {
      data,
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper(response);
  };

  public serviceId = async (url: string): Promise<ResponseProxy<{ service_id: string }>> => {
    const response = this.httpClient.get(`${this.baseUrl}/oauth/yandex/service-id`, {
      data: { redirect_uri: url },
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper(response);
  };
}

export const oauthApi = new OauthApi(environment.praktikum, new HTTPClient());
