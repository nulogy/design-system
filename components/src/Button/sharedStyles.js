import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';

const sharedStyles = css`
  border: none;
  outline: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: ${font.size.small}px;
  font-weight: ${font.weight.bold};
  padding: ${space.x1};
  border-radius: ${borderRadius};
  transition: .2s;
  cursor: pointer;
  position: relative; top: 0px; left: 0px; // for animation
  &:active {
    top: 1px;
    left: 1px;
  }
`

export default sharedStyles;
