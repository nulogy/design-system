import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';

const defaultProps = { theme: tokens };

export const Text = styled.span`
  ${ ({ theme }) => ({
    fontSize: theme.font.size.medium,
    lineHeight: theme.font.lineHeight.regular,
  })}
`;

Text.defaultProps = defaultProps;