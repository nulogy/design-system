import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as tokens from '../../../tokens/build/exports.js';

const Link = styled.a`
    background-color: transparent;
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
