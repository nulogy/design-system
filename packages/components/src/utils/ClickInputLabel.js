import styled from "styled-components";
import theme from "../theme";

const ClickInputLabel = styled.label(({ disabled }) => ({
  cursor: disabled ? null : "pointer",
  display: "inline-flex",
  width: "auto",
  minHeight: theme.space.x3,
  verticalAlign: "top",
  alignItems: "flex-start",
  userSelect: "none",
  padding: `${theme.space.half} 0`
}));

export default ClickInputLabel;
