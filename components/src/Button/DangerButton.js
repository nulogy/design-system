import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const DangerButton = styled.button`
  ${sharedStyles}
  background-color: ${colour.red.base};
  color: ${colour.white};
  &:hover, &:focus {
    box-shadow: 0 5px 15px rgba(5, 76, 163, .2);
    background-color: ${colour.red.x700};
    color: white;
  }
`;

export default DangerButton;

