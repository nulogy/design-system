import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color } from "styled-system";
import icons from "../../icons/icons.json";

export const iconNames = Object.keys(icons);

const Svg = props => {
  const {
    name,
    title,
    size,
    color: fillColor,
  } = props;

  if (!icons[name]) return false;
  return (
    <svg
      aria-hidden={ title == null }
      width={ size }
      height={ size }
      fill={ fillColor }
      viewBox={ icons[name].viewBox }
      { ...props }
    >
      <path d={ icons[name].path } />
    </svg>
  );
};

Svg.propTypes = {
  name: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string,
};

Svg.defaultProps = {
  color: "currentColor",
  title: null,
  size: 24,
};

const Icon = styled(Svg)`
  ${space}
  ${color}  
`;

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

export const InlineIcon = (props => (
  <IconContainer { ...props }>
    <CenteredIcon
      size={ `${iconSizeRatio}em` }
      { ...props }
    />
  </IconContainer>
));

export default Icon;
