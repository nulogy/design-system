import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color } from "styled-system";
import icons from "../../icons/icons.json";

export const iconNames = Object.keys(icons);

const Svg = props => {
  const {
    icon,
    title,
    size,
    color: fillColor,
  } = props;

  if (!icons[icon]) return false;
  return (
    <svg
      aria-hidden={ title == null }
      width={ size }
      height={ size }
      fill={ fillColor }
      viewBox={ icons[icon].viewBox }
      { ...props }
    >
      <path d={ icons[icon].path } />
    </svg>
  );
};

Svg.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string,
};

Svg.defaultProps = {
  color: "currentColor",
  title: null,
  size: "24px",
};

const Icon = styled(Svg)(
  space,
  color,
  ({ size }) => ({
    minWidth: size,
  })
);

Icon.propTypes = {
  icon: PropTypes.oneOf(iconNames).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string,
};

Icon.defaultProps = {
  color: "currentColor",
  title: null,
  size: "24px",
};

const iconSizeRatio = 1.25;

const CenteredIcon = styled(Svg)(
  color,
  {
    position: "absolute",
    top: 0,
  }
);

const IconContainer = styled.span(
  space,
  {
    display: "inline-flex",
    alignSelf: "center",
    position: "relative",
    height: "1em",
    width: `${iconSizeRatio}em`,
  }
);

export const InlineIcon = (props => (
  <IconContainer { ...props }>
    <CenteredIcon
      size={ `${iconSizeRatio}em` }
      { ...props }
    />
  </IconContainer>
));

export default Icon;
