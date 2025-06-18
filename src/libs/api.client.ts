import axios, { AxiosInstance } from 'axios';
import { HttpsCookieAgent } from 'http-cookie-agent/http';
import { CookieJar } from 'tough-cookie';

export const BASE_URL = 'https://api.challenge.sunvoy.com';
export const SETTINGS_URL = `/api/settings`;

let apiClient: AxiosInstance;

export const getApiClient = async (jar: CookieJar): Promise<AxiosInstance> => {
  if (apiClient) {
    return apiClient;
  }

  const agent = new HttpsCookieAgent({ cookies: { jar } });

  apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    httpsAgent: agent,
  });

  return apiClient;
};
