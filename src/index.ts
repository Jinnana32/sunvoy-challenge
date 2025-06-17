import dotenv from 'dotenv';
import { getConfig } from './config';
import { login } from './services/sunvoy.service';

dotenv.config();
const config = getConfig();

const main = async () => {
  await login(config.username, config.password);
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
