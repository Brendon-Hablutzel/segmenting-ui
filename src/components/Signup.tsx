import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { confirmEmail, logIn, signUp, validatePassword } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import BackButton from './BackButton';

class PasswordMismatchError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

type ConfirmationCode = [string, string, string, string, string, string];

const Signup = () => {
  const [view, setView] = useState<'signup' | 'confirm'>('signup');

  // FOR SIGNUP:

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValidationResult, setPasswordValidationResult] = useState(
    validatePassword(password),
  );

  const navigate = useNavigate();

  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    if (auth !== null) {
      navigate('/jobs');
    }
  }, [auth, navigate]);

  useEffect(() => {
    setPasswordValidationResult(validatePassword(password));
  }, [password]);

  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // only display a loading icon if loading takes a long time
    const startSignupLoading = setTimeout(() => {
      setSignupLoading(true);
    }, 750);
    try {
      await signUp(email, password);
      clearTimeout(startSignupLoading);
      setSignupLoading(false);
      setView('confirm');
    } catch (e) {
      clearTimeout(startSignupLoading);
      setSignupLoading(false);
      console.error(e);
      if (e instanceof PasswordMismatchError) {
        setSignupError('Passwords do not match');
      } else {
        setSignupError('Sign up failed');
      }
    }
  };

  // FOR CONFIRMATION:

  const [confirmationCode, setConfirmationCode] = useState<ConfirmationCode>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [confirmationLoading, setConfirmationLoading] = useState(false);
  const [confirmationError, setConfirmationError] = useState<string | null>(
    null,
  );

  const [autoLoginLoading, setAutoLoginLoading] = useState(false);
  const [autoLoginError, setAutoLoginError] = useState<string | null>(null);

  const handleConfirmSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // only display a loading icon if loading takes a long time
    const startConfirmationLoading = setTimeout(() => {
      setConfirmationLoading(true);
    }, 750);
    try {
      await confirmEmail(email, confirmationCode.join(''));
      clearTimeout(startConfirmationLoading);
      setConfirmationLoading(false);
    } catch (e) {
      clearTimeout(startConfirmationLoading);
      setConfirmationLoading(false);
      console.error('Confirmation failed', e);
      // TODO: custom errors
      setConfirmationError('Confirmation failed');

      // don't try to auto login if confirmation fails
      return;
    }

    const startAutoLoginLoading = setTimeout(() => {
      setAutoLoginLoading(true);
    }, 750);
    try {
      const authenticationResult = await logIn(email, password);
      clearTimeout(startAutoLoginLoading);
      setAutoLoginLoading(false);
      if (!authenticationResult) {
        throw new Error('failed to log in -- no result from cognito login');
      }

      setAuth(authenticationResult);
    } catch (e) {
      console.error('Auto login failed', e);
      // TODO: custom errors
      setAutoLoginError('Auto login failed, redirecting to login page...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      clearTimeout(startAutoLoginLoading);
      setAutoLoginLoading(false);
      navigate('/login');
    }
  };

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleConfirmChange = (index: number, value: string) => {
    console.log(index, value);
    if (!/^[0-9]?$/.test(value)) return;
    const newCode: ConfirmationCode = [...confirmationCode];
    newCode[index] = value;
    setConfirmationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirmKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !confirmationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirmPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const parsed = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (parsed.length > 0) {
      setConfirmationCode([
        ...parsed.split(''),
        ...Array(6 - parsed.length).fill(''),
      ] as ConfirmationCode);
      inputRefs.current[parsed.length - 1]?.focus();
    }
  };

  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-4">
      <BackButton to="/" />
      <div className="flex justify-center">
        {view === 'signup' ? (
          <div className="bg-bg-card w-fit py-6 px-10 rounded-xl border-[1px] border-[#EAFFE5]/10">
            <div className="flex flex-col justify-center gap-4 p-2">
              <div className="flex items-center justify-center">
                <h1 className="text-text-primary text-5xl text-center">
                  Sign Up
                </h1>
              </div>
              <div className="flex items-center justify-center py-5">
                <h1 className="text-text-primary text-xl text-center">
                  Create an account to get started
                </h1>
              </div>
            </div>
            <form>
              <div className="flex justify-center p-2">
                <div className="flex flex-col gap-5">
                  <TextInput
                    state={email}
                    setState={setEmail}
                    placeholder="Email"
                    onChange={() => setSignupError(null)}
                    autoComplete="username"
                  />
                  <TextInput
                    state={password}
                    setState={setPassword}
                    placeholder="Password"
                    isPasswordInput={true}
                    onChange={() => setSignupError(null)}
                    autoComplete="new-password"
                  />
                  <TextInput
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    placeholder="Confirm Password"
                    isPasswordInput={true}
                    onChange={() => setSignupError(null)}
                    autoComplete=""
                  />

                  <div className="text-text-primary">
                    <div
                      className={`${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {password === confirmPassword
                        ? '✓ passwords match'
                        : '𐄂 passwords must match'}
                    </div>
                    <div
                      className={`${passwordValidationResult.containsUppercase ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {passwordValidationResult.containsUppercase
                        ? '✓ contains an uppercase letter'
                        : '𐄂 must contain an uppercase letter'}
                    </div>
                    <div
                      className={`${passwordValidationResult.containsNumeric ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {passwordValidationResult.containsNumeric
                        ? '✓ contains a number'
                        : '𐄂 must contain a number'}
                    </div>
                    <div
                      className={`${passwordValidationResult.containsSymbol ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {passwordValidationResult.containsSymbol
                        ? '✓ contains a special character'
                        : '𐄂 must contain a special character'}
                    </div>
                    <div
                      className={`${passwordValidationResult.validLength ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {passwordValidationResult.validLength
                        ? '✓ password is between 8 and 256 characters long'
                        : '𐄂 password must be between 8 and 256 characters long'}
                    </div>
                  </div>

                  <Button
                    kind="primary"
                    text="Submit"
                    type="submit"
                    onClick={handleSignupSubmit}
                    isLoading={signupLoading}
                    disabled={
                      email.length === 0 ||
                      password.length === 0 ||
                      confirmPassword.length === 0 ||
                      password !== confirmPassword ||
                      Object.values(passwordValidationResult).filter((a) => !a)
                        .length > 0
                    }
                  />
                  {signupError ? (
                    <div className="text-red-600 text-center">
                      {signupError}
                    </div>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-bg-card w-fit py-6 px-10 rounded-xl border-[1px] border-[#EAFFE5]/10">
            <div className="flex flex-col justify-center gap-4 p-2">
              <div className="flex items-center justify-center">
                <h1 className="text-text-primary text-5xl text-center">
                  Confirm
                </h1>
              </div>
              <div className="flex items-center justify-center py-5">
                <h1 className="text-text-primary text-xl text-center">
                  Finish setting up your account by entering the code sent to
                  your email below
                </h1>
              </div>
            </div>
            <div className="flex justify-center p-2">
              <form>
                <div className="flex flex-col gap-5">
                  <div
                    className="flex justify-center gap-3"
                    onPaste={handleConfirmPaste}
                  >
                    {confirmationCode.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleConfirmChange(index, e.target.value)
                        }
                        onKeyDown={async (e) => handleConfirmKeyDown(index, e)}
                        className="rounded-2xl border-text-primary/50 focus:border-text-primary border-[1px] h-[4rem] w-[4rem] text-center text-2xl text-text-primary focus:outline-none focus:ring-0"
                      />
                    ))}
                  </div>

                  <Button
                    kind="primary"
                    text="Submit"
                    onClick={handleConfirmSubmit}
                    isLoading={confirmationLoading || autoLoginLoading}
                    disabled={confirmationCode.filter((d) => !d).length > 0}
                  />
                  {confirmationError ? (
                    <div className="text-red-600 text-center">
                      {confirmationError}
                    </div>
                  ) : null}
                  {autoLoginError ? (
                    <div className="text-red-600 text-center">
                      {autoLoginError}
                    </div>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
