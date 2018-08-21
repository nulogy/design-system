import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';

const ApprovalButton = styled.button`

  background-color: ${colour.green.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.green.x700};
  }
`

export default ApprovalButton;
