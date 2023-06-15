import styled, { CSSObject } from "styled-components";
import { darken } from "polished";
import { themeGet } from "@styled-system/theme-get";
import { variant } from "styled-system";
import React from "react";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";

export type LinkProps = React.ComponentPropsWithRef<"a"> &
  StyledProps & {
    className?: string;
    underline?: boolean;
    hover?: string;
    as?: React.ElementType | string;
    size?: ComponentSize;
    to?: string;
    color?: string;
    fontSize?: string;
    theme?: DefaultNDSThemeType;
    children: JSX.Element | JSX.Element[] | React.ReactNode;
    "aria-label"?: string;
  };

const resetButtonStyles = {
  background: "none",
  border: "none",
};

function getColorFromProps(props: LinkProps) {
  return themeGet(`colors.${props.color}`, props.color)(props);
}

function getColor(props: LinkProps) {
  return getColorFromProps(props) || props.theme.colors.blue;
}

const getHoverColor = (props: LinkProps) => (props.hover ? getColor(props) : darken("0.1", getColor(props)));

const StyledLink = styled.a.withConfig<LinkProps>({
  shouldForwardProp: (prop, defaultValidatorFn) => !["underline", "hover"].includes(prop) && defaultValidatorFn(prop),
})(
  ({ underline, as, ...props }): CSSObject => ({
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
    prop: "size",
    variants: {
      large: {
        py: "x2",
        px: "0",
      },
      medium: {},
    },
  }),
  addStyledProps
);

const Link = React.forwardRef(({ size, ...props }: LinkProps, ref) => {
  const componentSize = useComponentSize(size);

  return <StyledLink size={componentSize} ref={ref} {...props} />;
});

Link.defaultProps = {
  underline: true,
};

export default Link;
