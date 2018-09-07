import React from 'react';
import styled from 'styled-components';
import tokens from '@nulogy/tokens';

const defaultProps = { theme: tokens };

const lineHeight = name => font.lineHeight[name] * font.size.medium;

export const Cell = styled.td`
  font-size: ${font.size.small}px;
  line-height: ${lineHeight('smaller') / font.size.small};
  padding: ${space.x2}px ${space.x1}px;
  &:first-child{
    padding-left: ${space.x2}px;
  }
  &:last-child{
    padding-right: ${space.x2}px;
    width:72px; // not the right place
  }
`;

Cell.defaultProps = defaultProps;

export const ActionCell = styled(Cell)`
  padding: ${space.x1}px ${space.x2}px ${space.x1}px ${space.x1}px;
  display: flex;
  justify-content: flex-end;
  & > button:not(:last-child) {
    margin-right: ${space.half}px;
  }
`;

export const Button = styled(QuietButton)`
  padding: ${space.half}px;
  border-width: 0;
  border-radius: 50%;
  transition: none;
  &:hover{
    background-color: ${colour.blue[300]};
    transform: scale(1.25);
    svg{
      transform: scale(0.8);
    }
  }
`;

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
  background-color: ${colour.blue[800]};
`;

export const InputCell = styled(HeaderCell.withComponent('th'))`
  font-weight: ${font.weight.normal};
  padding: ${space.x1}px;
  position: relative;
`;

export const TextInput = styled.input`
  box-sizing: border-box;
  height:32px; // Temporary
  width:100%;
  border: none;
  background: ${colour.blue[300]};
  font-size: ${font.size.small}px;
  padding: ${space.half}px ${space.x1}px;
  border-radius: ${radius.small}px;
  &:focus{
    background: ${colour.white};
  }
`;

export const Body = styled.tbody``;

export const Table = styled.table`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
`;

Table.defaultProps = defaultProps;

const DefaultTable =  styled(Table)``;

Object.entries({
  Cell,
  ActionCell,
  Row,
  InputCell,
  CreateRow,
  Header,
  Body,
  HeaderCell,
  Button,
  TextInput
}).map(([key, val]) => DefaultTable[key] = val);

export default DefaultTable;
