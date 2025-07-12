import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { TanstackProvider } from './providers/tanstack-provider';
import { ThemeProvider } from './providers/theme-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: {
    template: '%s - Timestock',
    default: 'Timestock',
  },
  description: 'Приложения для трекинга времени',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={'h-dvh max-h-dvh rounded'} lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} pb-safe-area !h-dvh antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <TanstackProvider>
              {children}
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: 'var(--secondary)',
                    color: 'var(--secondary-foreground)',
                    borderColor: 'var(--border)',
                    borderWidth: '1px',
                    borderRadius: 'var(--radius)',
                  },
                }}
              />
            </TanstackProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
