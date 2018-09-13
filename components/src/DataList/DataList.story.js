import React from 'react';
import { storiesOf } from '@storybook/react';
import DataList from './DataList';

const data = [
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
  ['key', 'value'],
]
storiesOf('DataList', module)
  .add('default', () => (
    <DataList data={data}/>
  ));