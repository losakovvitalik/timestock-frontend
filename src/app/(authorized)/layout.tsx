import { Tabbar } from '@/shared/ui/layout/tabbar';

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-full w-full grid-rows-[auto_1fr_auto] overflow-hidden">
      <div></div>
      <main className="w-full overflow-auto p-2 lg:px-10 lg:py-4">{children}</main>
      <Tabbar />
    </div>
  );
}
