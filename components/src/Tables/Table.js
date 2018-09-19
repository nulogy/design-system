import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';
import QuietButton from '../Button/QuietButton';

const defaultProps = { theme: tokens };

const lineHeight = name => ({ theme }) => theme.font.lineHeight[name] * theme.font.size.medium;

export const Cell = styled.td`
  ${ ({ theme }) => css`
    font-size: ${theme.font.size.small}px;
    line-height: ${lineHeight('smaller')({ theme }) / theme.font.size.small};
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
    border-bottom: solid 1px ${theme.colour.blue['300']};
  `}
`;

export const Header = styled.thead`
  text-align: left;
`;

export const HeaderCell = styled(Cell.withComponent('th'))`
  ${ ({ theme }) => css`
    font-size: ${theme.font.size.small}px;
    color: ${theme.colour.neutral[600]};
    text-transform: uppercase;
    letter-spacing: .05em;
    line-height: 1.143; // related to https://github.com/nulogy/design-system/pull/43#discussion_r218503006
    font-weight: normal;
    vertical-align: bottom;
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

export const TemporaryTextInput = styled.input`
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

TemporaryTextInput.defaultProps = defaultProps;

export const Body = styled.tbody`
`;

Body.defaultProps = defaultProps;

export const Table = styled.table`
  ${ ({ theme }) => css`
    border-collapse: collapse;
    width: 100%;
    background-color: ${theme.colour.white};
  `}
`;

Table.defaultProps = defaultProps;

export const DataTable = ({ data, headers }) => (
  <Table>
    { headers && 
    <Header>
      <Row>
      {headers.map(header => (
        <HeaderCell key={`DataTableHeader_${header}`}>
          {header}
        </HeaderCell>
      ))}
      </Row>
    </Header>
    }

    <Body>
    {data.map(row => (
      <Row key={`DataTableHeaderRow_${row}`}>
      {row.map(cell => (
        <Cell key={`DataTableHeaderCell_${row}_${cell}`}>
          {cell}
        </Cell>
      ))}
      </Row>
    ))}
    </Body>
  </Table>
);

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  headers: PropTypes.array
}
