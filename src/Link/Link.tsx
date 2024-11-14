import styled from "styled-components";
import { darken } from "polished";
import { themeGet } from "@styled-system/theme-get";
import { variant } from "styled-system";
import React from "react";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

export type LinkProps = React.ComponentPropsWithRef<"a"> &
  Partial<StyledProps> & {
    underline?: boolean;
    hover?: string;
    variant?: ComponentVariant;
    to?: string;
    as?: React.ElementType | string;
  };

const resetButtonStyles = {
  background: "none",
  border: "none",
};

type StyledLinkProps = LinkProps & {
  theme: DefaultNDSThemeType;
};

function getColorFromProps(props: StyledLinkProps) {
  return themeGet(`colors.${props.color}`, props.color)(props);
}

function getColor(props: StyledLinkProps) {
  return getColorFromProps(props) || props.theme.colors.blue;
}

const getHoverColor = (props: StyledLinkProps) => (props.hover ? getColor(props) : darken("0.1", getColor(props)));

const Link = styled.a<LinkProps>(
  ({ underline = true, as, ...props }) => ({
    ...resetButtonStyles,
    padding: as === "button" ? "0" : undefined,
    textDecoration: underline ? "underline" : "none",
    fontSize: props.theme.fontSizes.medium,
    color: getColor(props),
    "&:hover": {
      cursor: "pointer",
      color: getHoverColor(props),
    },
  }),
  variant({
    variants: {
      touch: {},
    },
  }),
  addStyledProps
);

export default Link;
