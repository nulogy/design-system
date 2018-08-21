import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space, font, radius, shadow } from '@nulogy/tokens';

export const buttonColours = ({
  text = colour.white,
  background = colour.blue.base,
  border = background,
} = {}) => css`
  color: ${text};
  background-color: ${background};
  border-color: ${border};
`

const type = ({ type = 'button' }) => (({
  button: css`
    ${buttonColours({
      text: colour.blue.base,
      background: colour.white,
      border: colour.neutral['300']
    })}
    
    &:hover{
      color: ${colour.blue['700']};
    };
  `,

  submit: css`
    ${buttonColours()}

    &:hover{
      ${buttonColours({ background: colour.blue[700] })}
    }

    &:active {
      ${buttonColours({ background: colour.blue.base })}
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
