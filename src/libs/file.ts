import { User } from '../types';
import { OUTPUT_PATH } from './paths';
import fs from 'fs/promises';

export const saveToJsonFile = async (users: User[]) => {
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(users, null, 2), 'utf-8');
};
