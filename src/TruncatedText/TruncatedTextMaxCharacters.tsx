import React from "react";
import { Text } from "../Type";
import { TruncatedTextProps } from "./TruncatedTextProps";
import { TooltipProps } from "../Tooltip/Tooltip";
import MaybeTooltip from "./MaybeTooltip";

const TruncatedTextMaxCharacters = ({
  children,
  element,
  indicator,
  maxCharacters,
  showTooltip,
  tooltipProps,
  "data-testid": testId,
  ...props
}: TruncatedTextProps) => {
  const innerText = children ?? "";
  const requiresTruncation = innerText.length > maxCharacters;

  const truncatedText = requiresTruncation ? innerText.slice(0, maxCharacters) + indicator : innerText;
  const hasTooltip = showTooltip && requiresTruncation;

  return (
    <MaybeTooltip showTooltip={hasTooltip} tooltip={innerText} {...tooltipProps}>
      <Text
        as={element.type}
        cursor={hasTooltip ? "pointer" : "initial"}
        width="fit-content"
        data-testid={testId}
        {...element.props}
        {...props}
      >
        {truncatedText}
      </Text>
    </MaybeTooltip>
  );
};

export default TruncatedTextMaxCharacters;
