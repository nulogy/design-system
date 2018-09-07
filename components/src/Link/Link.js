import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';

const Link = styled.a`
  ${ ({ theme }) => css`
    color: ${theme.colour.blue.base};
    background-color: transparent;
    &:hover{
      color: ${theme.colour.blue[800]};
    }
  `}
  ${ ({ underline }) => css`
    text-decoration: ${underline ? 'underline' : 'none' };
  `}
`;

Link.propTypes = {
  underline: PropTypes.bool
}

Link.defaultProps = {
  theme: tokens,
  underline: true,
}

export default Link;
