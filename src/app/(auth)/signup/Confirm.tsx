'use client';

import confirm from '@/app/actions/confirm';
import Button from '@/components/Button';
import { useActionState, useRef, useState } from 'react';

type ConfirmationCode = [string, string, string, string, string, string];

const Confirm = ({ email, password }: { email: string; password: string }) => {
  const [confirmationCode, setConfirmationCode] = useState<ConfirmationCode>([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const [state, action, pending] = useActionState(confirm, {
    email,
    password,
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleConfirmChange = (index: number, value: string) => {
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
    <div>
      <div className="flex flex-col justify-center gap-4 p-2">
        <div className="flex items-center justify-center">
          <h1 className="text-text-light text-5xl text-center">Confirm</h1>
        </div>
        <div className="flex items-center justify-center py-5">
          <h1 className="text-text-light text-xl text-center">
            Finish setting up your account by entering the code sent to your
            email below
          </h1>
        </div>
      </div>
      <div className="flex justify-center p-2">
        <form action={action}>
          <div className="flex flex-col gap-5">
            <div
              className="flex justify-center gap-3"
              onPaste={handleConfirmPaste}
            >
              {confirmationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleConfirmChange(index, e.target.value)}
                  onKeyDown={async (e) => handleConfirmKeyDown(index, e)}
                  className="bg-bg-card rounded-2xl border-text-light/50 focus:border-text-light border-[1px] h-[4rem] w-[4rem] text-center text-2xl text-text-light focus:outline-none focus:ring-0"
                  name={`code-${index}`}
                />
              ))}
            </div>
            {(state?.errors ?? []).map((err, idx) => (
              <div className="text-red-600 text-center" key={idx}>
                {err}
              </div>
            ))}
            <Button
              kind="primary"
              text="Submit"
              isLoading={pending}
              disabled={confirmationCode.filter((d) => !d).length > 0}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Confirm;
