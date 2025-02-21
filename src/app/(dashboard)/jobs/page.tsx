'use server';

import { AuthCookie, AuthCookieType } from '@/app/lib/types';
import { listJobs } from '@/utils/backend';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

const TotalJobs = async () => {
  return <div>total jobs</div>;
};

const ListJobs = async ({ authCookie }: { authCookie: AuthCookieType }) => {
  // TODO: cache this?
  const jobsResponse = await listJobs(authCookie.idToken);

  return (
    <div className="flex flex-col gap-4 text-text-light">
      <div className="text-3xl">Jobs</div>
      <table>
        <thead>
          <tr className="text-left">
            <th>Job ID</th>
            <th>Module</th>
            <th>Content Type</th>
            <th>Status</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {jobsResponse.jobs.map((j) => {
            return (
              <tr key={j.jobId}>
                <td>{j.jobId}</td>
                <td>segmenter</td>
                <td>jpeg</td>
                <td>{j.status}</td>
                <td>2025-02-01 18:00:00</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// TODO: error boundaries

const Jobs = async () => {
  const allCookies = await cookies();
  const rawAuthCookie = allCookies.get('segmenting-auth');
  if (!rawAuthCookie) {
    // TODO
    throw new Error('bad bad bad');
  }

  const authCookie = AuthCookie.parse(JSON.parse(rawAuthCookie.value));

  return (
    <div className="grid grid-rows-[4fr_5fr] gap-4">
      <div className="grid grid-cols-[1fr_1fr] gap-4">
        <div className="grid gap-4">
          <div className="bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
            <Suspense fallback={<div>loading</div>}>
              <TotalJobs />
            </Suspense>
          </div>
          <div className="grid gap-4 grid-cols-[1fr_1fr_1fr]">
            <div className="bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
              avg processing
            </div>
            <div className="bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
              job failure
            </div>
            <div className="bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
              average pending
            </div>
          </div>
        </div>
        <div className="bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
          jobs graph
        </div>
      </div>
      <div className="bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4 text-text-light">
              <div className="text-3xl">Jobs</div>
              <div>loading...</div>
            </div>
          }
        >
          <ListJobs authCookie={authCookie} />
        </Suspense>
      </div>
    </div>
  );
};

export default Jobs;
