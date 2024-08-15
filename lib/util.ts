export const isDevelopment = process.env.NODE_ENV === 'development';

export const swapApiUrl = isDevelopment
  ? 'http://localhost:3000/api'
  : 'https://swappage.vercel.app/api';
