import { Toaster } from '@/shared/ui/sonner';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next';
import { Toaster as HotToaster } from 'react-hot-toast';
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
  /**
   * ! из-за того что в auth используется cookie
   * ! все страницы станут динамическими, что не критично на текущем этапе
   * ! но в будущем может быть вопрос почему все страницы dynamic
   */
  // const session = await auth();

  return (
    <html className="h-dvh max-h-dvh rounded" lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} !h-dvh antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeHandler>
            <NuqsAdapter>
              <TanstackProvider>
                {children}

                <Toaster position="bottom-right" />
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
            </NuqsAdapter>
          </ThemeHandler>
        </ThemeProvider>
      </body>
    </html>
  );
}
