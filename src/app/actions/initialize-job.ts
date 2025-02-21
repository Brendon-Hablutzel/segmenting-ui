'use server';

import { startJob } from '@/utils/backend';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthCookie } from '../lib/types';

// TODO: make more specific
export type FormState =
  | {
      // TODO: what
      error?: string;
      message?: string;
    }
  | undefined;

const initializeJob = async (state: FormState, formData: FormData) => {
  const name = formData.get('name');
  const module_ = formData.get('module');
  const image = formData.get('image');

  if (!name) {
    return {
      error: 'missing name',
    };
  }

  if (!module_) {
    return {
      error: 'missing module',
    };
  }

  if (!image) {
    return {
      error: 'missing image',
    };
  }

  // TODO: error handling

  // TODO: how to do this safely?
  const assumedImage = image as File;

  const blob = new Blob([image], { type: assumedImage.type });

  // TODO: move this into util
  const cookieStore = await cookies();
  const authCookie = AuthCookie.parse(
    JSON.parse(cookieStore.get('segmenting-auth')?.value ?? ''),
  );

  // TODO: how to safe cast
  const res = await startJob(authCookie.idToken, module_ as string, blob);
  console.log(res);

  redirect('/jobs');
};

export default initializeJob;
