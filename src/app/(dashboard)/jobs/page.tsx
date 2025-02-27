'use client';

import { useAuthContext } from '@/hooks/useAuthContext';
import ListJobs from './ListJobs';
import JobMetrics from './JobMetrics';

const Jobs = () => {
  const { auth } = useAuthContext();

  if (!auth) {
    throw new Error('missing auth in protected route');
  }

  return (
    <div className="h-full flex flex-col gap-5">
      <div className="h-full flex-[2] min-h-0">
        <JobMetrics auth={auth} />
      </div>
      <div className="min-h-0 bg-bg-card border-[1px] border-text-light/10 rounded-3xl flex-[3] p-4 h-full">
        <ListJobs auth={auth} />
      </div>
    </div>
  );
};

export default Jobs;
