import styled from "styled-components";
import { variant } from "styled-system";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

const ClickInputLabel = styled.label<{ size: ComponentSize; disabled: boolean }>(
  ({ disabled, theme }) => ({
    cursor: disabled ? undefined : "pointer",
    display: "inline-flex",
    width: "auto",
    minHeight: theme.space.x3,
    verticalAlign: "top",
    alignItems: "flex-start",
    userSelect: "none",
    paddingTop: theme.space.x1,
    paddingBottom: theme.space.x1,
    paddingLeft: 0,
    paddingRight: 0,
  }),
  variant({
    prop: "size",
    variants: {
      large: {
        py: "x2",
        px: "0",
      },

      medium: {
        py: "x1",
        px: "0",
      },
    },
  })
);

export default ClickInputLabel;
