import PropTypes from "prop-types";
import { Box } from "@nulogy/components";
import styled from "styled-components";
import { color, space, borders } from "styled-system";

const DocIntro = styled(Box)({

},
color,
space,);

DocIntro.PropTypes = {
  color: PropTypes.string,
  space: PropTypes.number,
};

DocIntro.defaultProps = {
  // mb: "x6",
  pb: "x6",
  pt: "x8",
};

export default DocIntro;
