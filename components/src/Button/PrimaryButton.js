import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const PrimaryButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.blue.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.blue.x700};
    color: ${colour.blue.x200};
  }
`;

export default PrimaryButton;
