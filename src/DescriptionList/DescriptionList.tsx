import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { Link } from "../Link";
import { DescriptionListProvider, useDescriptionListContext, DescriptionListConfig } from "./DescriptionListContext";

export type Props = PropsWithChildren<DescriptionListConfig>;

export function DescriptionList({
  descriptionTermMaxWidth = "50%",
  layout = "auto",
  showDivider = false,
  density = "medium",
  fontSize = "medium",
  lineHeight = "base",
  autoLayoutBreakpoint = "640px",
  children,
}: Props) {
  return (
    <DescriptionListProvider
      descriptionTermMaxWidth={descriptionTermMaxWidth}
      layout={layout}
      showDivider={showDivider}
      density={density}
      fontSize={fontSize}
      lineHeight={lineHeight}
      autoLayoutBreakpoint={autoLayoutBreakpoint}
    >
      <DescriptionListContainer>
        <StyledDescriptionList>{children}</StyledDescriptionList>
      </DescriptionListContainer>
    </DescriptionListProvider>
  );
}

export const DescriptionListContainer = styled.div({
  containerType: "inline-size",
  width: "100%",
});

export const StyledDescriptionList = styled.dl(({ theme }) => {
  const { descriptionTermMaxWidth, layout, fontSize, lineHeight, autoLayoutBreakpoint } = useDescriptionListContext();

  return {
    margin: 0,
    display: "grid",
    fontSize: theme.fontSizes[fontSize] ?? theme.fontSizes.medium,
    lineHeight: theme.lineHeights[lineHeight] ?? theme.lineHeights.base,

    ...(layout === "inline" && {
      gridTemplateColumns: `minmax(0, ${descriptionTermMaxWidth}) auto`,
    }),

    ...((layout === "stacked" || layout === "auto") && {
      gridTemplateColumns: "1fr",
    }),

    [`${Link}`]: {
      fontSize: "inherit",
      lineHeight: "inherit",
    },

    [`@container (min-width: ${autoLayoutBreakpoint})`]: {
      ...(layout === "auto" && {
        gridTemplateColumns: `minmax(0, min(50%, ${descriptionTermMaxWidth})) auto`,
      }),
    },
  };
});
