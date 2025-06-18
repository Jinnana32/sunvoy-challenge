import axios, { AxiosInstance } from 'axios';
import { loadCookieJar } from './cookies';
import { HttpsCookieAgent } from 'http-cookie-agent/http';
import { CookieJar } from 'tough-cookie';

export const BASE_URL = 'https://challenge.sunvoy.com';
export const LOGIN_ENDPOINT = '/login';
export const USER_LIST_ENDPOINT = '/api/users';

let client: AxiosInstance;

export const getClient = async (jar: CookieJar): Promise<AxiosInstance> => {
  if (client) {
    return client;
  }

  const agent = new HttpsCookieAgent({ cookies: { jar } });

  client = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    httpsAgent: agent,
  });

  return client;
};
