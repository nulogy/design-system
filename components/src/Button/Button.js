import React from 'react';
import styled, { css } from 'styled-components';
import { colour, space, font, radius, shadow } from '@nulogy/tokens';
import { fontMetrics, lineHeightRatio } from '../utils.js';
import {Wrapper as IconWrapper, iconSizeRatioForLineHeight} from '../Icons/Icon';

const borderWidth = 1;

const withoutBorder = value => value - borderWidth;

const smallButtonPaddingY = 1;

const themeProp = { theme: { font } };

const iconSizeRatio = 
  (fontSize = 'medium', lineHeight = 'medium') => 
  ({ theme }) => 
    (lineHeightRatio(fontSize, lineHeight)(themeProp) * iconSizeRatioForLineHeight(lineHeight)(themeProp));

export const buttonReset = css`
  appearance: none;
  box-sizing: border-box;
  padding: 0;
  border-width: 0;
  border-style: solid;
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

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & + & {
    margin-left: ${space.half}px;
  }
`;

const size = ({ size = 'medium' }) => (({
  large: css`
    ${fontMetrics('large', 'medium')(themeProp)};
    font-weight: ${font.weight.medium};
    padding: ${withoutBorder(space.x2)}px;
    ${Wrapper} {
      min-height: ${lineHeightRatio('large', 'medium')(themeProp)}em;
    }
    ${IconWrapper}{
      width: ${iconSizeRatio('large', 'medium')(themeProp)}em;
      height: ${iconSizeRatio('large', 'medium')(themeProp)}em;
    }
    ${IconWrapper} > svg{
      height: 100%;
      width: 100%;
    }
  `,

  medium: css`
    ${fontMetrics()(themeProp)};
    font-weight: ${font.weight.medium};
    padding: ${withoutBorder(space.x1)}px;
    ${Wrapper} {
      min-height: ${lineHeightRatio()(themeProp)}em;
    }
    ${IconWrapper}{
      width: ${iconSizeRatio()(themeProp)}em;
      height: ${iconSizeRatio()(themeProp)}em;
    }
    ${IconWrapper} > svg{
      height: 100%;
      width: 100%;
    }
  `,

  small: css`
    ${fontMetrics('smaller', 'small')(themeProp)};
    font-weight: ${font.weight.normal};
    padding: ${smallButtonPaddingY}px ${space.half}px;
    ${Wrapper} {
      min-height: ${lineHeightRatio('smaller', 'small')(themeProp)}em;
    }
    ${IconWrapper}{
      width: ${iconSizeRatio('smaller', 'small')(themeProp)}em;
      height: ${iconSizeRatio('smaller', 'small')(themeProp)}em;
    }
    ${IconWrapper} > svg{
      height: 100%;
      width: 100%;
    }
  `
})[size]);

const StyledButton = styled.button`
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

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>
    {Array.isArray(children) ? children.map(child => <Wrapper>{child}</Wrapper>) : <Wrapper>{children}</Wrapper>}
  </StyledButton>
);

export default Button;
