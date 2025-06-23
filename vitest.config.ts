import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // include: ["**/*.spec.{js,ts}"],
    // exclude: ["**/*.cy.*", "dist"],
    environment: "jsdom",
    setupFiles: ["./spec/support/specHelper.ts"],
    // ...
  },
});