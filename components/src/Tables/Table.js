import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';
import QuietButton from '../Button/QuietButton';

const defaultProps = { theme: tokens };

const lineHeight = theme => name => theme.font.lineHeight[name] * theme.font.size.medium;

export const Cell = styled.td`
  ${ ({ theme }) => css`
    font-size: ${theme.font.size.small}px;
    line-height: ${lineHeight(theme)('smaller') / theme.font.size.small};
    padding: ${theme.space.x2}px ${theme.space.x1}px;
    vertical-align: top;
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
    padding-top: ${theme.space.x1}px;
    padding-bottom: ${theme.space.x1}px;
    text-align:right;
    white-space: nowrap;
    vertical-align: middle;
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
    vertical-align: bottom;
    background-color: ${theme.colour.white}; // sloppy
  `}
`;

HeaderCell.defaultProps = defaultProps;

export const CreateRow = styled.tr`
  ${ ({ theme }) => css`
    background-color: ${theme.colour.blue[800]};
    color: ${theme.colour.white};
    ${ ActionCell } {
      padding-top: ${theme.space.x2}px;
      padding-bottom: ${theme.space.x2}px;
    }
  `}
`;

CreateRow.defaultProps = defaultProps;

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
  ${ ({ theme }) => css`
    border-collapse: collapse;
    width: 100%;
    background-color: ${theme.colour.white};
  `}
`;

Table.defaultProps = defaultProps;
