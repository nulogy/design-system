import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';
import QuietButton from '../Button/QuietButton';

const defaultProps = { theme: tokens };

const lineHeight = theme => name => theme.font.lineHeight[name] * theme.font.size.medium;

const defaultProps = {
  theme: tokens
}

export const Cell = styled.td`
  ${ ({ theme }) => css`
    font-size: ${theme.font.size.small}px;
    line-height: ${lineHeight(theme)('smaller') / theme.font.size.small};
    padding: ${theme.space.x2}px ${theme.space.x1}px;
    &:first-child{
      padding-left: ${theme.space.x2}px;
    }
    &:last-child{
      padding-right: ${theme.space.x2}px;

    }
  `}
`;

Cell.defaultProps = defaultProps;

export const ActionCell = styled(Cell)`
  ${ ({ theme }) => css`
    padding: ${theme.space.x1}px ${theme.space.x2}px ${theme.space.x1}px ${theme.space.x1}px;
    display: flex;
    justify-content: flex-end;
    & > button:not(:last-child) {
      margin-right: ${theme.space.half}px;
    }
  `}
`;

ActionCell.defaultProps = defaultProps;

export const Button = styled(QuietButton)`
  ${ ({ theme }) => css`
    padding: ${theme.space.half}px;
    border-width: 0;
    border-radius: 50%;
    transition: none;
    &:hover{
      background-color: ${theme.colour.blue[300]};
      transform: scale(1.25);
      svg{
        transform: scale(0.8);
      }
    }
  `}
`;

Button.defaultProps = defaultProps;

export const Row = styled.tr`
  ${ ({ theme }) => css`
    &:nth-child(odd){
      background-color: ${theme.colour.blue['200']};
    }
  `}
`;

Row.defaultProps = defaultProps;

export const Header = styled.thead`
  text-align: left;
`;

export const HeaderCell = styled(Cell.withComponent('th'))`
  ${ ({ theme }) => css`
    font-weight: bold;
    background-color: ${theme.colour.white}; // sloppy
  `}
`;

HeaderCell.defaultProps = defaultProps;

export const CreateRow = styled.tr`
  ${ ({ theme }) => css`
    background-color: ${theme.colour.blue[800]};
  `}
`;

CreateRow.defaultProps - defaultProps;

export const InputCell = styled(HeaderCell.withComponent('th'))`
  ${  ({ theme }) => css`
    font-weight: ${theme.font.weight.normal};
    padding: ${theme.space.x1}px;
    position: relative;
  `}
`;

InputCell.defaultProps = defaultProps;

export const TextInput = styled.input`
  ${ ({ theme }) => css`
    box-sizing: border-box;
    height:32px; // Temporary
    width:100%;
    border: none;
    background: ${theme.colour.blue[300]};
    font-size: ${theme.font.size.small}px;
    padding: ${theme.space.half}px ${theme.space.x1}px;
    border-radius: ${theme.radius.small}px;
    &:focus{
      background: ${theme.colour.white};
    }
  `}
`;

TextInput.defaultProps = defaultProps;

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
  InputCell,
  CreateRow,
  Header,
  Body,
  HeaderCell,
  Button,
  TextInput
}).map(([key, val]) => DefaultTable[key] = val);

export default DefaultTable;
