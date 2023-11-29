import { request } from '../../setup';

describe('/webhook', () => {
  it('Should return 401 is a token is not provided', async () => {
    const res = await await request.post('/webhook');
    expect(res.statusCode).toBe(401);
  });
});
