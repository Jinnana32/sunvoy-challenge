export const getConfig = () => ({
  username: process.env.USERNAME ?? '',
  password: process.env.PASSWORD ?? '',
});
