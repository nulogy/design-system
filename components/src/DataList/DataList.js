import React from 'react';
import styled, { css } from 'styled-components';
import facepaint from 'facepaint';
import tokens from '@nulogy/tokens';

const mq = theme => facepaint(Object.values(theme.mediaQueries.min));

const castArray = val => {
  if (Array.isArray(val)) return val;
  return [val];
}

const columns = ({theme, count, columns}) => mq(theme)({
  gridTemplateColumns: castArray(columns).map(cols => `repeat(${cols}, 1fr)`),
  gridTemplateRows: castArray(columns).map(cols => `repeat(${Math.ceil(count/cols)}, 1fr)`),
});

export const List = styled.dl`
  display: grid;
  grid-auto-flow: column dense;
  ${ columns }
`;
List.displayName = 'NDS.DataList.List';
List.defaultProps = { 
  theme: tokens,
  count: 1,
  columns: [1, 2, 3],
};

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
);
export default DataList;