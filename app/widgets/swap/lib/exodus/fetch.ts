import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { exodusApiUrl, authenticationHeaders } from './config';

type ValidRequestMethod = 'GET' | 'POST' | 'PATCH';

export const authenticatedExodusRequest = (
  endpoint: string,
  method: ValidRequestMethod,
  body?: Record<string, any>,
  ip?: string,
  extraHeaders?: Headers,
) => {
  // TODO: use next env variable to switch between staging and production
  const url = new URL(`${exodusApiUrl.staging}/${endpoint}`);
  const headers = new Headers(authenticationHeaders);

  // forwards user IP to Exodus API to return available pairs in their jurisdiction
  if (ip) {
    headers.set('Forwarded', `for=${ip}`);
  }

  if (extraHeaders) {
    Object.entries(extraHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  return new Request(url, requestOptions);
};
