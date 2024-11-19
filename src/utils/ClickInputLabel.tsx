import styled from "styled-components";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

const ClickInputLabel = styled.label<{ variant?: ComponentVariant; disabled?: boolean }>(({ disabled, theme }) => ({
  cursor: disabled ? undefined : "pointer",
  display: "inline-flex",
  alignItems: "center",
  width: "auto",
  minHeight: theme.space.x3,
  userSelect: "none",
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
  paddingLeft: 0,
  paddingRight: 0,
}));

export default ClickInputLabel;
