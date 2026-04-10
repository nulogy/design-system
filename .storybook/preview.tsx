import type { Decorator, Preview } from "@storybook/react-vite";
import { ALL_NDS_LOCALES, NDSProvider } from "../src";
import { desktop as theme } from "../src/theme";

const viewports = {
	extraSmall: {
		name: "Extra small",
		styles: {
			width: "320px",
			height: "100%",
		},
	},
	small: {
		name: "Small",
		styles: {
			width: theme.breakpoints.small,
			height: "100%",
		},
	},
	medium: {
		name: "Medium",
		styles: {
			width: theme.breakpoints.medium,
			height: "100%",
		},
	},
	large: {
		name: "Large",
		styles: {
			width: theme.breakpoints.large,
			height: "100%",
		},
	},
	extraLarge: {
		name: "Extra Large",
		styles: {
			width: theme.breakpoints.extraLarge,
			height: "100%",
		},
	},
};

const withThemeProvider: Decorator = (Story, context) => {
	const { theme, locale, desktopScale } = context.globals;

	return (
		<NDSProvider
			locale={locale}
			variant={theme}
			featureFlags={{
				experimentalDesktopTypographyScale: desktopScale === "experimental",
				navigationV3: true,
			}}
		>
			<Story />
		</NDSProvider>
	);
};

const preview: Preview = {
	parameters: {
		chromatic: { disableSnapshot: true },
		viewport: { options: viewports },
		layout: "padded",
		options: {
			storySort: {
				method: "alphabetical",
			},
		},
		docs: { codePanel: true },
	},
	globalTypes: {
		theme: {
			name: "Theme",
			description: "Global theme for components",
			toolbar: {
				icon: "browser",
				items: [
					{ value: "desktop", title: "Desktop" },
					{ value: "touch", title: "Touch" },
				],
				dynamicTitle: true,
			},
		},
		desktopScale: {
			name: "Desktop typography scale",
			description:
				"Toggles between the standard and the new experimental desktop typography scale",
			toolbar: {
				icon: "paragraph",
				items: [
					{ value: "standard", title: "Standard desktop scale" },
					{
						value: "experimental",
						title:
							"Experimental desktop scale (intended for design team testing)",
					},
				],
				dynamicTitle: true,
			},
		},
		locale: {
			name: "Locale",
			description: "NDSProvider Locale",
			toolbar: {
				icon: "globe",
				items: ALL_NDS_LOCALES.map((locale) => ({
					title: `${locale.label} - ${locale.value}`,
					value: locale.value,
				})),
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: "desktop",
		desktopScale: "standard",
		locale: "en_US",
	},
	decorators: [withThemeProvider],
	tags: ["autodocs"],
};

export default preview;
