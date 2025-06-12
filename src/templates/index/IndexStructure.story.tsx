import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  Navigation,
  Page,
  Breadcrumbs,
  Box,
  Link,
  Tabs,
  Tab,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Button,
  Sidebar,
  Flex,
  IconicButton,
  Form,
  FormSection,
  Input,
  Select,
  DatePicker,
  Textarea,
  FieldLabel,
  PrimaryButton,
  QuietButton,
  Table,
  VerticalDivider,
  DropdownMenu,
  DropdownButton,
  Text,
  Header,
  Heading2,
  Heading3,
  Card,
  Modal,
  ButtonGroup,
  DangerButton,
  Divider,
  Pagination,
  ToastContainer,
  toast,
} from "../../index";
import type { TableColumnType } from "../../Table";
import FilterSidebar from "../builder/FilterSidebar";
import DeleteModal from "../builder/DeleteModal";

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

const meta = {
  title: "Templates/Index",
  component: Page,
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export default meta;

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
  </Breadcrumbs>
);

export const WithFilterOpen = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<WorkOrder[]>([]);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState<{
    workOrderCode: string;
    customerName: string;
    itemCode: string;
    bomVersion: string;
    status: string;
    plannedStart: Date | null;
    plannedEnd: Date | null;
  }>({
    workOrderCode: "",
    customerName: "",
    itemCode: "",
    bomVersion: "",
    status: "",
    plannedStart: null,
    plannedEnd: null,
  });
  const [tableData, setTableData] = useState([
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
      workOrderCode: "Brandon's Test Work Order",
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
  ]);

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

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDetailsEditClick = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsCreatingNew(false);
    setIsDetailsSidebarOpen(true);
  };

  const handleCreateNewClick = () => {
    setSelectedWorkOrder(null);
    setIsCreatingNew(true);
    setIsDetailsSidebarOpen(true);
  };

  const handleCloseDetailsSidebar = () => {
    setIsDetailsSidebarOpen(false);
    setSelectedWorkOrder(null);
    setIsCreatingNew(false);
  };

  const handleSaveChanges = () => {
    handleCloseSidebar();
    toast.success("Changes saved successfully");
  };

  const handleSaveDetailsChanges = () => {
    handleCloseDetailsSidebar();
    toast.success(isCreatingNew ? "Work order created successfully" : "Work order updated successfully");
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
    setTableData((prevData) => prevData.filter((row) => row.id !== selectedWorkOrder?.id));
    handleCloseDeleteModal();
    toast.success("Work order deleted successfully");
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowSelectionChange = (selectedRows: WorkOrder[]) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkUpdateCost = () => {
    toast.success(`Update cost applied to ${selectedRows.length} work orders`);
    setSelectedRows([]);
  };

  const handleBulkPrint = () => {
    toast.success(`Print initiated for ${selectedRows.length} work orders`);
    setSelectedRows([]);
  };

  const handleBulkDisable = () => {
    toast.success(`Disabled ${selectedRows.length} work orders`);
    setSelectedRows([]);
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
      width: "80px",
      cellFormatter: (props) => (
        <Flex gap="x1">
          <IconicButton icon="edit" tooltip="Edit" onClick={() => handleDetailsEditClick(props.row)} />
          <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
        </Flex>
      ),
    },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "workOrderCode",
      label: "Work order code",
      type: "text" as const,
      requirementText: "(Required)",
    },
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
      hint: "Enter the full customer name",
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
    {
      key: "bomVersion",
      label: "BOM version",
      type: "select" as const,
      options: [
        { label: "All", value: "" },
        { label: "Peanut Butter Mix", value: "Peanut Butter Mix" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "All", value: "" },
        { label: "Open", value: "Open" },
        { label: "Booked", value: "Booked" },
      ],
    },
    {
      key: "plannedStart",
      label: "Planned start",
      type: "date" as const,
    },
    {
      key: "plannedEnd",
      label: "Planned end",
      type: "date" as const,
    },
  ];

  const handleFilterApply = (newFilters: {
    workOrderCode: string;
    customerName: string;
    itemCode: string;
    bomVersion: string;
    status: string;
    plannedStart: Date | null;
    plannedEnd: Date | null;
  }) => {
    setFilters(newFilters);
    setIsFilterSidebarOpen(false);
    toast.success("Filters applied successfully");
  };

  return (
    <ApplicationFrame
      navBar={
        <Navigation
          appSwitcher={{
            apps: {
              "production-scheduling": {
                url: "https://nulogy.com/",
              },
              "supplier-collaboration": {
                url: "https://nulogy.com/",
              },
              "digital-quality-inspection": {
                url: "https://nulogy.com/",
              },
              "shop-floor": {
                url: "https://nulogy.com/",
              },
              "smart-factory": {
                url: "https://nulogy.com/",
              },
              connections: {
                url: "https://nulogy.com/",
              },
              data: {
                url: "https://nulogy.com/",
              },
            },
          }}
          primaryNavigation={[
            {
              key: "home",
              label: "Home",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "records",
              label: "Records",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "help",
              label: "Help",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "settings",
              label: "Settings",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
        />
      }
    >
      <ToastContainer />
      <Page
        fullHeight
        breadcrumbs={breadcrumbs}
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Index template"
            subtitle="Site name"
            renderActions={() => (
              <IconicButton icon="publish" tooltip="Export">
                Export
              </IconicButton>
            )}
          />
        )}
      >
        <Flex gap="x2" px="x1" pb="x2" justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"} alignItems="center">
          {/* Bulk Actions - Left Side */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
              <IconicButton icon="edit" tooltip="Update cost" onClick={handleBulkUpdateCost}>
                Update cost
              </IconicButton>
              <IconicButton icon="print" tooltip="Print" onClick={handleBulkPrint}>
                Print
              </IconicButton>
              <IconicButton icon="close" tooltip="Disable" onClick={handleBulkDisable}>
                Disable
              </IconicButton>
            </Flex>
          )}
          
          {/* Regular Actions - Right Side */}
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="add" tooltip="Create" onClick={handleCreateNewClick}>
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
              {selectedRows.length === 0 && (
                <>
                  <DropdownButton onClick={() => toast.success("Update cost clicked")}>Update cost</DropdownButton>
                  <DropdownButton onClick={() => toast.success("Print clicked")}>Print</DropdownButton>
                  <DropdownButton onClick={() => toast.success("Disable clicked")}>Disable</DropdownButton>
                </>
              )}
              <DropdownButton onClick={() => toast.success("Delete clicked")}>Delete</DropdownButton>
            </DropdownMenu>
          </Flex>
        </Flex>
        <Table
          columns={tableColumns}
          rows={paginatedData}
          hasSelectableRows
          keyField="id"
          onRowSelectionChange={handleRowSelectionChange}
          compact
        />
        <Divider />

        <Pagination
          justifyContent="flex-end"
          currentPage={currentPage}
          totalPages={Math.ceil(tableData.length / rowsPerPage)}
          onSelectPage={handlePageSelect}
        />

        <FilterSidebar<{
          workOrderCode: string;
          customerName: string;
          itemCode: string;
          bomVersion: string;
          status: string;
          plannedStart: Date | null;
          plannedEnd: Date | null;
        }>
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
          overlay={false}
          closeOnOutsideClick={false}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Delete work order"
          itemName={selectedWorkOrder?.workOrderCode}
          itemType="work order"
        />

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
          title="Edit work order information"
          helpText="Work order 123"
          footer={
            <Flex justifyContent="flex-start">
              <PrimaryButton onClick={handleSaveChanges} mr="x2">
                Save
              </PrimaryButton>
              <QuietButton onClick={handleCloseSidebar}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <FieldLabel labelText="Work order code">
                  <Input value="WO-123" disabled />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Created by">
                  <Input value="John Smith" disabled />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Created date">
                  <DatePicker selected={new Date("2024-03-15")} inputProps={{ disabled: true }} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Last modified by">
                  <Input value="Sarah Johnson" disabled />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Last modified date">
                  <DatePicker selected={new Date("2024-03-16")} inputProps={{ disabled: true }} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Status">
                  <Select
                    options={[
                      { value: "open", label: "Open" },
                      { value: "booked", label: "Booked" },
                      { value: "in_progress", label: "In Progress" },
                    ]}
                    value="open"
                  />
                </FieldLabel>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        <Sidebar
          isOpen={isDetailsSidebarOpen}
          onClose={handleCloseDetailsSidebar}
          title={isCreatingNew ? "Create new work order" : "Edit work order"}
          helpText="Work order details"
          footer={
            <Flex justifyContent="flex-start">
              <PrimaryButton onClick={handleSaveDetailsChanges} mr="x2">
                Save
              </PrimaryButton>
              <QuietButton onClick={handleCloseDetailsSidebar}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <FieldLabel labelText="Work order code">
                  <Input value={selectedWorkOrder?.workOrderCode || ""} disabled={!isCreatingNew} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Customer name">
                  <Input value={selectedWorkOrder?.customerName || ""} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Item code">
                  <Input value={selectedWorkOrder?.itemCode || ""} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="BOM version">
                  <Input value={selectedWorkOrder?.bomVersion || ""} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Units expected">
                  <Input type="number" value={selectedWorkOrder?.unitsExpected || ""} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Status">
                  <Select
                    options={[
                      { value: "open", label: "Open" },
                      { value: "booked", label: "Booked" },
                      { value: "in_progress", label: "In Progress" },
                    ]}
                    value={selectedWorkOrder?.status?.toLowerCase() || ""}
                  />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Planned start">
                  <DatePicker
                    selected={selectedWorkOrder?.plannedStart ? new Date(selectedWorkOrder.plannedStart) : new Date()}
                  />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Planned end">
                  <DatePicker
                    selected={selectedWorkOrder?.plannedEnd ? new Date(selectedWorkOrder.plannedEnd) : new Date()}
                  />
                </FieldLabel>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>
      </Page>
    </ApplicationFrame>
  );
}; 