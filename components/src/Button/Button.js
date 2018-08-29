import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space, font, radius, shadow } from '@nulogy/tokens';

const borderWidth = 1;

const withoutBorder = value => value - borderWidth;

const smallButtonPaddingY = 1;

const lineHeightPx = font.lineHeight.regular * font.size.medium;

const smallerLineHeightPx = font.lineHeight.smaller * font.size.medium;

const lineHeight = (fontSize, targetLineHeight = smallerLineHeightPx) => targetLineHeight / fontSize;

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
    font-size: ${font.size.large}px;
    line-height: ${lineHeight(font.size.large, lineHeightPx)};
    font-weight: ${font.weight.medium};
    padding: ${withoutBorder(space.x2)}px ${space.x3}px;
  `,

  medium: css`
    font-size: ${font.size.small}px;
    line-height: ${lineHeight(font.size.small)};
    font-weight: ${font.weight.medium};
    padding: ${withoutBorder(space.x1)}px ${space.x2}px;
  `,

  small: css`
    font-size: ${font.size.smaller}px;
    line-height: ${lineHeight(font.size.smaller)};
    font-weight: ${font.weight.normal};
    padding: ${smallButtonPaddingY}px ${space.half}px;
  `
})[size]);

const Button = styled.button`
  box-sizing: border-box;
  border-style: solid;
  border-width: ${borderWidth}px;
  appearance: none;
  cursor: pointer;
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
