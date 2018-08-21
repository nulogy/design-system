import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';
import Button from './Button';

const DangerButton = styled(Button)`
  background-color: ${colour.red.base};
  border-color: ${colour.red.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.red['700']};
    border-color: ${colour.red['700']};
    color:  ${colour.white};
  }

  &:active{
    background-color: ${colour.red.base};
  }
`

export default DangerButton;
