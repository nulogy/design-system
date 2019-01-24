import React from "react";
import styled from "styled-components";
import { space } from "styled-system";

const ListWrapper = styled.ul`
  border: solid 1px red;
`

const ListItem = styled.li`
  border: solid 1px lime;
`

const List = props => (
    <ListWrapper>
      <ListItem>Hey</ListItem>
    </ListWrapper>
);

export default List;
