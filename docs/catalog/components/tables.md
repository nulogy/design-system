> Tables structure content in a grid to make it easier to see relationships and to facilitate understanding.

## Basic (Read Only) Table
The order of columns should be in logical order where the first row is reserved for a row identifier. An identifier can be a name, date, code, number etc. that uniquely identifies the data in the row. Always use table headings and make sure they precisely describe the content in the column.
```react
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
```

## Editable Row
Editable row is used for the row that can be edited and deleted and consists of form input elements and the action options at the end of the row.
```react
  <Table>
    <Body>
      <Row>
        <Cell>Good</Cell>
        <Cell>Good</Cell>
        <Cell>1</Cell>
        <ActionCell>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#607180"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#607180"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
        </ActionCell>
      </Row>
      <Row>
        <Cell>Quarantined</Cell>
        <Cell>Quarantined</Cell>
        <Cell>2</Cell>
        <ActionCell>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#607180"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
          <Button>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="#607180"/>
                <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </Button>
        </ActionCell>
      </Row>
    </Body>
  </Table>
```

## Create Row
Create row is used for adding records to the table. It appears at the top of the table.
```react
<Table>
  <Header>
    <Row>
      <HeaderCell>Name</HeaderCell>
      <HeaderCell>Key</HeaderCell>
      <HeaderCell>Integration Key</HeaderCell>
      <HeaderCell></HeaderCell>
    </Row>
    <CreateRow>
      <Cell><TextInput></TextInput></Cell>
      <Cell><TextInput></TextInput></Cell>
      <Cell><TextInput></TextInput></Cell>
      <ActionCell>
        <Button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill="#EBEBEB"/>
          </svg>
        </Button>
      </ActionCell>
    </CreateRow>
  </Header>

</Table>
```
