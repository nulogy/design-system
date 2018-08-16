import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';
import Button from './Button';

const TriggerButton = styled.button`
  ${sharedStyles}
  //${Button} - Doesn't like it, Why?

  padding-right: 0;
  line-height: 1;

  background-color: ${colour.neutral.x300};
  color: ${colour.neutral.x700};

  &:hover{
    background-color: ${colour.neutral.x400};
    color: ${colour.neutral.x800};
  }

  .icon{
    border: solid 1px lime;
    margin: 0 ${space.x2};
  }

  .label{
    line-height: 1.3;
  }
`;

export default TriggerButton;
