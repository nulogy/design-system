import styled from "styled-components";
import { space, color, display, DisplayProps } from "styled-system";
import type { SpaceProps } from "styled-system";
import type { ComponentPropsWithRef } from "react";

export interface LabelProps extends SpaceProps, DisplayProps, Omit<ComponentPropsWithRef<"label">, "color"> {}

const Label = styled.label<LabelProps>(
  () => ({
    display: "inline-block",
  }),
  display,
  space,
  color
);

Label.defaultProps = {
  color: "black",
};

export default Label;
