import * as supertest from 'supertest';

import app from '../src/index';

describe('Index', () => {
  it('GET リクエストが処理される', async () => {
    const res = await supertest(app).get('/');
    expect(res.text).toBe('Hello');
  });
});
