export interface HTTPClientOptions {
  headers?: { [name: string]: string };
  // eslint-disable-next-line
  data: any;
}

export interface RequestOptions {
  method: METHOD;
  // eslint-disable-next-line
  data: any;
  headers?: { [name: string]: string };
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
