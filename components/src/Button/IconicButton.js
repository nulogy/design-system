import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import { Icon, Text } from "ComponentsRoot";
import theme from "../theme";
import icons from "../../icons/icons.json";

const Wrapper = styled.button(
  space,
  ({ disabled }) => ({
    background: "transparent",
    border: "none",
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    padding: `${theme.space[1]} ${theme.space[0]}`,
    color: theme.colors.darkBlue,
    cursor: disabled ? "arrow" : "pointer",

    [`${Icon}`]: {
      borderRadius: theme.radii.circle,
      transition: ".2s",
    },
    [`${Text}`]: {
      display: "block",
      fontWeight: theme.fontWeights.medium,
      textAlign: "left",
    },
    "&:hover, &:focus": {
      outline: "none",
      [`${Icon}`]: {
        backgroundColor: theme.colors.lightBlue,
      },
    },
    "&:active": {
      [`${Icon}`]: {
        transform: "scale(0.875)",
        transition: ".2s ease-in",
      },
    },
    "&:disabled": {
      opacity: ".5",
      "&:hover, &:active": {
        [`${Icon}`]: {
          background: "none",
          transform: "none",
        },
      },
    },
  })
);

const IconicButton = props => {
  const {
    children,
    icon,
  } = props;

  return (
    <Wrapper label={ children } { ...props }>
      <Icon size={ theme.space[5] } icon={ icon } p={ 1 } />
      <Text mr={ 1 } ml={ 1 }>{ children }</Text>
    </Wrapper>
  );
};

export const iconNames = Object.keys(icons);

IconicButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.oneOf(iconNames).isRequired,
};

IconicButton.defaultProps = {
  disabled: false,
};

export default IconicButton;
