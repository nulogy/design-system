import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Cell, ActionCell, CreateRowCell, Row, CreateRow, Body, Header, HeaderCell } from './';
import QuietButton from ".././Button/QuietButton";

storiesOf('Table', module)
  .add('Read Only', () => (
    <Table>
      <Header>
        <Row>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Key</HeaderCell>
          <HeaderCell>Integration Key</HeaderCell>
          <HeaderCell></HeaderCell>
        </Row>
      </Header>
      <Body>
        <Row>
          <Cell>Row 1, Cell 1</Cell>
          <Cell>Row 1, Cell 2</Cell>
          <Cell>Row 1, Cell 3</Cell>
          <ActionCell></ActionCell>
        </Row>
        <Row>
          <Cell>Row 2, Cell 1</Cell>
          <Cell>Row 2, Cell 2</Cell>
          <Cell>Row 2, Cell 3</Cell>
          <ActionCell></ActionCell>
        </Row>
        <Row>
          <Cell>Row 3, Cell 1</Cell>
          <Cell>Row 3, Cell 2</Cell>
          <Cell>Row 3, Cell 3</Cell>
          <ActionCell></ActionCell>
        </Row>
      </Body>
    </Table>
  ))
  .add('Edit Mode', () => (
    <Table>
      <Header>
        <Row>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Key</HeaderCell>
          <HeaderCell>Integration Key</HeaderCell>
          <HeaderCell></HeaderCell>
        </Row>
      </Header>
      <Body>
        <Row>
          <Cell>Row 1, Cell 1</Cell>
          <Cell>Row 1, Cell 2</Cell>
          <Cell>Row 1, Cell 3</Cell>
          <ActionCell><QuietButton>+</QuietButton></ActionCell>
        </Row>
        <Row>
          <Cell>Row 2, Cell 1</Cell>
          <Cell>Row 2, Cell 2</Cell>
          <Cell>Row 2, Cell 3</Cell>
          <ActionCell>
            <QuietButton>+</QuietButton>
            <QuietButton>+</QuietButton>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Row 3, Cell 1</Cell>
          <Cell>Row 3, Cell 2</Cell>
          <Cell>Row 3, Cell 3</Cell>
          <ActionCell><QuietButton>+</QuietButton></ActionCell>
        </Row>
      </Body>
    </Table>
  ))
  .add('With Create Row', () => (
    <Table>
      <Header>
        <Row>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Key</HeaderCell>
          <HeaderCell>Integration Key</HeaderCell>
          <HeaderCell></HeaderCell>
        </Row>
        <CreateRow>
          <CreateRowCell><QuietButton>+</QuietButton></CreateRowCell>
          <CreateRowCell></CreateRowCell>
          <CreateRowCell></CreateRowCell>
          <ActionCell><QuietButton>+</QuietButton></ActionCell>
        </CreateRow>
      </Header>
      <Body>
        <Row>
          <Cell>Row 1, Cell 1</Cell>
          <Cell>Row 1, Cell 2</Cell>
          <Cell>Row 1, Cell 3</Cell>
          <ActionCell><QuietButton>+</QuietButton></ActionCell>
        </Row>
        <Row>
          <Cell>Row 2, Cell 1</Cell>
          <Cell>Row 2, Cell 2</Cell>
          <Cell>Row 2, Cell 3</Cell>
          <ActionCell>
            <QuietButton>+</QuietButton>
            <QuietButton>+</QuietButton>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Row 3, Cell 1</Cell>
          <Cell>Row 3, Cell 2</Cell>
          <Cell>Row 3, Cell 3</Cell>
          <ActionCell><QuietButton>+</QuietButton></ActionCell>
        </Row>
      </Body>
    </Table>
  ));
