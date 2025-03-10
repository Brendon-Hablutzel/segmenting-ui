import { z } from 'zod';
import { API_BASE_URL, assertIsDefined } from '.';

// TODO: handle token refreshing

export const JobStatus = z.enum(['waiting', 'running', 'finished']);

const ErrorResponse = z.object({
  success: z.literal(false),
  error: z.string(),
});

const JobData = z.object({
  jobId: z.string(),
  status: JobStatus,
  name: z.string(),
  submittedAt: z.number().transform((s) => new Date(s)),
  pickedupAt: z
    .number()
    .optional()
    .transform((s) => (s ? new Date(s) : undefined)),
  finishedAt: z
    .number()
    .optional()
    .transform((s) => (s ? new Date(s) : undefined)),
  module: z.string(),
  originalBlurHash: z.string(),
  processedBlurHash: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  imageFormat: z.string().optional(),
});

export type JobDataType = z.infer<typeof JobData>;

export const JobsData = z.array(JobData);

export type JobsDataType = z.infer<typeof JobsData>;

const SuccessJobsResponse = z.object({
  success: z.literal(true),
  jobs: JobsData,
});

const JobsResponse = z.discriminatedUnion('success', [
  SuccessJobsResponse,
  ErrorResponse,
]);

type JobsResponseType = z.infer<typeof JobsResponse>;

export const listJobs = async (idToken: string): Promise<JobsResponseType> => {
  assertIsDefined('api base url', API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (res.status != 200) {
    // TODO: specificity
    throw new Error('bad request');
  }

  const data = await res.json();

  return JobsResponse.parse(data);
};

const JobUrls = z.object({
  originalPresignedUrl: z.string(),
  processedPresignedUrl: z.string().optional(),
});

export type JobUrlsType = z.infer<typeof JobUrls>;

const SuccessJobResponse = z.object({
  success: z.literal(true),
  jobData: JobData,
  jobUrls: JobUrls,
});

const JobResponse = z.discriminatedUnion('success', [
  SuccessJobResponse,
  ErrorResponse,
]);

type JobResponseType = z.infer<typeof JobResponse>;

export const getJob = async (
  idToken: string,
  jobId: string,
): Promise<JobResponseType | null> => {
  assertIsDefined('api base url', API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (res.status != 200) {
    if (res.status === 404) {
      return null;
    }

    throw new Error(res.statusText);
  }

  const data = await res.json();

  return JobResponse.parse(data);
};

const SuccessStartJobResponse = z.object({
  success: z.literal(true),
  jobId: z.string(),
});

const StartJobResponse = z.discriminatedUnion('success', [
  SuccessStartJobResponse,
  ErrorResponse,
]);

type StartJobResponseType = z.infer<typeof StartJobResponse>;

export const startJob = async (
  idToken: string,
  module: string,
  name: string,
  image: BodyInit,
): Promise<StartJobResponseType> => {
  assertIsDefined('api base url', API_BASE_URL);
  const res = await fetch(
    `${API_BASE_URL}/jobs?module=${module}&name=${name}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: image,
    },
  );

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return StartJobResponse.parse(data);
};

const Metrics = z.object({
  totalJobs: z.number(),
  totalProcessingDurationMillis: z.number(),
  totalWaitingDurationMillis: z.number(),
  byStatus: z.object({
    waiting: z.number(),
    running: z.number(),
    finished: z.number(),
  }),
  jobTimestamps: z.array(z.number()),
});

export type MetricsType = z.infer<typeof Metrics>;

const SuccessMetricsResponse = z.object({
  success: z.literal(true),
  metrics: Metrics,
});

const MetricsResponse = z.discriminatedUnion('success', [
  SuccessMetricsResponse,
  ErrorResponse,
]);

export type MetricsResponseType = z.infer<typeof MetricsResponse>;

export const getMetrics = async (
  idToken: string,
): Promise<MetricsResponseType> => {
  assertIsDefined('api base url', API_BASE_URL);
  const res = await fetch(`${API_BASE_URL}/metrics`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }

  const data = await res.json();

  return MetricsResponse.parse(data);
};
