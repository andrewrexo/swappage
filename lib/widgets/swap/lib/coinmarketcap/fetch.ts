import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { cmcApiKey, cmcApiUrl } from './config';
import { isDevelopment } from '@/lib/util';

type ValidRequestMethod = 'GET' | 'POST';

export const authenticatedCMCRequest = (
  endpoint: string,
  method: ValidRequestMethod = 'GET',
  options?: {
    body?: Record<string, any>;
    ip?: string;
    extraHeaders?: Record<string, string>;
  },
) => {
  const { body, extraHeaders } = options || {};
  const env = isDevelopment ? 'staging' : 'production';

  // TODO: use next env variable to switch between staging and production
  const url = new URL(`${cmcApiUrl[env]}/${endpoint}`);
  const headers = new Headers({
    'X-CMC_PRO_API_KEY': cmcApiKey[env],
  });

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
