import '@testing-library/jest-dom/jest-globals';

import { jest } from '@jest/globals';

const { TextDecoder, TextEncoder } = jest.requireActual('node:util') as {
  TextDecoder: typeof globalThis.TextDecoder;
  TextEncoder: typeof globalThis.TextEncoder;
};

Object.assign(globalThis, { TextDecoder, TextEncoder });
