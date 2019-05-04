import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color, fontSize, fontWeight, lineHeight } from "styled-system";
import ListItem from "./ListItem";
import theme from "../theme";

const List = styled.ul(
  ({ compact }) => ({
    margin: 0,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1
    }
  }),
  space,
  color,
  fontSize,
  fontWeight,
  lineHeight
);

List.propTypes = {
  compact: PropTypes.bool,
  ...space.propTypes,
  ...color.propTypes
};

List.defaultProps = {
  compact: false,
  color: "currentColor"
};

export default List;
