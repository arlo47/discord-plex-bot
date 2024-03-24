import { request } from '../../setup';

describe('/', () => {
  it('Should return 200', async () => {
    const res = await request.get('/');
    expect(res.statusCode).toBe(200);
  });
});
