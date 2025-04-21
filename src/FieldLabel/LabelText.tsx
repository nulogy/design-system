import styled from "styled-components";

export const LabelContent = styled.span(({ theme }) => ({
  "& > *": {
    display: "inline-block",
    verticalAlign: "middle",
  },
  "& > *:not(:last-child)": {
    marginRight: theme.space.half,
  },
}));

export const LabelText = styled.span(({ theme }) => ({
  display: "inline",
  verticalAlign: "middle",
  marginRight: theme.space.half,
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextCompressed,
  fontWeight: theme.fontWeights.bold,
}));

export default LabelText;
