import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Tooltip } from "../Tooltip";
import { Text } from "../Type";

const StyledWrapper = styled("div")(({ hoverable }) => ({
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

const TruncatedText = ({ children, element, indicator, maxCharacters, showTooltip, tooltipProps, ...props }) => {
  const innerText = children;
  const requiresTruncation = innerText.length > maxCharacters;
  const truncatedText = requiresTruncation ? innerText.slice(0, maxCharacters) + indicator : children;
  const hasTooltip = showTooltip && requiresTruncation;
  return (
    <MaybeTooltip showTooltip={hasTooltip} tooltip={innerText} {...tooltipProps}>
      <StyledWrapper as={element.type} hoverable={hasTooltip} {...element.props} {...props}>
        {truncatedText}
      </StyledWrapper>
    </MaybeTooltip>
  );
};

TruncatedText.propTypes = {
  children: PropTypes.string,
  indicator: PropTypes.string,
  element: PropTypes.node,
  maxCharacters: PropTypes.number,
  showTooltip: PropTypes.bool,
  tooltipProps: PropTypes.shape({})
};

TruncatedText.defaultProps = {
  children: undefined,
  indicator: "...",
  element: <Text />,
  maxCharacters: 20,
  showTooltip: true,
  tooltipProps: undefined
};

export default TruncatedText;
