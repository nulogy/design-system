import React from 'react';
import styled, { css } from 'styled-components';
import { borderRadius, colour, space, font, corner, shadow } from '@nulogy/tokens';
import sharedStyles from './sharedStyles';

const buttonCSS = css`
  color: ${colour.blue.base};
  background-color: colour.white;
  border: solid 1px ${colour.neutral.x200};

  &:hover{
    color: ${colour.blue.x700};
  };
`

const submitCSS = css`background-color: ${colour.blue.base};
color: ${colour.white};

&:hover{
  background-color: ${colour.blue.x700};
}`

const Button = styled.button`
  ${sharedStyles}

  ${ ({size}) => sizeCSS[size] }

  ${ props => (props.type === "submit") ? submitCSS : buttonCSS }

  }
`;

export default Button;
