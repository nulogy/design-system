import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space, font, radius, shadow } from '@nulogy/tokens';

export const buttonColours = (mainColour = colour.blue.base) => css`
  color: ${mainColour};
  background-color: ${colour.white};
  border-color: ${mainColour};
`

export const primaryButtonColours = (mainColour = colour.blue.base) => css`
  color: ${colour.white};
  background-color: ${mainColour};
  border-color: ${mainColour};
`

const type = ({ type = 'button' }) => (({
  button: css`
    ${buttonColours()}
    
    &:hover {
      ${buttonColours(colour.blue[700])};
    };

    &:active {
      ${buttonColours()}
    }
  `,

  submit: css`
    ${primaryButtonColours()}

    &:hover {
      ${primaryButtonColours(colour.blue[700])}
    }

    &:active {
      ${primaryButtonColours()}
    }
  `
})[type]);

const size = ({ size = 'medium' }) => (({
  large: css`
    font-size: ${font.size.large}px;
    font-weight: ${font.weight.medium};
  `,

  medium: css`
    font-size: ${font.size.small}px;
    font-weight: ${font.weight.medium};
  `,

  small: css`
    font-size: ${font.size.smaller}px;
    font-weight: ${font.weight.normal};
  `
})[size]);

const Button = styled.button`
  border-style: solid;
  border-width: 1px;
  appearance: none;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1.3;
  padding: ${space.x1} ${space.x2};
  border-radius: ${radius.small};
  transition: .1s  ease-in-out;
  text-align: left;

  ${ size }
  ${ type }

  &:hover{
    box-shadow: ${shadow.close};
  }

  &:active {
    border-style: solid;
    box-shadow: none;
    outline: none;
    transform: scale(0.98);
    transition: .05s  ease-in;
  }

  &:disabled {
    background-color: ${colour.neutral['300']};
    border-color: ${colour.neutral['300']};
    color: ${colour.neutral['500']};
    pointer-events: none;
  }
`;

export default Button;
