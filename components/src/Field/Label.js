import styled from "styled-components";
import { space } from "styled-system";
import theme from "../theme";

const Label = styled.label`
  width: 100%;
  display: inline-block;
  font-size: ${theme.fontSizes[1]};
  ${space}
`;

Label.propTypes = {
  ...space.propTypes,
};

Label.defaultProps = {
  mb: 5,
};

export default Label;
