'use client';

import Button from '@/components/Button';
import { useAuthContext } from '@/hooks/useAuthContext';
import { logOut } from '@/utils/auth';

const Jobs = () => {
  const { auth, setAuth } = useAuthContext();

  // TODO: logout fails if access token is invalid
  const handleLogout = async () => {
    try {
      if (auth?.AccessToken) {
        await logOut(auth.AccessToken);
      }
      setAuth(null);
    } catch (e) {
      console.error(e);
      // TODO: some ui for bad logout
    }
  };

  return (
    <div>
      <div className="w-[20rem]">
        <Button kind="primary" text="Logout" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Jobs;
