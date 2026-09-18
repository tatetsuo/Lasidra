'use server';

import { getSession } from '@/lib/session';
import { cookies } from 'next/headers';

export async function checkSession() {
  const session = await getSession();
  return session;
}

export async function logoutAction() {
  cookies().set('session', '', { maxAge: 0 });
}
