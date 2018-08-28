import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Row, Cell } from './Table';

storiesOf('Table', module)
  .add('default', () => (
    <Table>
      <Row>
        <Cell>Row 1, Cell 1</Cell>
        <Cell>Row 1, Cell 2</Cell>
        <Cell>Row 1, Cell 3</Cell>
      </Row>
      <Row>
        <Cell>Row 2, Cell 1</Cell>
        <Cell>Row 2, Cell 2</Cell>
        <Cell>Row 2, Cell 3</Cell>
      </Row>
      <Row>
        <Cell>Row 3, Cell 1</Cell>
        <Cell>Row 3, Cell 2</Cell>
        <Cell>Row 3, Cell 3</Cell>
      </Row>
    </Table>
  ));