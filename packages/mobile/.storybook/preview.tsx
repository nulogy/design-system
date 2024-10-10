import type { Preview } from "@storybook/react"
import preset from "../src/theme/tailwind-preset"
import "../src/theme/main.css"
import NDSProvider from "../src/providers/nds-provider"

const VIEW_PORTS = {
  small: {
    name: "Small",
    styles: {
      width: preset.theme.screens.sm,
      height: "100%",
    },
  },
  medium: {
    name: "Medium",
    styles: {
      width: preset.theme.screens.md,
      height: "100%",
    },
  },
  large: {
    name: "Large",
    styles: {
      width: preset.theme.screens.lg,
      height: "100%",
    },
  },
  extraLarge: {
    name: "Extra Large",
    styles: {
      width: preset.theme.screens.xl,
      height: "100%",
    },
  },
}

const preview: Preview = {
  parameters: {
    viewport: {
      viewports: VIEW_PORTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <NDSProvider>
        <Story />
      </NDSProvider>
    ),
  ],
}

export default preview
