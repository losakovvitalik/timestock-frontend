import { AppSidebar } from '@/shared/ui/app-sidebar';
import Header from '@/shared/ui/layout/header';
import { Tabbar } from '@/shared/ui/layout/tabbar';
import { SidebarProvider } from '@/shared/ui/sidebar';

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="pb-safe-area grid h-svh max-h-svh w-full grid-rows-[auto_1fr_auto] overflow-hidden lg:flex">
          <Header />
          <main className="h-full w-full overflow-auto px-2 pt-2 lg:px-10 lg:py-4">{children}</main>
          <Tabbar />
        </div>
      </SidebarProvider>
    </div>
  );
}
