import React from "react";
import styled, { useTheme } from "styled-components";
import { space, SpaceProps } from "styled-system";
import icons from "@nulogy/icons";
import LoadingIcon from "./LoadingIcon";

interface IconProps extends SpaceProps {
  icon: string;
  className?: string;
  size?: string;
  title?: string;
  color?: string;
  focusable?: boolean;
  style?: React.CSSProperties;
}

const getPathElements = (icon: any) => (
  <>
    {icon.path.map((path: string, index: number) => (
      <path key={index} d={path} />
    ))}
  </>
);

const ICON_SIZE_RATIO = 1.25;

const Svg = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      color: fillColor = "currentColor",
      className = undefined,
      title = undefined,
      size,
      focusable = false,
      icon,
      ...props
    }: IconProps,
    ref
  ) => {
    const theme = useTheme();
    size ||= theme.sizes.x3;

    if (icon === "loading") {
      return (
        <LoadingIcon
          ref={ref}
          aria-hidden={title == null}
          width={theme.space[size] || size}
          height={theme.space[size] || size}
          fill={theme.colors[fillColor] ? theme.colors[fillColor] : fillColor}
          focusable={focusable}
          className={`${className} nds-icon--${icon}`}
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

const Icon = styled(Svg)<IconProps>(space, ({ theme, color = "currentColor", size = theme.sizes.x3 }) => ({
  minWidth: size,
  color: color,
}));

const CenteredIcon = styled(Svg)({
  position: "absolute",
  top: 0,
});

const IconContainer = styled.span(space, {
  display: "inline-flex",
  alignSelf: "center",
  position: "relative",
  height: "1em",
  width: `${ICON_SIZE_RATIO}em`,
});

export function InlineIcon(props: IconProps) {
  return (
    <IconContainer {...props}>
      <CenteredIcon size={`${ICON_SIZE_RATIO}em`} {...props} />
    </IconContainer>
  );
}

export default Icon;
