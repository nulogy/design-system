import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const Button = styled.button`
  ${sharedStyles}
  background-color: ${colour.neutral.x400};
  color: ${colour.neutral.x800};
  &:hover, &:focus {
    box-shadow: 0 5px 15px rgba(0, 0, 0, .2);
    background-color: ${colour.neutral.x500};
    color: ${colour.black};
  }
`;

export default Button;

