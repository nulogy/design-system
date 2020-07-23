import PropTypes from "prop-types";
import styled from "styled-components";

const alignments = {
  left: "flex-start",
  spaced: "space-between",
  right: "flex-end"
};

const buttonSpacings = theme => ({
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
});

const getAlignment = alignment => alignments[alignment] || alignments.left;

const getButtonSpacing = (alignment, theme) => buttonSpacings(theme)[alignment] || buttonSpacings(theme).left;

const ButtonGroup = styled.div(({ alignment, theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  marginBottom: `-${theme.space.x1}`,
  justifyContent: getAlignment(alignment),
  button: {
    marginBottom: theme.space.x1
  },
  ...getButtonSpacing(alignment, theme)
}));

ButtonGroup.propTypes = {
  alignment: PropTypes.oneOf(["left", "spaced", "right"]),
  className: PropTypes.string
};

ButtonGroup.defaultProps = {
  alignment: "left",
  className: undefined
};

export default ButtonGroup;
