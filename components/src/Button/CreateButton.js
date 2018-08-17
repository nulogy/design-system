import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const CreateButton = styled.button`
  ${sharedStyles}

  //position: fixed; // Breaks catalog
  z-index: 100;
  right: ${space.x2};
  bottom: ${space.x2};
  box-shadow: ${shadow.middle};
  padding:  ${space.x2};

  background-color: ${colour.yellow.base};
  color: ${colour.white};

  &:hover{
    background-color: ${colour.yellow.x700};
    color: ${colour.yellow.x200};
    box-shadow: ${shadow.far};
  }

  &:active {
    box-shadow: none;
  }
`;

export default CreateButton;
