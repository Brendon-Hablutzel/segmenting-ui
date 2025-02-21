'use client';

import signup from '@/app/actions/signup';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import { validatePassword } from '@/utils/auth';
import { useActionState, useEffect, useState } from 'react';

const AccountCreation = ({
  setView,
  email,
  setEmail,
  password,
  setPassword,
}: {
  setView: (view: 'signup' | 'confirm') => void;
  email: string;
  setEmail: (e: string) => void;
  password: string;
  setPassword: (p: string) => void;
}) => {
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordValidationResult, setPasswordValidationResult] = useState(
    validatePassword(password),
  );

  useEffect(() => {
    setPasswordValidationResult(validatePassword(password));
  }, [password]);

  const [state, action, pending] = useActionState(signup, undefined);

  useEffect(() => {
    if (state?.submitted) {
      setView('confirm');
    }
  }, [state, setView]);

  return (
    <div>
      <h1 className="text-text-light text-center text-5xl">Sign Up</h1>
      <h4 className="text-text-light text-center text-xl py-5">
        Create an account to get started
      </h4>
      <form action={action}>
        <div className="flex flex-col gap-3">
          <TextInput
            type="email"
            autoComplete="email"
            placeholder="Email"
            state={email}
            setState={setEmail}
            name="email"
          />
          <TextInput
            type="password"
            autoComplete="new-password"
            placeholder="Password"
            state={password}
            setState={setPassword}
            name="password"
          />
          <TextInput
            type="password"
            autoComplete="new-password"
            placeholder="Confirm Password"
            state={confirmPassword}
            setState={setConfirmPassword}
            name="confirm-password"
          />
          <div className="text-text-light">
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
          {(state?.errors ?? []).map((err, idx) => (
            <div className="text-red-600 text-center" key={idx}>
              {err}
            </div>
          ))}
          <Button
            kind="primary"
            text="Submit"
            type="submit"
            isLoading={pending}
            disabled={
              email.length === 0 ||
              password.length === 0 ||
              confirmPassword.length === 0 ||
              password !== confirmPassword ||
              Object.values(passwordValidationResult).filter((a) => !a).length >
                0
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AccountCreation;
