import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled, { ThemeContext } from "styled-components";
import { space, color } from "styled-system";
import icons from "@nulogy/icons";

import LoadingIcon from "./LoadingIcon";
import { StyledSvg } from "./StyledSvg";

const iconNames = Object.keys(icons);

/* eslint-disable react/no-array-index-key */
const getPathElements = icon => (
  <>
    {icon.path.map((path, index) => (
      <path key={index} d={path} />
    ))}
  </>
);
/* eslint-enable react/no-array-index-key */

const Svg = React.forwardRef((props, ref) => {
  const { icon, className, title, size, color: fillColor, focusable } = props;
  const theme = useContext(ThemeContext);
  if (icon === "loading") {
    return <LoadingIcon color={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor} {...props} />;
  }
  return (
    icons[icon] && (
      <StyledSvg
        ref={ref}
        aria-hidden={title == null}
        width={size}
        height={size}
        fill={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
        viewBox={icons[icon].viewBox}
        focusable={focusable}
        className={className}
        {...props}
      >
        {getPathElements(icons[icon])}
      </StyledSvg>
    )
  );
});

Svg.propTypes = {
  icon: PropTypes.oneOf([...iconNames, "loading"]).isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string,
  focusable: PropTypes.bool
};

Svg.defaultProps = {
  color: "currentColor",
  className: undefined,
  title: null,
  size: "24px",
  focusable: false
};

const Icon = styled(Svg)(space, color, ({ size }) => ({
  minWidth: size
}));

Icon.propTypes = {
  icon: PropTypes.oneOf([...iconNames, "loading"]).isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  color: PropTypes.string
};

Icon.defaultProps = {
  color: "currentColor",
  title: null,
  size: "24px"
};

const iconSizeRatio = 1.25;

const CenteredIcon = styled(Svg)(color, {
  position: "absolute",
  top: 0
});

const IconContainer = styled.span(space, {
  display: "inline-flex",
  alignSelf: "center",
  position: "relative",
  height: "1em",
  width: `${iconSizeRatio}em`
});

export const InlineIcon = props => (
  <IconContainer {...props}>
    <CenteredIcon size={`${iconSizeRatio}em`} {...props} />
  </IconContainer>
);

export default Icon;
