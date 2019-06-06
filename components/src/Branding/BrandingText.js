import styled from "styled-components";
import theme from "../theme";

const BrandingText = styled.span({
  textDecoration: "none",
  fontWeight: theme.fontWeights.medium,
  letterSpacing: "0.0333em",
  textTransform: "uppercase",
  fontSize: "11px",
  lineHeight: "12px",
  whiteSpace: "nowrap"
});

export default BrandingText;
