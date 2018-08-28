import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Row, Cell, HeaderRow, HeaderCell } from './Table';

storiesOf('Table', module)
  .add('default', () => (
    <Table>
      <HeaderRow>
        <HeaderCell>Row 1, HeaderCell 1</HeaderCell>
        <HeaderCell>Row 1, HeaderCell 2</HeaderCell>
        <HeaderCell>Row 1, HeaderCell 3</HeaderCell>
      </HeaderRow>
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