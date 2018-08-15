import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';
import textCrop from './textCrop';

const Button = styled.button`
  ${sharedStyles}

  background-color: ${colour.neutral.x300};
  color: ${colour.neutral.x700};

  &:hover{
    background-color: ${colour.neutral.x400};
  }
`;

export default Button;
