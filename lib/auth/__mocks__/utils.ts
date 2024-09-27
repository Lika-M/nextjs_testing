module.exports = {
  esModule: true,
  validateToken: jest.fn().mockResolvedValue(true)
}

// To satisfy TypeScript
export {};

// Mock module in test file
// jest.mock("@/lib/auth/utils")