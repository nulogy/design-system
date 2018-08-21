import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space, font, radius, shadow } from '@nulogy/tokens';

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
    border-color: ${colour.blue.base};

    &:hover{
      background-color: ${colour.blue.x700};
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
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.3;
  padding: ${space.x1} ${space.x2};
  border-radius: ${corner.small};
  transition: .1s  ease-in-out;

  ${ size }
  ${ type }

  &:hover{
    box-shadow: ${shadow.close};
  }

  &:active {
    box-shadow: none;
    outline: none; // test this
    transform: scale(0.98);
    transition: .05s  ease-in;
  }

  &:disabled {
    background-color: ${colour.neutral.x300};
    color: ${colour.neutral.x500};
    pointer-events: none;
    border-color: ${colour.neutral.x300};

    &:hover{
      box-shadow: none;
    }
  }
`;

export default Button;
