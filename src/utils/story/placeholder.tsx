import { transparentize } from "polished";
import React from "react";
import styled from "styled-components";
import { BoxProps } from "../../Box";
import { addStyledProps } from "../../StyledProps";

const Contianer = styled.div(
  ({ theme }) => ({
    overflow: "hidden",
    position: "relative",
    borderRadius: "0.25rem",
    borderWidth: "1px",
    borderColor: theme.colors.grey,
    borderStyle: "dashed",
    height: "16rem",
    opacity: "0.75",
  }),
  addStyledProps
);

const Svg = styled.svg(({ theme }) => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  stroke: transparentize(0.85, theme.colors.darkBlue),
}));

/**
 * A dialognaly striped and bordered rectangle that can be used as a placeholder for content.
 * To be used in Storybook exclusively. Do not export for production.
 */
export function Placeholder(props: BoxProps) {
  return (
    <Contianer {...props}>
      <Svg fill="none">
        <defs>
          <pattern id="diagonal-stripes" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect stroke="none" fill="url(#diagonal-stripes)" width="100%" height="100%"></rect>
      </Svg>
    </Contianer>
  );
}
