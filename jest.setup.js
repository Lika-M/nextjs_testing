// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// Polyfill is necessary for jsdom test environment
// reference: https://stackoverflow.com/a/68468204
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup MSW server
import { server } from "@/__tests__/__mocks__/msw/server";
import { resetDB } from "@/__tests__/__mocks__/db/utils/reset-db"

beforeAll(() => server.listen());
beforeEach(async () => {
  await resetDB();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
