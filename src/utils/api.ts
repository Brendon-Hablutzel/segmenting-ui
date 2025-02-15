const BASE_URL = 'https://rassaibhg8.execute-api.us-east-1.amazonaws.com';

export const listJobs = async (accessToken: string) => {
  const res = await fetch(BASE_URL + '/jobs', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  return data;
};
