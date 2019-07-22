import styled from "styled-components";
import {
  style,
  color,
  space,
  width,
  minWidth,
  maxWidth,
  boxShadow,
  borders,
  borderRadius,
  textAlign,
  order,
  height,
  minHeight,
  maxHeight,
  position,
  display,
  ColorProps,
  SpaceProps,
  WidthProps,
  MinWidthProps,
  MaxWidthProps,
  BordersProps,
  BorderRadiusProps,
  BoxShadowProps,
  TextAlignProps,
  OrderProps,
  FlexGrowProps,
  HeightProps,
  MinHeightProps,
  MaxHeightProps,
  PositionProps,
  DisplayProps
} from "styled-system";
import theme from "../theme";

const flexGrow = style({ prop: "flexGrow" });

interface BoxProps
  extends ColorProps,
    SpaceProps,
    WidthProps,
    MinWidthProps,
    MaxWidthProps,
    BordersProps,
    BorderRadiusProps,
    BoxShadowProps,
    TextAlignProps,
    OrderProps,
    FlexGrowProps,
    HeightProps,
    MinHeightProps,
    MaxHeightProps,
    PositionProps,
    DisplayProps {}

const Box = styled.div<BoxProps>(
  color,
  space,
  width,
  minWidth,
  maxWidth,
  maxWidth,
  borders,
  borderRadius,
  boxShadow,
  textAlign,
  order,
  flexGrow,
  height,
  minHeight,
  maxHeight,
  position,
  display
);

Box.defaultProps = {
  theme
};

export default Box;
