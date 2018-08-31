import React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, Cell, ActionCell, CreateRowCell, Row, CreateRow, Body, Header, HeaderCell } from './';
import QuietButton from "../Button/QuietButton";
import { Link } from "../Link";

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
          <ActionCell>
            <Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </Link>
            <Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  <path d="M0 0h24v24H0z" fill="none"/>
              </svg>
            </Link>
          </ActionCell>
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
