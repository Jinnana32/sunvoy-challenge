import { AxiosInstance } from 'axios';
import { USER_LIST_ENDPOINT } from '../libs/sunvoy.client';
import { User } from '../types';

export const getUserList = (client: AxiosInstance): Promise<User[]> => {
  return client.post(USER_LIST_ENDPOINT).then((resp) => resp.data);
};
