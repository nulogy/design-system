import { variant } from "styled-system";
import styled from "styled-components";
import { addStyledProps } from "../StyledProps";
import { withComponentVariant } from "../NDSProvider/ComponentVariantContext";
import Text, { TextProps } from "./Text";

export const Heading1 = withComponentVariant(
  styled(Text).attrs(() => ({
    as: "h1",
  }))<TextProps>(
    ({ theme }) => ({
      fontSize: theme.fontSizes.heading1,
      lineHeight: theme.lineHeights.heading1,
      fontWeight: theme.fontWeights.light,
      marginTop: 0,
      marginBottom: theme.space.x6,
    }),
    ({ theme }) =>
      variant({
        variants: {
          touch: {
            fontWeight: theme.fontWeights.bold,
            marginBottom: theme.space.none,
          },
        },
      }),
    addStyledProps
  )
);

export const Heading2 = withComponentVariant(
  styled(Text).attrs(() => ({
    as: "h2",
  }))(
    ({ theme }) => ({
      fontSize: theme.fontSizes.heading2,
      lineHeight: theme.lineHeights.heading2,
      fontWeight: theme.fontWeights.normal,
      marginTop: 0,
      marginBottom: theme.space.x2,
    }),
    ({ theme }) =>
      variant({
        variants: {
          touch: {
            fontWeight: theme.fontWeights.bold,
            marginBottom: theme.space.none,
          },
        },
      }),
    addStyledProps
  )
);

export const Heading3 = withComponentVariant(
  styled(Text).attrs(() => ({
    as: "h3",
  }))(
    ({ theme }) => ({
      fontSize: theme.fontSizes.heading3,
      lineHeight: theme.lineHeights.heading3,
      fontWeight: theme.fontWeights.medium,
      marginTop: 0,
      marginBottom: theme.space.x1,
    }),
    ({ theme }) =>
      variant({
        variants: {
          touch: {
            fontWeight: theme.fontWeights.bold,
            marginBottom: theme.space.none,
          },
        },
      }),
    addStyledProps
  )
);

export const Heading4 = withComponentVariant(
  styled(Text).attrs(() => ({
    as: "h4",
  }))(
    ({ theme }) => ({
      fontSize: theme.fontSizes.heading4,
      lineHeight: theme.lineHeights.heading4,
      fontWeight: theme.fontWeights.bold,
      marginTop: 0,
      marginBottom: theme.space.x1,
    }),
    ({ theme }) =>
      variant({
        variants: {
          touch: {
            fontWeight: theme.fontWeights.bold,
            marginBottom: theme.space.none,
          },
        },
      }),
    addStyledProps
  )
);
