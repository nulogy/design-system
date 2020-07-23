import PropTypes from "prop-types";
import { Box } from "@nulogy/components";
import styled from "styled-components";
import { color, space } from "styled-system";

const DocSection = styled(Box)({}, color, space);

DocSection.PropTypes = {
  color: PropTypes.string,
  space: PropTypes.number
};

DocSection.defaultProps = {
  mb: "x8"
};

export default DocSection;
