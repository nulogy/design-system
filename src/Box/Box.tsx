import styled from "styled-components";
import { motion, MotionProps } from "framer-motion";
import {
  color,
  space,
  layout,
  border,
  boxShadow,
  textAlign,
  order,
  flexbox,
  flexGrow,
  position,
  background,
  overflow,
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
  OverflowProps,
} from "styled-system";
import { transition, TransitionProps } from "../StyledProps/transition";
import { transform, TransformProps } from "../StyledProps/transform";
import { CursorProps, cursor } from "../StyledProps/cursor";
import { VisibilityProps, visibility } from "../StyledProps/visibility";

type SharedBoxProps = ColorProps &
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
  CursorProps &
  VisibilityProps &
  OverflowProps;

export type BoxProps = SharedBoxProps &
  TransitionProps &
  React.ComponentPropsWithRef<"div"> & {
    as?: string;
  };

const Box: React.FC<BoxProps> = styled.div(
  color,
  space,
  layout,
  border,
  boxShadow,
  textAlign,
  order,
  flexbox,
  flexGrow,
  position,
  background,
  transform,
  cursor,
  overflow,
  transition,
  visibility
);

export type AnimatedBoxProps = SharedBoxProps &
  MotionProps & {
    role?: string;
  };

export const AnimatedBox: React.FC<AnimatedBoxProps> = styled(motion.div)(
  color,
  space,
  layout,
  border,
  boxShadow,
  textAlign,
  order,
  flexbox,
  flexGrow,
  position,
  background,
  transform,
  cursor,
  overflow,
  visibility
);

export default Box;
