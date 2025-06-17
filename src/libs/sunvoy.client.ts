import axios from 'axios';

export const BASE_URL = 'https://challenge.sunvoy.com';
export const LOGIN_ENDPOINT = '/login';

const client = axios.create({ baseURL: BASE_URL, withCredentials: true });

export default client;
