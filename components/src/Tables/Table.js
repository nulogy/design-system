import React from 'react';
import styled from 'styled-components';

const borderColour = 'lightgrey';


export const Cell = styled.td`
  border-bottom: 1px solid ${borderColour};
  padding: 1rem;
`;

export const Row = styled.tr``;

export const Table = styled.table`
  border-collapse: collapse;
  border-top: 1px solid ${borderColour};
`;