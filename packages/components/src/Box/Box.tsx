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
  ColorProps,
  SpaceProps,
  LayoutProps,
  BoxShadowProps,
  TextAlignProps,
  OrderProps,
  FlexGrowProps,
  PositionProps
} from "styled-system";
import theme from "../theme";

type BoxProps = ColorProps &
  SpaceProps &
  LayoutProps &
  BoxShadowProps &
  TextAlignProps &
  OrderProps &
  FlexGrowProps &
  PositionProps;

const Box: React.SFC<BoxProps> = styled.div(
  color,
  space,
  layout,
  border,
  boxShadow,
  textAlign,
  order,
  flexGrow,
  position
);

export default Box;
