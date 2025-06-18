import dotenv from 'dotenv';
import { getConfig } from './config';
import { getTokenData, login } from './services/sunvoy.service';
import { getClient } from './libs/sunvoy.client';
import { loadCookieJar, saveCookieJar } from './libs/cookies';
import { getCurrentUser, getUserList } from './services/users.service';
import { saveToJsonFile } from './libs/file';
import { getApiClient } from './libs/api.client';
import { createSignedRequest } from './libs/signer';

dotenv.config();
const config = getConfig();

const main = async () => {
  const jar = await loadCookieJar();
  const client = await getClient(jar);
  const apiClient = await getApiClient(jar);

  try {
    await getUserList(client);
    console.log('Already logged in. Using existing session');
  } catch (err: any) {
    // Non-401 errors should still throw
    if (err.response.status !== 401) {
      throw err;
    }
    // Handle case where the credentials expired or being invalidated
    console.log('Logging in. Saving credentials for future use');
    await login(client, config.username, config.password);
    await saveCookieJar(jar);
  }

  // fetch list of users
  const users = await getUserList(client);

  // fetch current user
  const tokenData = await getTokenData(client);
  const signed = createSignedRequest(tokenData);
  const currentUser = await getCurrentUser(apiClient, signed.fullPayload);

  // store users to file
  await saveToJsonFile([...users, currentUser]);
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
