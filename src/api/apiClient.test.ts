import { describe, expect, test } from '@jest/globals';

import apiClient from './apiClient';

describe('apiClient', () => {
  test('uses the campers API base URL', () => {
    expect(apiClient.defaults.baseURL).toBe('https://campers-api.goit.study');
  });
});
