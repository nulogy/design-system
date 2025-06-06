import { useTheme } from "styled-components";
import {
  space,
  margin,
  padding,
  width,
  fontSize,
  color,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  fontStyle,
  letterSpacing,
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  size,
  verticalAlign,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  opacity,
  overflow,
  background,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  textStyle,
  colorStyle,
  buttonStyle,
  compose,
  layout,
  flexGrow,
  system,
  flexbox,
  grid,
  typography,
  backgroundSize,
  backgroundRepeat,
  backgroundPosition,
  backgroundImage,
  styleFn,
  variant as styledSystemVariant,
} from "styled-system";

import type {
  SpaceProps,
  PaddingProps,
  MarginProps,
  WidthProps,
  FontSizeProps,
  FontFamilyProps,
  TextAlignProps,
  LineHeightProps,
  FontWeightProps,
  FontStyleProps,
  LetterSpacingProps,
  DisplayProps,
  MaxWidthProps,
  MinWidthProps,
  HeightProps,
  MaxHeightProps,
  MinHeightProps,
  SizeProps,
  VerticalAlignProps,
  AlignItemsProps,
  AlignContentProps,
  JustifyItemsProps,
  JustifyContentProps,
  FlexWrapProps,
  FlexBasisProps,
  FlexDirectionProps,
  FlexProps,
  JustifySelfProps,
  AlignSelfProps,
  OrderProps,
  GridGapProps,
  GridColumnGapProps,
  GridRowGapProps,
  GridColumnProps,
  GridRowProps,
  GridAutoFlowProps,
  GridAutoColumnsProps,
  GridAutoRowsProps,
  GridTemplateColumnsProps,
  GridTemplateRowsProps,
  GridTemplateAreasProps,
  GridAreaProps,
  BorderProps,
  BorderTopProps,
  BorderRightProps,
  BorderBottomProps,
  BorderLeftProps,
  BordersProps,
  BorderColorProps,
  BorderRadiusProps,
  BoxShadowProps,
  OpacityProps,
  OverflowProps,
  BackgroundProps,
  BackgroundImageProps,
  BackgroundPositionProps,
  BackgroundRepeatProps,
  BackgroundSizeProps,
  PositionProps,
  ZIndexProps,
  TopProps,
  RightProps,
  BottomProps,
  LeftProps,
  TextStyleProps,
  ColorStyleProps,
  ButtonStyleProps,
  FlexboxProps,
  GridProps,
  BackgroundColorProps,
  FlexGrowProps,
  TypographyProps,
  LayoutProps,
} from "styled-system";
import { CSSProperties } from "react";
import { useComponentVariant } from "../NDSProvider/ComponentVariantContext";

export interface GapProps {
  gap?: CSSProperties["gap"];
  rowGap?: CSSProperties["rowGap"];
  columnGap?: CSSProperties["columnGap"];
}

export const gap = system({
  gap: {
    property: "gap",
    scale: "space",
  },
  rowGap: {
    property: "rowGap",
    scale: "space",
  },
  columnGap: {
    property: "columnGap",
    scale: "space",
  },
});

export function getStyledPropNames(...styleFns: styleFn[]): string[] {
  return styleFns.reduce(
    (acc: string[], fn: styleFn) => (fn.propNames ? acc.concat(fn.propNames) : acc),
    [] as string[]
  );
}
export const excludeStyledProps =
  (...styleFns: styleFn[]) =>
  (prop: string | number): boolean =>
    !getStyledPropNames(...styleFns).includes(String(prop));

export const variant: typeof styledSystemVariant = (variants) => () => {
  const componentVariant = useComponentVariant();
  const theme = useTheme();

  return styledSystemVariant(variants)({ theme, variant: componentVariant });
};

export const addStyledProps = compose(
  // After
  space,
  margin,
  padding,
  width,
  fontSize,
  color,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  fontStyle,
  letterSpacing,
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  size,
  verticalAlign,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  flexbox,
  justifySelf,
  alignSelf,
  order,
  grid,
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  opacity,
  overflow,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  textStyle,
  colorStyle,
  buttonStyle,
  background,
  backgroundSize,
  backgroundRepeat,
  backgroundPosition,
  backgroundImage,
  layout,
  flexGrow,
  typography,
  gap,
  system({
    visibility: true,
    transition: true,
    transform: true,
    whiteSpace: true,
    textOverflow: true,
    cursor: true,
  })
);

interface TransitionProps {
  transition?: CSSProperties["transition"];
  transitionDelay?: CSSProperties["transitionDelay"];
  transitionProperty?: CSSProperties["transition"];
  transitionDuration?: CSSProperties["transitionDuration"];
  transitionTimingFunction?: CSSProperties["transitionTimingFunction"];
}

interface TransformProps {
  transform?: CSSProperties["transform"];
  transformOrigin?: CSSProperties["transformOrigin"];
  transformStyle?: CSSProperties["transformStyle"];
  transformBox?: CSSProperties["transformBox"];
}

export type TextOverflowProps = {
  whiteSpace?: CSSProperties["whiteSpace"];
  textOverflow?: CSSProperties["textOverflow"];
};

export type VisibilityProps = {
  visibility?: CSSProperties["visibility"];
};

export type CursorProps = {
  cursor?: CSSProperties["cursor"];
};

export interface StyledProps
  extends SpaceProps,
    BackgroundColorProps,
    LayoutProps,
    FlexGrowProps,
    TypographyProps,
    MarginProps,
    PaddingProps,
    WidthProps,
    FontSizeProps,
    FontFamilyProps,
    TextAlignProps,
    LineHeightProps,
    FontWeightProps,
    FontStyleProps,
    LetterSpacingProps,
    DisplayProps,
    MaxWidthProps,
    MinWidthProps,
    HeightProps,
    MaxHeightProps,
    MinHeightProps,
    SizeProps,
    VerticalAlignProps,
    AlignItemsProps,
    AlignContentProps,
    JustifyItemsProps,
    JustifyContentProps,
    FlexWrapProps,
    FlexBasisProps,
    FlexDirectionProps,
    FlexProps,
    FlexboxProps,
    JustifySelfProps,
    AlignSelfProps,
    OrderProps,
    GridProps,
    GridGapProps,
    GridColumnGapProps,
    GridRowGapProps,
    GridColumnProps,
    GridRowProps,
    GridAutoFlowProps,
    GridAutoColumnsProps,
    GridAutoRowsProps,
    GridTemplateColumnsProps,
    GridTemplateRowsProps,
    GridTemplateAreasProps,
    GridAreaProps,
    BorderProps,
    BorderTopProps,
    BorderRightProps,
    BorderBottomProps,
    BorderLeftProps,
    BordersProps,
    BorderRadiusProps,
    BoxShadowProps,
    OpacityProps,
    OverflowProps,
    BorderColorProps,
    BackgroundProps,
    PositionProps,
    ZIndexProps,
    TopProps,
    RightProps,
    BottomProps,
    LeftProps,
    TextStyleProps,
    ColorStyleProps,
    ButtonStyleProps,
    TransitionProps,
    TransformProps,
    BackgroundImageProps,
    BackgroundPositionProps,
    BackgroundRepeatProps,
    BackgroundSizeProps,
    TextOverflowProps,
    VisibilityProps,
    CursorProps,
    GapProps {}
