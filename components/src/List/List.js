import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { space } from "styled-system";
import theme from "../theme";
import Text from "../Type/Text";

const ListWrapper = styled.ul`
  list-style: none;
  -webkit-font-smoothing: antialiased;
  margin: 0;

  padding-left: ${theme.space[4]};

  ${space}

`;

const ListItem = styled.li`
  display: flex;
  margin-bottom: ${theme.space[2]};
  &:before{
    content: "•";
    margin-right: ${theme.space[3]};
  }
  &:last-child{
    margin-bottom: 0;
  }
`

const List = props => (
    <ListWrapper>
      <ListItem><Text mb={0}>Yo</Text></ListItem>
      <ListItem>List item 2 that is really relly really really really relly really really really relly really really long</ListItem>
      <ListItem>List item 3</ListItem>
      <ListItem>List item 4</ListItem>
    </ListWrapper>
);

ListWrapper.propTypes = {
  ...space.propTypes
};

ListWrapper.defaultProps = {
  mb: 4
};

export default List;
