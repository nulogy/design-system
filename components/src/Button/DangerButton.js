import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';
import Button from './Button';

const type = ({ type = 'button' }) => (({
  submit: css`
    color: ${colour.white};
    background-color: ${colour.red.base};
    border-color: ${colour.red.base};
  `
})[type]);

const DangerButton = styled(Button)`
  ${ type }
  
  &:hover {
    color: ${colour.white};
    background-color: ${colour.red['700']};
    border-color: ${colour.red['700']};
  }

  &:active{
    color: ${colour.white};
    background-color: ${colour.red.base};
    border-color: ${colour.red.base};
  }
`

export default DangerButton;
