/**
 * Jest test setup file
 * Configures test environment and global utilities
 */

// Set test environment variables before any tests run
process.env.NODE_ENV = 'test';

// Global test timeout (in milliseconds)
jest.setTimeout(5000);

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
