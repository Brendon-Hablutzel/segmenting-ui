'use client';

import { getJob, JobDataType, JobUrlsType } from '@/utils/backend';
import SegmentingImage from './SegmentingImage';
import { AuthDataType } from '@/app/lib/types';
import { useEffect, useState } from 'react';

const JobDataSkeleton = () => {
  const skeletonStyle = 'bg-[#1B251B] opacity-80 rounded-xl animate-pulse';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <div className="flex gap-2 items-baseline">
          <div className={`h-10 w-72 ${skeletonStyle}`}></div>
        </div>
        <div className={`h-8 w-96 text-text-light/75 ${skeletonStyle}`} />
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col gap-2">
          <div className={`h-[500px] w-[500px] ${skeletonStyle}`} />
        </div>
        <div className="flex flex-col gap-2">
          <div className={`h-[500px] w-[500px] ${skeletonStyle}`} />
        </div>
      </div>
    </div>
  );
};

const JobData = ({ jobId, auth }: { jobId: string; auth: AuthDataType }) => {
  const [jobData, setJobData] = useState<
    | {
        status: 'loading-initially';
      }
    | {
        status: 'success';
        job: JobDataType;
        urls: JobUrlsType;
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
        job: JobDataType;
        urls: JobUrlsType;
      }
  >({
    status: 'loading-initially',
  });

  useEffect(() => {
    const fetchJobData = async () => {
      setJobData((prev) => {
        return prev.status === 'loading-initially' ||
          prev.status === 'loading-after-error' ||
          prev.status === 'loading-after-success'
          ? prev
          : prev.status === 'success'
            ? {
                status: 'loading-after-success',
                job: prev.job,
                urls: prev.urls,
              }
            : {
                status: 'loading-after-error',
                error: prev.error,
              };
      });

      try {
        const jobResponse = await getJob(auth.idToken, jobId);

        if (!jobResponse.success) {
          // TODO: handle specific errors
          setJobData({
            status: 'error',
            error: 'Unable to get job data',
          });
        } else {
          setJobData({
            status: 'success',
            job: jobResponse.jobData,
            urls: jobResponse.jobUrls,
          });
        }
      } catch (e) {
        console.error(e);
        // TODO: handle specific errors
        setJobData({
          status: 'error',
          error: 'Unable to get job data',
        });
      }
    };

    fetchJobData();

    // TODO: don't keep refetching if job is finished
    const interval = setInterval(fetchJobData, 5000);

    return () => clearInterval(interval);
  }, [auth.idToken, jobId]);

  // const duration = jobResponse.jobData.finishedAt
  //   ? jobResponse.jobData.finishedAt.valueOf() -
  //     jobResponse.jobData.submittedAt.valueOf()
  //   : undefined;

  return jobData.status === 'error' ||
    jobData.status === 'loading-after-error' ? (
    <div>{jobData.error}</div>
  ) : jobData.status === 'loading-initially' ? (
    <JobDataSkeleton />
  ) : (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <div className="text-3xl">{jobData.job.name}</div>
        <div className="flex justify-between gap-2">
          <div className={`text-3xl text-text-light/75`}>
            {jobData.job.module}
          </div>
          <div className="text-3xl text-text-light/75"> | </div>
          <div className={`text-3xl text-text-light/75 whitespace-nowrap`}>
            <span
              className={`${jobData.job.status === 'finished' ? 'text-green-600' : jobData.job.status === 'running' ? 'text-yellow-400' : ''}`}
            >
              {jobData.job.status}
            </span>
            {/* {duration ? ` in ${(duration / 1000).toFixed(1)}s` : ''} */}
          </div>
        </div>
      </div>
      <div className="flex justify-around gap-3">
        <div className="flex flex-col gap-2">
          <div className="rounded-xl border-[1px] border-white/20">
            <SegmentingImage
              url={jobData.urls.originalPresignedUrl}
              blurHash={jobData.job.originalBlurHash}
              options={{
                height: jobData.job.height,
                width: jobData.job.width,
              }}
            />
          </div>
          <div className="text-center">original</div>
        </div>
        {jobData.job.status === 'finished' &&
        jobData.urls.processedPresignedUrl &&
        jobData.job.processedBlurHash ? (
          <div className="flex flex-col gap-2">
            <div className="rounded-xl border-[1px] border-white/20">
              <SegmentingImage
                url={jobData.urls.processedPresignedUrl}
                blurHash={jobData.job.processedBlurHash}
                options={{
                  height: jobData.job.height,
                  width: jobData.job.width,
                }}
              />
            </div>
            <div className="text-center">processed</div>
          </div>
        ) : null}
      </div>
      <div className={`text-xl text-text-light/75`}>
        submitted at {jobData.job.submittedAt.toISOString()} UTC
      </div>
    </div>
  );
};

export default JobData;
