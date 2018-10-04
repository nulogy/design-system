import React from 'react';
import { storiesOf } from '@storybook/react';
import { DataTable, Table, Cell, ActionCell, Row, CreateRow, Body, Header, HeaderCell, Button, TemporaryTextInput } from './';
import { Icons } from '../Icons';
const {Icon} = Icons;

storiesOf('Table/DataTable', module)
  .add('default', () => (
    <DataTable
      headers={[
        'Header 1',
        'Header 2',
        'Header 3'
      ]}
      data={[
        [1, 2, 3],
        [11, 22, 33],
        [111, 222, 333]
      ]} />
  ))
  .add('with no headers', () => (
    <DataTable
      data={[
        [1, 2, 3],
        [11, 22, 33],
        [111, 222, 333]
      ]} />
  ));

storiesOf('Table/primitives', module)
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
          <Cell>Good</Cell>
          <Cell>Good</Cell>
          <Cell>1</Cell>
          <ActionCell></ActionCell>
        </Row>
        <Row>
          <Cell>Quarantined</Cell>
          <Cell>Quarantined</Cell>
          <Cell>2</Cell>
          <ActionCell></ActionCell>
        </Row>
        <Row>
          <Cell>Rejected</Cell>
          <Cell>Rejected</Cell>
          <Cell>3</Cell>
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
          <Cell>Good</Cell>
          <Cell>Good</Cell>
          <Cell>1</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Quarantined</Cell>
          <Cell>Quarantined</Cell>
          <Cell>2</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Rejected</Cell>
          <Cell>Rejected</Cell>
          <Cell>3</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
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
          <Cell><TemporaryTextInput></TemporaryTextInput></Cell>
          <Cell><TemporaryTextInput></TemporaryTextInput></Cell>
          <Cell><TemporaryTextInput></TemporaryTextInput></Cell>
          <ActionCell>
            <Button>
              <Icon name="save" />
            </Button>
          </ActionCell>
        </CreateRow>
      </Header>
      <Body>
        <Row>
          <Cell>Good</Cell>
          <Cell>Good</Cell>
          <Cell>1</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Quarantined</Cell>
          <Cell>Quarantined</Cell>
          <Cell>2</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Rejected</Cell>
          <Cell>Rejected</Cell>
          <Cell>3</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
      </Body>
    </Table>
  )).add('Mixed Content', () => (
    <Table>
      <Header>
        <Row>
          <HeaderCell>Name</HeaderCell>
          <HeaderCell>Key</HeaderCell>
          <HeaderCell>Integration Key</HeaderCell>
          <HeaderCell></HeaderCell>
        </Row>
        <CreateRow>
          <Cell><TemporaryTextInput></TemporaryTextInput></Cell>
          <Cell><TemporaryTextInput></TemporaryTextInput></Cell>
          <Cell>Some text</Cell>
          <ActionCell>
            <Button>
              <Icon name="save" />
            </Button>
          </ActionCell>
        </CreateRow>
      </Header>
      <Body>
        <Row>
          <Cell>Row 1, Cell 1</Cell>
          <Cell>Row 1, Cell 2</Cell>
          <Cell>Row 1, Cell 3</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Row 2, Cell 1</Cell>
          <Cell>Row 2, Cell 2</Cell>
          <Cell>Row 2, Cell 3</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
        <Row>
          <Cell>Row 3, Cell 1</Cell>
          <Cell>Aliquam ante augue, ultricies at sodales a, porta ut tellus. Duis lacus lectus, pulvinar in commodo eget, molestie viverra dolor. Curabitur ultrices dignissim auctor. Sed ac ante id tortor suscipit tristique. Donec vitae est id turpis eleifend varius ullamcorper vel magna.</Cell>
          <Cell>Row 3, Cell 3</Cell>
          <ActionCell>
            <Button>
              <Icon name="edit" />
            </Button>
            <Button>
              <Icon name="delete" />
            </Button>
          </ActionCell>
        </Row>
      </Body>
    </Table>
  ));
