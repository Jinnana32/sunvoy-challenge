import { AxiosInstance } from 'axios';
import { USER_LIST_ENDPOINT } from '../libs/sunvoy.client';
import { TokenData, User } from '../types';
import { SETTINGS_URL } from '../libs/api.client';

/**
 * Retrieves the list of users from the user list endpoint.
 *
 * @param client - An Axios instance configured with cookies and base URL.
 * @returns A promise that resolves to an array of user data.
 */
export const getUserList = (client: AxiosInstance): Promise<User[]> => {
  return client.post(USER_LIST_ENDPOINT).then((resp) => resp.data);
};

/**
 * Fetches the current user details from the settings endpoint.
 *
 * @param client - An Axios instance configured with cookies and base URL.
 * @param payload - A signed payload string for authentication.
 * @returns A promise that resolves to the current user data.
 */
export const getCurrentUser = async (
  client: AxiosInstance,
  payload: string
): Promise<User> => {
  const response = await client.post(SETTINGS_URL, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};
