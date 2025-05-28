import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  BrandedNavBar,
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
} from "../index";

export default {
  title: "Pages/RecordPage",
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

export const WithTabs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

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

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={menuData} />}>
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
        <Box maxWidth="1360px" mx="auto">
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Record information">
              <Box py={{ extraSmall: "x2", large: "x3" }}>
                <Flex justifyContent="flex-end" mb="x2">
                  <IconicButton icon="edit" onClick={handleEditClick} mr="x1">
                    Edit details
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
                      REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training
                      Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010
                      (Customer Order)
                    </DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
              </Box>
            </Tab>
            <Tab label="Tab with a title">
              <Box py={{ extraSmall: "x2", large: "x4" }}>
                <Flex justifyContent="space-between" alignItems="center" mb="x2">
                  <Heading2 mb="0">Record details</Heading2>
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
                    <IconicButton icon="filter" tooltip="Filter">
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
                          <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />
                        </Flex>
                      ),
                    },
                  ]}
                  rows={[
                    {
                      id: "RD-001",
                      name: "Production Order",
                      status: "Active",
                      date: "2024-Mar-15",
                    },
                    {
                      id: "RD-002",
                      name: "Quality Check",
                      status: "Completed",
                      date: "2024-Mar-16",
                    },
                    {
                      id: "RD-003",
                      name: "Material Request",
                      status: "Pending",
                      date: "2024-Mar-17",
                    },
                  ]}
                  hasSelectableRows
                  keyField="id"
                  compact
                />
              </Box>
            </Tab>
            <Tab label="Attachments">
              <Box py={{ extraSmall: "x2", large: "x4" }}>
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
      </Page>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit record information"
        helpText="Record 123"
        footer={
          <Flex justifyContent="flex-end">
            <QuietButton onClick={handleCloseSidebar} mr="x2">
              Cancel
            </QuietButton>
            <PrimaryButton onClick={handleCloseSidebar}>Save</PrimaryButton>
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
            <Box pb="x3">
              <FieldLabel labelText="Estimated hours">
                <Input type="number" value="24" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Actual hours">
                <Input type="number" value="18.5" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Cost center">
                <Input value="MFG-001" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Project code">
                <Input value="PRJ-2024-Q1" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Quality rating">
                <Input value="4.8/5.0" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Related records">
                <Textarea value="REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request), REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer Order)" />
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
          <Flex justifyContent="flex-end">
            <QuietButton onClick={handleCloseDetailsSidebar} mr="x2">
              Cancel
            </QuietButton>
            <PrimaryButton onClick={handleCloseDetailsSidebar}>Save</PrimaryButton>
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
    </ApplicationFrame>
  );
};

export const WithSections = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

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

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={menuData} />}>
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
        <Box maxWidth="1360px" mx="auto">
          <Card mb="x3" px={{ extraSmall: "x3", large: "x6" }} py={{ extraSmall: "x2", large: "x4" }}>
            <Flex justifyContent="space-between" alignItems="center" mb="x2">
              <Heading2 mb="0">Record information</Heading2>
              <IconicButton icon="edit" onClick={handleEditClick}>
                Edit details
              </IconicButton>
            </Flex>
            <DescriptionList columns={{ small: 2, medium: 3, large: 4 }}>
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
                  REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training
                  Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer
                  Order)
                </DescriptionDetails>
              </DescriptionGroup>
            </DescriptionList>
          </Card>

          <Card mb="x3" px={{ extraSmall: "x3", large: "x6" }} py={{ extraSmall: "x2", large: "x4" }}>
            <Flex justifyContent="space-between" alignItems="center" mb="x2">
              <Heading2 mb="0">Record details</Heading2>
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
                <IconicButton icon="filter" tooltip="Filter">
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
                      <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />
                    </Flex>
                  ),
                },
              ]}
              rows={[
                {
                  id: "RD-001",
                  name: "Production Order",
                  status: "Active",
                  date: "2024-Mar-15",
                },
                {
                  id: "RD-002",
                  name: "Quality Check",
                  status: "Completed",
                  date: "2024-Mar-16",
                },
                {
                  id: "RD-003",
                  name: "Material Request",
                  status: "Pending",
                  date: "2024-Mar-17",
                },
              ]}
              hasSelectableRows
              keyField="id"
              compact
            />
          </Card>

          <Card mb="x3" px={{ extraSmall: "x3", large: "x6" }} py={{ extraSmall: "x2", large: "x4" }}>
            <Flex justifyContent="space-between" alignItems="center" mb="x2">
              <Heading2 mb="0">Attachments</Heading2>
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
          </Card>
        </Box>
      </Page>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit record information"
        helpText="Record 123"
        footer={
          <Flex justifyContent="flex-end">
            <QuietButton onClick={handleCloseSidebar} mr="x2">
              Cancel
            </QuietButton>
            <PrimaryButton onClick={handleCloseSidebar}>Save</PrimaryButton>
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
            <Box pb="x3">
              <FieldLabel labelText="Estimated hours">
                <Input type="number" value="24" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Actual hours">
                <Input type="number" value="18.5" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Cost center">
                <Input value="MFG-001" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Project code">
                <Input value="PRJ-2024-Q1" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Quality rating">
                <Input value="4.8/5.0" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Related records">
                <Textarea value="REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request), REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer Order)" />
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
          <Flex justifyContent="flex-end">
            <QuietButton onClick={handleCloseDetailsSidebar} mr="x2">
              Cancel
            </QuietButton>
            <PrimaryButton onClick={handleCloseDetailsSidebar}>Save</PrimaryButton>
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
    </ApplicationFrame>
  );
};

