import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const LinkButton = styled.button`
  ${sharedStyles}

  background-color: trasnsparent;
  color: ${colour.blue.base};

  &:hover{
    color: ${colour.blue.x700};
  };
`

export default LinkButton;
