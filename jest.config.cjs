module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.jest.json'  // ✅ Dùng file riêng cho Jest
    }
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
