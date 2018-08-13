import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';


const sharedStyles = css`
  box-sizing: border-box;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  font-size: ${font.size.medium}px;
  font-weight: ${font.weight.medium};
  padding: ${space.x2} ${space.x3};
  border-radius: ${corner.small};
  transition: .1s  ease-in-out;

  &:hover{
    transform: scale(1.02);
    box-shadow: ${shadow.close};
  }

  &:focus{
    transform: scale(1);
    box-shadow: ${shadow.pressed};
  }

  &:active {
    transform: scale(1);
    box-shadow: ${shadow.pressed};
  }
`

export default sharedStyles;
