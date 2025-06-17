import { CookieJar } from 'tough-cookie';
import { COOKIE_PATH } from './paths';
import fs from 'fs/promises';

export const loadCookieJar = async (): Promise<CookieJar> => {
  const jar = new CookieJar();
  try {
    const cookieData = await fs.readFile(COOKIE_PATH, 'utf-8');
    const json = JSON.parse(cookieData);
    return CookieJar.fromJSON(json);
  } catch {
    // New cookie jar if not found or error
    return jar;
  }
};

export const saveCookieJar = async (jar: CookieJar): Promise<void> => {
  const serialized = jar.serializeSync();
  await fs.writeFile(COOKIE_PATH, JSON.stringify(serialized, null, 2), 'utf-8');
};
