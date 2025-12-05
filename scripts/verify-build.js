#!/usr/bin/env node
/**
 * Verifies that the build output contains all expected files
 */

import { existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const rootDir = join(__dirname, "..");
const distDir = join(rootDir, "dist");

// Read package.json to get expected paths
const packageJson = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf-8"));

const requiredFiles = [
  packageJson.main, // dist/main.js
  packageJson.module, // dist/main.module.js
  packageJson.typings, // dist/src/index.d.ts
];

let hasErrors = false;

console.log("Verifying build output...\n");

// Check each required file
for (const file of requiredFiles) {
  const filePath = join(rootDir, file);
  if (existsSync(filePath)) {
    console.log(`✓ ${file}`);
  } else {
    console.error(`✗ ${file} - MISSING`);
    hasErrors = true;
  }
}

// Check that src directory exists with declaration files
const srcDir = join(distDir, "src");
if (existsSync(srcDir)) {
  console.log(`✓ dist/src/ directory exists`);
} else {
  console.error(`✗ dist/src/ directory - MISSING`);
  hasErrors = true;
}

// Check for source maps
const sourceMaps = [join(distDir, "main.js.map"), join(distDir, "main.module.js.map")];

for (const mapFile of sourceMaps) {
  const fileName = mapFile.replace(`${distDir}/`, "");
  if (existsSync(mapFile)) {
    console.log(`✓ ${fileName}`);
  } else {
    console.warn(`⚠ ${fileName} - missing (optional but recommended)`);
  }
}

console.log("");

if (hasErrors) {
  console.error("❌ Build verification failed!");
  process.exit(1);
} else {
  console.log("✅ Build verification passed!");
  process.exit(0);
}
