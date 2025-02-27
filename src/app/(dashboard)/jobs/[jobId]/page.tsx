'use client';

import { use } from 'react';
import JobData from './JobData';
import { useAuthContext } from '@/hooks/useAuthContext';

// TODO: option to export processed image

const Job = ({ params }: { params: Promise<{ jobId: string }> }) => {
  const { jobId } = use(params);

  const { auth } = useAuthContext();

  if (!auth) {
    throw new Error('missing auth in protected route');
  }

  return (
    <div>
      <div className="bg-bg-card w-[full] h-fit p-5 rounded-3xl border-[1px] border-white/20">
        <JobData jobId={jobId} auth={auth} />
      </div>
    </div>
  );
};

export default Job;
