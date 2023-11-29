import supertest, { SuperTest, Test } from 'supertest';
import server from '../src/api/server';

export let request: SuperTest<Test>;

beforeAll(() => {
  request = supertest(server);
});
