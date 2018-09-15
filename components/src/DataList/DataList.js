import React from 'react';
import styled, { css } from 'styled-components';
import facepaint from 'facepaint';
import tokens from '@nulogy/tokens';

const mq = theme => facepaint(Object.values(theme.mediaQueries));
const responsiveColours = mq(tokens)({color: ['red', 'blue', 'green']})
console.log('responsiveColours :', responsiveColours);

export const List = styled.dl`
  display: grid;
  grid-auto-flow: column dense;
  ${({theme, count = 1, columns = 3, colour = ['red', 'blue', 'green']}) => css`
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${Math.ceil(count/columns)}, 1fr);
    
    ${responsiveColours}
  `}
`;
List.displayName = 'NDS.DataList.List';
List.defaultProps = { theme: tokens };

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