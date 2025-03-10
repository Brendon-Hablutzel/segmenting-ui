'use client';

import Button from '@/components/Button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen flex justify-center">
      <div className="mt-[10%] flex flex-col items-center gap-3">
        <div className="text-xl">An unexpected error occurred</div>
        <Button kind="primary" text="Try again" onClick={() => reset()} />
      </div>
    </div>
  );
}
