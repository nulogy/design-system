import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const GhostButton = styled.button`
  ${sharedStyles}

  background-color: transparent;
  color: ${colour.neutral.x600};
  border: solid 2px ${colour.neutral.x600};

  &:hover{
    background-color: ${colour.neutral.x600};
    color: ${colour.white};
    border: solid 2px ${colour.neutral.x600};
  }
`;

export default GhostButton;
