import * as dotenv from 'dotenv';
dotenv.config();

import { initializeBot } from './bot/initialize';
import { getConfig } from './utils/config';
import server from './api/server';

const config = getConfig();

initializeBot();

server.listen(config.server.port, () => {
  console.log(`Server listening on ${config.server.port}`);
});
