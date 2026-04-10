import { styled } from "styled-components";

const GlobalStyles = styled.div<{
	locale?: string;
}>(({ theme, locale }) => {
	const localeFontMap: Record<string, string> = {
		zh_CN: theme.fonts.sc,
		ja_JP: theme.fonts.jp,
	};
	const fontFamily = (locale && localeFontMap[locale]) || theme.fonts.base;
	return {
		color: theme.colors.black,
		fontFamily,
		fontSize: theme.fontSizes.base,
		lineHeight: theme.lineHeights.base,
		"-webkit-font-smoothing": "antialiased",
		"-moz-osx-font-smoothing": "grayscale",
		"*": {
			boxSizing: "border-box",
		},
		img: {
			maxWidth: "100%",
			height: "auto",
		},
		button: {
			fontFamily,
		},
		input: {
			fontFamily,
		},
		textarea: {
			fontFamily,
		},
	};
});

export default GlobalStyles;
