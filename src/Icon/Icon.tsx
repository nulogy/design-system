import React from "react";
import styled, { CSSObject } from "styled-components";
import { space, color, SpaceProps } from "styled-system";
import icons from "@nulogy/icons";

import theme from "../theme";
import LoadingIcon from "./LoadingIcon";

const iconNames = Object.keys(icons);

type SvgProps = SpaceProps & {
  icon: string;
  className?: string;
  size?: string;
  title?: string;
  color?: string;
  focusable?: boolean;
};

/* eslint-disable react/no-array-index-key */
const getPathElements = (icon: any) => (
  <>
    {icon.path.map((path: string, index: number) => (
      <path key={index} d={path} />
    ))}
  </>
);
/* eslint-enable react/no-array-index-key */

const Svg = React.forwardRef<SVGSVGElement, SvgProps>(
  (
    {
      icon,
      size,
      focusable,
      className,
      color: fillColor,
      title,
      ...props
    }: SvgProps,
    ref
  ) => {
    if (icon === "loading") {
      return (
        <LoadingIcon
          color={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
          size={size}
          className={className}
          {...props}
        />
      );
    }
    return (
      icons[icon] && (
        <svg
          ref={ref}
          aria-hidden={title == null}
          width={size}
          height={size}
          fill={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
          viewBox={icons[icon].viewBox}
          focusable={focusable}
          className={`${className} nds-icon--${icon}`}
          {...props}
        >
          {getPathElements(icons[icon])}
        </svg>
      )
    );
  }
);

Svg.defaultProps = {
  color: "currentColor",
  className: undefined,
  title: undefined,
  size: "24px",
  focusable: false,
};

const Icon = styled(Svg)<SvgProps>(
  space,
  color,
  ({ size }: SvgProps): CSSObject => ({
    minWidth: size,
  })
);

Icon.defaultProps = {
  color: "currentColor",
  title: undefined,
  size: "24px",
};

const iconSizeRatio = 1.25;

const CenteredIcon = styled(Svg)(color, {
  position: "absolute",
  top: 0,
});

const IconContainer = styled.span(space, {
  display: "inline-flex",
  alignSelf: "center",
  position: "relative",
  height: "1em",
  width: `${iconSizeRatio}em`,
});

export const InlineIcon = (props: SvgProps) => (
  <IconContainer {...props}>
    <CenteredIcon size={`${iconSizeRatio}em`} {...props} />
  </IconContainer>
);

export default Icon;
