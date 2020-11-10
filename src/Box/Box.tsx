import styled from "styled-components";
import {
  color,
  space,
  layout,
  border,
  boxShadow,
  textAlign,
  order,
  flexGrow,
  position,
  background,
  ColorProps,
  SpaceProps,
  LayoutProps,
  BoxShadowProps,
  TextAlignProps,
  OrderProps,
  FlexGrowProps,
  PositionProps,
  BorderProps,
  FlexboxProps,
  BackgroundProps,

} from "styled-system";
import { HTMLAttributes } from "react";

export type BoxProps = ColorProps &
  SpaceProps &
  LayoutProps &
  BoxShadowProps &
  TextAlignProps &
  OrderProps &
  FlexGrowProps &
  PositionProps &
  BorderProps &
  FlexboxProps &
  BackgroundProps &
  React.ComponentPropsWithRef<"div"> & {
    as?: string;
  };

const Box: React.SFC<BoxProps> = styled.div(
  color,
  space,
  layout,
  border,
  boxShadow,
  textAlign,
  order,
  flexGrow,
  position,
  background
);

export default Box;
