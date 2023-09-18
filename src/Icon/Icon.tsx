import React from "react";
import styled, { CSSObject, useTheme } from "styled-components";
import { space, SpaceProps } from "styled-system";
import icons from "@nulogy/icons";

import theme from "../theme";
import LoadingIcon from "./LoadingIcon";

type IconProps = SpaceProps & {
  icon: string;
  className?: string;
  size?: string;
  title?: string;
  color?: string;
  focusable?: boolean;
  style?: React.CSSProperties;
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

const Svg = React.forwardRef<SVGSVGElement, IconProps>(
  ({ icon, size, focusable, className, color: fillColor, title, ...props }: IconProps, ref) => {
    const { space } = useTheme();
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
          width={space[size] || size}
          height={space[size] || size}
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

Svg.displayName = "Svg";

Svg.defaultProps = {
  color: "currentColor",
  className: undefined,
  title: undefined,
  size: "24px",
  focusable: false,
};

const Icon = styled(Svg)<IconProps>(
  space,
  ({ size }: IconProps): CSSObject => ({
    minWidth: size,
  })
);

Icon.defaultProps = {
  color: "currentColor",
  title: undefined,
  size: "24px",
};

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

export const InlineIcon = (props: IconProps) => (
  <IconContainer {...props}>
    <CenteredIcon size={`${iconSizeRatio}em`} {...props} />
  </IconContainer>
);

export default Icon;
