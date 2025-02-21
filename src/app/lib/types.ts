import { z } from 'zod';

export const SignupApiRequestBody = z.object({
  email: z.string(),
  password: z.string(),
});

export const ConfirmApiRequestBody = z.object({
  email: z.string(),
  password: z.string(),
  code: z.string(),
});

export const AuthCookie = z.object({
  idToken: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthCookieType = z.infer<typeof AuthCookie>;
