import { API_BASE_URL } from '.';
import { z } from 'zod';

const JobResponse = z.object({
  userId: z.string(),
  jobId: z.string(),
  status: z.string(), // TODO: more specific type (enum)
  // TODO: more fields
});

const JobsResponse = z.object({
  success: z.boolean(),
  jobs: z.array(JobResponse),
});

type JobsResponseType = z.infer<typeof JobsResponse>;

export const listJobs = async (idToken: string): Promise<JobsResponseType> => {
  const res = await fetch(API_BASE_URL + '/jobs', {
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

export const startJob = async (
  idToken: string,
  module: string,
  image: BodyInit,
) => {
  const res = await fetch(API_BASE_URL + `/jobs/${module}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
    body: image,
  });

  const data = await res.json();

  return data;
};
