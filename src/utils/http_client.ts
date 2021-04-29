import { HTTPClientOptions, METHOD, RequestOptions } from '../interfaces/http';
import { queryStringify } from '@utils/query_stringify';

export class HTTPClient {
  public get = (url: string, options: HTTPClientOptions): Promise<Response> => {
    const data = queryStringify(options.data);
    const newUrl = `${url}${data}`;

    return this.request(newUrl, { ...options, method: METHOD.GET });
  };

  public put = (url: string, options: HTTPClientOptions): Promise<Response> => {
    return this.request(url, { ...options, method: METHOD.PUT });
  };

  public post = (url: string, options: HTTPClientOptions): Promise<Response> => {
    return this.request(url, { ...options, method: METHOD.POST });
  };

  public delete = (url: string, options: HTTPClientOptions): Promise<Response> => {
    return this.request(url, { ...options, method: METHOD.DELETE });
  };

  private request = (url: string, options: RequestOptions): Promise<Response> => {
    const { method, data, headers } = options;

    if (method === METHOD.GET || !data) {
      return fetch(url, { method, headers, credentials: 'include' });
    }
    return fetch(url, { method, headers, body: data, credentials: 'include' });
  };
}
