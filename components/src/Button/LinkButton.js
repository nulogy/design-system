import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';
import { buttonReset } from './Button';
import { Link } from '../Link';

const LinkButton = styled(Link.withComponent('button'))`
  ${buttonReset}
  ${ ({ theme }) => css`
    &:disabled {
      color: ${theme.colour.neutral[400]};
      pointer-events: none;
    }
  `}
`;

LinkButton.defaultProps = {
  theme: tokens
}

export default LinkButton;