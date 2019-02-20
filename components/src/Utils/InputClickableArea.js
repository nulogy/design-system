import styled from "styled-components";
import theme from "../theme";

const InputClickableArea = styled.label(({ disabled }) => ({
  cursor: disabled ? null : "pointer",
  display: "inline-flex",
  width: "auto",
  minHeight: theme.space[4],
  verticalAlign: "top",
  alignItems: "flex-start",
  userSelect: "none",
  padding: `${theme.space[1]} 0`,
}));

export default InputClickableArea;
