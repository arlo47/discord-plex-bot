import { logger } from '../../../src/logger/logger';
import { logs } from '../../utils/logger/MemoryTransport';

describe('logger', () => {
  it('Should redact secrets', () => {
    logger.info({ message: 'test' });

    console.log(`TEST: ${JSON.stringify(logs)}`);

    expect(logs[logs.length - 1].eventId).toMatch(/[REDACTED]/);
  });
});
