import React from 'react';
import styled, { css } from 'styled-components';
import { colour } from '@nulogy/tokens';
import Button, { buttonColours } from './Button';

const type = ({ type = 'button' }) => (({
  submit: buttonColours({ background: colour.green.base })
})[type]);

const ApprovalButton = styled(Button)`
  ${ type }

  &:hover {
    ${buttonColours({ background: colour.green[700] })}
  }

  &:active{
    ${buttonColours({ background: colour.green.base })}
  }
`

export default ApprovalButton;
