import styled from "styled-components";
import theme from "../theme";
import { ComponentSize } from "../Input/InputField";
import { DefaultNDSThemeType } from "../theme.type";

const cssForSize = (size: ComponentSize, theme: DefaultNDSThemeType) => {
  switch (size) {
    case "large":
      return {
        padding: `${theme.space.x2} 0`,
      };

    case "medium":
    default:
      return {
        padding: `${theme.space.x1} 0`,
      };
  }
};

const ClickInputLabel = styled.label<{ size: ComponentSize; disabled: boolean }>(
  ({ disabled }) => ({
    cursor: disabled ? undefined : "pointer",
    display: "inline-flex",
    width: "auto",
    minHeight: theme.space.x3,
    verticalAlign: "top",
    alignItems: "flex-start",
    userSelect: "none",
  }),
  ({ size, theme }) => cssForSize(size, theme)
);

export default ClickInputLabel;
