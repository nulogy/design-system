import styled from "styled-components";
import PropTypes from "prop-types";
import { Box } from "../Box";

const Card = styled(Box)({});

Card.propTypes = {
  children: PropTypes.node
};

Card.defaultProps = {
  children: [],
  borderRadius: "medium",
  boxShadow: "small",
  bg: "whiteGrey",
  py: "x2",
  px: "x2",
  position: "relative"
};

export default Card;
