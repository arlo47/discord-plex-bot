import { authenticate } from './authenticate';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('Authentication Middleware', () => {
  it('Should Return 401 If Token Not Included', () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Should Return 401 If Token Is Not Valid', () => {
    const req = getMockReq({ query: { token: 'TEST' } });
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
