import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';
import Button from './Button';

const ApprovalButton = styled(Button)`
  --colour-bg: ${colour.green.base};
  background-color: var(--colour-bg);
  border-color: var(--colour-bg);
  color: ${colour.white};

  &:hover{
    --colour-bg: ${colour.green['700']};
    color:  ${colour.white};
  }

  &:active{
    --colour-bg: ${colour.green['700']};
  }
`

export default ApprovalButton;
