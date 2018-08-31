import React from 'react';
import styled from 'styled-components';
import tokens from '@nulogy/tokens';

const defaultProps = { theme: tokens };

const borderStyle = ({ theme }) => `1px solid ${theme.colour.neutral[400]}`;

const lineHeight = name => font.lineHeight[name] * font.size.medium;

export const Cell = styled.td`
  font-size: ${font.size.small}px;
  line-height: ${lineHeight('smaller') / font.size.small};
  padding: ${space.x2}px ${space.half}px;

  &:first-child{
    padding-left: ${space.x1}px
  }
  &:last-child{
    padding-right: ${space.x1}px
  }
`;

Cell.defaultProps = defaultProps;

export const Row = styled.tr`
  &:nth-child(odd){
    background-color: ${colour.blue['200']};
  }
`;

export const Header = styled.thead`
  text-align: left;
`;

export const HeaderCell = styled(Cell.withComponent('th'))`
  font-weight: bold;
  background-color: ${colour.white}; // sloppy
`;

export const CreateRow = styled.tr`
  background-color: ${colour.blue[400]};
`;

export const CreateRowCell = styled(Cell.withComponent('th'))`
  font-weight: ${font.weight.normal};
  padding: ${space.x1}px ${space.half}px;
`;

export const Body = styled.tbody``;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

Table.defaultProps = defaultProps;

const DefaultTable =  styled(Table)``;

Object.entries({
  Cell,
  ActionCell,
  Row,
  CreateRowCell,
  CreateRow,
  Header,
  Body,
  HeaderCell,
}).map(([key, val]) => DefaultTable[key] = val);

export default DefaultTable;
