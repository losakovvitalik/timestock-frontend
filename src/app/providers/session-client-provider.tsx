// app/client-providers.tsx
'use client';

import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export default function SessionClientProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      {children}
    </SessionProvider>
  );
}
