import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import theme from "../theme";

const StatusIndicatorColours = {
  neutral: {
    borderColor: theme.colors.lightGrey,
    backgroundColor: theme.colors.lightGrey,
    color: theme.colors.darkGrey
  },
  quiet: {
    borderColor: theme.colors.white,
    backgroundColor: theme.colors.white,
    color: theme.colors.darkGrey
  },
  danger: {
    borderColor: theme.colors.red,
    backgroundColor: theme.colors.red,
    color: theme.colors.white
  },
  informative: {
    borderColor: theme.colors.blue,
    backgroundColor: theme.colors.blue,
    color: theme.colors.white
  },
  success: {
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.green,
    color: theme.colors.white
  },
  warning: {
    borderColor: theme.colors.yellow,
    backgroundColor: theme.colors.yellow,
    color: theme.colors.darkGrey
  }
};

const getStatusIndicatorColours = type => {
  return StatusIndicatorColours[type];
};

const StatusIndicator = styled.p(
  {
    display: "inline-block",
    fontSize: theme.fontSizes.smaller,
    lineHeight: theme.lineHeights.smallerText,
    fontWeight: theme.fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    padding: `0 ${theme.space.x1}`,
    borderRadius: theme.space.x1,
    position: "relative",
    top: "-2px"
  },
  space,
  ({ type }) => getStatusIndicatorColours(type)
);

StatusIndicator.propTypes = {
  type: PropTypes.oneOf(["neutral", "danger", "informative", "success", "warning", "quiet"]),
  ...propTypes.space
};

StatusIndicator.defaultProps = {
  type: "neutral",
  m: 0
};

export default StatusIndicator;
