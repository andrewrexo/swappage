import type { ToastOptions } from 'react-hot-toast';

export const isDevelopment = process.env.NODE_ENV === 'development';

export const swapApiUrl = isDevelopment
  ? 'http://localhost:3000/api'
  : 'https://swappage.vercel.app/api';

export const toastConfig: ToastOptions = {
  duration: 2500,
  position: 'bottom-right',
  style: {
    width: 'fit-content',
    color: 'var(--accent-a11)',
    boxShadow: 'inset 0 0 0 1px var(--accent-a7)',
    backgroundColor: 'var(--accent-surface)',
  },
  iconTheme: {
    primary: 'var(--accent-a11)',
    secondary: 'var(--accent-surface)',
  },
};
