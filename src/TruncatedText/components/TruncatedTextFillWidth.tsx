import React, { useState } from "react";
import { Text } from "../../Type";
import { TruncatedTextProps } from "../types";
import MaybeTooltip from "./MaybeTooltip";

const TruncatedTextFillWidth = ({
  element,
  showTooltip,
  tooltipProps,
  children,
  "data-testid": testId,
  ...props
}: TruncatedTextProps) => {
  const [hasOverflowText, setHasOverflowText] = useState(false);
  const hasTooltip = showTooltip && hasOverflowText;
  const updateOverflow = (e) => {
    const { scrollWidth, clientWidth } = e.target;
    if (!hasOverflowText && scrollWidth > clientWidth) {
      setHasOverflowText(true);
    }
  };
  return (
    <MaybeTooltip showTooltip={hasTooltip} tooltip={children} defaultOpen {...tooltipProps}>
      <Text
        as={element.type}
        cursor={hasTooltip ? "pointer" : "initial"}
        onMouseEnter={updateOverflow}
        width="100%"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        data-testid={testId}
        {...element.props}
        {...props}
      >
        {children}
      </Text>
    </MaybeTooltip>
  );
};

export default TruncatedTextFillWidth;
