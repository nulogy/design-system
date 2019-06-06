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
  textAlign,
  order,
  height,
  minHeight,
  maxHeight,
  position,
  display
} from "styled-system";
import theme from "../theme";

const flexGrow = style({ prop: "flexGrow" });

const Box = styled.div(
  color,
  space,
  width,
  minWidth,
  maxWidth,
  maxWidth,
  borders,
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

Box.propTypes = {
  ...color.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...minWidth.propTypes,
  ...maxWidth.propTypes,
  ...borders.propTypes,
  ...boxShadow.propTypes,
  ...textAlign.propTypes,
  ...order.propTypes,
  ...flexGrow.propTypes,
  ...height.propTypes,
  ...minHeight.propTypes,
  ...maxHeight.propTypes,
  ...position.propTypes,
  ...display.propTypes
};

Box.defaultProps = {
  theme
};

export default Box;
