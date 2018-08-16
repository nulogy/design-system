import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const ActionButton = styled.button`
  ${sharedStyles}

  background-color: trasnsparent;
  color: ${colour.blue.base};
  border: solid 1px ${colour.neutral.x200};
  padding: ${space.x1};

  &:hover{
    color: ${colour.blue.x700};
  };
`

export default ActionButton;
