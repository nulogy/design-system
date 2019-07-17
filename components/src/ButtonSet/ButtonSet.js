import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const alignments = {
  left: "flex-start",
  center: "space-between",
  right: "flex-end"
};

const buttonSpacings = {
  left: {
    "button:not(:last-child)": {
      marginRight: theme.space.x1
    }
  },
  center: {},
  right: {
    "button:not(:first-child)": {
      marginLeft: theme.space.x1
    }
  }
};

const getAlignment = alignment => alignments[alignment] || alignments.right;

const getButtonSpacing = alignment => buttonSpacings[alignment] || buttonSpacings.right;

const ButtonSet = styled.div(({ alignment }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: `-${theme.space.x1}`,
  justifyContent: getAlignment(alignment),
  button: {
    marginBottom: theme.space.x1
  },
  ...getButtonSpacing(alignment)
}));

ButtonSet.propTypes = {
  alignment: PropTypes.oneOf(["left", "center", "right"])
};

ButtonSet.defaultProps = {
  alignment: "right"
};

export default ButtonSet;
