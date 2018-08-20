import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const type = ({ type = 'button' }) => (({
  button: css`
    color: ${colour.blue.base};
    background-color: colour.white;
    border: solid 1px ${colour.neutral.x200};

    &:hover{
      color: ${colour.blue.x700};
    };
  `,

  submit: css`
    background-color: ${colour.blue.base};
    color: ${colour.white};
    
    &:hover{
      background-color: ${colour.blue.x700};
    }
  `
})[type]);

const size = ({ size }) => (({
  large: css`
    font-size: ${font.size.large}px;
    font-weight: ${font.weight.medium};
    padding: ${space.x1} ${space.x2};
  `,

  small: css`
    font-size: ${font.size.smaller}px;
    font-weight: ${font.weight.normal};
    padding: ${space.x1} ${space.x2};
  `
})[size]);

const Button = styled.button`
  ${sharedStyles}

  ${ size }
  ${ type }

  &:disabled {
    background-color: ${colour.neutral.x300};
    color: ${colour.neutral.x500};
    pointer-events: none;

    &:hover{
      box-shadow: none;
    }
  }
`;

export default Button;
