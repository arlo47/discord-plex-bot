import { getMockReq, getMockRes } from '@jest-mock/express';
import {
  parseWebHook,
  validateName,
  validateWebHookType,
} from '../../../../src/api/middleware/webhooks';

describe('Webhooks Middleware', () => {
  describe('validateName', () => {
    it('Should pass if name is undefined', () => {
      const req = getMockReq();
      const { res, next } = getMockRes();

      validateName(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should pass if name is a string', () => {
      const req = getMockReq({ query: { name: 'TEST' } });
      const { res, next } = getMockRes();

      validateName(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should return 400 if name is string[]', () => {
      const req = getMockReq({ query: { name: ['name1', 'name2'] } });
      const { res, next } = getMockRes();

      validateName(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('parseWebhook', () => {
    it('Should pass if req.body is stringified JSON', () => {
      const req = getMockReq({ body: JSON.stringify({ hello: 'world' }) });
      const { res, next } = getMockRes();

      parseWebHook(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should pass if req.body.payload is stringified JSON', () => {
      const req = getMockReq({
        body: { payload: JSON.stringify({ hello: 'world' }) },
      });
      const { res, next } = getMockRes();

      parseWebHook(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe('validateWebHookType', () => {
    it('Should pass if event type is rate', () => {
      const req = getMockReq({ body: { event: 'media.rate' } });
      const { res, next } = getMockRes();

      validateWebHookType(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Should return 400 if event type is pause', () => {
      const req = getMockReq({ body: { event: 'media.pause' } });
      const { res, next } = getMockRes();

      validateWebHookType(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('Should return 400 if event type is resume', () => {
      const req = getMockReq({ body: { event: 'media.resume' } });
      const { res, next } = getMockRes();

      validateWebHookType(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
