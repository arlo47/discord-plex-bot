import supertest, { SuperTest, Test } from 'supertest';
import server from '../src/api/server';
import winston from 'winston';
import { logger } from '../src/logger/logger';
import { MemoryTransport } from './utils/logger/MemoryTransport';

export let request: SuperTest<Test>;

beforeAll(() => {
  request = supertest(server);

  logger.clear();
  logger.add(new winston.transports.Console({ handleExceptions: true }));
  logger.add(new MemoryTransport());
});
