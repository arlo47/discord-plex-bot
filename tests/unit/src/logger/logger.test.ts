import winston from 'winston';
import { logger } from '../../../../src/logger/logger';
import { MemoryTransport, logs } from '../../utils/logger/MemoryTransport';
import dayjs from 'dayjs';

describe('logger', () => {
  beforeAll(() => {
    logger.clear();
    logger.add(new winston.transports.Console({ handleExceptions: true }));
    logger.add(new MemoryTransport());
  });

  describe('redactSecrets', () => {
    it('Should not redact level, timestamp or message', () => {
      logger.info({ message: 'test' });

      expect(logs[logs.length - 1].level).toMatch(/info/);
      expect(logs[logs.length - 1].message).toMatch(/test/);
      expect(dayjs(logs[logs.length - 1].timestamp).isValid()).toBe(true);
    });

    it('Should not redact nested non private fields', () => {
      const url = 'mockurl.com';
      const method = 'GET';
      logger.info({ message: 'test', req: { token: 'ABC', url, method } });
      expect(logs[logs.length - 1].req.url).toBe(url);
      expect(logs[logs.length - 1].req.method).toBe(method);
    });

    it('Should redact top level token field', () => {
      logger.info({ message: 'test', token: 'ABC' });
      expect(logs[logs.length - 1].token).toMatch(/REDACTED/);
    });

    it('Should redact nested token field', () => {
      logger.info({ message: 'test', req: { token: 'ABC' } });
      expect(logs[logs.length - 1].req.token).toMatch(/REDACTED/);
    });

    it('Should redact token fields in an array of objects', () => {
      logger.info({
        message: 'test',
        users: [
          { name: 'Tim', token: 'ABC' },
          { name: 'Rick', token: 'DEF' },
        ],
      });

      expect(logs[logs.length - 1].users[0].name).toMatch(/Tim/);
      expect(logs[logs.length - 1].users[1].name).toMatch(/Rick/);
      expect(logs[logs.length - 1].users[0].token).toMatch(/REDACTED/);
      expect(logs[logs.length - 1].users[1].token).toMatch(/REDACTED/);
    });
  });
});
