import styled, { CSSObject } from "styled-components";
import { darken } from "polished";
import { themeGet } from "@styled-system/theme-get";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";

export type LinkProps = React.ComponentPropsWithRef<"a"> &
  StyledProps & {
    className?: string;
    underline?: boolean;
    hover?: string;
    as?: React.ElementType | string;
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

const Link = styled.a.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !["underline", "hover"].includes(prop) && defaultValidatorFn(prop),
})<LinkProps>(
  ({ underline, as, ...props }: LinkProps): CSSObject => ({
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
  addStyledProps
);

Link.defaultProps = {
  underline: true,
};

export default Link;
