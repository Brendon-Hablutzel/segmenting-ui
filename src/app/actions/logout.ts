'use server';

import { cookies } from 'next/headers';
import {
  CognitoIdentityProviderClient,
  GlobalSignOutCommand,
  GlobalSignOutCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';
import { redirect } from 'next/navigation';

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

const logout = async () => {
  const emptyAuthCookie = {
    idToken: '',
    accessToken: '',
    refreshToken: '',
  };

  const cookieStore = await cookies();

  const authCookie = cookieStore.get('segmenting-auth');

  const accessToken = JSON.parse(authCookie?.value ?? '')['accessToken'];

  const input: GlobalSignOutCommandInput = {
    AccessToken: accessToken,
  };

  await client.send(new GlobalSignOutCommand(input));

  cookieStore.set('segmenting-auth', JSON.stringify(emptyAuthCookie), {
    httpOnly: true,
    secure: true,
    maxAge: 0,
    sameSite: 'none',
    path: '/',
  });

  redirect('/');
};

export default logout;
