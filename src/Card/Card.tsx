import styled from "styled-components";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";

const Card: React.SFC<BoxProps> = styled(Box)({});
Card.defaultProps = {
  children: [],
  borderRadius: "medium",
  boxShadow: "small",
  bg: "whiteGrey",
  py: "x2",
  px: "x2",
  position: "relative",
};
export default Card;
