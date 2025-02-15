import { useEffect, useState } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { logIn } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { UserNotFoundException } from '@aws-sdk/client-cognito-identity-provider';
import BackButton from './BackButton';

const Login = () => {
  // TODO: allow user to confirm email if they get a UserNotConfirmedException on trying to log in

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    if (auth !== null) {
      navigate('/jobs');
    }
  }, [auth, navigate]);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // only display a loading icon if loading takes a long time
    const startLoginLoading = setTimeout(() => {
      setLoginLoading(true);
    }, 750);

    try {
      const authenticationResult = await logIn(email, password);
      clearTimeout(startLoginLoading);
      setLoginLoading(false);
      if (authenticationResult) {
        // navigate('/jobs');
        setAuth(authenticationResult);
      } else {
        // TODO: display failed login state
        throw new Error('failed to login -- no response from cognito login');
      }
    } catch (e) {
      clearTimeout(startLoginLoading);
      setLoginLoading(false);
      console.error(e);
      if (e instanceof UserNotFoundException) {
        setLoginError('Email or password is incorrect');
      } else {
        setLoginError('Login failed');
      }
    }
  };

  return (
    <div className="h-[100vh] max-w-[100vw] bg-bg-dark p-4">
      <BackButton to="/" />
      <div className="flex justify-center">
        <div className="bg-bg-card w-fit py-6 px-10 rounded-xl border-[1px] border-[#EAFFE5]/10">
          <div className="flex flex-col justify-center gap-4 p-2">
            <div className="flex items-center justify-center">
              <h1 className="text-text-primary text-5xl text-center">Log In</h1>
            </div>
            <div className="flex items-center justify-center py-5">
              <h1 className="text-text-primary text-xl text-center">
                Welcome back!
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
                  onChange={() => setLoginError(null)}
                  autoComplete="username"
                />
                <TextInput
                  state={password}
                  setState={setPassword}
                  placeholder="Password"
                  isPasswordInput={true}
                  onChange={() => setLoginError(null)}
                  autoComplete="current-password"
                />

                <Button
                  kind="primary"
                  text="Submit"
                  type="submit"
                  onClick={handleSubmit}
                  isLoading={loginLoading}
                  disabled={email.length === 0 || password.length === 0}
                />
                {loginError ? (
                  <div className="text-red-600 text-center">{loginError}</div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
