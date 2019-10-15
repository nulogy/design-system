import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
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

const getStatusIndicatorColours = props => {
  if (props.type === "neutral") {
    return StatusIndicatorColours.neutral;
  }
  if (props.type === "quiet") {
    return StatusIndicatorColours.quiet;
  }
  if (props.type === "danger") {
    return StatusIndicatorColours.danger;
  }
  if (props.type === "informative") {
    return StatusIndicatorColours.informative;
  }
  if (props.type === "success") {
    return StatusIndicatorColours.success;
  }
  if (props.type === "warning") {
    return StatusIndicatorColours.warning;
  }
  return StatusIndicatorColours.neutral;
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
  props => getStatusIndicatorColours(props)
);

StatusIndicator.propTypes = {
  type: PropTypes.oneOf(["danger", "informative", "success", "warning", "quiet"]),
  ...space.PropTypes
};

StatusIndicator.defaultProps = {
  type: "neutral",
  m: 0
};

export default StatusIndicator;
