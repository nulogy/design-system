import React from "react";
// consider using styled components when you have to make your own components as well!
import styled, { createGlobalStyle } from "styled-components";
import { storiesOf } from "@storybook/react";
import {
  Alert,
  Checkbox,
  Select as NDSSelect,
  Text,
  Box,
  NavBar,
  Button,
  PrimaryButton,
  Flex,
  Title,
  SectionTitle,
  SubsectionTitle,
  Card,
  ButtonGroup,
  Modal,
  Form,
  Input,
  Link,
  Field,
  FieldLabel,
  List,
  ListItem,
  Toggle,
  theme
} from "./index"; // "@nulogy/components"

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

const Select = ({ boxProps, ...props }) => (
  <Box {...boxProps}>
    <NDSSelect {...props} />
  </Box>
);
// Table  Code Starts here //
// ------------------------//
const Table = styled.table({
  border: 0,
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "fixed"
});

const Cell = styled.td(({ textAlign, disabled }) => ({
  border: 0,
  padding: theme.space.x2,
  verticalAlign: "top",
  textAlign,
  opacity: disabled ? 0.33 : undefined,

  "&:first-child": { paddingLeft: 0 },
  "&:last-child": { paddingRight: 0 },

  [`@media screen and (max-width: ${theme.breakpoints.small})`]: {
    display: "block",
    padding: theme.space.x1,
    paddingLeft: 0,

    "&:last-child": { marginBottom: theme.space.x3 },

    "&:before": { fontWeight: "bold" },
    "&:first-child:before": { content: "'Name: '" },
    "&:nth-child(2):before": { content: "'Category: '" },
    "&:nth-child(3):before": { content: "'Integration Key: '" },
    "&:nth-child(4)": { textAlign: "left" }
  }
}));

const Header = styled.thead({
  tr: {
    color: theme.colors.darkGrey,
    borderBottom: "1px solid",
    borderColor: theme.colors.lightGrey
  },
  [`@media screen and (max-width: ${theme.breakpoints.small})`]: { display: "none" }
});

const InventoryStatusTable = ({ rows }) => (
  <Table>
    <Header>
      <tr>
        <Cell width="30%">Name</Cell>
        <Cell width="30%">Category</Cell>
        <Cell>Integration Key</Cell>
        <Cell width="20%" />
      </tr>
    </Header>
    <tbody>
      {rows.map(({ name, category, integrationKey, disabled }) => (
        <tr key={name} style={{ color: disabled ? "#011e37" : undefined }}>
          <Cell disabled={disabled}>{name}</Cell>
          <Cell disabled={disabled}>{category}</Cell>
          <Cell disabled={disabled}>{integrationKey}</Cell>
          <Cell textAlign="right">
            <EditInventoryStatusModal />
            <Text color="darkGrey" inline>
              {" | "}
            </Text>
            {disabled ? (
              <Link inline underline={false} as="button">
                Enable
              </Link>
            ) : (
              <DisableInventoryStatusModal />
            )}
          </Cell>
        </tr>
      ))}
    </tbody>
  </Table>
);
// --------------------//
// Table code ends here//

class CreateInventoryStatusModal extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

    const inventoryStatusCategoryOptions = [
      { value: "quarantined", label: "Quarantined" },
      { value: "rejected", label: "Rejected" },
      { value: "unavaliable", label: "Unavaliable" }
    ];

    return (
      <div>
        <PrimaryButton onClick={this.openModal}>Create Inventory Status</PrimaryButton>
        <Modal
          title="Create Inventory Status"
          onRequestClose={this.closeModal}
          primaryButton={{ label: "Create", type: "submit", form: "myForm" }}
          secondaryButtons={[{ label: "Cancel", onClick: this.closeModal }]}
          isOpen={isOpen}
          maxWidth="456px"
        >
          <Form id="myForm" mb="x2">
            <Input name="name" id="name" labelText="Name" />
            <NDSSelect options={inventoryStatusCategoryOptions} name="category" id="category" labelText="Category" />
            <Input name="age" id="integration-key" labelText="Integration Key" />
          </Form>
        </Modal>
      </div>
    );
  }
}

class EditInventoryStatusModal extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <span>
        <Link as="button" underline={false} onClick={this.openModal}>
          Edit
        </Link>
        <Modal
          title="Edit Inventory Status"
          onRequestClose={this.closeModal}
          primaryButton={{ label: "Save", type: "submit", form: "myForm" }}
          secondaryButtons={[{ label: "Cancel", onClick: this.closeModal }]}
          isOpen={isOpen}
          maxWidth="456px"
        >
          <Form id="myForm" mb="x2">
            <Input name="name" id="name" labelText="Name" />
            <Field>
              <FieldLabel labelText="Category">
                <Text color="darkGrey">Rejected</Text>
              </FieldLabel>
            </Field>
            <Input name="integration-key" id="integration-key" labelText="Integration Key" />
          </Form>
        </Modal>
      </span>
    );
  }
}

