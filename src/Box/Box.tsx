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
  system,
} from "styled-system";
import { transition, TransitionProps } from "../StyledProps/transition";
import { transform, TransformProps } from "../StyledProps/transform";
import { CursorProps, cursor } from "../StyledProps/cursor";

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
  TransformProps &
  TransitionProps &
  CursorProps &
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
  background,
  transition,
  transform,
  cursor
);

export default Box;
