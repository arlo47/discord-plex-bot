import { request } from '../../setup';

describe('404 Catch All', () => {
  it('Should return 404 when GET endpoint is not known', async () => {
    const res = await request.get('/not/real/endpoint');
    expect(res.statusCode).toBe(404);
  });

  it('Should return 404 when POST endpoint is not known', async () => {
    const res = await request.post('/not/real/endpoint');
    expect(res.statusCode).toBe(404);
  });
});
