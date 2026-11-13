module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
  transform: {
    '^.+\\.[jt]sx?$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      },
    ],
  },
  moduleNameMapper: {
    '^swiper/css.*$': '<rootDir>/src/test/fileMock.cjs',
    '\\.css$': 'identity-obj-proxy',
    '\\.(svg|png|jpe?g)$': '<rootDir>/src/test/fileMock.cjs',
  },
};
