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
    background-color: ${colour.neutral['300']};
  }
`;

export const Header = styled.thead``;

export const Header = styled.thead`
  text-align: left;
`;

export const HeaderCell = styled(Cell.withComponent('th'))`
  font-weight: bold;
  text-align: left;
  background-color: ${colour.white}; // sloppy
`;

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
  Header,
  Body,
  HeaderCell,
}).map(([key, val]) => DefaultTable[key] = val);

export default DefaultTable;
