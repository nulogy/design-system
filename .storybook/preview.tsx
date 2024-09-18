import type { Preview } from "@storybook/react"
import config from "../src/theme/config"
import "../src/theme/output.css"
import NDSProvider from "../src/theme/NDSProvider"

const VIEW_PORTS = {
  small: {
    name: "Small",
    styles: {
      width: config.theme.screens.sm,
      height: "100%",
    },
  },
  medium: {
    name: "Medium",
    styles: {
      width: config.theme.screens.md,
      height: "100%",
    },
  },
  large: {
    name: "Large",
    styles: {
      width: config.theme.screens.lg,
      height: "100%",
    },
  },
  extraLarge: {
    name: "Extra Large",
    styles: {
      width: config.theme.screens.xl,
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
