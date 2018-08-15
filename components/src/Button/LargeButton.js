import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const LargeButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.neutral.x300};
  color: ${colour.neutral.x700};

  &:hover, &:focus{
    background-color: ${colour.neutral.x400};
    color: ${colour.neutral.x800};
  }

  font-size: ${font.size.large}px;
  font-weight: ${font.weight.medium};
  padding: ${space.x2} ${space.x3};

`;

export default LargeButton;
