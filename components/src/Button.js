import React from 'react';
import styled from 'styled-components';
import t, { colours } from '@nulogy/tokens';

const Button = styled.button`
  background-color: ${colours.secondary};
  border: 2px solid ${colours.primary};
  color: ${colours.primary};
  padding: 1rem 2rem;
  border-radius: ${t.borderRadius};
  &:hover {
    background-color: ${colours.primary};
    color: white;
  }
`;

export default Button;
