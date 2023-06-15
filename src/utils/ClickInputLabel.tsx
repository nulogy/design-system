import styled from "styled-components";
import { variant } from "styled-system";
import theme from "../theme";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";

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
