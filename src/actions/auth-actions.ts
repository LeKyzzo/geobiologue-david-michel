'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, PRODUCT_COOKIE } from '@/lib/auth';

export interface AuthFormState {
  error?: string;
}

const productCode = process.env.PRODUCT_ACCESS_CODE ?? 'harmonie38';
const adminCode = process.env.ADMIN_ACCESS_CODE ?? 'david-admin38';

const cookieBase = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 8,
};

export async function verifyProductCode(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const code = formData.get('code')?.toString().trim();

  if (!code) {
    return { error: 'Merci de renseigner le code transmis par David.' };
  }

  if (code !== productCode) {
    return { error: 'Code incorrect. Veuillez réessayer.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(PRODUCT_COOKIE, 'granted', cookieBase);
  redirect('/produits');
  return {};
}

export async function verifyAdminCode(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const code = formData.get('code')?.toString().trim();

  if (!code) {
    return { error: 'Merci de renseigner votre code administrateur.' };
  }

  if (code !== adminCode) {
    return { error: 'Code incorrect ou expiré.' };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, 'granted', cookieBase);
  redirect('/admin');
  return {};
}
