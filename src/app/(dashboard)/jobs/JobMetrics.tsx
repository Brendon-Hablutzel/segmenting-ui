import { AuthDataType } from '@/app/lib/types';
import { getMetrics, MetricsType } from '@/utils/backend';
import { useEffect, useState } from 'react';

const JobMetricsSkeleton = () => {
  const skeletonStyle = 'bg-[#1B251B] opacity-80 rounded-xl animate-pulse';

  return (
    <div className="grid lg:grid-cols-[11fr_10fr] gap-4 h-full">
      <div className="grid gap-4">
        <div className="h-32 grid grid-cols-[1fr_2fr] gap-5 bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
          <div className={`${skeletonStyle} h-full`}></div>
          <div className={`${skeletonStyle} h-full`}></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr] max-sm:grid-cols-[1fr_1fr]">
          <div className="h-32 flex flex-col justify-around bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
            <div className={`${skeletonStyle} w-full h-full`}></div>
          </div>
          <div className="flex flex-col justify-around bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
            <div className={`${skeletonStyle} w-full h-full`}></div>
          </div>
          <div className="max-sm:hidden flex flex-col justify-around bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
            <div className={`${skeletonStyle} w-full h-full`}></div>
          </div>
        </div>
      </div>
      <div className="max-lg:hidden bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
        <div className={`${skeletonStyle} w-full h-full`}></div>
      </div>
    </div>
  );
};

export const JobMetrics = ({ auth }: { auth: AuthDataType }) => {
  const [metricsData, setMetricsData] = useState<
    | {
        status: 'loading-initially';
      }
    | {
        status: 'success';
        metrics: MetricsType;
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
        metrics: MetricsType;
      }
  >({
    status: 'loading-initially',
  });

  useEffect(() => {
    const fetchMetricsData = async () => {
      setMetricsData((prev) => {
        return prev.status === 'loading-initially' ||
          prev.status === 'loading-after-error' ||
          prev.status === 'loading-after-success'
          ? prev
          : prev.status === 'success'
            ? {
                status: 'loading-after-success',
                metrics: prev.metrics,
              }
            : {
                status: 'loading-after-error',
                error: prev.error,
              };
      });

      try {
        const metricsResponse = await getMetrics(auth.idToken);

        if (!metricsResponse.success) {
          throw new Error(metricsResponse.error);
        }

        setMetricsData({
          status: 'success',
          metrics: metricsResponse.metrics,
        });
      } catch (e) {
        console.error(e);
        setMetricsData({
          status: 'error',
          error: 'Error fetching metrics',
        });
      }
    };

    fetchMetricsData();

    const interval = setInterval(fetchMetricsData, 5000);

    return () => clearInterval(interval);
  }, [auth.idToken]);

  return metricsData.status === 'error' ||
    metricsData.status === 'loading-after-error' ? (
    <div className="min-h-0 bg-bg-card border-[1px] border-text-light/10 rounded-3xl flex-[3] p-4 h-full">
      {metricsData.error}
    </div>
  ) : metricsData.status === 'loading-initially' ? (
    <JobMetricsSkeleton />
  ) : (
    <div className="grid lg:grid-cols-[11fr_10fr] gap-4 h-full">
      <div className="grid gap-4">
        <div className="flex justify-between gap-5 xl:gap-10 bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
          <div className="flex flex-col justify-around whitespace-nowrap">
            <div className="text-7xl text-center font-medium">
              {metricsData.metrics.totalJobs}
            </div>
            <div className="text-sm md:text-lg text-center">Total Jobs</div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-full flex flex-col justify-center gap-2">
              <div className="flex w-full h-10 text-base md:text-lg">
                <div className="flex-1 flex justify-start items-end gap-1">
                  <span className="font-bold">
                    {metricsData.metrics.byStatus.waiting}
                  </span>
                  waiting
                </div>
                <div className="flex-1 flex justify-center items-end gap-1">
                  <span className="font-bold">
                    {metricsData.metrics.byStatus.running}
                  </span>
                  running
                </div>
                <div className="flex-1 flex justify-end items-end gap-1">
                  <span className="font-bold">
                    {metricsData.metrics.byStatus.finished}
                  </span>
                  finished
                </div>
              </div>

              {metricsData.metrics.totalJobs > 0 ? (
                <div className="flex w-full h-10 rounded-xl overflow-clip">
                  <div
                    className={`bg-gray-400`}
                    style={{
                      width: `${(
                        (metricsData.metrics.byStatus.waiting /
                          metricsData.metrics.totalJobs) *
                        100
                      ).toFixed(0)}%`,
                    }}
                  ></div>
                  <div
                    className={`bg-yellow-400`}
                    style={{
                      width: `${(
                        (metricsData.metrics.byStatus.running /
                          metricsData.metrics.totalJobs) *
                        100
                      ).toFixed(0)}%`,
                    }}
                  ></div>
                  <div
                    className={`bg-green-600`}
                    style={{
                      width: `${(
                        (metricsData.metrics.byStatus.finished /
                          metricsData.metrics.totalJobs) *
                        100
                      ).toFixed(0)}%`,
                    }}
                  ></div>
                </div>
              ) : (
                <div className="flex w-full h-10 rounded-xl overflow-clip">
                  <div className="border-text-light/10 rounded-xl border-[1px] w-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr] max-sm:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-around bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
            <div className="text-6xl text-center">
              {(
                metricsData.metrics.totalProcessingDurationMillis /
                metricsData.metrics.byStatus.finished /
                1000
              ).toFixed(1)}
              s
            </div>
            <div className="text-sm md:text-md text-center whitespace-nowrap">
              Avg Processing Time
            </div>
          </div>
          <div className="flex flex-col justify-around bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
            <div className="text-6xl text-center">
              {/* TODO: implement once error states are implemented */}
              0%
            </div>
            <div className="text-sm md:text-md text-center">Job Failures</div>
          </div>
          <div className="max-sm:hidden flex flex-col justify-around bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4 text-text-light">
            <div className="text-6xl text-center">
              {(
                metricsData.metrics.totalWaitingDurationMillis /
                (metricsData.metrics.byStatus.finished +
                  metricsData.metrics.byStatus.running) /
                1000
              ).toFixed(1)}
              s
            </div>
            <div className="text-md text-center">Avg Waiting Time</div>
          </div>
        </div>
      </div>
      <div className="max-lg:hidden bg-bg-card border-[1px] border-text-light/10 rounded-3xl p-4">
        graph
      </div>
    </div>
  );
};

export default JobMetrics;
