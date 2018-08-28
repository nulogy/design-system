import React from 'react';
import { storiesOf } from '@storybook/react';
import T, { Table, Row, Cell, Body, Header, HeaderCell } from './Table';

console.log("T", T)

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
  ))
  .add('Exposes components on the Table component', () => (
    <T>
      <T.Header>
        <T.Row>
          <T.HeaderCell>Header Row 1, Header Cell 1</T.HeaderCell>
          <T.HeaderCell>Header Row 1, Header Cell 2</T.HeaderCell>
          <T.HeaderCell>Header Row 1, Header Cell 3</T.HeaderCell>
        </T.Row>
      </T.Header>
      <T.Body>
        <T.Row>
          <T.Cell>Row 1, Cell 1</T.Cell>
          <T.Cell>Row 1, Cell 2</T.Cell>
          <T.Cell>Row 1, Cell 3</T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>Row 2, Cell 1</T.Cell>
          <T.Cell>Row 2, Cell 2</T.Cell>
          <T.Cell>Row 2, Cell 3</T.Cell>
        </T.Row>
        <T.Row>
          <T.Cell>Row 3, Cell 1</T.Cell>
          <T.Cell>Row 3, Cell 2</T.Cell>
          <T.Cell>Row 3, Cell 3</T.Cell>
        </T.Row>
      </T.Body>
    </T>
  ));