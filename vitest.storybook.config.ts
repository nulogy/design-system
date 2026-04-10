/**
 * Vitest config for running Storybook stories as browser-mode tests.
 *
 * This is the spike replacement for Cypress. Instead of spinning up a full
 * Storybook dev server and driving a browser over the network, each story
 * with a `play` function is rendered directly by Vitest's browser mode
 * (Playwright/Chromium) using portable stories.
 *
 * Run with:
 *   pnpm test:storybook
 *
 * Or in watch mode:
 *   pnpm test:storybook:watch
 */

import { resolve } from "node:path";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		react(),
		storybookTest({
			configDir: resolve(__dirname, ".storybook"),
		}),
	],
	test: {
		name: "storybook",
		browser: {
			enabled: true,
			provider: playwright(),
			headless: true,
			instances: [{ browser: "chromium" }],
		},
		setupFiles: [resolve(__dirname, ".storybook/vitest.setup.ts")],
	},
});
