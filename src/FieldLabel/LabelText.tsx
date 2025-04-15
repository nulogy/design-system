import styled from "styled-components";
import { addStyledProps } from "../StyledProps";

const LabelText = styled.span(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  fontWeight: theme.fontWeights.bold,
  lineHeight: theme.lineHeights.smallTextCompressed,
}), addStyledProps);

export default LabelText;
