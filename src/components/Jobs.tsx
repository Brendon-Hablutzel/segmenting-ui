import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { logOut } from '../utils/auth';
import { useEffect, useState } from 'react';
import { listJobs } from '../utils/api';
import { useAuthContext } from '../hooks/useAuthContext';

const Jobs = () => {
  const navigate = useNavigate();

  const { auth, setAuth } = useAuthContext();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (auth?.IdToken === undefined) {
      // if not logged in, just redirect to home
      navigate('/');
      return;
    }
    const idToken = auth?.IdToken;

    (async () => {
      const jobsResponse = await listJobs(idToken);
      // TODO: check for error
      console.log(jobsResponse);
      setJobs(jobsResponse['jobs']);
    })();
  }, [auth?.IdToken, navigate]);

  return (
    <div>
      <div className="text-text-primary">{JSON.stringify(jobs)}</div>
      <Button
        kind="primary"
        text="Logout"
        onClick={async () => {
          try {
            if (auth?.AccessToken === undefined) {
              throw new Error('no access token found');
            }
            // TODO: loading state for logging out
            await logOut(auth.AccessToken);
            setAuth(null);
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </div>
  );
};

export default Jobs;
