import styled from "styled-components";
import { space } from "styled-system";
import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon";
import theme from "../theme";
import { icons } from "../../icons/icons";
import { subPx, omit } from "../utils";

const iconNames = Object.keys(icons);

const size = props => {
  switch (props.size) {
    case "small":
      return {
        fontSize: `${props.theme.fontSizes.small}`,
        lineHeight: `${props.theme.lineHeights.smallTextCompressed}`,
        padding: `${subPx(props.theme.space.half)} ${props.theme.space.x1}`
      };
    case "medium":
      return {
        fontSize: `${props.theme.fontSizes.medium}`,
        padding: `${subPx(props.theme.space.x1, 1)} ${props.theme.space.x2}`
      };
    case "large":
      return {
        fontSize: `${props.theme.fontSizes.large}`,
        lineHeight: `${props.theme.lineHeights.subsectionTitle}`,
        padding: `${subPx(props.theme.space.x2)} ${props.theme.space.x3}`
      };
    default:
      return {
        fontSize: `${props.theme.fontSizes.medium}`,
        padding: `${subPx(props.theme.space.x1)} ${props.theme.space.x2}`
      };
  }
};

const BaseButton = React.forwardRef(({ children, iconSide, icon, ...props }, ref) => {
  const {
    lineHeights: { smallTextCompressed }
  } = theme;
  return (
    <button ref={ref} {...omit(props, "fullWidth")}>
      {icon && iconSide === "left" && <Icon size={`${smallTextCompressed}em`} mr="half" icon={icon} />}
      {children}
      {icon && iconSide === "right" && <Icon size={`${smallTextCompressed}em`} ml="half" icon={icon} />}
    </button>
  );
});

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(iconNames),
  iconSide: PropTypes.oneOf(["left", "right"])
};

BaseButton.defaultProps = {
  icon: null,
  iconSide: "right"
};

const Button = styled(BaseButton)(
  size,
  ({ disabled, fullWidth }) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: theme.fontWeights.medium,
    textDecoration: "none",
    verticalAlign: "middle",
    lineHeight: theme.lineHeights.base,
    transition: ".2s",
    cursor: disabled ? "default" : "pointer",
    color: theme.colors.blue,
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.darkBlue}`,
    borderRadius: theme.radii.medium,
    width: fullWidth ? "100%" : "auto",
    margin: theme.space.none,
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
      transform: "scale(0.98)",
      transition: ".2s ease-in"
    },
    "&:disabled": {
      opacity: ".5"
    }
  }),
  space
);

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  ...space.propTypes
};

export default Button;
