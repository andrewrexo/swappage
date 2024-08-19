import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import { twMerge } from 'tailwind-merge';
import Web3ModalProvider from '@/lib/context';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/lib/config';

import '@radix-ui/themes/styles.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swappage - Home',
  description: `Swappage securely connects you to the best swap providers across crypto. We offer frictionless swaps across multiple chains and aggregate the best rates for you..`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          appearance="dark"
          accentColor="mint"
          grayColor="mauve"
          radius="large"
          scaling="95%"
        >
          <Web3ModalProvider>
            <StoreProvider>
              <main
                className={twMerge(
                  'flex min-h-screen flex-col items-center justify-between',
                  `sm:p-8`,
                  `p-4`,
                )}
              >
                {children}
              </main>
            </StoreProvider>
          </Web3ModalProvider>
        </Theme>
      </body>
    </html>
  );
}
