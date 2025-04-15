import styled from "styled-components";

const LabelText = styled.span(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.space.half,
  alignItems: "center",
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextCompressed,
}));

export default LabelText;
