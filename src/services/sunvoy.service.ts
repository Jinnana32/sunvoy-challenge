import sunvoyClient, { LOGIN_ENDPOINT } from '../libs/sunvoy.client';

export const extractNonce = async (): Promise<string> => {
  const loginPage = await sunvoyClient.get(LOGIN_ENDPOINT);
  const nonceMatch = loginPage.data.match(/name="nonce" value="([^"]+)"/);
  if (!nonceMatch) {
    throw new Error('Could not find nonce in login page');
  }
  return nonceMatch[1];
};

export const login = async (username: string, password: string) => {
  const nonce = await extractNonce();
  const res = await sunvoyClient.post(
    LOGIN_ENDPOINT,
    { username, password, nonce },
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
