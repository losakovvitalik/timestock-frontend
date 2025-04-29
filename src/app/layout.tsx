import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers/theme-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['cyrillic'],
});

export const metadata: Metadata = {
  title: 'Timestock',
  description: 'Приложения для трекинга времени',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={'h-dvh max-h-dvh overflow-hidden'} lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} $pb-safe-area !h-dvh antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
