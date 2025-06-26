import Header from '@/shared/ui/layout/header';
import { Tabbar } from '@/shared/ui/layout/tabbar';

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] overflow-hidden">
      <Header />
      <main className="w-full overflow-auto px-2 pt-2 lg:px-10 lg:py-4">{children}</main>
      <Tabbar />
    </div>
  );
}
