import { request } from '../../app.test';

describe('Testing API', () => {
  it('Should return 200 when calling root', async () => {
    const res = await request.get('/');

    expect(res.statusCode).toBe(200);
  });

  it('Should return 404 when route is not known', async () => {
    const res = await request.get('/not/real/endpoint');

    expect(res.statusCode).toBe(404);
  });
});
