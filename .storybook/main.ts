import type { StorybookConfig } from "@storybook/react-webpack5";

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
    "@storybook/addon-webpack5-compiler-babel",
    "@chromatic-com/storybook",
  ],

  framework: "@storybook/react-webpack5",

  docs: {},

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
