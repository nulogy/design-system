import type { ComponentPropsWithRef } from "react";
import { styled } from "styled-components";
import type { SpaceProps } from "styled-system";
import { color, type DisplayProps, display, space } from "styled-system";
import type { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

export interface LabelProps extends SpaceProps, DisplayProps, Omit<ComponentPropsWithRef<"label">, "color"> {
  disabled?: boolean;
  variant?: ComponentVariant;
}

const Label = styled.label<LabelProps>(
  ({ color = "black", disabled }) => ({
    color: color,
    display: "inline-block",
    cursor: disabled ? undefined : "pointer",
  }),
  display,
  space,
  color,
);

export default Label;
