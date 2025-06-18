import dotenv from 'dotenv';
import { getConfig } from './config';
import { login } from './services/sunvoy.service';
import { getClient } from './libs/sunvoy.client';
import { loadCookieJar, saveCookieJar } from './libs/cookies';
import { getCurrentUser, getUserList } from './services/users.service';
import { saveToJsonFile } from './libs/file';
import { getApiClient } from './libs/api.client';

dotenv.config();
const config = getConfig();

const main = async () => {
  const jar = await loadCookieJar();
  const client = await getClient(jar);
  const apiClient = await getApiClient(jar);
  await login(client, config.username, config.password);
  await saveCookieJar(jar);

  const users = await getUserList(client);
  const currentUser = await getCurrentUser(apiClient);
  await saveToJsonFile([...users, currentUser]);
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
