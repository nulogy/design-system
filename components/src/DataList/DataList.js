import React from 'react';
import styled, { css } from 'styled-components';
import tokens from '@nulogy/tokens';

export const List = styled.dl`
  display: grid;
  grid-auto-flow: column dense;
  ${({count = 1, columns = 3}) => css`
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${Math.ceil(count/columns)}, 1fr);
  `}

`;
List.displayName = 'NDS.DataList.List';

export const Key = styled.dt`
  ${({theme}) => css`
    font-weight: ${theme.font.weight.bold};
    position: relative;
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

export const Pair = styled.span``;
Pair.displayName = 'NDS.DataList.Pair';

const DataList = ({ data, columns }) => (
  <List count={data.length} columns={columns}>
    {data.map(([key, value]) => (
      <Pair key={`${key}-${value}`}>
        <Key>{key}</Key>
        <Value>{value}</Value>
      </Pair>
    ))}
  </List>
)
export default DataList;