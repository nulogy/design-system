import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tooltip } from "../Tooltip";
import { Text } from "../Type";

const StyledTruncatedText = styled(Text)(({ hoverable }) => ({
  width: "fit-content",
  cursor: hoverable ? "pointer" : "default"
}));

const MaybeTooltip = ({ children, showTooltip, ...props }) => {
  return showTooltip ? <Tooltip {...props}>{children}</Tooltip> : children;
};

MaybeTooltip.propTypes = {
  children: PropTypes.node,
  showTooltip: PropTypes.bool
};

MaybeTooltip.defaultProps = {
  children: undefined,
  showTooltip: true
};

const TruncatedText = ({ children, indicator, maxCharacters, showTooltip, tooltipProps, ...props }) => {
  const requiresTruncation = children.length > maxCharacters;
  const truncatedText = requiresTruncation ? children.slice(0, maxCharacters) + indicator : children;
  const hasTooltip = showTooltip && requiresTruncation;
  return (
    <MaybeTooltip showTooltip={hasTooltip} tooltip={children} {...tooltipProps}>
      <StyledTruncatedText hoverable={hasTooltip} {...props}>
        {truncatedText}
      </StyledTruncatedText>
    </MaybeTooltip>
  );
};

TruncatedText.propTypes = {
  children: PropTypes.string,
  indicator: PropTypes.string,
  maxCharacters: PropTypes.number,
  showTooltip: PropTypes.bool,
  tooltipProps: PropTypes.shape({})
};

TruncatedText.defaultProps = {
  children: undefined,
  indicator: "...",
  maxCharacters: 20,
  showTooltip: true,
  tooltipProps: undefined
};

export default TruncatedText;
