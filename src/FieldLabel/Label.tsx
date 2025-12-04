import styled from "styled-components";
import { space, color, display, DisplayProps } from "styled-system";
import type { SpaceProps } from "styled-system";
import type { ComponentPropsWithRef } from "react";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

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
  color
);

export default Label;
