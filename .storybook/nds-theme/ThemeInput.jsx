import styled from "styled-components";

export const ThemeSelect = styled.select(({ theme }) => ({
  fontFamily: `${theme.fonts.mono} !important`,
  padding: 0,
  width: "100%",
  fontSize: theme.fontSizes.small,
  border: 0,
  borderBottom: "1px solid #000",
  transition: ".2s",
  "&:focus": {
    outline: "none",
    boxShadow: "1px 1px 1px 0px rgba(0,0,0,1)",
  },
  lineHeight: theme.lineHeights.base,
}));

export const ThemeOption = styled.option(({ theme }) => ({
  fontFamily: `${theme.fonts.mono} !important`,
  padding: 0,
  width: "100%",
  fontSize: theme.fontSizes.small,
  border: 0,
  borderBottom: "1px solid #000",
  transition: ".2s",
  "&:focus": {
    outline: "none",
    boxShadow: "1px 1px 1px 0px rgba(0,0,0,1)",
  },
  lineHeight: theme.lineHeights.base,
}));
