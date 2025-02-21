'use server';

import { confirmEmail, logIn } from '@/utils/auth';
import { redirect } from 'next/navigation';
import { AuthCookie } from '../lib/types';
import { cookies } from 'next/headers';

// TODO: make more specific
export type ConfirmFormState = {
  errors?: string[];
  email: string;
  password: string;
};

const confirm = async (
  state: ConfirmFormState,
  formData: FormData,
): Promise<ConfirmFormState> => {
  const errors = [];

  let code = '';
  for (let i = 0; i < 6; i++) {
    const codeDigit = formData.get(`code-${i}`);
    if (!codeDigit) {
      errors.push(`Missing code digit ${i + 1}`);
    }
    code += codeDigit;
  }

  if (errors.length > 0) {
    return {
      ...state,
      errors,
    };
  }

  try {
    await confirmEmail(state.email, code);

    const loginResult = await logIn(state.email, state.password);

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
    // TODO: handle specific errors
    return {
      ...state,
      errors: ['Error confirming email'],
    };
  }

  redirect('/jobs');
};

export default confirm;