class DisableInventoryStatusModal extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;

    return (
      <span>
        <Link as="button" underline={false} onClick={this.openModal}>
          Disable
        </Link>
        <Modal
          title="Disable Inventory Status"
          type="danger"
          onRequestClose={this.closeModal}
          primaryButton={{ label: "Disable", type: "submit", form: "myForm" }}
          secondaryButtons={[{ label: "Cancel", onClick: this.closeModal }]}
          isOpen={isOpen}
        >
          Are you sure you want to disable inventory status {"inventory_status_name"}?
        </Modal>
      </span>
    );
  }
}

const PackManagerCard = props => <Card bg="white" pt="x3" pb="x4" px="x3" mb="x3" {...props} />;

const Footer = styled.div({
  height: theme.space.x8
});

const DataPair = props => (
  <Box width="100%" {...props}>
    <Text mb="x1">{props.labelText}</Text>
    <Text color="darkGrey">{props.value}</Text>
  </Box>
);

class InventoryStatusesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultStatusEdit: true
    };

    this.openDefaultStatusEdit = this.openDefaultStatusEdit.bind(this);
    this.closeDefaultStatusEdit = this.closeDefaultStatusEdit.bind(this);
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
        integrationKey: "6",
        disabled: true
      }
    ];

    const DefaultStatusesView = () => (
      <>
        <Box>
          <SubsectionTitle mb="x2">Auto Quarantine on Production</SubsectionTitle>
          <Flex mb="x1" justifyContent="space-between" flexDirection={{ extraSmall: "column", small: "row" }}>
            <DataPair mb={{ extraSmall: "x4", small: "none" }} labelText="Items" value="All Items" />
            <DataPair labelText="Quarantine Status" value="Quarantined" />
          </Flex>
          <Text style={{ fontStyle: "italic" }} mb="x4" color="darkGrey">
            (Override enabled on Item Master)
          </Text>
          {/* The Override text should only be present when the value is true, otherwise remove and set the mb on the Flex above to x4 */}
        </Box>
        <Box>
          <SubsectionTitle mb="x2">Auto Quarantine on Receipt</SubsectionTitle>
          <Flex mb="x4" justifyContent="space-between" flexDirection={{ extraSmall: "column", small: "row" }}>
            <DataPair mb={{ extraSmall: "x4", small: "none" }} labelText="Items" value="No Items" />
            <DataPair labelText="Quarantine Status" value="--" />
          </Flex>
          {/* The Override text is not present in this example */}
        </Box>
        <Box>
          <SubsectionTitle mb="x2">Other Defaults</SubsectionTitle>
          <Flex mb="x4" justifyContent="space-between" flexDirection={{ extraSmall: "column", small: "row" }}>
            <DataPair mb={{ extraSmall: "x4", small: "none" }} labelText="Inventory rejected on Jobs" value="Hold" />
            <DataPair labelText="Inventory created by Blind Counts" value="Damaged" />
          </Flex>
        </Box>
      </>
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

    const DefaultStatusesEdit = () => (
      <>
        <Box>
          <SubsectionTitle mb="x2">Auto Quarantine on Production</SubsectionTitle>
          <Flex mb="x1" justifyContent="space-between" flexDirection={{ extraSmall: "column", small: "row" }}>
            <Box width="100%">
              {/* if no saved value: defualt to no-options */}
              <Select
                boxProps={{ maxWidth: "324px", mb: { extraSmall: "x4", small: "none" } }}
                options={autoQuarantineOptions}
                labelText="Items"
              />
            </Box>
            <Box width="100%">
              {/* if no saved value: no default */}
              <Select
                boxProps={{ width: "100%", maxWidth: "324px" }}
                options={quarantinedStatuses}
                labelText="Quarantine Status"
              />
            </Box>
          </Flex>
          <Checkbox mb="x4" labelText="Allow override on Item Master" />
        </Box>
        <Box>
          <SubsectionTitle mb="x2">Auto Quarantine on Receipt</SubsectionTitle>
          <Flex mb="x1" justifyContent="space-between" flexDirection={{ extraSmall: "column", small: "row" }}>
            <Box width="100%">
              {/* if no saved value: defualt to no-options */}
              <Select
                boxProps={{ maxWidth: "324px", mb: { extraSmall: "x4", small: "none" } }}
                options={autoQuarantineOptions}
                labelText="Items"
              />
            </Box>
            <Box width="100%">
              {/* if no saved value: no default */}
              <Select boxProps={{ maxWidth: "324px" }} options={quarantinedStatuses} labelText="Quarantine Status" />
            </Box>
          </Flex>
          <Checkbox mb="x4" labelText="Allow override on Item Master" />
        </Box>
        <Box>
          <SubsectionTitle mb="x2">Other Defaults</SubsectionTitle>
          <Flex mb="x1" justifyContent="space-between" flexDirection={{ extraSmall: "column", small: "row" }}>
            <Box width="100%">
              {/* if no saved value: default to first item */}
              <Select
                boxProps={{ maxWidth: "324px", mb: { extraSmall: "x4", small: "none" } }}
                options={quarantinedAndRejectedStatuses}
                labelText="Inventory rejected on Jobs"
              />
            </Box>
            <Box width="100%">
              {/* if no saved value: default to first item */}
              <Select
                boxProps={{ maxWidth: "324px" }}
                options={allInventoryStatuses}
                labelText="Inventory created by Blind Counts"
              />
            </Box>
          </Flex>
        </Box>
      </>
    );

    return (
      <ResetStorybookView>
        <BodyStyleReset />
        <NavBar menuData={menuData} />
        <Box maxWidth="1012px" mx="auto" px="x2">
          <Title mt="x5" mb="x3">
            Toronto Facility: Inventory Statuses
          </Title>
          <PackManagerCard>
            <Flex
              mb="x2"
              justifyContent="space-between"
              alignItems={{ extraSmall: "flex-start", small: "center" }}
              flexDirection={{ extraSmall: "column", small: "row" }}
            >
              <SectionTitle mb={{ extraSmall: "x2", small: "none" }} inline>
                Inventory Statuses
              </SectionTitle>
              <CreateInventoryStatusModal />
            </Flex>
            <Toggle onText="Enabled" offText="Disabled" labelText="Editing for site users" />
            <InventoryStatusTable rows={inventoryStatusTableData} />
          </PackManagerCard>
          <PackManagerCard>
            <Flex
              mb="x4"
              justifyContent="space-between"
              alignItems={{ extraSmall: "flex-start", small: "center" }}
              flexDirection={{ extraSmall: "column", small: "row" }}
            >
              <SectionTitle mb={{ extraSmall: "x2", small: "none" }} inline>
                Set Default Statuses
              </SectionTitle>
              {this.state.defaultStatusEdit ? (
                <ButtonGroup>
                  <PrimaryButton onClick={this.closeDefaultStatusEdit}>Save Changes</PrimaryButton>
                  <Button onClick={this.closeDefaultStatusEdit}>Cancel</Button>
                </ButtonGroup>
              ) : (
                <PrimaryButton onClick={this.openDefaultStatusEdit}>Edit Default Statuses</PrimaryButton>
              )}
            </Flex>
            {this.state.defaultStatusEdit ? DefaultStatusesEdit() : DefaultStatusesView()}
          </PackManagerCard>
        </Box>
        <Footer />
      </ResetStorybookView>
    );
  }
}

