import { environment } from '../environment/environment';
import { HTTPClient } from '@utils/http_client';
import { ResponseProxy } from '../interfaces/api';
import { JSONMapper } from '@utils/json_mapper';

export type Error = {
  error: string;
  reason: string;
};

class Api {
  constructor(private baseUrl: string, private httpClient: HTTPClient) {}

  public themes = async (): Promise<ResponseProxy<unknown | Error>> => {
    const response = this.httpClient.get(`${this.baseUrl}/theme`, {
      data: {},
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper<unknown | Error>(response);
  };

  public userTheme = async (): Promise<ResponseProxy<{ id: number }>> => {
    const response = this.httpClient.get(`${this.baseUrl}/theme/user`, {
      data: {},
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper<{ id: number }>(response);
  };

  public changeTheme = async (id: number): Promise<ResponseProxy<{ id: number }>> => {
    const response = this.httpClient.put(`${this.baseUrl}/theme/user`, {
      data: { themeId: id },
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper<{ id: number }>(response);
  };
}

export const themeApi = new Api(environment.tankUri, new HTTPClient());
