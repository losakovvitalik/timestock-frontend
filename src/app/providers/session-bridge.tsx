'use client';
import { authToken } from '@/shared/api/auth-token';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export function AuthBridge() {
  const { data, status } = useSession();
  useEffect(() => {
    if (status !== 'loading') {
      authToken.set(data?.user?.jwt ?? null);
    }
  }, [status, data?.user?.jwt]);
  return null;
}