storiesOf("Inventory Statuses", module)
  .add("Page", () => <InventoryStatusesPage />)
  .add("Modal with inline errors", () => (
    <Modal
      title="Create Inventory Status"
      primaryButton={{ label: "Create", type: "submit", form: "myForm" }}
      secondaryButtons={[{ label: "Cancel" }]}
      maxWidth="456px"
    >
      <Form id="myForm" mb="x2">
        <Input name="name" id="name" labelText="Name" errorMessage="Name has already been taken." />
        <NDSSelect options={{ label: "Label", value: "value" }} name="category" id="category" labelText="Category" />
        <Input
          name="integration-key"
          id="integration-key"
          labelText="Integration Key"
          errorMessage="Integration key has already been taken."
        />
      </Form>
    </Modal>
  ))
  .add("Cannot disable Inventory Status modal", () => (
    <Modal title="Cannot Disable Inventory Status" primaryButton={{ label: "Okay" }} secondaryButtons={null}>
      <Alert type="danger" title="Inventory Status cannot be disabled because:">
        <List leftAlign compact>
          <ListItem>Inventory Status is being used as a default.</ListItem>
          <ListItem>
            All inventory with this status has been changed. Use the <Link>Item Locator</Link> to find and change all
            items with this status.
          </ListItem>
        </List>
      </Alert>
    </Modal>
  ));
