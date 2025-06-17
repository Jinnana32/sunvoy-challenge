import dotenv from 'dotenv';
import { getConfig } from './config';
import { login } from './services/sunvoy.service';
import { getClient } from './libs/sunvoy.client';
import { loadCookieJar, saveCookieJar } from './libs/cookies';

dotenv.config();
const config = getConfig();

const main = async () => {
  const jar = await loadCookieJar();
  const client = await getClient(jar);
  await login(client, config.username, config.password);
  await saveCookieJar(jar);
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
