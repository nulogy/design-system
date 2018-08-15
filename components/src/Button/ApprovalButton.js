import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const ApprovalButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.green.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.green.x700};
  }
`

export default ApprovalButton;
