import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "../Tooltip";
import { Text } from "../Type";
import { TooltipProps } from '../Tooltip/Tooltip';

type TruncatedTextProps = {
  children?: string;
  indicator?: string;
  element?: any;
  maxCharacters?: number
  showTooltip?: boolean,
  fullWidth?: boolean,
  "data-testid"?: string,
  tooltipProps?: TooltipProps,
};

type MaybeTooltipProps = {
  children?: React.ReactNode;
  showTooltip?: boolean;
}

const MaybeTooltip = ({ children, showTooltip, ...props }: MaybeTooltipProps) => {
  return showTooltip ? <Tooltip {...props}>{children}</Tooltip> : <>{children}</>;
};

MaybeTooltip.propTypes = {
  children: PropTypes.node,
  showTooltip: PropTypes.bool,
};

MaybeTooltip.defaultProps = {
  children: "",
  showTooltip: true,
};

const TruncatedTextFillWidth = ({
  element,
  showTooltip,
  tooltipProps,
  children,
  "data-testid": testId,
  ...props
}:TruncatedTextProps) => {
  const [hasOverflowText, setHasOverflowText] = useState(false);
  const hasTooltip = showTooltip && hasOverflowText;
  const updateOverflow = (e) => {
    const { scrollWidth, clientWidth } = e.target;
    if (!hasOverflowText && scrollWidth > clientWidth) {
      setHasOverflowText(true);
    }
  };
  return (
    <MaybeTooltip
      showTooltip={hasTooltip}
      tooltip={children}
      defaultOpen
      {...tooltipProps}
    >
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

const TruncatedTextMaxCharacters = ({
  children,
  element,
  indicator,
  maxCharacters,
  showTooltip,
  tooltipProps,
  "data-testid": testId,
  ...props
}:TruncatedTextProps) => {
  const innerText = children;
  const requiresTruncation = innerText.length > maxCharacters;
  const truncatedText = requiresTruncation
    ? innerText.slice(0, maxCharacters) + indicator
    : children;
  const hasTooltip = showTooltip && requiresTruncation;
  return (
    <MaybeTooltip
      showTooltip={hasTooltip}
      tooltip={innerText}
      {...tooltipProps}
    >
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
