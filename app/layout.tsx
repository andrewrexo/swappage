import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import { twMerge } from 'tailwind-merge';
import Web3Provider from '@/lib/context';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          appearance="dark"
          accentColor="jade"
          grayColor="sage"
          radius="large"
          scaling="105%"
        >
          <Web3Provider>
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
          </Web3Provider>
        </Theme>
        <SpeedInsights />
      </body>
    </html>
  );
}
