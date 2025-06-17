import config from './config';
import { login } from './services/sunvoy.service';

const main = async () => {
  await login(config.password, config.password);
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
