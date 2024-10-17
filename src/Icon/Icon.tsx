import React from "react";
import styled, { CSSObject, useTheme } from "styled-components";
import { display, DisplayProps, space, SpaceProps } from "styled-system";
import icons from "@nulogy/icons";
import LoadingIcon from "./LoadingIcon";

interface IconProps extends SpaceProps {
  icon: keyof typeof icons | "loading";
  className?: string;
  size?: string;
  title?: string;
  color?: string;
  focusable?: boolean;
  style?: React.CSSProperties;
}

/* eslint-disable react/no-array-index-key */
const getPathElements = (icon: any) => (
  <>
    {icon.path.map((path: string, index: number) => (
      <path key={index} d={path} />
    ))}
  </>
);
/* eslint-enable react/no-array-index-key */

const Svg = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      color: fillColor = "currentColor",
      className = undefined,
      title = undefined,
      size = "24px",
      focusable = false,
      icon,
      ...props
    }: IconProps,
    ref
  ) => {
    const theme = useTheme();

    if (icon === "loading") {
      return (
        <LoadingIcon
          color={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
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
          width={theme.space[size] || size}
          height={theme.space[size] || size}
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

const Icon = styled(Svg)<IconProps>(
  space,
  ({ color = "currentColor", size = "24px" }): CSSObject => ({
    minWidth: size,
    color: color,
  })
);

const iconSizeRatio = 1.25;

const CenteredIcon = styled(Svg)({
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

export function InlineIcon(props: IconProps) {
  return (
    <IconContainer {...props}>
      <CenteredIcon size={`${iconSizeRatio}em`} {...props} />
    </IconContainer>
  );
}

export default Icon;
