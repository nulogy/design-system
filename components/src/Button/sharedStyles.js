import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';


const sharedStyles = css`
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  border: none;
  cursor: pointer;

  font-size: ${font.size.medium}px;
  font-weight: ${font.weight.medium};
  padding: ${space.x2} ${space.x3};
  border-radius: ${corner.small};
  transition: .1s  ease-in-out;

  &:hover{
    box-shadow: ${shadow.close};
  }

  &:active {
    box-shadow: none;
    outline: none; // test this
    transform: scale(0.98);
    transition: .05s  ease-in;
  }
`

export default sharedStyles;
