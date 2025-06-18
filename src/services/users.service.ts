import { AxiosInstance } from 'axios';
import { USER_LIST_ENDPOINT } from '../libs/sunvoy.client';
import { User } from '../types';
import { SETTINGS_URL } from '../libs/api.client';

export const getUserList = (client: AxiosInstance): Promise<User[]> => {
  return client.post(USER_LIST_ENDPOINT).then((resp) => resp.data);
};

export const getCurrentUser = async (client: AxiosInstance): Promise<User> => {
  const response = await client.post(
    SETTINGS_URL,
    {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.data;
};
