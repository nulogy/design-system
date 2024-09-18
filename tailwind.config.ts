import type { Config } from "tailwindcss"
import config from "./src/theme/config"

export default {
  presets: [config],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
} satisfies Config
