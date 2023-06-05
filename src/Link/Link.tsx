import styled, { CSSObject } from "styled-components";
import { darken } from "polished";
import { themeGet } from "@styled-system/theme-get";
import { DefaultNDSThemeType } from "../theme.type";
import { addStyledProps, StyledProps } from "../StyledProps";
import { ComponentSize } from "../Input/InputField";

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

const getSize = (size: ComponentSize, theme: DefaultNDSThemeType): CSSObject => {
  switch (size) {
    case "large":
      return {
        padding: `${theme.space.x2} 0`,
      };

    case "medium":
    default:
      return {
        // No padding
      };
  }
};

const Link = styled.a.withConfig<LinkProps>({
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
  ({ size, theme }) => getSize(size, theme),
  addStyledProps
);

Link.defaultProps = {
  underline: true,
};

export default Link;
