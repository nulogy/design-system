import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color, fontSize, fontWeight, lineHeight } from "styled-system";
import ListItem from "./ListItem";
import theme from "../theme";

const List = styled.ul(
  space,
  color,
  fontSize,
  fontWeight,
  lineHeight,
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
  compact: PropTypes.bool,
  leftAlign: PropTypes.bool,
  ...space.propTypes,
  ...color.propTypes
};

List.defaultProps = {
  compact: false,
  leftAlign: false,
  color: "currentColor"
};

export default List;
