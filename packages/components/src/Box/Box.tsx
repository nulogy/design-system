import styled from "styled-components";
import { color, space, layout, border, boxShadow, textAlign, order, flexGrow, position } from "styled-system";
import theme from "../theme";

const Box: React.SFC<any> = styled.div(color, space, layout, border, boxShadow, textAlign, order, flexGrow, position);
Box.defaultProps = {
  theme
};
export default Box;
