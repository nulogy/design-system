import React from 'react';
import { storiesOf } from '@storybook/react';
import DataList from './DataList';

const dataTemplate = num => [`key ${num}`, `value ${num}`];
const data = count => Array.apply(null, {length: count}).map(
  (_, i) => dataTemplate(i + 1)
);

storiesOf('DataList', module)
  .add('default', () => (
    <DataList data={data(11)} />
  ));

