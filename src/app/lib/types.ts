import { AuthenticationResultType } from '@aws-sdk/client-cognito-identity-provider';
import { z } from 'zod';

export const AuthData = z.object({
  idToken: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthDataType = z.infer<typeof AuthData>;

export const authenticationResultTypeToAuthData = (
  authResult: AuthenticationResultType,
): AuthDataType => {
  return AuthData.parse({
    idToken: authResult.IdToken,
    accessToken: authResult.AccessToken,
    refreshToken: authResult.RefreshToken,
  });
};
