export const authenticationHeaders = {
  'Content-Type': 'application/json',
  'App-Name': `test-app`,
  'App-Version': `1.0.0`,
};

export const exodusApiUrl = {
  staging: 'https://exchange-s.exodus.io/v3/',
  production: 'https://exchange.exodus.io/v3/',
} as const;
