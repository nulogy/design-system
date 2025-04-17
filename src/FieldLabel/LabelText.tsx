import styled from "styled-components";

export const LabelContent = styled.span(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.space.x0_5,
  alignItems: "baseline",
}));

export const LabelText = styled.span(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextCompressed,
}));

export default LabelText;
