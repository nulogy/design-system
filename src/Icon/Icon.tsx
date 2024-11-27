import React from "react";
import styled, { useTheme } from "styled-components";
import { space, SpaceProps } from "styled-system";
import NDSIcons from "@nulogy/icons";
import { IconName } from "@nulogy/icons";
import LoadingIcon from "./LoadingIcon";

// Temporary hack for icons that are not in the NDSIcons package
const icons = {
  ...NDSIcons,
  ...{
    home: {
      viewBox: "0 -960 960 960",
      path: ["M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"],
    },
    back: {
      viewBox: "0 -960 960 960",
      path: ["M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"],
    },
    apps: {
      viewBox: "0 -960 960 960",
      path: [
        "M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm240 0q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm240 0q-33 0-56.5-23.5T640-240q0-33 23.5-56.5T720-320q33 0 56.5 23.5T800-240q0 33-23.5 56.5T720-160ZM240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400ZM240-640q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640Z",
      ],
    },
  },
};

interface IconProps extends SpaceProps {
  icon: IconName | "loading";
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

const Icon = styled(Svg)<IconProps>(space, ({ theme, color = "currentColor", size }) => ({
  minWidth: theme.sizes[size] ?? size ?? theme.sizes.x3,
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
