import React from 'react';
import styled from 'styled-components';
import sharedStyles from './sharedStyles';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';

const DangerButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.red.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.red.x700};
  }
`

export default DangerButton;
