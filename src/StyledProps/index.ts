import {
  space,
  SpaceProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
  layout,
  LayoutProps,
  boxShadow,
  BoxShadowProps,
  border,
  BorderProps,
  compose,
  overflow,
  OverflowProps,
  flexbox,
  FlexboxProps,
} from "styled-system";
import { textOverflow, TextOverflowProps } from "./textOverflow";
import { cursor, CursorProps } from "./cursor";
import { transform, TransformProps } from "./transform";
import { transition, TransitionProps } from "./transition";
import { visibility, VisibilityProps } from "./visibility";

export const addStyledProps = compose(
  border,
  boxShadow,
  color,
  cursor,
  layout,
  overflow,
  space,
  textOverflow,
  transform,
  transition,
  typography,
  visibility,
  flexbox
);

export type StyledProps = BorderProps &
  BoxShadowProps &
  ColorProps &
  CursorProps &
  LayoutProps &
  OverflowProps &
  SpaceProps &
  TextOverflowProps &
  TransformProps &
  TransitionProps &
  TypographyProps &
  VisibilityProps &
  FlexboxProps;
