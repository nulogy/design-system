import styled from "styled-components";
import { space, color, display, DisplayProps } from "styled-system";
import type { SpaceProps } from "styled-system";
import type { ComponentPropsWithRef } from "react";

export interface LabelProps extends SpaceProps, DisplayProps, Omit<ComponentPropsWithRef<"label">, "color"> {}

const Label = styled.label<LabelProps>(
  ({ color = "black" }) => ({
    color: color,
    display: "inline-block",
  }),
  display,
  space,
  color
);

export default Label;
