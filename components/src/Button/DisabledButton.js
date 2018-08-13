import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const DisabledButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.neutral.x300};
  color: ${colour.neutral.x500};

  &:focus {
    box-shadow: none;
  }

  &:hover{
    cursor: default;
    transform: scale(1);
    box-shadow: none;
  }

  &:active {
    box-shadow: none!important;
  }
`

export default DisabledButton;
