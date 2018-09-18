import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import facepaint from 'facepaint';
import tokens from '@nulogy/tokens';

const defaultProps = { theme: tokens };
const propTypes = { theme: PropTypes.object };

const mq = theme => facepaint(Object.values(theme.mediaQueries.min));

const castArray = val => {
  if (Array.isArray(val)) return val;
  return [val];
}

const columns = ({theme, count, columns}) => mq(theme)({
  gridTemplateColumns: castArray(columns).map(cols => `repeat(${cols}, 1fr)`),
  gridTemplateRows: castArray(columns).map(cols => `repeat(${Math.ceil(count/cols)}, 1fr)`),
  display: ['block', 'grid'],
  marginBottom: [`${theme.space.x1}px`, 0],
  gridAutoFlow: 'column dense',
  gridGap: `${theme.space.x1}px`
});

export const List = styled.dl`
  margin: 0;
  ${ columns }
`;
List.displayName = 'NDS.DataList.List';
List.defaultProps = { 
  ...defaultProps,
  count: 1,
  columns: [1, 2, 3],
};
List.propTypes = {
  ...propTypes,
  count: PropTypes.number,
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ])
}

export const Key = styled.dt`
  ${({theme}) => css`
    font-weight: ${theme.font.weight.bold};
    position: relative;
  `}
`;
Key.displayName = 'NDS.DataList.Key';
Key.defaultProps = { ...defaultProps };
Key.propTypes = { ...propTypes };

export const Value = styled.dd`
  margin-left: 0;
  ${({theme}) => css`
    margin-bottom: ${theme.space.x1}px;
  `}
`;
Value.displayName = 'NDS.DataList.Value';
Value.defaultProps = { ...defaultProps };
Value.propTypes = { ...propTypes };

export const Pair = styled.span``;
Pair.displayName = 'NDS.DataList.Pair';

const render = (key, value) => (
  <React.Fragment>
    <Key>{key}</Key>
    <Value>{value}</Value>
  </React.Fragment>
);

const DataList = ({ data, columns, children = render }) => (
  <List count={data.length} columns={columns}>
    {data.map(([key, value]) => (
      <Pair key={`${key}-${value}`}>
        {children(key, value)}
      </Pair>
    ))}
  </List>
);
DataList.displayName = 'NDS.DataList';
DataList.defaultProps = { 
  columns: [1, 2, 3],
};
DataList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  children: PropTypes.func
}
export default DataList;