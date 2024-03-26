import { request } from '../../setup';

describe('/webhook', () => {
  it('Should return a 401 with no authentication', async () => {
    const res = await request.post('/webhook');
    expect(res.statusCode).toBe(401);
  });

  it('Should return a 401 with incorrect authentication', async () => {
    const res = await request
      .post('/webhook')
      .field('token', 'invalid_token_123');
    expect(res.statusCode).toBe(401);
  });
});