export const WithBoth = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

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

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={menuData} />}>
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
        <Box maxWidth="1360px" mx="auto">
          <Card mb="x3" px={{ extraSmall: "x3", large: "x6" }} py={{ extraSmall: "x2", large: "x4" }}>
            <Flex justifyContent="space-between" alignItems="center" mb="x2">
              <Heading2 mb="0">Record information</Heading2>
              <IconicButton icon="edit" onClick={handleEditClick}>
                Edit details
              </IconicButton>
            </Flex>
            <DescriptionList columns={{ small: 2, medium: 3, large: 4 }}>
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
                  REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training
                  Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer
                  Order)
                </DescriptionDetails>
              </DescriptionGroup>
            </DescriptionList>
          </Card>

          <Tabs defaultSelectedIndex={0}>
            <Tab label="Record details">
              <Box py={{ extraSmall: "x2", large: "x3" }}>
                <Flex justifyContent="space-between" alignItems="center" mb="x2">
                  <Heading2 mb="0">Record details</Heading2>
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
                    <IconicButton icon="filter" tooltip="Filter">
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
                          <IconicButton icon="delete" tooltip="Delete" onClick={() => {}} />
                        </Flex>
                      ),
                    },
                  ]}
                  rows={[
                    {
                      id: "RD-001",
                      name: "Production Order",
                      status: "Active",
                      date: "2024-Mar-15",
                    },
                    {
                      id: "RD-002",
                      name: "Quality Check",
                      status: "Completed",
                      date: "2024-Mar-16",
                    },
                    {
                      id: "RD-003",
                      name: "Material Request",
                      status: "Pending",
                      date: "2024-Mar-17",
                    },
                  ]}
                  hasSelectableRows
                  keyField="id"
                  compact
                />
              </Box>
            </Tab>
            <Tab label="Attachments">
              <Box py={{ extraSmall: "x2", large: "x3" }}>
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
      </Page>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit record information"
        helpText="Record 123"
        footer={
          <Flex justifyContent="flex-end">
            <QuietButton onClick={handleCloseSidebar} mr="x2">
              Cancel
            </QuietButton>
            <PrimaryButton onClick={handleCloseSidebar}>Save</PrimaryButton>
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
            <Box pb="x3">
              <FieldLabel labelText="Estimated hours">
                <Input type="number" value="24" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Actual hours">
                <Input type="number" value="18.5" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Cost center">
                <Input value="MFG-001" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Project code">
                <Input value="PRJ-2024-Q1" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Quality rating">
                <Input value="4.8/5.0" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Related records">
                <Textarea value="REC-2024-002 (Production Order), REC-2024-003 (Quality Check), REC-2024-004 (Material Request), REC-2024-005 (Equipment Maintenance), REC-2024-006 (Safety Inspection), REC-2024-007 (Training Record), REC-2024-008 (Inventory Adjustment), REC-2024-009 (Supplier Delivery), REC-2024-010 (Customer Order)" />
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
          <Flex justifyContent="flex-end">
            <QuietButton onClick={handleCloseDetailsSidebar} mr="x2">
              Cancel
            </QuietButton>
            <PrimaryButton onClick={handleCloseDetailsSidebar}>Save</PrimaryButton>
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
    </ApplicationFrame>
  );
};
