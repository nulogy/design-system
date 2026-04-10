import type { DefaultNDSThemeType, ThemeType } from "./theme.type";

export const mergeThemes = (
	theme: DefaultNDSThemeType,
	customTheme: ThemeType,
): DefaultNDSThemeType => {
	const result = { ...theme };
	for (const group of Object.keys(theme)) {
		if (customTheme && result[group] && customTheme[group]) {
			result[group] = { ...result[group], ...customTheme[group] };
		}
	}
	return result;
};
