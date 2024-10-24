import styled from "styled-components";
import { variant } from "styled-system";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

const ClickInputLabel = styled.label<{ variant?: ComponentVariant; disabled?: boolean }>(
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
    variants: {
      touch: {
        py: "x2",
        px: "0",
      },
      desktop: {
        py: "x1",
        px: "0",
      },
    },
  })
);

export default ClickInputLabel;
