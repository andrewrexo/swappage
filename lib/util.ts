import type { ToastOptions } from 'react-hot-toast';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const swapApiUrl = isDevelopment
  ? 'http://localhost:3000/api'
  : 'https://swappage.vercel.app/api';

export const toastConfig: ToastOptions = {
  duration: 2500,
  position: 'bottom-right',
  style: {
    borderRadius: '10px',
    border: '1px solid var(--accent-5)',
    boxShadow: '2px 4px 20px var(--accent-3)',
    color: 'var(--gray-14)',
    background: 'var(--gray-1)',
  },
};
