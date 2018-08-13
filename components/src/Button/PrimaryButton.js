import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const PrimaryButton = styled.button`
  ${sharedStyles}
  background-color: ${colour.blue.base};
  color: ${colour.white};
  &:hover, &:focus {
    box-shadow: 0 5px 15px rgba(5, 76, 163, .2);
    background-color: ${colour.blue.x700};
    color: white;
  }
`;

export default PrimaryButton;

