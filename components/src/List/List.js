import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color, typography, layout, boxShadow, border } from "styled-system";
import propTypes from "@styled-system/prop-types";
import ListItem from "./ListItem";

const List = styled.ul(
  space,
  color,
  typography,
  layout,
  boxShadow,
  border,
  ({ compact, theme, leftAlign, listStyle }) => ({
    margin: 0,
    paddingLeft: leftAlign ? "18px" : null,
    listStyle,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1
    }
  })
);

List.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
  leftAlign: PropTypes.bool,
  listStyle: PropTypes.string,
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography,
  ...propTypes.boxShadow,
  ...propTypes.border,
  ...propTypes.layout
};

List.defaultProps = {
  className: undefined,
  compact: false,
  leftAlign: false,
  listStyle: undefined,
  color: "currentColor"
};

export default List;
