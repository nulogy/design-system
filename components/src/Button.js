import React from 'react';
import styled from 'styled-components';
import { borderRadius, colour } from '@nulogy/tokens';

const Button = styled.button`
  background-color: ${colour.white};
  border: 2px solid ${colour.primary};
  color: ${colour.primary};
  padding: 1rem 2rem;
  border-radius: ${borderRadius};
  &:hover {
    background-color: ${colour.primary};
    color: white;
  }
`;

export default Button;
