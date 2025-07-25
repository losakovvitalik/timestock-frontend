import { Toaster } from '@/shared/ui/sonner';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { Toaster as HotToaster } from 'react-hot-toast';
import { ActiveTimeEntryTitle } from './(authorized)/active-time-entry-title';
import './globals.css';
import { TanstackProvider } from './providers/tanstack-provider';
import ThemeHandler from './providers/theme-handler';
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
      <body className={`${inter.variable} !h-dvh antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeHandler>
            <SessionProvider>
              <TanstackProvider>
                {children}
                <ActiveTimeEntryTitle />

                <Toaster position="top-center" />
                <HotToaster
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
          </ThemeHandler>
        </ThemeProvider>
      </body>
    </html>
  );
}
