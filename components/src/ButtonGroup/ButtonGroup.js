import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const alignments = {
  left: "flex-start",
  spaced: "space-between",
  right: "flex-end"
};

const buttonSpacings = {
  left: {
    "button:not(:last-child)": {
      marginRight: theme.space.x1
    }
  },
  spaced: {
    "button:not(:last-child)": {
      marginRight: theme.space.x1
    }
  },
  right: {
    "button:not(:first-child)": {
      marginLeft: theme.space.x1
    }
  }
};

const getAlignment = alignment => alignments[alignment] || alignments.left;

const getButtonSpacing = alignment => buttonSpacings[alignment] || buttonSpacings.left;

const ButtonGroup = styled.div(({ alignment }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: `-${theme.space.x1}`,
  justifyContent: getAlignment(alignment),
  button: {
    marginBottom: theme.space.x1
  },
  ...getButtonSpacing(alignment)
}));

ButtonGroup.propTypes = {
  alignment: PropTypes.oneOf(["left", "spaced", "right"])
};

ButtonGroup.defaultProps = {
  alignment: "left"
};

export default ButtonGroup;
