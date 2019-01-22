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
  } = props;

  if (!icons[name]) return false;
  return (
    <svg
      aria-hidden={ title == null }
      width={ size }
      height={ size }
      fill="currentcolor"
      viewBox={ icons[name].viewBox }
      { ...props }
    >
      <path d={ icons[name].path } />
    </svg>
  );
};

Svg.propTypes = {
  name: PropTypes.oneOf(names).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string.isRequired,
};

Svg.defaultProps = {
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

export const InlineIcon = ({
  fill, color, ...props
}) => (
  <IconContainer { ...props }>
    <CenteredIcon
      fill={ fill || color }
      size={ `${iconSizeRatio}em` }
      { ...props }
    />
  </IconContainer>
);

InlineIcon.propTypes = {
  fill: PropTypes.string,
  color: PropTypes.string,
  ...space.propTypes,
};

InlineIcon.defaultProps = {
  fill: "",
  color: "currentColor",
};

export default Icon;
