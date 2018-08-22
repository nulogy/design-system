import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space } from '@nulogy/tokens';
import Button, { buttonColours } from './Button';

const type = ({ type = 'button' }) => (({
  submit: buttonColours({ background: colour.green.base })
})[type]);

const LinkButton = styled(Button)`
  ${ type }

  background-color: transparent;
  border-color: transparent;
  color: ${colour.blue.base};
  padding: ${space.x1};

  &:hover {
    ${buttonColours({ background: colour.green[700] })}
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
    color: ${colour.blue['700']};
  }

  &:active{
    transform: none;
  }

  &:disabled{
    background-color: transparent;
    border-color: transparent;
    color: ${colour.neutral['400']};
  }

`

export default LinkButton;
