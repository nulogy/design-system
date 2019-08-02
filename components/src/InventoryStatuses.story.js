import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { storiesOf } from "@storybook/react";
import {
  Checkbox,
  Select,
  Text,
  Box,
  NavBar,
  Button,
  Flex,
  Title,
  SectionTitle,
  Card,
  ButtonGroup,
  theme
} from "./index";

const BodyStyleReset = createGlobalStyle({
  body: {
    margin: 0,
    backgroundColor: "#dbdbdb"
  }
});

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh"
});

const menuData = {
  primaryMenu: [
    {
      name: "Company",
      items: [{ name: "PLACEHOLDER", href: "/" }]
    },
    {
      name: "Operations",
      items: [{ name: "PLACEHOLDER", href: "/" }]
    },
    {
      name: "Reports",
      items: [{ name: "PLACEHOLDER", href: "/" }]
    }
  ],
  secondaryMenu: [
    {
      name: "Create +",
      href: "/"
    }
  ]
};

// Table Code Starts here //
//------------------------//
const Table = styled.table({
  border: 0,
  width: "100%",
  borderCollapse: "collapse"
});

const Column = styled.td({
  border: 0,
  padding: theme.space.x2,
  verticalAlign: "top",

  "&:first-child": { paddingLeft: 0 },
  "&:last-child": { paddingRight: 0 },

  "@media screen and (max-width: 700px)": {
    display: "block",
    padding: theme.space.x1,
    paddingLeft: 0,

    "&:last-child": { marginBottom: theme.space.x3 },

    "&:before": { fontWeight: "bold" },
    "&:first-child:before": { content: "'Name: '" },
    "&:nth-child(2):before": { content: "'Category: '" },
    "&:nth-child(3):before": { content: "'Integration Key: '" }
  }
});

const Header = styled.thead({
  tr: {
    color: theme.colors.darkGrey,
    borderBottom: "1px solid",
    borderColor: theme.colors.lightGrey
  },
  "@media screen and (max-width: 700px)": { display: "none" }
});

const InventoryStatusTable = ({ rows }) => (
  <Table>
    <Header>
      <tr>
        <Column>Name</Column>
        <Column>Category</Column>
        <Column>Integration Key</Column>
      </tr>
    </Header>
    <tbody>
      {rows.map(({ name, category, integrationKey }) => (
        <tr key={name}>
          <Column>{name}</Column>
          <Column>{category}</Column>
          <Column>{integrationKey}</Column>
        </tr>
      ))}
    </tbody>
  </Table>
);
//--------------------//
//Table code ends here//

const PackManagerCard = props => <Card bg="white" mb="x3" {...props} />;

const DataPair = props => (
  <Box {...props}>
    <Text mb="x2">{props.labelText}</Text>
    <Text color="darkGrey">{props.value}</Text>
  </Box>
);

class InvetoryStatusesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryStatusEdit: false,
      defaultStatusEdit: true
    };

    this.openInventoryStatusEdit = this.openInventoryStatusEdit.bind(this);
    this.closeInventoryStatusEdit = this.closeInventoryStatusEdit.bind(this);
    this.openDefaultStatusEdit = this.openDefaultStatusEdit.bind(this);
    this.closeDefaultStatusEdit = this.closeDefaultStatusEdit.bind(this);
  }

  openInventoryStatusEdit() {
    this.setState({ inventoryStatusEdit: true });
  }

  closeInventoryStatusEdit() {
    this.setState({ inventoryStatusEdit: false });
  }

  openDefaultStatusEdit() {
    this.setState({ defaultStatusEdit: true });
  }

  closeDefaultStatusEdit() {
    this.setState({ defaultStatusEdit: false });
  }

  render() {
    const inventoryStatusTableData = [
      {
        name: "Good",
        category: "Good",
        integrationKey: "1"
      },
      {
        name: "Quarantined",
        category: "Quarantined",
        integrationKey: "2"
      },
      {
        name: "Hold",
        category: "Quarantined",
        integrationKey: "3"
      },
      {
        name: "Rejected",
        category: "Rejected",
        integrationKey: "4"
      },
      {
        name: "Damaged",
        category: "Rejected",
        integrationKey: "5"
      },
      {
        name: "Unavaliable",
        category: "Unavaliable",
        integrationKey: "6"
      }
    ];

    const InventoryStatusesView = props => <InventoryStatusTable rows={inventoryStatusTableData} />;

    const InventoryStatusesEdit = props => <div>Inventory Statuses Edit</div>;

    const DefaultStatusesView = props => (
      <Flex justifyContent="space-between">
        <Box mr="x8" width={1 / 2}>
          <DataPair
            mb="x4"
            labelText="Auto Quarantine on Production"
            value={"value"}
            overrideText={"Override enabled on Item Master"}
          />
          <DataPair mb="x4" labelText="Inventory rejected on Jobs" value={"value"} />
        </Box>
        <Box mr="x8" width={1 / 2}>
          <DataPair mb="x4" labelText="Auto Quarantine on Receipt" value={"value"} />
          <DataPair mb="x4" labelText="Inventory created by Blind Counts" value={"value"} />
        </Box>
      </Flex>
    );

    // "Auto Quarantine on Production/Receipt" options
    const autoQuarantineOptions = [
      { value: "no-items", label: "No items" },
      { value: "all-items", label: "All items" },
      { value: "selected-items", label: "Selected items" }
    ];

    // "Inventory created by Blind Counts" uses all inventory statuses
    const allInventoryStatuses = [
      { value: "good", label: "Good" },
      { value: "quarantined", label: "Quarantined" },
      { value: "hold", label: "Hold" },
      { value: "rejected", label: "Rejected" },
      { value: "damaged", label: "Damaged" },
      { value: "unavaliable", label: "Unavaliable" }
    ];

    // "Auto Quarantine on Production/Receipt" should point to all statuses with category = quarantined
    // dropdown only avaliable if All Items or Selected Items is selected in the first field
    const quarantinedStatuses = [{ value: "quarantined", label: "Quarantined" }, { value: "hold", label: "Hold" }];

    // "Inventory rejected on Jobs" should point to all statuses with category = quaratined || rejected
    const quarantinedAndRejectedStatuses = [
      { value: "quarantined", label: "Quarantined" },
      { value: "hold", label: "Hold" },
      { value: "rejected", label: "Rejected" },
      { value: "damaged", label: "Damaged" }
    ];

    const DefaultStatusesEdit = props => (
      <Flex justifyContent="space-between">
        <Box mr="x8" width={1 / 2}>
          <Box mb="x1">
            <Box display="inline" width="20px">
              {/*if no saved value: defualt to no-options*/}
              <Select options={autoQuarantineOptions} mb="x1" labelText="Auto Quarantine on Production" />
            </Box>
            {/*if no saved value: no default*/}
            <Select options={quarantinedStatuses} mb="x1" />
          </Box>
          <Checkbox mb="x3" labelText="Allow override on Item Master" />
          {/*if no saved value: default to first item*/}
          <Select options={quarantinedAndRejectedStatuses} mb="x3" labelText="Inventory rejected on Jobs" />
        </Box>
        <Box mr="x8" width={1 / 2}>
          <Box>
            {/*if no saved value: defualt to no-options*/}
            <Select options={autoQuarantineOptions} mb="x1" labelText="Auto Quarantine on Receipt" />
            {/*if no saved value: no default*/}
            <Select options={quarantinedStatuses} mb="x1" />
          </Box>
          <Checkbox mb="x3" labelText="Allow override on Item Master" />
          {/*if no saved value: default to first item*/}
          <Select options={allInventoryStatuses} mb="x3" labelText="Inventory created by Blind Counts" />
        </Box>
      </Flex>
    );

    return (
      <ResetStorybookView>
        <BodyStyleReset />
        <NavBar menuData={menuData} />
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <Title mt="x5" mb="x3">
            Toronto Facility: <b>Inventory Statuses</b>
          </Title>
          <PackManagerCard>
            <Flex mb="x2" justifyContent="space-between" alignItems="center">
              <SectionTitle mb="none" inline>
                Inventory Statuses
              </SectionTitle>
              {this.state.inventoryStatusEdit ? (
                <Button onClick={this.closeInventoryStatusEdit}>Disable Editing</Button>
              ) : (
                <Button onClick={this.openInventoryStatusEdit}>Enable Editing</Button>
              )}
            </Flex>
            {this.state.inventoryStatusEdit ? InventoryStatusesEdit() : InventoryStatusesView()}
          </PackManagerCard>
          <PackManagerCard>
            <Flex mb="x2" justifyContent="space-between" alignItems="center">
              <SectionTitle mb="none" inline>
                Set Default Statuses
              </SectionTitle>
              {this.state.defaultStatusEdit ? (
                <ButtonGroup>
                  <Button onClick={this.closeDefaultStatusEdit}>Save Changes</Button>
                  <Button onClick={this.closeDefaultStatusEdit}>Cancel</Button>
                </ButtonGroup>
              ) : (
                <Button onClick={this.openDefaultStatusEdit}>Edit Default Statuses</Button>
              )}
            </Flex>
            {this.state.defaultStatusEdit ? DefaultStatusesEdit() : DefaultStatusesView()}
          </PackManagerCard>
        </div>
      </ResetStorybookView>
    );
  }
}

storiesOf("Inventory Statuses", module).add("Page", () => <InvetoryStatusesPage />);
