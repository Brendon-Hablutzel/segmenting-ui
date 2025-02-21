'use server';

import { signUp } from '@/utils/auth';

// TODO: make more specific
export type SignupFormState =
  | {
      errors?: string[];
      submitted?: boolean;
    }
  | undefined;

const signup = async (
  state: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> => {
  const email = formData.get('email');
  const password = formData.get('password');

  const errors = [];

  if (!email) {
    errors.push('Missing email');
  }

  if (!password) {
    errors.push('Missing password');
  }

  if (errors.length > 0) {
    return {
      errors,
    };
  }

  try {
    // CAREFUL: unchecked cast
    await signUp((email as string).toString(), (password as string).toString());
  } catch (e) {
    console.error(e);
    // TODO: find specific errors to catch
    return {
      errors: ['Error signing up'],
    };
  }

  return {
    submitted: true,
  };
};

export default signup;
