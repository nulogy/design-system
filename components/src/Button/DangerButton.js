import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';

const DangerButton = styled.button`

  background-color: ${colour.red.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.red.x700};
  }
`

export default DangerButton;
