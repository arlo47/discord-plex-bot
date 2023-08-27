import { authenticate } from './authenticate';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('Authentication Middleware', () => {
  it('Should return 401 if token not included', () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Should return 401 if token is not valid', () => {
    const req = getMockReq({ query: { token: 'TEST' } });
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
