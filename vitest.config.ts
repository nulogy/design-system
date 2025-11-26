import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['**/*.spec.tsx', '**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/cypress/**', '**/dist/**'],
    setupFiles: [resolve(__dirname, 'spec/support/registerContext.js')],
    setupFilesAfterEnv: [resolve(__dirname, 'spec/support/specHelper.js')],
  },
});

