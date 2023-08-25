import supertest, { SuperTest, Test } from 'supertest';
import server from './api/server';

export let request: SuperTest<Test>;

beforeAll(() => {
  request = supertest(server);
});

describe('Testing The Test Suite', () => {
  it('Should Do Basic Math', () => {

    expect(1 + 1).toBe(2);
    
  });
});
