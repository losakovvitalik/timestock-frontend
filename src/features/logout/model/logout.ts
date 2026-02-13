'use server';

import { paths } from '@/shared/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('strapi_up_refresh');
  redirect(paths.auth.link);
}
