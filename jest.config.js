module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/tests/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^hook/(.*)$': '<rootDir>/src/hook/$1',
    '^graphql/querys/(.*)$': '<rootDir>/src/graphql/querys/$1',
    '^__generated__': '<rootDir>/src/__generated__',
    '^GraphqlPage': '<rootDir>/src/GraphqlPage',
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"]
};
