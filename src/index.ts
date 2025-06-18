import dotenv from 'dotenv';
import { getConfig } from './config';
import { login } from './services/sunvoy.service';
import { getClient } from './libs/sunvoy.client';
import { loadCookieJar, saveCookieJar } from './libs/cookies';
import { getUserList } from './services/users.service';
import { saveToJsonFile } from './libs/file';

dotenv.config();
const config = getConfig();

const main = async () => {
  const jar = await loadCookieJar();
  const client = await getClient(jar);
  await login(client, config.username, config.password);
  await saveCookieJar(jar);

  const users = await getUserList(client);
  await saveToJsonFile(users);
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
