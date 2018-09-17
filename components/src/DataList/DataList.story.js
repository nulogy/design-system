import React from 'react';
import { storiesOf } from '@storybook/react';
import loremIpsum from 'lorem-ipsum';
import { Type } from '../Type';
import DataList from './DataList';

const dataTemplate = num => [`key ${num}`, `value ${num}`];
const lipsumTemplate = num => [loremIpsum(), loremIpsum()];

const data = (count, template = dataTemplate) => Array.apply(null, {length: count}).map(
  (_, i) => template(i + 1)
);
const lipsum = num => data(num, lipsumTemplate);


storiesOf('DataList', module)
  .add('default', () => (
    <DataList data={data(11)} />
  ))
  .add('Lorem ipsum', () => (
    <React.Fragment>
      <DataList data={lipsum(10)} />
    </React.Fragment>
  ))
  .add('Accepts different columns', () => (    
    <React.Fragment>
      <Type.SubsectionTitle>Responsive [2, 5, 3] columns</Type.SubsectionTitle>
      <DataList data={data(10)} columns={[2, 5, 3]} />

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

