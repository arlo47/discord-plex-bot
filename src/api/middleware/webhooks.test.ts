import { getMockReq, getMockRes } from '@jest-mock/express';
import { validateName } from './webhooks';

describe('Webhooks Middleware', () => {
  describe('validateName', () => {
    it('Should Pass If Name Is Undefined', () => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      validateName(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should Pass If Name Is A String', () => {
      const req = getMockReq({ query: { name: 'TEST' } });
      const { res, next } = getMockRes();

      validateName(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should Return 400 If Name Is string[]', () => {
      const req = getMockReq({ query: { name: ['name1', 'name2'] } });
      const { res, next } = getMockRes();

      validateName(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
