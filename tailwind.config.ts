import type { Config } from "tailwindcss"
import config from "./src/theme/tailwind-preset"

export default {
  presets: [config],
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./storybook/preview.tsx"],
} satisfies Config
