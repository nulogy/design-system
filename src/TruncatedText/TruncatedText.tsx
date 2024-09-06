import React from "react";
import { Text } from "../Type";
import { TruncatedTextProps } from "./TruncatedTextProps";
import TruncatedTextFillWidth from "./TruncatedTextFillWidth";
import TruncatedTextMaxCharacters from "./TruncatedTextMaxCharacters";

const TruncatedText = ({
  indicator = "...",
  element = <Text />,
  maxCharacters = 20,
  fullWidth = false,
  showTooltip = true,
  "data-testid": dataTestId = "truncated-text",
  children,
  ...props
}: TruncatedTextProps) =>
  fullWidth ? (
    <TruncatedTextFillWidth
      indicator={indicator}
      element={element}
      maxCharacters={maxCharacters}
      showTooltip={showTooltip}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </TruncatedTextFillWidth>
  ) : (
    <TruncatedTextMaxCharacters
      indicator={indicator}
      element={element}
      maxCharacters={maxCharacters}
      showTooltip={showTooltip}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </TruncatedTextMaxCharacters>
  );

export default TruncatedText;
