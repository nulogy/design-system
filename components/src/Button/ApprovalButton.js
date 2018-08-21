import React from 'react';
import styled from 'styled-components';
import sharedStyles from './sharedStyles';
import { borderRadius, colour, space, font, radius, shadow } from '@nulogy/tokens';

const ApprovalButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.green.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.green.x700};
  }
`

export default ApprovalButton;
