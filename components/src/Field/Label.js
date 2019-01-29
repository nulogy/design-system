import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import theme from "../theme";

export const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: ${theme.fontSizes[1]};
  ${space}
`

Label.propTypes = {
  ...space.propTypes,
};

Label.defaultProps = {
  theme,
};

export default Label;