import { AxiosInstance } from 'axios';
import { LOGIN_ENDPOINT, TOKENS_URL } from '../libs/sunvoy.client';
import * as cheerio from 'cheerio';

export const extractNonce = async (client: AxiosInstance): Promise<string> => {
  const loginPage = await client.get(LOGIN_ENDPOINT);
  const nonceMatch = loginPage.data.match(/name="nonce" value="([^"]+)"/);
  if (!nonceMatch) {
    throw new Error('Could not find nonce in login page');
  }
  return nonceMatch[1];
};

/**
 * Logs in to the server using the provided username and password.
 *
 * Fetches a nonce token required for authentication and submits the login request.
 *
 * @param client - An Axios instance
 * @param username - The username credential.
 * @param password - The password credential.
 * @throws If the login response status is not 200.
 */
export const login = async (
  client: AxiosInstance,
  username: string,
  password: string
) => {
  const nonce = await extractNonce(client);
  const res = await client.post(
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

/**
 * Extracts token-related data from the HTML response of the tokens endpoint.
 *
 * @param client - An Axios instance
 * @returns A promise that resolves to an object containing authentication tokens
 */
export const getTokenData = async (client: AxiosInstance) => {
  const res = await client.get(TOKENS_URL);
  const $ = cheerio.load(res.data);
  const tokenData = {
    access_token: String($('#access_token').val()),
    openId: String($('#openId').val()),
    userId: String($('#userId').val()),
    apiuser: String($('#apiuser').val()),
    operateId: String($('#operateId').val()),
    language: String($('#language').val()),
  };
  return tokenData;
};
