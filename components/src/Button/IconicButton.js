import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import theme from "../theme";
import Icon from "../Icon/Icon";
import Text from "../Type/Text";
import icons from "../../icons/icons.json";
import { getTextWidth } from "../utils";

/*
BUG: the imposed width of the hidden label is slightly off and creates the look of
increased horizontal padding - likely a calculation error in getMargin
*/
function getMargin(text, font, padding, maxWidth) {
  const width = getTextWidth(text, font);
  const paddingInt = parseInt(padding.replace(".px", ""), 10);
  return (
    (width + (2 * paddingInt)) > maxWidth
      ? `-${maxWidth / 2}px`
      : `-${(width / 2) + paddingInt}px`
  );
}


const labelVisibilityText = props => {
  switch (props.labelVisibility) {
    case "always":
      return {
        display: "block",
        fontWeight: props.theme.fontWeights[2],
        textAlign: "left",
      };
    case "hover":
      return {
        display: "none",
        position: "absolute",
        fontSize: props.theme.fontSizes[0],
        fontWeight: props.theme.fontWeights[1],
        lineHeight: props.theme.lineHeights.smallTextCompressed,
        padding: props.theme.space[1],
        zIndex: "10",
        top: "40px",
        marginRight: getMargin(
          props.label,
          `${props.theme.fontSizes[0]} IBM Plex Sans`,
          `${props.theme.space[1]}px`,
          `${props.hiddlenLabelMaxWidth}`
        ),
        left: "25%",
        right: "25%",
        marginLeft: getMargin(
          props.label,
          `${props.theme.fontSizes[0]} IBM Plex Sans`,
          `${props.theme.space[1]}px`,
          `${props.hiddlenLabelMaxWidth}`
        ),
        borderRadius: props.theme.radii[0],
        background: props.theme.colors.lightBlue,
        pointerEvents: "none",
      };
    default:
      return {
        display: "block",
        fontWeight: props.theme.fontWeights[2],
        textAlign: "left",
      };
  }
};

const Wrapper = styled.button`
  ${space}
  background: transparent;
  border: none;
  position: relative;
  display: inline-flex;
  align-items: ${props => (props.labelVisibility ? "center" : null)};

  padding: ${theme.space[1]} ${theme.space[0]};
  color: ${theme.colors.darkBlue};
  cursor: ${props => (props.disabled ? "arrow" : "pointer")};

  ${Icon} {
    border-radius: 50%;
    transition: .2s;
    min-width: 32px;
  }
  ${Text} {
    ${labelVisibilityText}
  }
  &:hover{
    ${Icon} {
        background ${theme.colors.lightBlue};
    }
    ${Text} {
      display: ${props => (props.labelVisibility === "hover" ? "block" : null)};
    }
  }
  &:focus {outline: none;}
  &:active {
    ${Icon} {
      transform: scale(0.875); transition: .2s ease-in;}
    }
  }
  &:disabled {
    opacity: .5;
    &:hover, &:active {
      ${Icon} {
        background: none;
        transform: none;
      }
      ${Text} {
        display: ${props => (props.labelVisibility === "hover" ? "none" : null)};
      }
    }
  }
`;

const IconicButton = props => {
  const {
    children,
    icon,
  } = props;

  return (
    <Wrapper label={ children } { ...props }>
      <Icon size={ theme.space[5] } name={ icon } p={ 1 } />
      <Text mr={ 1 } mb={ 0 } ml={ 1 }>{ children }</Text>
    </Wrapper>
  );
};

export const names = Object.keys(icons);

IconicButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  theme: PropTypes.shape({}).isRequired,
  labelVisibility: PropTypes.oneOf(["always", "hover"]),
  icon: PropTypes.oneOf(names).isRequired,
  hiddlenLabelMaxWidth: PropTypes.number,
};

IconicButton.defaultProps = {
  disabled: false,
  labelVisibility: "hover",
  hiddlenLabelMaxWidth: "500",
};

export default IconicButton;
