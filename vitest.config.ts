import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['**/*.spec.tsx', '**/*.spec.ts'],
    exclude: ['**/node_modules/**', '**/cypress/**', '**/dist/**'],
    setupFiles: [resolve(__dirname, 'spec/support/registerContext.js')],
    setupFilesAfterEnv: [resolve(__dirname, 'spec/support/specHelper.js')],
  },
});

