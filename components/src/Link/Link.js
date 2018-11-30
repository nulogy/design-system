import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as tokens from '../../../tokens/build/exports.js';

const Link = styled.a`
    color: red;
    background-color: transparent;
    font-size: ${tokens.size_font_largest};
    &:hover{
      color: black};
    }

  ${ ({ underline }) => css`
    text-decoration: ${underline ? 'underline' : 'none' };
  `}
`;

Link.propTypes = {
  underline: PropTypes.bool
}

Link.defaultProps = {
  underline: true,
}

export default Link;
