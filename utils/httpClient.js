// playwright-api-framework/index.js

import { request } from '@playwright/test';
import auth from './utils/auth.js';
import httpClient from './utils/httpClient.js';
import { expect, test } from '@playwright/test';

test.describe('API Automation Framework', () => {
  let token;
  let context;

  test.beforeAll(async () => {
    token = await auth.getToken();
    context = await request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  });

  test('GET Users', async () => {
    const res = await httpClient.get(context, '/users');
    expect(res.status()).toBe(200);
  });

  test('POST Create User', async () => {
    const res = await httpClient.post(context, '/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    expect(res.status()).toBe(201);
  });
});
// utils/auth.js
import { request } from '@playwright/test';
import config from '../config.js';

export async function getToken() {
  const res = await request.post(config.baseURL + '/login', {
    data: {
      email: config.email,
      password: config.password
    }
  });
  return res.headers()['set-cookie'].split(';')[0].split('=')[1];
}