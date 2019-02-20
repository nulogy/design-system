import styled from "styled-components";
import { space } from "styled-system";
import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Icon, { iconNames } from "../Icon/Icon";
import { subPx, omit } from "../Utils";

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
  const { theme: { lineHeights: { smallTextCompressed } } } = props;

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
  theme: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(iconNames),
  iconSide: PropTypes.oneOf(["left", "right"]),
};

BaseButton.defaultProps = {
  icon: null,
  iconSide: "right",
};


const Button = styled(BaseButton)`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-weight: ${props => props.theme.fontWeights[2]};
    text-decoration: none;
    vertical-align: middle;
    line-height: ${props => props.theme.lineHeights.base};
    transition: .2s;
    cursor: ${props => (props.disabled ? "arrow" : "pointer")};
    color: ${props => props.theme.colors.blue};
    border: 1px solid ${props => props.theme.colors.darkBlue};
    border-radius: ${props => props.theme.radii.medium};

    ${props => (props.fullWidth ? { width: "100%;" } : null)}
    ${size}
    ${space}

    &:hover, &:focus {
      outline: none;
      background-color: ${props => (props.disabled ? null : props.theme.colors.lightBlue)};
    }
    &:active {
      transform: scale(0.98); 
      transition: .2s ease-in;
    }
    &:disabled {
      opacity: .5;
    }
`;
Button.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  ...space.propTypes,
};

Button.defaultProps = {
  theme,
};

export default Button;
