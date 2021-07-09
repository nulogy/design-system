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
  typography,
} from "styled-system";
import { TypographyProps } from 'styled-system';
import { transition, TransitionProps } from "../StyledProps/transition";
import { transform, TransformProps } from "../StyledProps/transform";
import { CursorProps, cursor } from "../StyledProps/cursor";
import { VisibilityProps, visibility } from "../StyledProps/visibility";
import { ThemeType } from "../theme.type";

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
  OverflowProps &
  TypographyProps & {
    boxSizing?: string
  }

type CssArg = {
  theme: ThemeType;
};
export type BoxProps = SharedBoxProps &
  TransitionProps &
  React.ComponentPropsWithRef<"div"> & {
    as?: string;
    css?: (props: CssArg) => any;
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
  visibility,
  typography,
);

export type AnimatedBoxProps = SharedBoxProps &
  MotionProps & {
    role?: string;
    ref?: any;
    onClick?: (event: React.MouseEvent<any>) => void;
    onMouseEnter?: (event: React.MouseEvent<any>) => void;
    onMouseOut?: (event: React.MouseEvent<any>) => void;
    onMouseDown?: (event: React.MouseEvent<any>) => void;
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
  visibility,
  typography
);

export default Box;
