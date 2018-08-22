import React from 'react';
import styled, { css } from 'styled-components';
import { colour } from '@nulogy/tokens';
import Button, { buttonColours, primaryButtonColours } from './Button';

const type = ({ type = 'button' }) => (({
  button: css`
    ${buttonColours(colour.red.base)}
    
    &:hover {
      ${buttonColours(colour.red[700])};
    };

    &:active {
      ${buttonColours(colour.red.base)}
    }
  `,

  submit: css`
    ${primaryButtonColours(colour.red.base)}

    &:hover {
      ${primaryButtonColours(colour.red[700])}
    }

    &:active {
      ${primaryButtonColours(colour.red.base)}
    }
  `
})[type]);

const DangerButton = styled(Button)`
  ${ type }
`

export default DangerButton;
