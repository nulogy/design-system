import styled from "styled-components";
import { addStyledProps, variant } from "../StyledProps";
import Text, { TextProps } from "./Text";

export const Heading1 = styled(Text).attrs(() => ({
  as: "h1",
}))<TextProps>(
  ({ theme, compact }) => ({
    fontSize: theme.fontSizes.heading1,
    lineHeight: theme.lineHeights.heading1,
    fontWeight: theme.fontWeights.light,
    marginTop: 0,
    marginBottom: compact ? theme.space.none : theme.space.x6,
  }),
  variant({
    variants: {
      touch: {
        fontWeight: "medium",
        marginBottom: "none",
      },
    },
  }),
  addStyledProps
);

export const Heading2 = styled(Text).attrs(() => ({
  as: "h2",
}))(
  ({ theme, compact }) => ({
    fontSize: theme.fontSizes.heading2,
    lineHeight: theme.lineHeights.heading2,
    fontWeight: theme.fontWeights.normal,
    marginTop: 0,
    marginBottom: compact ? theme.space.none : theme.space.x2,
  }),
  variant({
    variants: {
      touch: {
        fontWeight: "medium",
        marginBottom: "none",
      },
    },
  }),
  addStyledProps
);

export const Heading3 = styled(Text).attrs(() => ({
  as: "h3",
}))(
  ({ theme, compact }) => ({
    fontSize: theme.fontSizes.heading3,
    lineHeight: theme.lineHeights.heading3,
    fontWeight: theme.fontWeights.medium,
    marginTop: 0,
    marginBottom: compact ? theme.space.none : theme.space.x1,
  }),
  variant({
    variants: {
      touch: {
        fontWeight: "medium",
        marginBottom: "none",
      },
    },
  }),
  addStyledProps
);

export const Heading4 = styled(Text).attrs(() => ({
  as: "h4",
}))(
  ({ theme, compact }) => ({
    fontSize: theme.fontSizes.heading4,
    lineHeight: theme.lineHeights.heading4,
    fontWeight: theme.fontWeights.bold,
    marginTop: 0,
    marginBottom: compact ? theme.space.none : theme.space.x1,
  }),
  variant({
    variants: {
      touch: {
        fontWeight: "medium",
        marginBottom: "none",
      },
    },
  }),
  addStyledProps
);
