import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space, color, fontSize, fontWeight, lineHeight } from "styled-system";
import theme from "../theme";
import Text from "../Type/Text";

const ListWrapper = styled.ul`
  list-style: none;
  -webkit-font-smoothing: antialiased;
  margin: 0;

  padding-left: ${theme.space[4]};

  ${space}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${lineHeight}

`;

const ListItem = styled.li`
  display: flex;
  margin-bottom: ${props => (props.spacing === 'compact' ? '0' : props.theme.space[2] )};
  &:before{
    content: "•";
    margin-right: ${theme.space[3]};
  }
  &:last-child{
    margin-bottom: 0;
  }
`

const List = props => (
    <ListWrapper { ... props }>
      <ListItem spacing={ props.spacing }><Text fontSize={ props.fontSize } lineHeight={ props.lineHeight } mb={0}>List item 1</Text></ListItem>
      <ListItem spacing={ props.spacing }>List item 2 that is really relly really really really relly really really really relly really really long</ListItem>
      <ListItem spacing={ props.spacing }>List item 3</ListItem>
      <ListItem spacing={ props.spacing }>List item 4</ListItem>
    </ListWrapper>
);

ListWrapper.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  spacing: PropTypes.oneOf(['compact'])
};

ListWrapper.defaultProps = {
  mb: 4
};

export default List;
