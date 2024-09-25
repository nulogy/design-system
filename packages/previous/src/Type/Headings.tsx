import styled from "styled-components";
import { addStyledProps } from "../StyledProps";
import Text, { TextProps } from "./Text";

export const Heading1 = styled(Text).attrs(() => ({
  as: "h1",
}))<TextProps>(
  ({ theme }) => ({
    fontSize: theme.fontSizes.heading1,
    lineHeight: theme.lineHeights.heading1,
    fontWeight: theme.fontWeights.light,
    marginTop: 0,
    marginBottom: theme.space.x6,
  }),
  addStyledProps
);

export const Heading2 = styled(Text).attrs(() => ({
  as: "h2",
}))(
  ({ theme }) => ({
    fontSize: theme.fontSizes.heading2,
    lineHeight: theme.lineHeights.heading2,
    fontWeight: theme.fontWeights.normal,
    marginTop: 0,
    marginBottom: theme.space.x2,
  }),
  addStyledProps
);

export const Heading3 = styled(Text).attrs(() => ({
  as: "h4",
}))(
  ({ theme }) => ({
    fontSize: theme.fontSizes.heading3,
    lineHeight: theme.lineHeights.heading3,
    fontWeight: theme.fontWeights.medium,
    marginTop: 0,
    marginBottom: theme.space.x1,
  }),
  addStyledProps
);

export const Heading4 = styled(Text).attrs(() => ({
  as: "h4",
}))(
  ({ theme }) => ({
    fontSize: theme.fontSizes.heading4,
    lineHeight: theme.lineHeights.heading4,
    fontWeight: theme.fontWeights.bold,
    marginTop: 0,
    marginBottom: theme.space.x1,
  }),
  addStyledProps
);
