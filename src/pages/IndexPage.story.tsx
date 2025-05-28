import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  BrandedNavBar,
  Page,
  Breadcrumbs,
  Box,
  Flex,
  Button,
  DropdownMenu,
  Icon,
  IconicButton,
  Table,
  TableColumnType,
  Sidebar,
  Select,
  Modal,
  PrimaryButton,
  QuietButton,
  Link,
  VerticalDivider,
  DropdownButton,
  FieldLabel,
  DatePicker,
  ButtonGroup,
  Text,
  DangerButton,
  ToastContainer,
  toast,
  Pagination,
  Divider,
} from "../index";
import { InputField } from "../Input/InputField";

interface WorkOrder {
  id: string;
  workOrderCode: string;
  customerName: string;
  itemCode: string;
  bomVersion: string;
  unitsExpected: number;
  status: string;
  plannedStart: string;
  plannedEnd: string;
}

const columns: TableColumnType<WorkOrder>[] = [
  { dataKey: "id", label: "ID" },
  { dataKey: "name", label: "Name" },
  { dataKey: "status", label: "Status" },
  { dataKey: "date", label: "Date" },
];

export default {
  title: "Pages/IndexPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
  </Breadcrumbs>
);

export const Default = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    workOrderCode: "",
    customerName: "",
    itemCode: "",
    bomVersion: "",
    status: "",
    plannedStart: null,
    plannedEnd: null,
  });

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleCloseFilterSidebar = () => {
    setIsFilterSidebarOpen(false);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDeleteClick = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedWorkOrder(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting work order:", selectedWorkOrder);
    handleCloseDeleteModal();
    toast.success("Work order deleted successfully");
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const tableColumns: TableColumnType<WorkOrder>[] = [
    {
      label: "Work order code",
      dataKey: "workOrderCode",
      cellFormatter: (props) => (
        <Link href={`#/work-orders/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Customer name", dataKey: "customerName" },
    { label: "Item code", dataKey: "itemCode" },
    { label: "BOM version", dataKey: "bomVersion" },
    { label: "Units expected", dataKey: "unitsExpected", align: "right" as const },
    { label: "Status", dataKey: "status" },
    { label: "Planned start", dataKey: "plannedStart" },
    { label: "Planned end", dataKey: "plannedEnd" },
    {
      dataKey: "actions",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
      ),
    },
  ];

  const tableData = [
    {
      id: "1134",
      workOrderCode: "1134",
      customerName: "Company ABC",
      itemCode: "DEMO123",
      bomVersion: "Peanut Butter Mix",
      unitsExpected: 6000.0,
      status: "Booked",
      plannedStart: "2023-Sep-01 02:09 PM",
      plannedEnd: "2023-Sep-08 02:09 PM",
    },
    {
      id: "1133",
      workOrderCode: "1133",
      customerName: "Company ABC",
      itemCode: "DEMO123",
      bomVersion: "Peanut Butter Mix",
      unitsExpected: 5000.0,
      status: "Booked",
      plannedStart: "2023-Aug-01 01:57 PM",
      plannedEnd: "2023-Aug-08 01:58 PM",
    },
    {
      id: "1076",
      workOrderCode: "1076",
      customerName: "Hackathon Team 1 Customer",
      itemCode: "Brandon's Test Item",
      bomVersion: "",
      unitsExpected: 0.0,
      status: "Open",
      plannedStart: "",
      plannedEnd: "",
    },
    {
      id: "693",
      workOrderCode: "WO-10839",
      customerName: "Company ABC",
      itemCode: "Peanut Butter Jar",
      bomVersion: "",
      unitsExpected: 10000.0,
      status: "Open",
      plannedStart: "",
      plannedEnd: "",
    },
    {
      id: "20",
      workOrderCode: "Bradon's Test Work Order",
      customerName: "Company ABC",
      itemCode: "Brandon's Test Item",
      bomVersion: "",
      unitsExpected: 1000.0,
      status: "Open",
      plannedStart: "",
      plannedEnd: "",
    },
    // Generate 45 more rows
    ...Array.from({ length: 45 }, (_, i) => ({
      id: `${1000 + i}`,
      workOrderCode: `WO-${1000 + i}`,
      customerName: i % 2 === 0 ? "Company ABC" : "Hackathon Team 1 Customer",
      itemCode: i % 2 === 0 ? "DEMO123" : "Brandon's Test Item",
      bomVersion: i % 2 === 0 ? "Peanut Butter Mix" : "",
      unitsExpected: Math.floor(Math.random() * 10000),
      status: i % 3 === 0 ? "Open" : i % 3 === 1 ? "Booked" : "In Progress",
      plannedStart: i % 2 === 0 ? "2023-Sep-01 02:09 PM" : "",
      plannedEnd: i % 2 === 0 ? "2023-Sep-08 02:09 PM" : "",
    })),
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
      <Page title="Index template" breadcrumbs={breadcrumbs}>
        <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
          <IconicButton icon="add" tooltip="Create">
            Create
          </IconicButton>
          <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
            Filter
          </IconicButton>
          <VerticalDivider />
          <IconicButton icon="getApp" tooltip="Import">
            Import
          </IconicButton>
          <IconicButton icon="publish" tooltip="Export">
            Export
          </IconicButton>
          <VerticalDivider />
          <DropdownMenu trigger={() => <IconicButton icon="more" />}>
            <DropdownButton onClick={() => {}}>Update cost</DropdownButton>
            <DropdownButton onClick={() => {}}>Print</DropdownButton>
            <DropdownButton onClick={() => {}}>Disable</DropdownButton>
            <DropdownButton onClick={() => {}}>Delete</DropdownButton>
          </DropdownMenu>
        </Flex>
        <Table
          columns={tableColumns}
          rows={paginatedData}
          hasSelectableRows
          keyField="id"
          onRowSelectionChange={(selectedRows) => console.log("Selected rows:", selectedRows)}
          compact
        />
        <Divider />

        <Pagination
          justifyContent="flex-end"
          currentPage={currentPage}
          totalPages={Math.ceil(tableData.length / rowsPerPage)}
          onSelectPage={handlePageSelect}
        />

        <Sidebar
          isOpen={isFilterSidebarOpen}
          onClose={handleCloseFilterSidebar}
          title="Filters"
          footer={
            <Flex gap="x2" justifyContent="flex-end">
              <PrimaryButton onClick={handleCloseFilterSidebar}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => console.log("Apply filters:", filters)}>Apply Filters</PrimaryButton>
            </Flex>
          }
        >
          <Flex gap="x3" flexDirection="column">
            <FieldLabel labelText="Work order code" requirementText="(Required)">
              <InputField
                value={filters.workOrderCode}
                onChange={(e) => handleFilterChange("workOrderCode", e.target.value)}
              />
            </FieldLabel>
            <FieldLabel labelText="Customer name" hint="Enter the full customer name">
              <InputField
                value={filters.customerName}
                onChange={(e) => handleFilterChange("customerName", e.target.value)}
              />
            </FieldLabel>
            <FieldLabel labelText="Item code">
              <InputField value={filters.itemCode} onChange={(e) => handleFilterChange("itemCode", e.target.value)} />
            </FieldLabel>
            <FieldLabel labelText="BOM version">
              <Select
                value={filters.bomVersion}
                onChange={(value) => handleFilterChange("bomVersion", value)}
                options={[
                  { label: "All", value: "" },
                  { label: "Peanut Butter Mix", value: "Peanut Butter Mix" },
                ]}
              />
            </FieldLabel>
            <FieldLabel labelText="Status">
              <Select
                value={filters.status}
                onChange={(value) => handleFilterChange("status", value)}
                options={[
                  { label: "All", value: "" },
                  { label: "Open", value: "Open" },
                  { label: "Booked", value: "Booked" },
                ]}
              />
            </FieldLabel>
            <FieldLabel labelText="Planned start">
              <DatePicker
                selected={filters.plannedStart}
                onChange={(date) => handleFilterChange("plannedStart", date)}
              />
            </FieldLabel>
            <FieldLabel labelText="Planned end">
              <DatePicker selected={filters.plannedEnd} onChange={(date) => handleFilterChange("plannedEnd", date)} />
            </FieldLabel>
          </Flex>
        </Sidebar>
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={handleCloseDeleteModal}
          title="Delete work order"
          footerContent={
            <ButtonGroup>
              <DangerButton onClick={handleConfirmDelete}>Delete</DangerButton>
              <QuietButton onClick={handleCloseDeleteModal}>Cancel</QuietButton>
            </ButtonGroup>
          }
        >
          <Text>
            Are you sure you want to delete work order {selectedWorkOrder?.workOrderCode}? This action cannot be undone.
          </Text>
        </Modal>
      </Page>
    </ApplicationFrame>
  );
};
