import React from 'react';
import styled from 'styled-components';

const borderStyle = ({ theme }) => `1px solid ${theme.colour.neutral[400]}`;

export const Cell = styled.td`
  padding: 1rem;
  border-bottom: ${borderStyle};
`;

export const Row = styled.tr``;

export const HeaderRow = styled(Row.withComponent('thead'))``;

export const HeaderCell = styled(Cell.withComponent('th'))`
  font-weight: bold;
  border-bottom-width: 2px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-top: ${borderStyle};
`;