import PropTypes from "prop-types";
import styled from "styled-components";
import {
  space, color, fontSize, fontWeight, lineHeight,
} from "styled-system";
import theme from "../theme";
import { ListItem } from "../index";

const List = styled.ul(
  ({ compact }) => ({
    listStyle: "none",
    paddingLeft: 0,
    margin: 0,
    [`${ListItem}`]: {
      marginBottom: compact ? 0 : theme.space.x1,
    },
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
  ...color.propTypes,
};

List.defaultProps = {
  compact: false,
  color: "currentColor",
};

export default List;
