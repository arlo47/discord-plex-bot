import { authenticate } from '../../../../../src/api/middleware/authenticate';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { logger } from '../../../utils/logger';

describe('Authentication Middleware', () => {
  it('Should return 401 if token not included', () => {
    const req = getMockReq({
      logger,
    });
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Should return 401 if token is not valid', () => {
    const req = getMockReq({
      query: { token: 'TEST' },
      logger,
    });
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
