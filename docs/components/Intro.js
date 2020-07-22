import PropTypes from "prop-types";
import { Box } from "@nulogy/components";
import styled from "styled-components";
import { color, space } from "styled-system";

const Intro = styled(Box)({}, color, space);

Intro.PropTypes = {
  color: PropTypes.string,
  space: PropTypes.number
};

Intro.defaultProps = {
  pb: "x6"
};

export default Intro;
