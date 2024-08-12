import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { Theme, ThemePanel } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swappage - Home',
  description: `Swappage securely connects you to the best swap providers across crypto. We offer frictionless swaps across multiple chains and aggregate the best rates for you..`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          accentColor="orange"
          grayColor="mauve"
          radius="large"
          scaling="95%"
        >
          {children}
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
