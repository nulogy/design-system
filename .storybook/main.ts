import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: ["../src/**/*.story.@(jsx|tsx)"],

	addons: [
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-vitest",
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
