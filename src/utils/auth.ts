import {
  AuthenticationResultType,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandInput,
  GlobalSignOutCommand,
  GlobalSignOutCommandInput,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand,
  SignUpCommandInput,
} from '@aws-sdk/client-cognito-identity-provider';

const POOL_CLIENT_ID = 'j8ft0t21ksk2c0ts7gp71p7ou';

const client = new CognitoIdentityProviderClient({
  region: 'us-east-1',
});

export const logIn = async (
  email: string,
  password: string,
): Promise<AuthenticationResultType | undefined> => {
  const input: InitiateAuthCommandInput = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: POOL_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  return (await client.send(new InitiateAuthCommand(input)))
    ?.AuthenticationResult;
};

export const signUp = async (email: string, password: string) => {
  const input: SignUpCommandInput = {
    ClientId: POOL_CLIENT_ID,
    Username: email,
    Password: password,
  };

  return await client.send(new SignUpCommand(input));
};

export const confirmEmail = async (email: string, code: string) => {
  const input: ConfirmSignUpCommandInput = {
    ClientId: POOL_CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  };

  return await client.send(new ConfirmSignUpCommand(input));
};

export const logOut = async (accessToken: string) => {
  const input: GlobalSignOutCommandInput = {
    AccessToken: accessToken,
  };

  return await client.send(new GlobalSignOutCommand(input));
};

// TODO: implement all these checks client side:
// https://stackoverflow.com/questions/58767980/aws-cognito-password-regex-specific-to-aws-cognito
export type PasswordValidationResult = {
  containsUppercase: boolean;
  containsNumeric: boolean;
  containsSymbol: boolean;
  validLength: boolean;
};

export const validatePassword = (
  password: string,
): PasswordValidationResult => {
  const containsUppercase = /[A-Z]/.test(password);
  const containsNumeric = /\d/.test(password);
  const containsSymbol = /[\^$*.[\]{}()?"!@#%&/\\,><':;|_~`=+-]/.test(password);
  const validLength = password.length >= 8 && password.length <= 256;

  return {
    containsUppercase,
    containsNumeric,
    containsSymbol,
    validLength,
  };
};
