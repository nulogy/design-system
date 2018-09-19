import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space, font, radius, shadow } from '@nulogy/tokens';
import { fontMetrics } from '../utils.js';

const borderWidth = 1;

const withoutBorder = value => value - borderWidth;

const smallButtonPaddingY = 1;

const lineHeight = name => font.lineHeight[name] * font.size.medium;

export const buttonReset = css`
  box-sizing: border-box;
  padding: 0;
  border-width: 0;
  border-style: solid;
  appearance: none;
  outline: none;
  font-size: inherit;
  cursor: pointer;
`;

export const buttonColours = (mainColour = colour.blue.base, ) => css`
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

    &:disabled {
      ${buttonColours(colour.neutral[400])};
      border-color: ${colour.neutral['300']};
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

    &:disabled {
      ${primaryButtonColours(colour.neutral['300'])}
      color: ${colour.neutral['500']};
    }
  `
})[type]);

const size = ({ size = 'medium' }) => (({
  large: css`
    ${fontMetrics('large', 'medium')({theme: {font}})};
    font-weight: ${font.weight.medium};
    padding: ${withoutBorder(space.x2)}px ${space.x3}px;
  `,

  medium: css`
    ${fontMetrics()({theme: {font}})};
    font-weight: ${font.weight.medium};
    padding: ${withoutBorder(space.x1)}px ${space.x2}px;
  `,

  small: css`
    ${fontMetrics('smaller', 'small')({theme: {font}})};
    font-weight: ${font.weight.normal};
    padding: ${smallButtonPaddingY}px ${space.half}px;
  `
})[size]);

const Button = styled.button`
  ${buttonReset}
  border-style: solid;
  border-width: ${borderWidth}px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${radius.small}px;
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
    pointer-events: none;
  }

`;

export default Button;
