import React from "react";
import styled from "styled-components";
import { space, color, SpaceProps, ColorProps } from "styled-system";
import { icons, IconDataEntry } from "../../icons/icons";
import theme from "../theme";

/* eslint-disable react/no-array-index-key */
const getPathElements = (icon: IconDataEntry) => (
  <React.Fragment>
    {icon.path.map((path, index) => (
      <path key={index} d={path} />
    ))}
  </React.Fragment>
);
/* eslint-enable react/no-array-index-key */

const Svg = React.forwardRef<SVGSVGElement, SvgProps>((props, ref) => {
  const { icon, title, size, color: fillColor, focusable } = props;

  if (!icons[icon]) return null;
  return (
    <svg
      ref={ref}
      aria-hidden={title == null}
      width={size}
      height={size}
      fill={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
      viewBox={icons[icon].viewBox}
      focusable={focusable}
      {...props}
    >
      {getPathElements(icons[icon])}
    </svg>
  );
});

interface SvgProps {
  icon: string; // TODO: Limit to iconNames
  size?: string | number;
  title?: string;
  color?: string;
  focusable?: string;
}

Svg.defaultProps = {
  color: "currentColor",
  size: "24px",
  focusable: "false"
};

const Icon = styled(Svg)<IconProps>(space, color, ({ size }) => ({
  minWidth: size
}));

interface IconProps extends SpaceProps, ColorProps {
  icon: string; // TODO: Limit to iconNames
  size?: string | number;
  title?: string;
  color?: string;
}

Icon.defaultProps = {
  color: "currentColor",
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

export const InlineIcon = (props: any) => (
  <IconContainer {...props}>
    <CenteredIcon size={`${iconSizeRatio}em`} {...props} />
  </IconContainer>
);

export default Icon;
