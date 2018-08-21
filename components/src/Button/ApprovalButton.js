import React from 'react';
import styled, { css } from 'styled-components';
import { colour } from '@nulogy/tokens';
import Button from './Button';

const type = ({ type = 'button' }) => (({
  submit: css`
    color: ${colour.white};
    background-color: ${colour.green.base};
    border-color: ${colour.green.base};
  `
})[type]);

const ApprovalButton = styled(Button)`
  ${ type }

  &:hover {
    color: ${colour.white};
    background-color: ${colour.green['700']};
    border-color: ${colour.green['700']};
  }

  &:active{
    color: ${colour.white};
    background-color: ${colour.green.base};
    border-color: ${colour.green.base};
  }
`

export default ApprovalButton;
