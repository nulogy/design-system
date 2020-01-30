import styled from "styled-components";
import { style, color, space, layout, border, boxShadow, textAlign, order, flexGrow, position } from "styled-system";
import propTypes from "@styled-system/prop-types";
import theme from "../theme";

// const flexGrow = style({ prop: "flexGrow" });

const Box = styled.div(color, space, layout, border, boxShadow, textAlign, order, flexGrow, position);

Box.propTypes = {
  ...propTypes.color,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.border,
  ...propTypes.boxShadow,
  ...propTypes.textAlign,
  ...propTypes.order,
  ...propTypes.flexGrow,
  ...propTypes.position
};

Box.defaultProps = {
  theme
};

export default Box;
