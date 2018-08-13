import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const GhostButton = styled.button`
  ${sharedStyles}

  background-color: transparent;
  color: ${colour.neutral.x700};
  border: solid 2px ${colour.neutral.x600};
  border-radius: 3px;

  &:hover{
    background-color: ${colour.neutral.x700};
    color: ${colour.neutral.x200};
    border: solid 2px ${colour.neutral.x700};
  }
`;

export default GhostButton;
