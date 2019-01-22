import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color } from "styled-system";
import icons from "../../icons/icons.json";

<<<<<<< HEAD
export const iconNames = Object.keys(icons)
=======
export const names = Object.keys(icons);
>>>>>>> Apply eslint auto-fixes

const Svg = props => {
  if (!icons[props.name]) return false;
  return (
    <svg
      aria-hidden={ props.title == null }
      width={ props.size }
      height={ props.size }
      fill="currentcolor"
      viewBox={ icons[props.name].viewBox }
      { ...props }
    >
      <path d={ icons[props.name].path } />
    </svg>
  );
};

const Icon = styled(Svg)`
  ${space}
  ${color}  
`;

Icon.defaultProps = {
  size: 24,
};

Icon.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string,
};

const iconSizeRatio = 1.25;

const CenteredIcon = styled(Svg)`
  top: 0;
  position: absolute;
  ${color}
`;

const IconContainer = styled.span`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: 1em;
  width: ${iconSizeRatio}em;
  ${space}
`;

export const InlineIcon = ({
  title, fill, color, name, ...props
}) => (
  <IconContainer { ...props }>
    <CenteredIcon
      title={ title }
      fill={ fill || color || "currentColor" }
      size={ `${iconSizeRatio}em` }
      name={ name }
    />
  </IconContainer>
);

InlineIcon.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired,  
  title: PropTypes.string,
  fill: PropTypes.string,
  color: PropTypes.string,
  ...space.propTypes,
};

export default Icon;
