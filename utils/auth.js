import { request } from '@playwright/test';

const BASE_URL = 'https://api.example.com';
const CREDENTIALS = {
  username: 'user@example.com',
  password: 'securePassword123'
};

export default {
  async getToken() {
    const context = await request.newContext();
    const res = await context.post(`${BASE_URL}/auth/login`, {
      data: CREDENTIALS
    });
    const body = await res.json();
    return body.token;
  }
};