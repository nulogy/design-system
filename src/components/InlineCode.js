import styled from "styled-components";
import { theme } from "@nulogy/components";

const InlineCode = styled.span({
  display: "inline",
  fontFamily: theme.fonts.mono,
  background: theme.colors.lightBlue,
  fontSize: theme.fontSizes.small
});

export default InlineCode;
