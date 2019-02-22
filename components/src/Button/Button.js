import styled from "styled-components";
import { space } from "styled-system";
import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import icons from "../../icons/icons.json";
import { subPx, omit } from "../Utils";
import { Icon } from "../index";

const iconNames = Object.keys(icons);

const size = props => {
  switch (props.size) {
    case "small":
      return {
        fontSize: `${props.theme.fontSizes[0]}`,
        lineHeight: `${props.theme.lineHeights.smallTextCompressed}`,
        padding: `${subPx(props.theme.space[1])} ${props.theme.space[2]}`,
      };
    case "medium":
      return {
        fontSize: `${props.theme.fontSizes[1]}`,
        padding: `${subPx(props.theme.space[2], 1)} ${props.theme.space[3]}`,
      };
    case "large":
      return {
        fontSize: `${props.theme.fontSizes[2]}`,
        lineHeight: `${props.theme.lineHeights.subsectionTitle}`,
        padding: `${subPx(props.theme.space[3])} ${props.theme.space[4]}`,

      };
    default:
      return {
        fontSize: `${props.theme.fontSizes[1]}`,
        padding: `${subPx(props.theme.space[2])} ${props.theme.space[3]}`,
      };
  }
};

const BaseButton = ({
  children,
  iconSide,
  icon,
  ...props
}) => {
  const { lineHeights: { smallTextCompressed } } = theme;

  return (
    <button { ...omit(props, "fullWidth") }>
      {(icon && iconSide === "left")
          && (
          <Icon size={ `${smallTextCompressed}em` } mr={ 1 } icon={ icon } />
          )
        }
      {children}
      {(icon && iconSide === "right")
          && (
          <Icon size={ `${smallTextCompressed}em` } ml={ 1 } icon={ icon } />
          )
        }
    </button>
  );
};

BaseButton.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(iconNames),
  iconSide: PropTypes.oneOf(["left", "right"]),
};

BaseButton.defaultProps = {
  icon: null,
  iconSide: "right",
};


const Button = styled(BaseButton)(
  space,
  size,
  ({ disabled, fullWidth }) => ({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: theme.fontWeights[2],
    textDecoration: "none",
    verticalAlign: "middle",
    lineHeight: theme.lineHeights.base,
    transition: ".2s",
    cursor: disabled ? "arrow" : "pointer",
    color: theme.colors.blue,
    border: `1px solid ${theme.colors.darkBlue}`,
    borderRadius: theme.radii.medium,
    width: fullWidth ? "100%" : "auto",
    "&:hover, &:focus": {
      outline: "none",
      backgroundColor: disabled ? null : theme.colors.lightBlue,
    },
    "&:active": {
      transform: "scale(0.98)",
      transition: ".2s ease-in",
    },
    "&:disabled": {
      opacity: ".5",
    },
  })
);

Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  ...space.propTypes,
};

export default Button;
