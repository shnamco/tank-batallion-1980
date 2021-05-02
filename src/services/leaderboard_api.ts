import { HTTPClient } from '@utils/http_client';
import { environment } from '../environment/environment';
import { JSONMapper } from '@utils/json_mapper';
import { ResponseProxy } from '../interfaces/api';

class Api {
  constructor(private baseUrl: string, private httpClient: HTTPClient) {}

  public leaderboardList = (data: LeaderboardRequest): Promise<ResponseProxy<unknown[]>> => {
    const response = this.httpClient.post(`${this.baseUrl}/leaderboard/all`, {
      data,
      headers: { 'Content-Type': 'application/json' }
    });

    return JSONMapper<unknown[]>(response);
  };
}

export const leaderboardApi = new Api(environment.praktikum, new HTTPClient());

export interface LeaderboardRequest {
  ratingFieldName: string;
  cursor: number;
  limit: number;
}
