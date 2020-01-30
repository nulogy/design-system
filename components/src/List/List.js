import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color, typography } from "styled-system";
import propTypes from "@styled-system/prop-types";
import ListItem from "./ListItem";
import theme from "../theme";

const List = styled.ul(
  space,
  color,
  typography,
  ({ compact }) => ({
    margin: 0,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1
    }
  }),
  ({ leftAlign }) => ({
    paddingLeft: leftAlign ? "18px" : null
  })
);

List.propTypes = {
  className: PropTypes.string,
  compact: PropTypes.bool,
  leftAlign: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.typography
};

List.defaultProps = {
  className: undefined,
  compact: false,
  leftAlign: false,
  color: "currentColor"
};

export default List;
