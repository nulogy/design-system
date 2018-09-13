import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';

export const List = styled.dl``;

List.displayName = 'NDS.DataList.List';
List.defaultProps = { theme: tokens };

export const Key = styled.dt`
  ${({theme}) => css`
    font-weight: ${theme.font.weight.bold};
  `}
`;

Key.displayName = 'NDS.DataList.Key';
Key.defaultProps = { theme: tokens };

export const Value = styled.dd`
  margin-left: 0;
  ${({theme}) => css`
    margin-bottom: ${theme.space.x1}px;
  `}
`;

Value.displayName = 'NDS.DataList.Value';
Value.defaultProps = { theme: tokens };

const DataList = ({ data }) => (
  <List>
    {data.map(([key, value]) => (
      <React.Fragment>
        <Key>{key}</Key>
        <Value>{value}</Value>
      </React.Fragment>
    ))}
  </List>
)
export default DataList;