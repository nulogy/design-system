import React from 'react';
import styled, { css } from 'styled-components';
import { colour } from '@nulogy/tokens';
import Button, { buttonColours, primaryButtonColours } from './Button';

const type = ({ type = 'button' }) => (({
  button: css`
    ${buttonColours(colour.green.base)}
    
    &:hover {
      ${buttonColours(colour.green[700])};
    };

    &:active {
      ${buttonColours(colour.green.base)}
    }
  `,

  submit: css`
    ${primaryButtonColours(colour.green.base)}

    &:hover {
      ${primaryButtonColours(colour.green[700])}
    }

    &:active {
      ${primaryButtonColours(colour.green.base)}
    }
  `
})[type]);

const ApprovalButton = styled(Button)`
  ${ type }
`

export default ApprovalButton;
