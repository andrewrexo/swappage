import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import { twMerge } from 'tailwind-merge';
import Web3Provider from '@/lib/context';
import { SpeedInsights } from '@vercel/speed-insights/next';

import '@radix-ui/themes/tokens/base.css';
import '@radix-ui/themes/tokens/colors/jade.css';
import '@radix-ui/themes/tokens/colors/sage.css';
import '@radix-ui/themes/tokens/colors/blue.css';
import '@radix-ui/themes/tokens/colors/cyan.css';
import '@radix-ui/themes/tokens/colors/teal.css';
import '@radix-ui/themes/tokens/colors/iris.css';
import '@radix-ui/themes/tokens/colors/violet.css';
import '@radix-ui/themes/components.css';
import '@radix-ui/themes/utilities.css';

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
    <html lang="en" suppressHydrationWarning={true}>
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
