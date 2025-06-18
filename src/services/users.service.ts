import { AxiosInstance } from 'axios';
import { USER_LIST_ENDPOINT } from '../libs/sunvoy.client';
import { TokenData, User } from '../types';
import { SETTINGS_URL } from '../libs/api.client';

export const getUserList = (client: AxiosInstance): Promise<User[]> => {
  return client.post(USER_LIST_ENDPOINT).then((resp) => resp.data);
};

export const getCurrentUser = async (
  client: AxiosInstance,
  tokenData: TokenData
): Promise<User> => {
  const response = await client.post(SETTINGS_URL, tokenData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data;
};
