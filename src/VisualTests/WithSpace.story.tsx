import React from "react";
import {
  Alert,
  AsyncSelect,
  Breadcrumbs,
  Link,
  Text,
  PrimaryButton,
  DatePicker,
  DropdownMenu,
  DropdownLink,
  DropdownButton,
  DropdownItem,
  FieldLabel,
  Form,
  Input,
  List,
  ListItem,
  Select,
  Radio,
  Tab,
  Tabs,
  TimePicker,
  TruncatedText,
  InlineValidation,
  Pagination,
  Table,
} from "..";

export default {
  title: "VisualTests/WithSpace",
};

const spaceProps = {
  p: "x1",
  mt: "x5",
};

export const _Alert = () => <Alert {...spaceProps}>Danger alert</Alert>;

export const _AsyncSelect = () => (
  <AsyncSelect
    placeholder="Filter Countries"
    className="Select"
    classNamePrefix="SelectTest"
    labelText="Country"
    loadOptions=""
    {...spaceProps}
  />
);

export const _Breadcrumbs = () => (
  <Breadcrumbs {...spaceProps}>
    <Link href="/">Home</Link>
    <Link href="/Tenants">Tenants</Link>
    <Text>Current Tenant</Text>
  </Breadcrumbs>
);

export const _PrimaryButton = () => (
  <PrimaryButton {...spaceProps}>Create project</PrimaryButton>
);

export const _DatePicker = () => <DatePicker {...spaceProps} />;

export const _DropdownMenu = () => (
  <DropdownMenu
    defaultOpen
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
    {...spaceProps}
  >
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    <DropdownItem>
      <a href="/" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
  </DropdownMenu>
);

export const _FieldLabel = () => (
  <FieldLabel
    labelText="Default label"
    helpText="I am help text. I can give more details on the input below!"
    requirementText="(Required)"
    {...spaceProps}
  >
    <Input
      id="birthplace"
      labelText="Place of birth"
      requirementText="(Optional)"
    />
  </FieldLabel>
);

export const _Form = () => (
  <Form mt="x2" p="x1">
    <Input id="name" labelText="Name" />
    <Input
      id="birthdate"
      placeholder="DD-MM-YYYY"
      labelText="Date of birth"
      requirementText="(Optional)"
      helpText="Enter a date below"
    />
    <Input
      id="birthplace"
      labelText="Place of birth"
      requirementText="(Optional)"
    />
  </Form>
);

export const _Link = () => (
  <Link as="button" mt="x2" p="x1">
    Link
  </Link>
);

export const _List = () => (
  <List leftAlign {...spaceProps}>
    <ListItem>List Item 1</ListItem>
    <ListItem>
      List Item 2 that is really really really really really really really
      really really long
    </ListItem>
    <ListItem mt="x1">List Item 3</ListItem>
  </List>
);
export const _Pagination = () => (
  <Pagination currentPage={3} totalPages={4} {...spaceProps} />
);

export const _Radio = () => (
  <>
    <Radio id="radio" error labelText="I am error" {...spaceProps} />
    <Radio
      id="radio"
      defaultChecked
      error
      labelText="I am error"
      {...spaceProps}
    />
  </>
);

export const _Select = () => (
  <Select
    defaultValue={2}
    placeholder="Please select inventory status"
    options={[
      {
        label: "option 1",
        value: 1,
      },
      {
        label: "option 2",
        value: 2,
      },
      {
        label: "option 3",
        value: 3,
      },
    ]}
    labelText="Inventory status"
    {...spaceProps}
  />
);

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
];

const rowData = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1",
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3",
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    id: "r4",
  },
  {
    date: "2019-10-07",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    id: "r5",
  },
  {
    date: "2019-10-22",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "-",
    id: "r7",
  },
  {
    date: "2019-10-23",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8",
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r9",
  },
];

export const _Table = () => (
  <Table columns={columns} rows={rowData} {...spaceProps} />
);

export const _Tabs = () => (
  <Tabs {...spaceProps}>
    <Tab className="Tab1" label="Tab 1">
      Tab 1 Content
    </Tab>
    <Tab className="Tab2" label="Tab 2">
      Tab 2 Content
    </Tab>
    <Tab className="Tab3" label="Tab 3">
      Tab 3 Content
    </Tab>
    <Tab className="Tab4" label="Tab 4">
      Tab 4 Content
    </Tab>
  </Tabs>
);

export const _TimePicker = () => (
  <TimePicker labelText="End Time" defaultValue="12:38 PM" {...spaceProps} />
);

export const _TruncatedText = () => (
  <TruncatedText {...spaceProps}>
    Special instructions are provided for the shipment
  </TruncatedText>
);

export const _InlineValidation = () => (
  <InlineValidation errorMessage="Something has gone wrong" {...spaceProps} />
);
