import styled from "styled-components";
import { theme } from "@nulogy/components";

const InlineCode = styled.span({
  display: "inline",
  fontFamily: "IBM Plex Mono",
  background: theme.colors.lightBlue,
  fontSize: "14px"
  // padding: "2px",
  // borderRadius: "2px"
});

export default InlineCode;
