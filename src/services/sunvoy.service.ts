import sunvoyClient, { LOGIN_ENDPOINT } from '../libs/sunvoy.client';

export const login = async (username: string, password: string) => {
  const res = await sunvoyClient.post(
    LOGIN_ENDPOINT,
    { username, password },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    }
  );
  if (res.status !== 200) {
    throw new Error(`Login failed: ${res.status}`);
  }

  console.log('Logged in successfully');
};
