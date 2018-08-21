import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';
import Button from './Button';

const ApprovalButton = styled(Button)`
  background-color: ${colour.green.base};
  border-color: ${colour.green.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.green['700']};
    border-color: ${colour.green['700']};
    color:  ${colour.white};
  }

  &:active{
    background-color: ${colour.green.base};
  }
`

export default ApprovalButton;
