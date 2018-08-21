import React from 'react';
import styled, { css } from 'styled-components';
import { colour } from '@nulogy/tokens';
import Button, { buttonColours } from './Button';

const type = ({ type = 'button' }) => (({
  submit: buttonColours({ background: colour.red.base })
})[type]);

const DangerButton = styled(Button)`
  ${ type }
  
  &:hover {
    ${buttonColours({ background: colour.red[700] })}
  }

  &:active{
    ${buttonColours({ background: colour.red.base })}
  }
`

export default DangerButton;
