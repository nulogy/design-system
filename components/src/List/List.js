import PropTypes from "prop-types";
import styled from "styled-components";
import {
  space, color, fontSize, fontWeight, lineHeight,
} from "styled-system";
import theme from "../theme";
import ListItem from "./ListItem";

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding-left: ${theme.space[4]};
  ${space}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}

  ${ListItem} {
    margin-bottom: ${props => (props.compact ? "0" : theme.space[2])};
  }
`;

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
