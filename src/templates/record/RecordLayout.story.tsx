import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  Navigation,
  Page,
  Breadcrumbs,
  Box,
  Link,
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
  Tabs,
  Tab,
  Modal,
  ButtonGroup,
  DangerButton,
  Divider,
  Pagination,
  ToastContainer,
  toast,
} from "../../index";
import DeleteModal from "../builder/DeleteModal";
import FilterSidebar from "../builder/FilterSidebar";
import { FilterField } from "../builder/types";

export default {
  title: "Templates/Record/Layout",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
    <Link href="#">Index</Link>
  </Breadcrumbs>
);

const menuData = {
  primaryMenu: [
    { name: "Home", href: "#" },
    { name: "Records", href: "#" },
  ],
  secondaryMenu: [
    { name: "Help", href: "#" },
    { name: "Settings", href: "#" },
  ],
};

export const FullWidth = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: null,
  });
  const [tableData, setTableData] = useState([
    {
      id: "RD-001",
      name: "Production Order",
      type: "Manufacturing",
      status: "In Progress",
      priority: "High",
      assignedTo: "Michael Brown",
      dueDate: "2024-Mar-20",
      progress: "75%",
    },
    {
      id: "RD-002",
      name: "Quality Check",
      type: "Quality",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Sarah Johnson",
      dueDate: "2024-Mar-21",
      progress: "0%",
    },
    {
      id: "RD-003",
      name: "Material Request",
      type: "Inventory",
      status: "Completed",
      priority: "Low",
      assignedTo: "John Smith",
      dueDate: "2024-Mar-18",
      progress: "100%",
    },
  ]);

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDetailsEditClick = (record) => {
    setSelectedRecord(record);
    setIsCreatingNew(false);
    setIsDetailsSidebarOpen(true);
  };

  const handleCreateNewClick = () => {
    setSelectedRecord(null);
    setIsCreatingNew(true);
    setIsDetailsSidebarOpen(true);
  };

  const handleCloseDetailsSidebar = () => {
    setIsDetailsSidebarOpen(false);
    setSelectedRecord(null);
    setIsCreatingNew(false);
  };

  const handleSaveChanges = () => {
    handleCloseSidebar();
    toast.success("Changes saved successfully");
  };

  const handleSaveDetailsChanges = () => {
    handleCloseDetailsSidebar();
    toast.success(isCreatingNew ? "Record created successfully" : "Record updated successfully");
  };

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = () => {
    if (selectedRecord) {
      setTableData((prevData) => prevData.filter((row) => row.id !== selectedRecord.id));
      handleCloseDeleteModal();
      toast.success("Record deleted successfully");
    }
  };

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setIsFilterSidebarOpen(false);
    toast.success("Filters applied successfully");
  };

  const filterFields: FilterField[] = [
    {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Quality", value: "Quality" },
        { label: "Inventory", value: "Inventory" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "In Progress", value: "In Progress" },
        { label: "Pending", value: "Pending" },
        { label: "Completed", value: "Completed" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
      ],
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      type: "text",
    },
    {
      key: "dueDate",
      label: "Due Date",
      type: "date",
    },
  ];

  return (
    <ApplicationFrame>
      <ToastContainer />
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
      <Page
        breadcrumbs={breadcrumbs}
        title="Record 123"
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Record 123"
            subtitle="Site name"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="publish" tooltip="Export">
                  Export
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        <Box my="x3" pb="x3">
          <Flex justifyContent="flex-end" mb="x2">
            <IconicButton icon="edit" onClick={handleEditClick}>
              Edit
            </IconicButton>
          </Flex>
          <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
            <DescriptionGroup>
              <DescriptionTerm>Record ID</DescriptionTerm>
              <DescriptionDetails>REC-2024-001</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Created by</DescriptionTerm>
              <DescriptionDetails>John Smith</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Created date</DescriptionTerm>
              <DescriptionDetails>2024-Mar-15 09:30 AM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Last modified by</DescriptionTerm>
              <DescriptionDetails>Sarah Johnson</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Last modified date</DescriptionTerm>
              <DescriptionDetails>2024-Mar-16 02:15 PM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>Active</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Category</DescriptionTerm>
              <DescriptionDetails>Production</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Priority</DescriptionTerm>
              <DescriptionDetails>High</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Department</DescriptionTerm>
              <DescriptionDetails>Manufacturing</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Location</DescriptionTerm>
              <DescriptionDetails>Factory Floor A</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Assigned to</DescriptionTerm>
              <DescriptionDetails>Michael Brown</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Due date</DescriptionTerm>
              <DescriptionDetails>2024-Mar-20 05:00 PM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Estimated hours</DescriptionTerm>
              <DescriptionDetails>24</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Actual hours</DescriptionTerm>
              <DescriptionDetails>18.5</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Cost center</DescriptionTerm>
              <DescriptionDetails>MFG-001</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Project code</DescriptionTerm>
              <DescriptionDetails>PRJ-2024-Q1</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Quality rating</DescriptionTerm>
              <DescriptionDetails>4.8/5.0</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Related records</DescriptionTerm>
              <DescriptionDetails>
                REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request),
                REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training Record),
                REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer Order)
              </DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
        <Box my="x3" pb="x3">
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Details">
              <Box pt="x2">
                <Flex justifyContent="space-between" alignItems="center" mb="x2">
                  <Heading2 mb="0">Production orders</Heading2>
                  <Flex gap="x2" alignItems="center" mr="x1">
                    <IconicButton icon="add" tooltip="New" onClick={handleCreateNewClick}>
                      New
                    </IconicButton>
                    <IconicButton icon="print" tooltip="Print">
                      Print
                    </IconicButton>
                    <VerticalDivider />
                    <IconicButton icon="getApp" tooltip="Import">
                      Import
                    </IconicButton>
                    <IconicButton icon="publish" tooltip="Export">
                      Export
                    </IconicButton>
                    <VerticalDivider />
                    <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
                      Filter
                    </IconicButton>
                  </Flex>
                </Flex>
                <Table
                  columns={[
                    {
                      label: "ID",
                      dataKey: "id",
                      cellFormatter: (props) => (
                        <Link href={`#/records/${props.cellData}`} underline={false}>
                          {props.cellData}
                        </Link>
                      ),
                    },
                    { label: "Name", dataKey: "name" },
                    { label: "Status", dataKey: "status" },
                    { label: "Date", dataKey: "date" },
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
                  ]}
                  rows={tableData}
                  hasSelectableRows
                  keyField="id"
                  onRowSelectionChange={(selectedRows) => console.log("Selected rows:", selectedRows)}
                  compact
                />
                <Card mt="x3" px="x4" py="x3">
                  <Flex justifyContent="space-between" alignItems="center" mb="x2">
                    <Heading3 mb="0">Additional Information</Heading3>
                    <IconicButton icon="edit" onClick={handleEditClick}>
                      Edit
                    </IconicButton>
                  </Flex>
                  <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
                    <DescriptionGroup>
                      <DescriptionTerm>Total Records</DescriptionTerm>
                      <DescriptionDetails>3</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Active Records</DescriptionTerm>
                      <DescriptionDetails>1</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Completed Records</DescriptionTerm>
                      <DescriptionDetails>1</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Pending Records</DescriptionTerm>
                      <DescriptionDetails>1</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Card>
              </Box>
            </Tab>
            <Tab label="Files">
              <Box pt="x2">
                <Flex justifyContent="flex-end" mb="x2">
                  <Flex gap="x2" alignItems="center" mr="x1">
                    <IconicButton icon="add" tooltip="Upload">
                      Upload
                    </IconicButton>
                    <IconicButton icon="filter" tooltip="Filter">
                      Filter
                    </IconicButton>
                    <VerticalDivider />
                    <IconicButton icon="getApp" tooltip="Download">
                      Download
                    </IconicButton>
                    <VerticalDivider />
                    <DropdownMenu trigger={() => <IconicButton icon="more" />}>
                      <DropdownButton onClick={() => {}}>Rename</DropdownButton>
                      <DropdownButton onClick={() => {}}>Move</DropdownButton>
                      <DropdownButton onClick={() => {}}>Delete</DropdownButton>
                    </DropdownMenu>
                  </Flex>
                </Flex>
                <Table
                  columns={[
                    { label: "Name", dataKey: "name" },
                    { label: "Type", dataKey: "type" },
                    { label: "Size", dataKey: "size" },
                    { label: "Uploaded", dataKey: "uploaded" },
                    {
                      dataKey: "actions",
                      width: "40px",
                      cellFormatter: (props) => <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />,
                    },
                  ]}
                  rows={[
                    {
                      name: "Production Report.pdf",
                      type: "PDF",
                      size: "2.5 MB",
                      uploaded: "2024-Mar-15 09:30 AM",
                    },
                    {
                      name: "Quality Check.jpg",
                      type: "Image",
                      size: "1.2 MB",
                      uploaded: "2024-Mar-16 02:15 PM",
                    },
                    {
                      name: "Material List.xlsx",
                      type: "Excel",
                      size: "3.8 MB",
                      uploaded: "2024-Mar-17 11:45 AM",
                    },
                  ]}
                  hasSelectableRows
                  keyField="name"
                  compact
                />
              </Box>
            </Tab>
          </Tabs>
        </Box>
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />
      </Page>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit record information"
        helpText="Record 123"
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
              <FieldLabel labelText="Record ID">
                <Input value="REC-2024-001" disabled />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Status">
                <Select
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                    { value: "pending", label: "Pending" },
                  ]}
                  value="active"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Category">
                <Select
                  options={[
                    { value: "production", label: "Production" },
                    { value: "maintenance", label: "Maintenance" },
                    { value: "quality", label: "Quality" },
                  ]}
                  value="production"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Priority">
                <Select
                  options={[
                    { value: "high", label: "High" },
                    { value: "medium", label: "Medium" },
                    { value: "low", label: "Low" },
                  ]}
                  value="high"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Department">
                <Select
                  options={[
                    { value: "manufacturing", label: "Manufacturing" },
                    { value: "engineering", label: "Engineering" },
                    { value: "quality", label: "Quality Control" },
                  ]}
                  value="manufacturing"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Location">
                <Input value="Factory Floor A" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Assigned to">
                <Select
                  options={[
                    { value: "michael_brown", label: "Michael Brown" },
                    { value: "john_smith", label: "John Smith" },
                    { value: "sarah_johnson", label: "Sarah Johnson" },
                  ]}
                  value="michael_brown"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Due date">
                <DatePicker selected={new Date("2024-03-20")} />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>
      <Sidebar
        isOpen={isDetailsSidebarOpen}
        onClose={handleCloseDetailsSidebar}
        title={isCreatingNew ? "Create new record detail" : "Edit record detail"}
        helpText="Record 123"
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
              <FieldLabel labelText="ID">
                <Input value={selectedRecord?.id || ""} disabled={!isCreatingNew} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Name">
                <Input value={selectedRecord?.name || ""} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Status">
                <Select
                  options={[
                    { value: "active", label: "Active" },
                    { value: "completed", label: "Completed" },
                    { value: "pending", label: "Pending" },
                  ]}
                  value={selectedRecord?.status?.toLowerCase() || ""}
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Date">
                <DatePicker selected={selectedRecord?.date ? new Date(selectedRecord.date) : new Date()} />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete record"
        itemName={selectedRecord?.id}
        itemType="record"
      />
    </ApplicationFrame>
  );
};

