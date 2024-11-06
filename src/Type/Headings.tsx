import { variant } from "styled-system";
import styled from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps } from "../StyledProps";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import Text, { TextProps } from "./Text";

const useVariantStyles = ({ theme }: { theme: DefaultNDSThemeType }) => {
  const componentVariant = useComponentVariant();

  return variant({
    variants: {
      touch: {
        fontWeight: theme.fontWeights.bold,
        marginBottom: theme.space.none,
      },
    },
    prop: "variant",
  })({ theme, variant: componentVariant });
};

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
  useVariantStyles,
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
  useVariantStyles,
  addStyledProps
);

export const Heading3 = styled(Text).attrs(() => ({
  as: "h3",
}))(
  ({ theme }) => ({
    fontSize: theme.fontSizes.heading3,
    lineHeight: theme.lineHeights.heading3,
    fontWeight: theme.fontWeights.medium,
    marginTop: 0,
    marginBottom: theme.space.x1,
  }),
  useVariantStyles,
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
  useVariantStyles,
  addStyledProps
);
