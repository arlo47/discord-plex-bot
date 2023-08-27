import { authenticate } from './authenticate';
import { getMockReq, getMockRes } from '@jest-mock/express';

describe('Authentication Middleware', () => {
  it('Should Return Unauthorized If Token Not Included', () => {
    const req = getMockReq();
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Should Return Unauthorized If Token Is Not Valid', () => {
    const req = getMockReq({ query: { token: 'TEST' } });
    const { res, next } = getMockRes();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
  });
});