export const Centered = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    type: "",
    status: "",
    priority: "",
    assignedTo: "",
    dueDate: null,
  });
  const [tableData, setTableData] = useState([
    {
      id: "RD-001",
      name: "Production Order",
      type: "Manufacturing",
      status: "In Progress",
      priority: "High",
      assignedTo: "Michael Brown",
      dueDate: "2024-Mar-20",
      progress: "75%",
    },
    {
      id: "RD-002",
      name: "Quality Check",
      type: "Quality",
      status: "Pending",
      priority: "Medium",
      assignedTo: "Sarah Johnson",
      dueDate: "2024-Mar-21",
      progress: "0%",
    },
    {
      id: "RD-003",
      name: "Material Request",
      type: "Inventory",
      status: "Completed",
      priority: "Low",
      assignedTo: "John Smith",
      dueDate: "2024-Mar-18",
      progress: "100%",
    },
  ]);

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleDetailsEditClick = (record) => {
    setSelectedRecord(record);
    setIsCreatingNew(false);
    setIsDetailsSidebarOpen(true);
  };

  const handleCreateNewClick = () => {
    setSelectedRecord(null);
    setIsCreatingNew(true);
    setIsDetailsSidebarOpen(true);
  };

  const handleCloseDetailsSidebar = () => {
    setIsDetailsSidebarOpen(false);
    setSelectedRecord(null);
    setIsCreatingNew(false);
  };

  const handleSaveChanges = () => {
    handleCloseSidebar();
    toast.success("Changes saved successfully");
  };

  const handleSaveDetailsChanges = () => {
    handleCloseDetailsSidebar();
    toast.success(isCreatingNew ? "Record created successfully" : "Record updated successfully");
  };

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = () => {
    if (selectedRecord) {
      setTableData((prevData) => prevData.filter((row) => row.id !== selectedRecord.id));
      handleCloseDeleteModal();
      toast.success("Record deleted successfully");
    }
  };

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setIsFilterSidebarOpen(false);
    toast.success("Filters applied successfully");
  };

  const filterFields: FilterField[] = [
    {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "Manufacturing", value: "Manufacturing" },
        { label: "Quality", value: "Quality" },
        { label: "Inventory", value: "Inventory" },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "In Progress", value: "In Progress" },
        { label: "Pending", value: "Pending" },
        { label: "Completed", value: "Completed" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      options: [
        { label: "All", value: "" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
      ],
    },
    {
      key: "assignedTo",
      label: "Assigned To",
      type: "text",
    },
    {
      key: "dueDate",
      label: "Due Date",
      type: "date",
    },
  ];

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
      <Page
        breadcrumbs={breadcrumbs}
        title="Record 123"
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Record 123"
            subtitle="Site name"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="publish" tooltip="Export">
                  Export
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="flex-end" mb="x2">
            <IconicButton icon="edit" onClick={handleEditClick}>
              Edit
            </IconicButton>
          </Flex>
          <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
            <DescriptionGroup>
              <DescriptionTerm>Record ID</DescriptionTerm>
              <DescriptionDetails>REC-2024-001</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Created by</DescriptionTerm>
              <DescriptionDetails>John Smith</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Created date</DescriptionTerm>
              <DescriptionDetails>2024-Mar-15 09:30 AM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Last modified by</DescriptionTerm>
              <DescriptionDetails>Sarah Johnson</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Last modified date</DescriptionTerm>
              <DescriptionDetails>2024-Mar-16 02:15 PM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>Active</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Category</DescriptionTerm>
              <DescriptionDetails>Production</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Priority</DescriptionTerm>
              <DescriptionDetails>High</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Department</DescriptionTerm>
              <DescriptionDetails>Manufacturing</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Location</DescriptionTerm>
              <DescriptionDetails>Factory Floor A</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Assigned to</DescriptionTerm>
              <DescriptionDetails>Michael Brown</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Due date</DescriptionTerm>
              <DescriptionDetails>2024-Mar-20 05:00 PM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Estimated hours</DescriptionTerm>
              <DescriptionDetails>24</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Actual hours</DescriptionTerm>
              <DescriptionDetails>18.5</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Cost center</DescriptionTerm>
              <DescriptionDetails>MFG-001</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Project code</DescriptionTerm>
              <DescriptionDetails>PRJ-2024-Q1</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Quality rating</DescriptionTerm>
              <DescriptionDetails>4.8/5.0</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Related records</DescriptionTerm>
              <DescriptionDetails>
                REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request),
                REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training Record),
                REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer Order)
              </DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Details">
              <Box pt="x2">
                <Flex justifyContent="space-between" alignItems="center" mb="x2">
                  <Heading2 mb="0">Production orders</Heading2>
                  <Flex gap="x2" alignItems="center" mr="x1">
                    <IconicButton icon="add" tooltip="New" onClick={handleCreateNewClick}>
                      New
                    </IconicButton>
                    <IconicButton icon="print" tooltip="Print">
                      Print
                    </IconicButton>
                    <VerticalDivider />
                    <IconicButton icon="getApp" tooltip="Import">
                      Import
                    </IconicButton>
                    <IconicButton icon="publish" tooltip="Export">
                      Export
                    </IconicButton>
                    <VerticalDivider />
                    <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
                      Filter
                    </IconicButton>
                  </Flex>
                </Flex>
                <Table
                  columns={[
                    {
                      label: "ID",
                      dataKey: "id",
                      cellFormatter: (props) => (
                        <Link href={`#/records/${props.cellData}`} underline={false}>
                          {props.cellData}
                        </Link>
                      ),
                    },
                    { label: "Name", dataKey: "name" },
                    { label: "Status", dataKey: "status" },
                    { label: "Date", dataKey: "date" },
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
                  ]}
                  rows={tableData}
                  hasSelectableRows
                  keyField="id"
                  onRowSelectionChange={(selectedRows) => console.log("Selected rows:", selectedRows)}
                  compact
                />
                <Card mt="x3" px="x4" py="x3">
                  <Flex justifyContent="space-between" alignItems="center" mb="x2">
                    <Heading3 mb="0">Additional Information</Heading3>
                    <IconicButton icon="edit" onClick={handleEditClick}>
                      Edit
                    </IconicButton>
                  </Flex>
                  <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
                    <DescriptionGroup>
                      <DescriptionTerm>Total Records</DescriptionTerm>
                      <DescriptionDetails>3</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Active Records</DescriptionTerm>
                      <DescriptionDetails>1</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Completed Records</DescriptionTerm>
                      <DescriptionDetails>1</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Pending Records</DescriptionTerm>
                      <DescriptionDetails>1</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Card>
              </Box>
            </Tab>
            <Tab label="Files">
              <Box pt="x2">
                <Flex justifyContent="flex-end" mb="x2">
                  <Flex gap="x2" alignItems="center" mr="x1">
                    <IconicButton icon="add" tooltip="Upload">
                      Upload
                    </IconicButton>
                    <IconicButton icon="filter" tooltip="Filter">
                      Filter
                    </IconicButton>
                    <VerticalDivider />
                    <IconicButton icon="getApp" tooltip="Download">
                      Download
                    </IconicButton>
                    <VerticalDivider />
                    <DropdownMenu trigger={() => <IconicButton icon="more" />}>
                      <DropdownButton onClick={() => {}}>Rename</DropdownButton>
                      <DropdownButton onClick={() => {}}>Move</DropdownButton>
                      <DropdownButton onClick={() => {}}>Delete</DropdownButton>
                    </DropdownMenu>
                  </Flex>
                </Flex>
                <Table
                  columns={[
                    { label: "Name", dataKey: "name" },
                    { label: "Type", dataKey: "type" },
                    { label: "Size", dataKey: "size" },
                    { label: "Uploaded", dataKey: "uploaded" },
                    {
                      dataKey: "actions",
                      width: "40px",
                      cellFormatter: (props) => <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />,
                    },
                  ]}
                  rows={[
                    {
                      name: "Production Report.pdf",
                      type: "PDF",
                      size: "2.5 MB",
                      uploaded: "2024-Mar-15 09:30 AM",
                    },
                    {
                      name: "Quality Check.jpg",
                      type: "Image",
                      size: "1.2 MB",
                      uploaded: "2024-Mar-16 02:15 PM",
                    },
                    {
                      name: "Material List.xlsx",
                      type: "Excel",
                      size: "3.8 MB",
                      uploaded: "2024-Mar-17 11:45 AM",
                    },
                  ]}
                  hasSelectableRows
                  keyField="name"
                  compact
                />
              </Box>
            </Tab>
          </Tabs>
        </Box>
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />
      </Page>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit record information"
        helpText="Record 123"
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
              <FieldLabel labelText="Record ID">
                <Input value="REC-2024-001" disabled />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Status">
                <Select
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                    { value: "pending", label: "Pending" },
                  ]}
                  value="active"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Category">
                <Select
                  options={[
                    { value: "production", label: "Production" },
                    { value: "maintenance", label: "Maintenance" },
                    { value: "quality", label: "Quality" },
                  ]}
                  value="production"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Priority">
                <Select
                  options={[
                    { value: "high", label: "High" },
                    { value: "medium", label: "Medium" },
                    { value: "low", label: "Low" },
                  ]}
                  value="high"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Department">
                <Select
                  options={[
                    { value: "manufacturing", label: "Manufacturing" },
                    { value: "engineering", label: "Engineering" },
                    { value: "quality", label: "Quality Control" },
                  ]}
                  value="manufacturing"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Location">
                <Input value="Factory Floor A" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Assigned to">
                <Select
                  options={[
                    { value: "michael_brown", label: "Michael Brown" },
                    { value: "john_smith", label: "John Smith" },
                    { value: "sarah_johnson", label: "Sarah Johnson" },
                  ]}
                  value="michael_brown"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Due date">
                <DatePicker selected={new Date("2024-03-20")} />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>
      <Sidebar
        isOpen={isDetailsSidebarOpen}
        onClose={handleCloseDetailsSidebar}
        title={isCreatingNew ? "Create new record detail" : "Edit record detail"}
        helpText="Record 123"
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
              <FieldLabel labelText="ID">
                <Input value={selectedRecord?.id || ""} disabled={!isCreatingNew} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Name">
                <Input value={selectedRecord?.name || ""} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Status">
                <Select
                  options={[
                    { value: "active", label: "Active" },
                    { value: "completed", label: "Completed" },
                    { value: "pending", label: "Pending" },
                  ]}
                  value={selectedRecord?.status?.toLowerCase() || ""}
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Date">
                <DatePicker selected={selectedRecord?.date ? new Date(selectedRecord.date) : new Date()} />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete record"
        itemName={selectedRecord?.id}
        itemType="record"
      />
    </ApplicationFrame>
  );
};
