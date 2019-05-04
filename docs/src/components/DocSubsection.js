import PropTypes from "prop-types";
import { Flex } from "@nulogy/components";
import styled from "styled-components";
import { color, space } from "styled-system";

const DocSubsection = styled(Flex)(
  {
    flexDirection: "column",
    ":last-child": {
      marginBottom: 0
    }
  },
  color,
  space
);

DocSubsection.PropTypes = {
  color: PropTypes.string,
  space: PropTypes.number
};

DocSubsection.defaultProps = {
  mb: "x2"
};

export default DocSubsection;
