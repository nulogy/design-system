import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const DangerButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.red.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.red.x700};
  }
`

export default DangerButton;
