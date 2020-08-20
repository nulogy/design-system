import styled, { CSSObject } from "styled-components";
import theme from "../theme";

const ClickInputLabel: React.SFC<any> = styled.label(
  ({ disabled }: any): CSSObject => ({
    cursor: disabled ? undefined : "pointer",
    display: "inline-flex",
    width: "auto",
    minHeight: theme.space.x3,
    verticalAlign: "top",
    alignItems: "flex-start",
    userSelect: "none",
    padding: `${theme.space.half} 0`
  })
);
export default ClickInputLabel;
