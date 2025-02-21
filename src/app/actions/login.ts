'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logIn } from '@/utils/auth';
import { AuthCookie } from '../lib/types';

// TODO: make more specific
export type FormState =
  | {
      errors?: string[];
    }
  | undefined;

const login = async (state: FormState, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = [];

  if (!email || typeof email !== 'string') {
    errors.push('Missing email');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Missing password');
  }

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  try {
    // CAREFUL: unchecked cast
    const loginResult = await logIn(
      (email as string).toString(),
      (password as string).toString(),
    );

    const authCookie = AuthCookie.parse({
      idToken: loginResult?.IdToken,
      accessToken: loginResult?.AccessToken,
      refreshToken: loginResult?.RefreshToken,
    });

    const cookieStore = await cookies();

    cookieStore.set('segmenting-auth', JSON.stringify(authCookie), {
      httpOnly: true,
      secure: true,
      maxAge: 7200,
      sameSite: 'none',
      path: '/',
    });
  } catch (e) {
    console.error(e);
    // TODO: find and handle specific errors
    return {
      errors: ['Error logging in'],
    };
  }

  redirect('/jobs');
};

export default login;
