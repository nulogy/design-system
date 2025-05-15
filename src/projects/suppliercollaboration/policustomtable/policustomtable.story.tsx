import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  BrandedNavBar,
  ToastContainer,
  IconicButton,
  VerticalDivider,
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Divider,
  Icon,
  QuietButton,
  StatusIndicator,
  Modal,
  Table,
  Input,
  PrimaryButton,
  ButtonGroup,
  Toggle,
  AsyncSelect,
  Textarea,
  Heading2,
  Heading3,
  Checkbox,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/POLI custom table",
  parameters: {
    layout: "fullscreen",
  },
};

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
  </Breadcrumbs>
);

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    const options = [
      { value: "db1", label: `Database Option 1 (${inputValue})` },
      { value: "db2", label: `Database Option 2 (${inputValue})` },
      { value: "table1", label: `Table Option A (${inputValue})` },
      { value: "table2", label: `Table Option B (${inputValue})` },
    ];
    callback(options.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase())));
  }, 500);
};

export const CustomView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableRowsData, setTableRowsData] = useState([
    { id: 1, isEditable: true, columnLabel: "PO number", database: "OrdersDB", databaseTable: "PurchaseOrders", filterVisible: true },
    { id: 2, isEditable: true, columnLabel: "Supplier", database: "SuppliersDB", databaseTable: "Suppliers", filterVisible: true },
    { id: 3, isEditable: true, columnLabel: "Item code and description", database: "MaterialsDB", databaseTable: "Items", filterVisible: true },
    { id: 4, isEditable: true, columnLabel: "Supplier PO line item number", database: "OrdersDB", databaseTable: "OrderLines", filterVisible: true },
    { id: 5, isEditable: true, columnLabel: "Problems and risks", database: "IssuesDB", databaseTable: "Risks", filterVisible: true },
    { id: 6, isEditable: true, columnLabel: "Production progress", database: "ProductionDB", databaseTable: "ProgressTracking", filterVisible: true },
    { id: 7, isEditable: true, columnLabel: "Collaboration status", database: "CollaborationDB", databaseTable: "Statuses", filterVisible: true },
    { id: 8, isEditable: true, columnLabel: "Quantity", database: "OrdersDB", databaseTable: "OrderLines", filterVisible: true },
    { id: 9, isEditable: true, columnLabel: "UOM", database: "MaterialsDB", databaseTable: "UnitsOfMeasure", filterVisible: true },
    { id: 10, isEditable: true, columnLabel: "Production due date", database: "ProductionDB", databaseTable: "Schedules", filterVisible: true },
    { id: 11, isEditable: true, columnLabel: "Unit price", database: "PricingDB", databaseTable: "ItemPrices", filterVisible: true },
    { id: 12, isEditable: true, columnLabel: "Currency", database: "FinancialDB", databaseTable: "Currencies", filterVisible: true },
    { id: 13, isEditable: true, columnLabel: "Reason", database: "GeneralDB", databaseTable: "Reasons", filterVisible: true },
    { id: 14, isEditable: true, columnLabel: "Note", database: "GeneralDB", databaseTable: "Notes", filterVisible: true },
    { id: 15, isEditable: true, columnLabel: "Next production date", database: "ProductionDB", databaseTable: "Schedules", filterVisible: true },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: 16 + i,
      isEditable: false,
      columnLabel: "",
      database: null,
      databaseTable: null,
      filterVisible: false,
    })),
  ]);

  const handleInputChange = (id, field, value) => {
    setTableRowsData(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleToggleChange = (id, field) => {
    setTableRowsData(prevRows =>
      prevRows.map(row => (row.id === id ? { ...row, [field]: !row[field] } : row))
    );
  };

  const modalTableColumns = [
    {
      key: "orderNumber",
      label: "",
      cellRenderer: ({ row }) => {
        if (row.id <= 15) {
          return row.isEditable ? <Icon icon="lock" size="x2_5" color="midGrey" mx="x1" mt="x1_25" mb="x0_75" /> : null;
        } else {
          const displayNumber = row.id - 15;
          const formattedNumber = displayNumber < 10 ? `0${displayNumber}` : displayNumber;
          return <Text color="midGrey" fontSize="small" lineHeight="small" mx="x1" my="x1_25">{formattedNumber}</Text>;
        }
      },
      width: "5%",
    },
    {
      key: "columnLabel",
      label: "Column label",
      cellRenderer: ({ row }) => {
        let content;
        if (row.id <= 15) {
          content = <Text>{row.columnLabel}</Text>;
        } else {
          content = (
            <Box py="x0_25" pr="x1" minWidth="8em" width="100%" maxWidth="32em">
              <Input
                value={row.columnLabel}
                onChange={e => handleInputChange(row.id, 'columnLabel', e.target.value)}
                placeholder="Enter custom label"
              />
            </Box>
          );
        }
        return content;
      },
      width: "37%",
    },
    {
      key: "database",
      label: "Database",
      cellRenderer: ({ row }) => {
        let content;
        if (row.id <= 15) {
          content = <Text color="midGrey">{row.database}</Text>;
        } else {
          content = (
            <Box py="x0_25" pr="x1" minWidth="8em" width="100%" maxWidth="32em">
              <AsyncSelect
                value={row.database}
                onChange={selectedOption => handleInputChange(row.id, 'database', selectedOption)}
                loadOptions={loadOptions}
                placeholder="Select Database"
                defaultOptions
              />
            </Box>
          );
        }
        return content;
      },
      width: "25%",
    },
    {
      key: "databaseTable",
      label: "Database table",
      cellRenderer: ({ row }) => {
        let content;
        if (row.id <= 15) {
          content = <Text color="midGrey">{row.databaseTable}</Text>;
        } else {
          content = (
            <Box py="x0_25" pr="x3" minWidth="8em" width="100%" maxWidth="32em">
              <AsyncSelect
                value={row.databaseTable}
                onChange={selectedOption => handleInputChange(row.id, 'databaseTable', selectedOption)}
                loadOptions={loadOptions}
                placeholder="Select Table"
                defaultOptions
              />
            </Box>
          );
        }
        return content;
      },
      width: "25%",
    },
    {
      key: "filterVisible",
      label: "Filter visible",
      width: "5%",
      cellRenderer: ({ row }) => (
        <Toggle
          toggled={row.filterVisible}
          onChange={() => row.id > 15 && handleToggleChange(row.id, 'filterVisible')}
          disabled={row.id <= 15}
          pr="x1"
          py="x0_25"
        />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "3%",
      cellRenderer: ({ row }) => {
        if (row.id > 15) {
          return <IconicButton icon="close" aria-label="Clear" tooltip="Clear" />;
        }
        return null;
      },
    },
  ];

  const modalFooter = (
    <ButtonGroup>
      <PrimaryButton onClick={() => setIsModalOpen(false)}>Save</PrimaryButton>
      <QuietButton onClick={() => setIsModalOpen(false)}>Cancel</QuietButton>
    </ButtonGroup>
  );

  return (
    <ApplicationFrame>
      <ToastContainer />
      <BrandedNavBar
        menuData={{
          primaryMenu: [
            { name: "Dashboard", href: "#" },
            { name: "Projects", href: "#" },
            { name: "Settings", href: "#" },
          ],
          secondaryMenu: [
            { name: "Profile", href: "#" },
            { name: "Logout", href: "#" },
          ],
        }}
      />
      <Page title="PO line items" breadcrumbs={breadcrumbs}>
        <Flex gap="x2" justifyContent="flex-end" alignItems="center" mb="x3">
          <IconicButton icon="publish">Import</IconicButton>
          <IconicButton icon="getApp">Export</IconicButton>
          <VerticalDivider m="0" />
          <IconicButton icon="info">Collaboration status</IconicButton>
          <DropdownMenu
            trigger={() => (
              <IconicButton icon="tune">
                Custom view
              </IconicButton>
            )}
          >
            <DropdownButton onClick={() => {}}>
              <Flex alignItems="center" justifyContent="space-between" gap="x3">
                <Text>Default</Text>
              </Flex>
            </DropdownButton>
            <DropdownButton onClick={() => {}}>
              <Flex alignItems="center" justifyContent="space-between" gap="x3">
                <Text>Saved view 1</Text>
                <Flex alignItems="center">
                  <QuietButton size="small">Config</QuietButton>
                </Flex>
              </Flex>
            </DropdownButton>
            <DropdownButton onClick={() => {}}>
              <Flex alignItems="center" justifyContent="space-between" gap="x3">
                <Flex gap="half">
                  <Text>Saved view 2</Text>
                  <StatusIndicator type="neutral">Applied</StatusIndicator>
                </Flex>
                <Flex alignItems="center">
                  <QuietButton size="small">Config</QuietButton>
                </Flex>
              </Flex>
            </DropdownButton>
            <DropdownButton onClick={() => {}}>
              <Flex alignItems="center" justifyContent="space-between" gap="x3">
                <Text>Saved view 3 with a little longer label</Text>
                <Flex alignItems="center">
                  <QuietButton size="small">Config</QuietButton>
                </Flex>
              </Flex>
            </DropdownButton>
            <Divider my="x1" />
            <DropdownButton onClick={() => setIsModalOpen(true)}>
              <Flex alignItems="center" gap="x1">
                <Icon icon="add" size="x2_5" />
                Add new
              </Flex>
            </DropdownButton>
          </DropdownMenu>
          <VerticalDivider m="0" />
          <IconicButton icon="filter">Filters</IconicButton>
        </Flex>
        <Text>Table</Text>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          title="New custom view"
          maxWidth="1232px"
          footerContent={modalFooter}
        >
          <Box mb="x4">
            <Heading3 mb="x3">Details</Heading3>
            <Flex gap="x3">
              <Input
                mb="x3"
                labelText="Custom view title"
                placeholder="Enter custom view title"
                autoFocus
                requirementText="(Required)"
              />
              <Toggle
                mt="x3"
                onText="Set as default view"
                offText="Not set as default view"
                onChange={() => {}}
              />
            </Flex>
            <Box width="68.2%">
              <Textarea labelText="Description" placeholder="Enter custom view description" />
            </Box>
          </Box>

          <Box>
            <Heading3 mb="x1">Configuration</Heading3>
            <Table columns={modalTableColumns} rows={tableRowsData} compact rowHovers={false} />
          </Box>
          <Checkbox labelText="Apply on save" />
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};

CustomView.storyName = "Custom view"; 