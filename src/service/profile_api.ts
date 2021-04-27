import { environment } from '../environment/environment';
import { ResponseProxy } from '@utils/api';

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
  constructor(public baseUrl: string) {}

  changeProfile = async (data: RequestData): Promise<ResponseProxy<Profile | Error>> => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      credentials: 'include' as RequestCredentials,
      headers: {
        'content-type': 'application/json'
      }
    };

    const res = await fetch(`${this.baseUrl}/user/profile`, options);

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

const profileApi = new Api(environment.praktikum);

export { profileApi };
