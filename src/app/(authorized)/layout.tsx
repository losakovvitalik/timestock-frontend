import { Confetti } from '@/shared/ui/confetti';
import Header from '@/shared/ui/layout/header';
import { Tabbar } from '@/shared/ui/layout/tabbar';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { AppSidebar } from '@/widgets/app-sidebar/app-sidebar';
import { Viewport } from 'next';
import { ActiveTimeEntryTitle } from './active-time-entry-title';

export const viewport: Viewport = {
  viewportFit: 'cover',
  userScalable: false,
};

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ActiveTimeEntryTitle />
      <Confetti />

      <SidebarProvider>
        <AppSidebar />
        <div className="pb-safe-area grid h-svh max-h-svh w-full grid-rows-[auto_1fr_auto] overflow-hidden">
          <Header />
          <main className="relative h-full w-full overflow-auto px-2 pt-2 lg:px-4 lg:py-4">
            {children}
          </main>
          <Tabbar />
        </div>
      </SidebarProvider>
    </>
  );
}
