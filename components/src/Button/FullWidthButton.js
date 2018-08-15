import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const Button = styled.button`
  ${sharedStyles}

  background-color: ${colour.neutral.x300};
  color: ${colour.neutral.x700};

  width: 100%;

  &:hover{
    background-color: ${colour.neutral.x400};
    color: ${colour.neutral.x800};
  }
`;

export default Button;
