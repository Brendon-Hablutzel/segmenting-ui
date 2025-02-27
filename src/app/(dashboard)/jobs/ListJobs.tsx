import { JobsDataType, listJobs } from '@/utils/backend';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AuthDataType } from '@/app/lib/types';

const ListJobsTableSkeleton = () => {
  const skeletonStyle = 'bg-[#1B251B] opacity-80 rounded-xl animate-pulse';

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-left text-text-light font-bold m-1 h-8 gap-1">
        <div className={`w-[20%] ${skeletonStyle}`}></div>
        <div className={`w-[15%] ${skeletonStyle}`}></div>
        <div className={`w-[10%] ${skeletonStyle}`}></div>
        <div className={`w-[10%] ${skeletonStyle}`}></div>
        <div className={`w-[25%] ${skeletonStyle}`}></div>
        <div className={`w-[10%] ${skeletonStyle}`}></div>
        <div className={`w-[10%] ${skeletonStyle}`}></div>
      </div>
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className={`${skeletonStyle} h-8 flex justify-between m-1 rounded-lg`}
        ></div>
      ))}
    </div>
  );
};

const ListJobs = ({ auth }: { auth: AuthDataType }) => {
  const [jobsData, setJobsData] = useState<
    | {
        status: 'loading-initially';
      }
    | {
        status: 'success';
        jobs: JobsDataType;
      }
    | {
        status: 'error';
        error: string;
      }
    | {
        status: 'loading-after-error';
        error: string;
      }
    | {
        status: 'loading-after-success';
        jobs: JobsDataType;
      }
  >({
    status: 'loading-initially',
  });

  useEffect(() => {
    const fetchJobsData = async () => {
      setJobsData((prev) => {
        return prev.status === 'loading-initially' ||
          prev.status === 'loading-after-error' ||
          prev.status === 'loading-after-success'
          ? prev
          : prev.status === 'success'
            ? {
                status: 'loading-after-success',
                jobs: prev.jobs,
              }
            : {
                status: 'loading-after-error',
                error: prev.error,
              };
      });

      try {
        const jobsResponse = await listJobs(auth.idToken);

        if (!jobsResponse.success) {
          // TODO: handle specific errors
          setJobsData({
            status: 'error',
            error: 'Unable to fetch jobs',
          });
        } else {
          jobsResponse.jobs.sort(
            (a, b) => b.submittedAt.valueOf() - a.submittedAt.valueOf(),
          );

          setJobsData({
            status: 'success',
            jobs: jobsResponse.jobs,
          });
        }
      } catch (e) {
        console.error(e);
        // TODO: handle specific errors
        setJobsData({
          status: 'error',
          error: 'Unable to fetch jobs',
        });
      }
    };

    fetchJobsData();

    const interval = setInterval(fetchJobsData, 5000);

    return () => clearInterval(interval);
  }, [auth.idToken]);

  return (
    <div className="flex flex-col gap-4 text-text-light h-full">
      <div className="flex gap-1 items-baseline">
        <div className="text-3xl">Jobs</div>
        <div className="text-lg">
          {/* {jobsData.status === 'loading-after-success' ||
          jobsData.status === 'loading-after-error' ? (
            <Oval width="1rem" height="1rem" />
          ) : (
            ''
          )} */}
          {/* <Oval
            width="1rem"
            height="1rem"
            className={`${jobsData.status === 'loading-after-success' || jobsData.status === 'loading-after-error' ? 'opacity-100' : 'opacity-0'}`}
          /> */}
        </div>
      </div>
      {jobsData.status === 'error' ||
      jobsData.status === 'loading-after-error' ? (
        // TODO: style error
        <div>{jobsData.error}</div>
      ) : jobsData.status === 'loading-initially' ? (
        <ListJobsTableSkeleton />
      ) : (
        <div className="flex flex-col gap-1 flex-grow min-h-0">
          <div className="flex justify-between text-left text-text-light font-bold p-1">
            <div className="w-[20%]">Name</div>
            <div className="w-[15%]">Module</div>
            <div className="w-[10%]">Format</div>
            <div className="w-[10%]">Status</div>
            <div className="w-[25%]">Submitted at</div>
            <div className="w-[10%]">Waiting</div>
            <div className="w-[10%]">Processing</div>
          </div>
          <div className="overflow-y-auto flex-1">
            {jobsData.jobs.map((job) => {
              return (
                <div
                  key={job.jobId}
                  className="flex justify-between text-left text-text-light hover:bg-[#1B251B]/50 p-1 rounded-lg"
                >
                  <div className="w-[20%]">
                    <Link href={`/jobs/${job.jobId}`} target="_blank">
                      {job.name}
                    </Link>
                  </div>
                  <div className="w-[15%]">{job.module}</div>
                  <div className="w-[10%]">{job.imageFormat}</div>
                  <div
                    className={`w-[10%] ${job.status === 'finished' ? 'text-green-600' : job.status === 'running' ? 'text-yellow-400' : 'text-gray-400'}`}
                  >
                    {job.status}
                  </div>
                  <div className="w-[25%]">
                    {job.submittedAt.toISOString()} UTC
                  </div>
                  <div className="w-[10%]">
                    {job.pickedupAt
                      ? `${(
                          (job.pickedupAt.valueOf() -
                            job.submittedAt.valueOf()) /
                          1000
                        ).toFixed(1)}s`
                      : `${((new Date().valueOf() - job.submittedAt.valueOf()) / 1000).toFixed(1)}s`}
                  </div>
                  <div className="w-[10%]">
                    {job.pickedupAt && job.finishedAt
                      ? `${(
                          (job.finishedAt.valueOf() -
                            job.pickedupAt.valueOf()) /
                          1000
                        ).toFixed(1)}s`
                      : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListJobs;
