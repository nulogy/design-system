import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space } from '@nulogy/tokens';
import Button, { buttonColours } from './Button';

const borderWidth = 1;

const withoutBorder = value => value - borderWidth;

const smallButtonPaddingY = 1;

const type = ({ type = 'button' }) => (({
  submit: buttonColours({ background: colour.green.base })
})[type]);

const QuietButton = styled(Button)`
  ${ type }

  background-color: transparent;
  border-color: transparent;
  color: ${colour.blue.base};
  padding: ${withoutBorder(space.x1)}px ${space.x1}px;

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

export default QuietButton;
