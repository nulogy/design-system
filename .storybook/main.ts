import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.story.@(jsx|tsx)"],

  addons: [
    "@storybook/addon-toolbars",
    "@storybook/addon-viewport",
    {
      name: "@storybook/addon-storysource",
      options: {
        rule: {
          test: [/\.story\.js?$/, /\.story\.tsx?$/],
        },
      },
    },
    "@storybook/addon-a11y",
    "@storybook/addon-actions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  async viteFinal(config) {
    // Merge with the main Vite config if needed
    // Storybook will use its own Vite config, but we can customize it here
    return config;
  },

  docs: {},

  typescript: {
    reactDocgen: false,
    check: false,
  },
};

export default config;
