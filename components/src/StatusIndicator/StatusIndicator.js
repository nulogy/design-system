import PropTypes from "prop-types";
import styled from "styled-components";
import { space, typography, flexbox } from "styled-system";
import propTypes from "@styled-system/prop-types";

const StatusIndicatorColours = theme => ({
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
});

const getStatusIndicatorColours = (type, theme) => {
  return StatusIndicatorColours(theme)[type];
};

const StatusIndicator = styled.p(
  ({ theme }) => ({
    display: "inline-block",
    fontWeight: theme.fontWeights.bold,
    textTransform: "uppercase",
    letterSpacing: ".05em",
    borderRadius: theme.space.x1
  }),
  space,
  typography,
  flexbox,
  ({ type, theme }) => getStatusIndicatorColours(type, theme)
);

StatusIndicator.propTypes = {
  type: PropTypes.oneOf(["neutral", "danger", "informative", "success", "warning", "quiet"]),
  ...propTypes.space,
  ...propTypes.typography,
  ...propTypes.flexbox
};

StatusIndicator.defaultProps = {
  type: "neutral",
  mt: "0",
  mr: "0",
  mb: "0",
  ml: "0",
  pt: "0",
  pr: "x1",
  pb: "0",
  pl: "x1",
  fontSize: "smaller",
  lineHeight: "smallerText",
  alignSelf: "center"
};

export default StatusIndicator;
