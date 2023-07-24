import * as dotenv from 'dotenv';
dotenv.config();

import { getConfig } from './utils/config';

const config = getConfig();

console.log(config);
