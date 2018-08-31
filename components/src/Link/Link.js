import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Link = styled.a`
  ${ ({ theme }) => css`
    color: ${theme.colour.blue.base};

    &:hover{
      color: ${theme.colour.blue[800]};
    }
  `}
  ${ ({ underline = true }) => !underline && css`
    text-decoration: none;
  `}
`;

Link.propTypes = {
  underline: PropTypes.bool
}

export default Link;
