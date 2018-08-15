import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const SmallButton = styled.button`
  ${sharedStyles}

  background-color: ${colour.neutral.x300};
  color: ${colour.neutral.x700};

  &:hover, &:focus{
    background-color: ${colour.neutral.x400};
    color: ${colour.neutral.x800};
  }

  font-size: ${font.size.small}px;
  font-weight: ${font.weight.normal};
  padding: ${space.x1} ${space.x2};

`;

export default SmallButton;
