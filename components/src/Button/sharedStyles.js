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

  font-size: ${font.size.small}px;
  font-weight: ${font.weight.medium};
  line-height: 1.3; // Adjust when introduce cropTool
  padding: ${space.x1} ${space.x2};
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
