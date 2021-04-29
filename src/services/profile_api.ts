import { environment } from '../environment/environment';
import { ResponseProxy } from '../interfaces/api';
import { HTTPClient } from '@utils/http_client';
import { JSONMapper } from '@utils/json_mapper';

export type Profile = {
  id: number | null;
  first_name: string | null;
  second_name: string | null;
  display_name: string | null;
  login: string | null;
  avatar: string | null;
  email: string | null;
  phone: string | null;
};

export type Error = {
  error: string;
  reason: string;
};

export type RequestData = Omit<Profile, 'id' | 'avatar'>;

class Api {
  constructor(private baseUrl: string, private httpClient: HTTPClient) {}

  public changeProfile = async (data: RequestData): Promise<ResponseProxy<Profile | Error>> => {
    const response = this.httpClient.put(`${this.baseUrl}/user/profile`, {
      data,
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper(response);
  };
}

export const profileApi = new Api(environment.praktikum, new HTTPClient());
