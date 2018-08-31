import React from 'react';
import styled, { css } from 'styled-components';

const Link = styled.a`
  ${ ({ theme }) => css`
    color: ${theme.colour.blue.base};

    &:hover{
      color: ${theme.colour.blue[800]};
    }
  `}
`;

export default Link;
