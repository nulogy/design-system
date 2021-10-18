import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text } from "../Type";
import {TruncatedTextProps} from "./TruncatedTextProps";
import TruncatedTextFillWidth from "./TruncatedTextFillWidth";
import TruncatedTextMaxCharacters from "./TruncatedTextMaxCharacters";

const TruncatedText = ({ fullWidth, children, ...props }: TruncatedTextProps) =>
  fullWidth ? (
    <TruncatedTextFillWidth {...props}>{children}</TruncatedTextFillWidth>
  ) : (
    <TruncatedTextMaxCharacters {...props}>
      {children}
    </TruncatedTextMaxCharacters>
);

TruncatedText.propTypes = {
  children: PropTypes.node,
  indicator: PropTypes.string,
  element: PropTypes.node,
  maxCharacters: PropTypes.number,
  showTooltip: PropTypes.bool,
  fullWidth: PropTypes.bool,
  "data-testid": PropTypes.string,
  tooltipProps: PropTypes.shape({}),
};

TruncatedText.defaultProps = {
  children: undefined,
  indicator: "...",
  element: <Text />,
  maxCharacters: 20,
  fullWidth: false,
  showTooltip: true,
  "data-testid": "truncated-text",
  tooltipProps: undefined,
};

export default TruncatedText;
