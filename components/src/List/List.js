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
    margin-bottom: ${({compact, theme}) => compact ? "0" : theme.space[2]};
  }
`;

List.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  spacing: PropTypes.bool,
};

List.defaultProps = {
  mb: 4,
  color: "currentColor",
};

export default List;
