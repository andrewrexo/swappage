export const authenticationHeaders = {
  'Content-Type': 'application/json',
  'App-Name': `test-app`,
  'App-Version': `1.0.0`,
};

export const exodusApiUrl = {
  staging: 'https://exchange-s.exodus.io',
  production: 'https://exchange.exodus.io',
} as const;
