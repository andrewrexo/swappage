export const cmcApiUrl = {
  staging: 'https://sandbox-api.coinmarketcap.com',
  production: 'https://pro-api.coinmarketcap.com',
};

export const cmcApiKey = {
  staging: 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
  production: process.env.COINMARKETCAP_API_KEY ?? '',
};
