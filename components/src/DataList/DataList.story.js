import React from 'react';
import { storiesOf } from '@storybook/react';
import { Type } from '../Type';
import DataList from './DataList';

const dataTemplate = num => [`key ${num}`, `value ${num}`];
const data = count => Array.apply(null, {length: count}).map(
  (_, i) => dataTemplate(i + 1)
);

storiesOf('DataList', module)
  .add('default', () => (
    <DataList data={data(11)} />
  ))
  .add('Accepts different columns', () => (    
    <React.Fragment>
      <Type.SubsectionTitle>One Column</Type.SubsectionTitle>
      <DataList data={data(3)} columns={1} />
      
      <Type.SubsectionTitle>Two Column</Type.SubsectionTitle>
      <DataList data={data(3)} columns={2} />
      
      <Type.SubsectionTitle>Three Column</Type.SubsectionTitle>
      <DataList data={data(5)} columns={3} />
      
      <Type.SubsectionTitle>10 Column</Type.SubsectionTitle>
      <DataList data={data(18)} columns={10} />
    </React.Fragment>
  ));

