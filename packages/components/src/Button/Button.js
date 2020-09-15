import styled from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import React from "react";
import PropTypes from "prop-types";
import icons from "@nulogy/icons";

import { Icon } from "../Icon";
import NDSTheme from "../theme";
import { subPx } from "../utils";

const iconNames = Object.keys(icons);

const getSize = (size, theme) => {
  switch (size) {
    case "small":
      return {
        fontSize: `${theme.fontSizes.small}`,
        lineHeight: `${theme.lineHeights.smallTextCompressed}`,
        padding: `${subPx(theme.space.half)} ${theme.space.x1}`
      };
    case "medium":
      return {
        fontSize: `${theme.fontSizes.medium}`,
        padding: `${subPx(theme.space.x1)} ${theme.space.x2}`
      };
    case "large":
      return {
        fontSize: `${theme.fontSizes.large}`,
        lineHeight: `${theme.lineHeights.subsectionTitle}`,
        padding: `${subPx(theme.space.x2)} ${theme.space.x3}`
      };
    default:
      return {
        fontSize: `${theme.fontSizes.medium}`,
        padding: `${subPx(theme.space.x1)} ${theme.space.x2}`
      };
  }
};

const WrapperButton = styled.button(
  ({ fullWidth }) => ({
    width: fullWidth ? "100%" : "auto"
  }),
  ({ disabled, theme }) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: theme.fontWeights.medium,
    textDecoration: "none",
    verticalAlign: "middle",
    lineHeight: theme.lineHeights.base,
    cursor: disabled ? "default" : "pointer",
    color: theme.colors.blue,
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.red}`,
    borderRadius: theme.radii.medium,
    margin: theme.space.none,
    transition: "background-color .2s, transform .2s ease-in",
    "&:hover": {
      backgroundColor: disabled ? null : theme.colors.lightBlue
    },
    "&:focus": {
      outline: "none",
      borderColor: theme.colors.blue,
      boxShadow: theme.shadows.focus,
      backgroundColor: theme.colors.white,
      "&:hover": {
        backgroundColor: theme.colors.lightBlue
      }
    },
    "&:active": {
      transform: "scale(0.98)"
    },
    "&:disabled": {
      opacity: ".5"
    }
  }),
  ({ size, theme }) => ({
    ...getSize(size, theme)
  }),
  space
);

const Button = React.forwardRef(({ children, iconSide, icon, className, asLink, ...props }, ref) => {
  const {
    lineHeights: { smallTextCompressed }
  } = NDSTheme;
  return (
    <WrapperButton as={asLink ? "a" : undefined} ref={ref} className={className} {...props}>
      {icon && iconSide === "left" && <Icon size={`${smallTextCompressed}em`} mr="half" icon={icon} />}
      {children}
      {icon && iconSide === "right" && <Icon size={`${smallTextCompressed}em`} ml="half" icon={icon} />}
    </WrapperButton>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  icon: PropTypes.oneOf(iconNames),
  iconSide: PropTypes.oneOf(["left", "right"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  asLink: PropTypes.bool,
  ...propTypes.space
};

Button.defaultProps = {
  className: undefined,
  icon: null,
  iconSide: "right",
  size: "medium",
  disabled: false,
  fullWidth: false,
  asLink: false
};

export default Button;
