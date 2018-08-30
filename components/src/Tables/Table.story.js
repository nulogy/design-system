import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Row, Cell, Body, Header, HeaderCell } from './';

storiesOf('Table', module)
  .add('default', () => (
    <Table>
      <Header>
        <Row>
          <HeaderCell>Header Row 1, Header Cell 1</HeaderCell>
          <HeaderCell>Header Row 1, Header Cell 2</HeaderCell>
          <HeaderCell>Header Row 1, Header Cell 3</HeaderCell>
        </Row>
      </Header>
      <Body>
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
      </Body>
    </Table>
  ));