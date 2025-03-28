import React from "react";
import { Text } from "../Type";
import { TruncatedTextProps } from "./types";
import TruncatedTextFillWidth from "./components/TruncatedTextFillWidth";
import TruncatedTextMaxCharacters from "./components/TruncatedTextMaxCharacters";

const TruncatedText = ({
  indicator = "...",
  element = <Text />,
  maxCharacters = 20,
  fullWidth = false,
  showTooltip = true,
  "data-testid": dataTestId = "truncated-text",
  children,
  ...rest
}: TruncatedTextProps) => {
  const props = {
    indicator,
    element,
    maxCharacters,
    showTooltip,
    "data-testid": dataTestId,
    ...rest,
  };

  return fullWidth ? (
    <TruncatedTextFillWidth {...props}>{children}</TruncatedTextFillWidth>
  ) : (
    <TruncatedTextMaxCharacters {...props}>{children}</TruncatedTextMaxCharacters>
  );
};

export default TruncatedText;
