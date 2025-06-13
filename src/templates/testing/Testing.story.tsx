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

const meta = {
  title: "Templates/Testing",
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
  code?: string;
  item?: string;
  jobs?: string;
  due?: string;
  expected?: string;
  remaining?: string;
  unscheduled?: string;
}

interface Record {
  id: string;
  name: string;
  type: string;
  status: string;
  priority: string;
  assignedTo: string;
  dueDate: string;
  progress: string;
}

export const IndexTemplate = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleCreateNewClick = () => {
    setSelectedWorkOrder(null);
    setIsCreatingNew(true);
    setIsDetailsSidebarOpen(true);
  };

  const handleDetailsEditClick = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsCreatingNew(false);
    setIsDetailsSidebarOpen(true);
  };

  const handleDeleteClick = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting work order:", selectedWorkOrder);
    setTableData((prevData) => prevData.filter((row) => row.id !== selectedWorkOrder?.id));
    setIsDeleteModalOpen(false);
    setSelectedWorkOrder(null);
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
    { label: "Status", dataKey: "status" },
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
    },
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
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
            title="Index template test"
            subtitle="Testing environment"
            renderActions={() => (
              <IconicButton icon="publish" tooltip="Export">
                Export
              </IconicButton>
            )}
          />
        )}
      >
        <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
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
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete work order"
          itemName={selectedWorkOrder?.workOrderCode}
          itemType="work order"
        />

        <Sidebar
          isOpen={isDetailsSidebarOpen}
          onClose={() => setIsDetailsSidebarOpen(false)}
          title={isCreatingNew ? "Create new work order" : "Edit work order"}
          helpText="Work order details"
          footer={
            <Flex justifyContent="flex-start">
              <PrimaryButton onClick={() => setIsDetailsSidebarOpen(false)} mr="x2">
                Save
              </PrimaryButton>
              <QuietButton onClick={() => setIsDetailsSidebarOpen(false)}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <FieldLabel labelText="Work order code">
                  <Input value={selectedWorkOrder?.workOrderCode || ""} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Customer name">
                  <Input value={selectedWorkOrder?.customerName || ""} />
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
            </FormSection>
          </Form>
        </Sidebar>
      </Page>
    </ApplicationFrame>
  );
};

export const RecordTemplate = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDetailsSidebarOpen, setIsDetailsSidebarOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
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

  const handleDetailsEditClick = (record: Record) => {
    setSelectedRecord(record);
    setIsCreatingNew(false);
    setIsDetailsSidebarOpen(true);
  };

  const handleCreateNewClick = () => {
    setSelectedRecord(null);
    setIsCreatingNew(true);
    setIsDetailsSidebarOpen(true);
  };

  const handleDeleteClick = (record: Record) => {
    setSelectedRecord(record);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedRecord) {
      setTableData((prevData) => prevData.filter((row) => row.id !== selectedRecord.id));
      setIsDeleteModalOpen(false);
      setSelectedRecord(null);
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

  const filterFields = [
    {
      key: "name",
      label: "Name",
      type: "text" as const,
    },
    {
      key: "type",
      label: "Type",
      type: "select" as const,
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
      type: "select" as const,
      options: [
        { label: "All", value: "" },
        { label: "In Progress", value: "In Progress" },
        { label: "Pending", value: "Pending" },
        { label: "Completed", value: "Completed" },
      ],
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
        title="Record 123"
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Record 123 test"
            subtitle="Testing environment"
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
        <Box pt="x3" maxWidth="1360px" mx="auto">
          <Tabs defaultSelectedIndex={0}>
            <Tab label="Overview">
              <Box pt="x2">
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
                    <DescriptionTerm>Status</DescriptionTerm>
                    <DescriptionDetails>Active</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Priority</DescriptionTerm>
                    <DescriptionDetails>High</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Department</DescriptionTerm>
                    <DescriptionDetails>Manufacturing</DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
              </Box>
            </Tab>
            <Tab label="Details">
              <Box py={{ extraSmall: "x2", large: "x3" }}>
                <Flex justifyContent="space-between" alignItems="center" mb="x2">
                  <Heading2 mb="0">Production orders</Heading2>
                  <Flex gap="x2" alignItems="center" mr="x1">
                    <IconicButton icon="add" tooltip="New" onClick={handleCreateNewClick}>
                      New
                    </IconicButton>
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
                    { label: "Type", dataKey: "type" },
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

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete record"
          itemName={selectedRecord?.name}
          itemType="record"
        />

        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          title="Edit record information"
          helpText="Record 123"
          footer={
            <Flex justifyContent="flex-start">
              <PrimaryButton onClick={() => setIsSidebarOpen(false)} mr="x2">
                Save
              </PrimaryButton>
              <QuietButton onClick={() => setIsSidebarOpen(false)}>Cancel</QuietButton>
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
            </FormSection>
          </Form>
        </Sidebar>

        <Sidebar
          isOpen={isDetailsSidebarOpen}
          onClose={() => setIsDetailsSidebarOpen(false)}
          title={isCreatingNew ? "Create new record" : "Edit record"}
          helpText="Record details"
          footer={
            <Flex justifyContent="flex-start">
              <PrimaryButton onClick={() => setIsDetailsSidebarOpen(false)} mr="x2">
                Save
              </PrimaryButton>
              <QuietButton onClick={() => setIsDetailsSidebarOpen(false)}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <FieldLabel labelText="Name">
                  <Input value={selectedRecord?.name || ""} />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Type">
                  <Select
                    options={[
                      { value: "manufacturing", label: "Manufacturing" },
                      { value: "quality", label: "Quality" },
                      { value: "inventory", label: "Inventory" },
                    ]}
                    value={selectedRecord?.type?.toLowerCase() || ""}
                  />
                </FieldLabel>
              </Box>
              <Box pb="x3">
                <FieldLabel labelText="Status">
                  <Select
                    options={[
                      { value: "in_progress", label: "In Progress" },
                      { value: "pending", label: "Pending" },
                      { value: "completed", label: "Completed" },
                    ]}
                    value={selectedRecord?.status?.toLowerCase().replace(" ", "_") || ""}
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

export const WorkOrdersWithFilters = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [selectedRows, setSelectedRows] = useState<WorkOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    finishedGood: "",
    usesSubcomponent: "",
    customerName: "",
    workOrderId: "",
    status: "Open & Booked",
    priority: "",
    dueDateFrom: null,
    dueDateTo: null,
    plannedStartDateTo: null,
    hasJobs: "All",
    longRunning: "All",
  });

  const [tableData, setTableData] = useState([
    {
      id: "197155",
      code: "197155 - JHSC5-1",
      item: "Soap Bundle - Juan H",
      jobs: "0",
      status: "Booked",
      plannedStart: "--",
      plannedEnd: "--",
      due: "--",
      expected: "400.00",
      remaining: "400.00",
      unscheduled: "400.00",
    },
    {
      id: "194258",
      code: "194258 - WO-Nov",
      item: "FG-Nov",
      jobs: "0",
      status: "Open",
      plannedStart: "2024-Nov-22",
      plannedEnd: "2024-Dec-06",
      due: "--",
      expected: "500.00",
      remaining: "500.00",
      unscheduled: "500.00",
    },
    {
      id: "128576",
      code: "128576 - 128576",
      item: "No Item",
      jobs: "0",
      status: "Booked",
      plannedStart: "2021-Jul-13",
      plannedEnd: "2021-Jul-27",
      due: "--",
      expected: "0.00",
      remaining: "--",
      unscheduled: "0.00",
    },
    {
      id: "79324",
      code: "79324 - ChipsPackDisplay",
      item: "ChipsPACK",
      jobs: "2",
      status: "Open",
      plannedStart: "--",
      plannedEnd: "--",
      due: "--",
      expected: "0.00",
      remaining: "-3.00",
      unscheduled: "0.00",
    },
    {
      id: "78335",
      code: "78335 - 78335",
      item: "SFC_FG",
      jobs: "4",
      status: "Open",
      plannedStart: "--",
      plannedEnd: "--",
      due: "--",
      expected: "3840.00",
      remaining: "3840.00",
      unscheduled: "3840.00",
    },
    {
      id: "208248",
      code: "208248 - 208248",
      item: "FG-Nov",
      jobs: "0",
      status: "Open",
      plannedStart: "--",
      plannedEnd: "--",
      due: "2025-Apr-30",
      expected: "100.00",
      remaining: "100.00",
      unscheduled: "100.00",
    },
    {
      id: "207338",
      code: "207338 - 207338",
      item: "SFC_FG2",
      jobs: "0",
      status: "Open",
      plannedStart: "--",
      plannedEnd: "--",
      due: "2025-Apr-30",
      expected: "100.00",
      remaining: "100.00",
      unscheduled: "100.00",
    },
    {
      id: "202958",
      code: "202958 - 202958",
      item: "DOR TRAY",
      jobs: "1",
      status: "Open",
      plannedStart: "--",
      plannedEnd: "--",
      due: "2025-Feb-28",
      expected: "0.00",
      remaining: "0.00",
      unscheduled: "0.00",
    },
    {
      id: "197541",
      code: "197541 - NTS WO1",
      item: "Soap Bundle - Juan H",
      jobs: "3",
      status: "Booked",
      plannedStart: "2025-Jan-17",
      plannedEnd: "2025-Jan-17",
      due: "2025-Jan-24",
      expected: "2000.00",
      remaining: "2000.00",
      unscheduled: "2000.00",
    },
    {
      id: "197540",
      code: "197540 - NTS WO2",
      item: "Soap Bundle - JH",
      jobs: "4",
      status: "Open",
      plannedStart: "--",
      plannedEnd: "--",
      due: "2025-Jan-24",
      expected: "1000.00",
      remaining: "1000.00",
      unscheduled: "1000.00",
    },
    {
      id: "197542",
      code: "197542 - NTS WO3",
      item: "Soap Bundle Aloe - JH",
      jobs: "3",
      status: "Booked",
      plannedStart: "2025-Jan-16",
      plannedEnd: "2025-Jan-17",
      due: "2025-Jan-23",
      expected: "3000.00",
      remaining: "3000.00",
      unscheduled: "3000.00",
    },
    {
      id: "196169",
      code: "196169 - JHSC3",
      item: "No Item",
      jobs: "4",
      status: "Booked",
      plannedStart: "--",
      plannedEnd: "--",
      due: "2024-Dec-24",
      expected: "4000.00",
      remaining: "--",
      unscheduled: "4000.00",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleDeleteClick = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting work order:", selectedWorkOrder);
    setTableData((prevData) => prevData.filter((row) => row.id !== selectedWorkOrder?.id));
    setIsDeleteModalOpen(false);
    setSelectedWorkOrder(null);
    toast.success("Work order deleted successfully");
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create Work Order clicked");
  };

  const handleRowSelectionChange = (selectedRows: WorkOrder[]) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkClose = () => {
    toast.success(`Closed ${selectedRows.length} work orders`);
    setSelectedRows([]);
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedRows.length} work orders`);
    setTableData((prevData) => prevData.filter((row) => !selectedRows.some((selected) => selected.id === row.id)));
    setSelectedRows([]);
  };

  const tableColumns = [
    {
      label: "Code",
      dataKey: "code",
      cellFormatter: (props) => (
        <Link href={`#/work-orders/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Item", dataKey: "item" },
    { label: "Jobs", dataKey: "jobs", align: "center" as const },
    { label: "Status", dataKey: "status" },
    { label: "Planned Start", dataKey: "plannedStart" },
    { label: "Planned End", dataKey: "plannedEnd" },
    { label: "Due", dataKey: "due" },
    { label: "Expected", dataKey: "expected", align: "right" as const },
    { label: "Remaining", dataKey: "remaining", align: "right" as const },
    { label: "Unscheduled", dataKey: "unscheduled", align: "right" as const },
    {
      dataKey: "actions",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
      ),
    },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "finishedGood",
      label: "Finished good",
      type: "text" as const,
    },
    {
      key: "usesSubcomponent",
      label: "Uses subcomponent",
      type: "text" as const,
    },
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "workOrderId",
      label: "Work Order ID",
      type: "text" as const,
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "All", value: "" },
        { label: "Open & Booked", value: "Open & Booked" },
        { label: "Open", value: "Open" },
        { label: "Booked", value: "Booked" },
      ],
    },
    {
      key: "priority",
      label: "Priority",
      type: "text" as const,
    },
    {
      key: "dueDateFrom",
      label: "Due date from",
      type: "date" as const,
    },
    {
      key: "dueDateTo",
      label: "Due date to",
      type: "date" as const,
    },
    {
      key: "plannedStartDateTo",
      label: "Planned Start Date to",
      type: "date" as const,
    },
    {
      key: "hasJobs",
      label: "Has Jobs",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      key: "longRunning",
      label: "Long running",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Work Orders" subtitle="Nulogy Site" />}
      >
        <Flex
          gap="x2"
          px="x1"
          pb="x2"
          justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {/* Bulk Actions - Left Side (with selection count) */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
            </Flex>
          )}

          {/* Actions - Right Side (bulk actions replace regular actions when rows selected) */}
          <Flex gap="x2" alignItems="center">
            {selectedRows.length > 0 ? (
              <>
                {/* Bulk actions replace primary/secondary actions */}
                <IconicButton icon="close" tooltip="Close" onClick={handleBulkClose}>
                  Close
                </IconicButton>
                <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDelete}>
                  Delete
                </IconicButton>
              </>
            ) : (
              <>
                {/* Regular table actions when no selection */}
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
              </>
            )}
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

        <FilterSidebar
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
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete work order"
          itemName={selectedWorkOrder?.code}
          itemType="work order"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const ItemList = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // Closed by default
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    status: "Active",
    customerName: "",
    itemFamilyName: "",
    itemType: "",
    itemCategoryName: "",
    vendorName: "",
    isSubcomponent: "Doesn't matter",
    isFinishedGood: "Doesn't matter",
    itemCode: "",
  });

  const [tableData, setTableData] = useState([
    {
      id: "1",
      code: "Blueberry Tea Item",
      description: "A better description 1",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "2",
      code: "B-TL700004-Q5",
      description: "B-TL700004-Q5",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "3",
      code: "Bundled Peanutbutter",
      description: "bundle of 5 peanut butter with coupon",
      customer: "Company ABC",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "4",
      code: "Corrugated Display",
      description: "--",
      customer: "Peanut Butter Group",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "5",
      code: "DEMO123",
      description: "peanut butter",
      customer: "Company ABC",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "6",
      code: "DEMO Corrugated",
      description: "box",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "7",
      code: "DEMO Nutella",
      description: "nutella pack",
      customer: "Peanut Butter Group",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "8",
      code: "DEMO peanut butter",
      description: "jar with peanut butter",
      customer: "Company ABC",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "9",
      code: "DEMO Promo Sticker",
      description: "promotional sticker for peanut butter",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "10",
      code: "DEMO shrink film",
      description: "shrink film to wrap 2 nutettes together",
      customer: "Peanut Butter Group",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "11",
      code: "H4",
      description: "--",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "12",
      code: "Hackathon Team 1",
      description: "--",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "13",
      code: "NUTELLA PACK",
      description: "Nutella packaged together",
      customer: "Peanut Butter Group",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "14",
      code: "PEANUT BUTTER FULL",
      description: "--",
      customer: "Peanut Butter Group",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
    {
      id: "15",
      code: "Peanut Butter Jar",
      description: "jar with peanut butter",
      customer: "No customer",
      family: "--",
      type: "--",
      itemCategory: "--",
      inactive: "No",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting item:", selectedItem);
    setTableData((prevData) => prevData.filter((row) => row.id !== selectedItem?.id));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
    toast.success("Item deleted successfully");
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create Item clicked");
  };

  // Bulk action handlers
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkDisable = () => {
    toast.success(`Disabled ${selectedRows.length} items`);
    setSelectedRows([]); // Clear selection after action
  };

  const handleBulkUpdateCostFromBOM = () => {
    toast.success(`Updated cost from BOM for ${selectedRows.length} items`);
    setSelectedRows([]); // Clear selection after action
  };

  const handleBulkPrintItemDocket = () => {
    toast.success(`Print item docket initiated for ${selectedRows.length} items`);
    setSelectedRows([]); // Clear selection after action
  };

  const tableColumns = [
    {
      label: "Code",
      dataKey: "code",
      cellFormatter: (props) => (
        <Link href={`#/items/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Description", dataKey: "description" },
    { label: "Customer", dataKey: "customer" },
    { label: "Family", dataKey: "family" },
    { label: "Type", dataKey: "type" },
    { label: "Item Category", dataKey: "itemCategory" },
    { label: "Inactive", dataKey: "inactive" },
    {
      dataKey: "actions",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton icon="delete" tooltip="Delete" onClick={() => handleDeleteClick(props.row)} />
      ),
    },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
        { label: "All", value: "All" },
      ],
    },
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "itemFamilyName",
      label: "Item family name",
      type: "text" as const,
    },
    {
      key: "itemType",
      label: "Item type",
      type: "text" as const,
    },
    {
      key: "itemCategoryName",
      label: "Item category name",
      type: "text" as const,
    },
    {
      key: "vendorName",
      label: "Vendor name",
      type: "text" as const,
    },
    {
      key: "isSubcomponent",
      label: "Is Subcomponent",
      type: "select" as const,
      options: [
        { label: "Doesn't matter", value: "Doesn't matter" },
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      key: "isFinishedGood",
      label: "Is Finished Good",
      type: "select" as const,
      options: [
        { label: "Doesn't matter", value: "Doesn't matter" },
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link",
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link",
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link",
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
              type: "link",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Item List" subtitle="Nulogy Site" />}
      >
        <Flex
          gap="x2"
          px="x1"
          pb="x2"
          justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {/* Bulk Actions - Left Side */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
              <IconicButton icon="close" tooltip="Disable" onClick={handleBulkDisable}>
                Disable
              </IconicButton>
              <IconicButton icon="edit" tooltip="Update cost from BOM" onClick={handleBulkUpdateCostFromBOM}>
                Update cost from BOM
              </IconicButton>
              <IconicButton icon="print" tooltip="Print item docket" onClick={handleBulkPrintItemDocket}>
                Print item docket
              </IconicButton>
            </Flex>
          )}

          {/* Regular Actions - Right Side */}
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="add" tooltip="Create" onClick={handleCreateNewClick}>
              Create Item
            </IconicButton>
            <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
              Filter
            </IconicButton>
            <VerticalDivider />
            <IconicButton icon="getApp" tooltip="Import (CSV)">
              Import (CSV)
            </IconicButton>
            <IconicButton icon="publish" tooltip="Export (CSV)">
              Export (CSV)
            </IconicButton>
            <VerticalDivider />
            <DropdownMenu trigger={() => <IconicButton icon="more" />}>
              {selectedRows.length === 0 && (
                <>
                  <DropdownButton onClick={() => toast.success("Disable clicked")}>Disable</DropdownButton>
                  <DropdownButton onClick={() => toast.success("Update cost from BOM clicked")}>
                    Update cost from BOM
                  </DropdownButton>
                  <DropdownButton onClick={() => toast.success("Print item docket clicked")}>
                    Print item docket
                  </DropdownButton>
                </>
              )}
              <DropdownButton onClick={() => toast.success("Delete selected clicked")}>Delete</DropdownButton>
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

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete item"
          itemName={selectedItem?.code}
          itemType="item"
        />
      </Page>
    </ApplicationFrame>
  );
};

export const ShipOrders = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true); // Open by default (matches image)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShipOrder, setSelectedShipOrder] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    customerName: "",
    shipped: "No", // Default to "No" as shown in image
    shipTo: "",
    expectedShipDateFrom: null,
    expectedShipDateTo: null,
    referenceNumber: "",
    itemCode: "",
  });

  const [tableData, setTableData] = useState([
    {
      id: "32",
      code: "ABC",
      customer: "Company ABC",
      shipped: "No",
      shipTo: "SanShips",
      expectedShip: "--",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "3",
      code: "345",
      customer: "Company ABC",
      shipped: "No",
      shipTo: "SanShips",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "4",
      code: "DEMO SHI...",
      customer: "Peanut Butter",
      shipped: "No",
      shipTo: "SanShips",
      expectedShip: "2021-Sep-09 04:39",
      reference: "--",
      shipments: "4",
      notes: "--",
    },
    {
      id: "2",
      code: "123",
      customer: "Company ABC",
      shipped: "No",
      shipTo: "SanShips",
      expectedShip: "2021-Aug-25 01:40",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "1",
      code: "1",
      customer: "justforfun",
      shipped: "No",
      shipTo: "SanShips",
      expectedShip: "2021-Jul-28 11:46 AM",
      reference: "--",
      shipments: "1",
      notes: "Learning about the BOL",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create ship order clicked");
  };

  // Bulk action handlers
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkPrintShipOrderSheets = () => {
    toast.success(`Print ship order sheets initiated for ${selectedRows.length} ship orders`);
    setSelectedRows([]); // Clear selection after action
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedRows.length} ship orders`);
    // Remove selected ship orders from table data
    setTableData((prevData) => prevData.filter((row) => !selectedRows.some((selected) => selected.id === row.id)));
    setSelectedRows([]); // Clear selection after action
  };

  const tableColumns = [
    {
      label: "ID",
      dataKey: "id",
    },
    {
      label: "Code",
      dataKey: "code",
      cellFormatter: (props) => (
        <Link href={`#/ship-orders/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Customer",
      dataKey: "customer",
      cellFormatter: (props) => (
        <Link href={`#/customers/${props.row.customer}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Shipped", dataKey: "shipped" },
    {
      label: "Ship To",
      dataKey: "shipTo",
      cellFormatter: (props) => (
        <Link href={`#/ship-to/${props.row.shipTo}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Expected Ship", dataKey: "expectedShip" },
    { label: "Reference", dataKey: "reference" },
    { label: "Shipments", dataKey: "shipments", align: "center" as const },
    { label: "Notes", dataKey: "notes" },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "shipped",
      label: "Shipped",
      type: "select" as const,
      options: [
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" },
        { label: "All", value: "All" },
      ],
    },
    {
      key: "shipTo",
      label: "Ship to",
      type: "text" as const,
    },
    {
      key: "expectedShipDateFrom",
      label: "Expected ship date from",
      type: "date" as const,
    },
    {
      key: "expectedShipDateTo",
      label: "Expected ship date to",
      type: "date" as const,
    },
    {
      key: "referenceNumber",
      label: "Reference number",
      type: "text" as const,
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Ship Orders" subtitle="Nulogy Site" />}
      >
        <Flex
          gap="x2"
          px="x1"
          pb="x2"
          justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {/* Bulk Actions - Left Side */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
              <IconicButton icon="print" tooltip="Print Ship Order Sheets" onClick={handleBulkPrintShipOrderSheets}>
                Print Ship Order Sheets
              </IconicButton>
              <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDelete}>
                Delete
              </IconicButton>
            </Flex>
          )}

          {/* Regular Actions - Right Side */}
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="getApp" tooltip="Import (CSV)">
              Import (CSV)
            </IconicButton>
            <IconicButton icon="publish" tooltip="Export (CSV)">
              Export (CSV)
            </IconicButton>
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

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
          overlay={false}
          closeOnOutsideClick={false}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const ShipOrdersV2 = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // Closed by default
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    customerName: "",
    shipped: "No", // Default to "No" as shown in image
    shipTo: "",
    expectedShipDateFrom: null,
    expectedShipDateTo: null,
    referenceNumber: "",
    itemCode: "",
  });

  const [tableData, setTableData] = useState([
    {
      id: "59192",
      code: "59192",
      customer: "FRITO LAY",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "53633",
      code: "aasa",
      customer: "Colgate-Palmolive",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "18117",
      code: "18117",
      customer: "CPG",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "57415",
      code: "CP001",
      customer: "Colgate-Palmolive",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2025-Jan-09 08:51",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "18758",
      code: "AB-InDC",
      customer: "CAB",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2022-Apr-08 02:10",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "18053",
      code: "18053",
      customer: "CAB",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2021-Sep-14 02:01",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "18052",
      code: "18052",
      customer: "CAB",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2021-Sep-14 02:01",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "12182",
      code: "999",
      customer: "Sunshine Fruit Co.",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2017-Dec-22 04:04",
      reference: "--",
      shipments: "3",
      notes: "--",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create ship order clicked");
  };

  // Bulk action handlers
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkPrintShipOrderSheets = () => {
    toast.success(`Print ship order sheets initiated for ${selectedRows.length} ship orders`);
    setSelectedRows([]); // Clear selection after action
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedRows.length} ship orders`);
    // Remove selected ship orders from table data
    setTableData((prevData) => prevData.filter((row) => !selectedRows.some((selected) => selected.id === row.id)));
    setSelectedRows([]); // Clear selection after action
  };

  const tableColumns = [
    {
      label: "ID",
      dataKey: "id",
      cellFormatter: (props) => (
        <Link href={`#/ship-orders/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Code", dataKey: "code" },
    {
      label: "Customer",
      dataKey: "customer",
      cellFormatter: (props) => (
        <Link href={`#/customers/${props.row.customer}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Shipped", dataKey: "shipped" },
    {
      label: "Ship to",
      dataKey: "shipTo",
      cellFormatter: (props) => (
        <Link href={`#/ship-to/${props.row.shipTo}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Expected ship", dataKey: "expectedShip" },
    { label: "Reference", dataKey: "reference" },
    { label: "Shipments", dataKey: "shipments", align: "center" as const },
    { label: "Notes", dataKey: "notes" },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "shipped",
      label: "Shipped",
      type: "select" as const,
      options: [
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" },
        { label: "All", value: "All" },
      ],
    },
    {
      key: "shipTo",
      label: "Ship to",
      type: "text" as const,
    },
    {
      key: "expectedShipDateFrom",
      label: "Expected ship date from",
      type: "date" as const,
    },
    {
      key: "expectedShipDateTo",
      label: "Expected ship date to",
      type: "date" as const,
    },
    {
      key: "referenceNumber",
      label: "Reference number",
      type: "text" as const,
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Ship orders" subtitle="Nulogy Site" />}
      >
        <Flex
          gap="x2"
          px="x1"
          pb="x2"
          justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {/* Bulk Actions - Left Side (with selection count) */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
            </Flex>
          )}

          {/* Actions - Right Side (bulk actions replace regular actions when rows selected) */}
          <Flex gap="x2" alignItems="center">
            {selectedRows.length > 0 ? (
              <>
                {/* Bulk actions replace primary/secondary actions */}
                <IconicButton icon="print" tooltip="Print ship order sheets" onClick={handleBulkPrintShipOrderSheets}>
                  Print ship order sheets
                </IconicButton>
                <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDelete}>
                  Delete
                </IconicButton>
              </>
            ) : (
              <>
                {/* Regular table actions when no selection */}
                <IconicButton icon="add" tooltip="Create ship order" onClick={handleCreateNewClick}>
                  Create ship order
                </IconicButton>
                <IconicButton icon="filter" tooltip="Filters" onClick={handleFilterClick}>
                  Filters
                </IconicButton>
                <VerticalDivider />
                <IconicButton icon="getApp" tooltip="Import (CSV)">
                  Import (CSV)
                </IconicButton>
                <IconicButton icon="publish" tooltip="Export (CSV)">
                  Export (CSV)
                </IconicButton>
              </>
            )}
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

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const Jobs = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true); // Open by default
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    workOrderCode: "",
    itemCode: "",
    customerName: "",
    expectedStartFrom: null,
    expectedEndTo: null,
    lineName: "",
    lineLeader: "All",
    status: "Stopped",
    hasProduction: "All",
    reconciliationStatus: "All",
  });

  const [tableData, setTableData] = useState([
    {
      id: "28756",
      workOrder: "50741 - A",
      item: "PEANUT BUTTE...",
      expectedQuantity: "1000.00 ea",
      actualQuantity: "11.00 ea",
      expectedStart: "2024-Oct-08 07:00 AM",
      expectedEnd: "2024-Oct-08 03:00 PM",
      actualStart: "2024-Oct-08 04:49 PM",
      actualEnd: "2024-Dec-06 02:09 PM",
      expectedPeople: "2.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "--",
    },
    {
      id: "11",
      workOrder: "1134 - 1134",
      item: "DEMO123",
      expectedQuantity: "160.00 ea",
      actualQuantity: "0.00 ea",
      expectedStart: "2023-Nov-06 07:00 AM",
      expectedEnd: "2023-Nov-06 03:00 PM",
      actualStart: "--",
      actualEnd: "--",
      expectedPeople: "5.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "--",
    },
    {
      id: "10",
      workOrder: "1134 - 1134",
      item: "DEMO123",
      expectedQuantity: "160.00 ea",
      actualQuantity: "0.00 ea",
      expectedStart: "2023-Nov-06 07:00 AM",
      expectedEnd: "2023-Nov-06 03:00 PM",
      actualStart: "2023-Nov-01 09:57 AM",
      actualEnd: "2023-Nov-10 08:04 AM",
      expectedPeople: "5.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "--",
    },
    {
      id: "742",
      workOrder: "1350 - Jlt test",
      item: "Jlt-FG",
      expectedQuantity: "0.00 cs",
      actualQuantity: "0.00 cs",
      expectedStart: "2023-Sep-25 07:00 AM",
      expectedEnd: "2023-Sep-25 03:00 PM",
      actualStart: "--",
      actualEnd: "--",
      expectedPeople: "0.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "--",
    },
    {
      id: "240",
      workOrder: "110 - DEMO NUT...",
      item: "NUTELLA PACK",
      expectedQuantity: "800.00 ea",
      actualQuantity: "0.00 ea",
      expectedStart: "2022-Jun-24 07:00 AM",
      expectedEnd: "2022-Jun-24 03:00 PM",
      actualStart: "--",
      actualEnd: "--",
      expectedPeople: "8.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "--",
    },
    {
      id: "183",
      workOrder: "109 - DEMO: WO...",
      item: "DEMO123",
      expectedQuantity: "160.00 ea",
      actualQuantity: "0.00 ea",
      expectedStart: "2022-Apr-26 07:00 AM",
      expectedEnd: "2022-Apr-26 03:00 PM",
      actualStart: "--",
      actualEnd: "--",
      expectedPeople: "5.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "tammyn@nulo...",
    },
    {
      id: "49",
      workOrder: "110 - DEMO NUT...",
      item: "NUTELLA PACK",
      expectedQuantity: "500.00 ea",
      actualQuantity: "0.00 ea",
      expectedStart: "2021-Sep-10 07:00 AM",
      expectedEnd: "2021-Sep-10 03:00 PM",
      actualStart: "--",
      actualEnd: "--",
      expectedPeople: "8.0",
      actualPeople: "0.0",
      line: "Line 1",
      lineLeader: "saurabha@nul...",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create job clicked");
  };

  // Bulk action handlers
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedRows.length} jobs`);
    // Remove selected jobs from table data
    setTableData((prevData) => prevData.filter((row) => !selectedRows.some((selected) => selected.id === row.id)));
    setSelectedRows([]); // Clear selection after action
  };

  const handleBulkPrintDocket = () => {
    toast.success(`Print docket initiated for ${selectedRows.length} jobs`);
    setSelectedRows([]); // Clear selection after action
  };

  // Complex table structure with Expected/Actual rows
  const tableColumns = [
    {
      label: "ID",
      dataKey: "id",
      cellFormatter: (props) => (
        <Link href={`#/jobs/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Work Order",
      dataKey: "workOrder",
      cellFormatter: (props) => (
        <Link href={`#/work-orders/${props.row.workOrder.split(" - ")[0]}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Item",
      dataKey: "item",
      cellFormatter: (props) => (
        <Link href={`#/items/${props.row.item}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      cellFormatter: (props) => (
        <Box>
          <Box>
            <Text fontSize="small" color="darkGrey">
              Expected:
            </Text>
            <Text>{props.row.expectedQuantity}</Text>
          </Box>
          <Box pt="x1">
            <Text fontSize="small" color="darkGrey">
              Actual:
            </Text>
            <Text>{props.row.actualQuantity}</Text>
          </Box>
        </Box>
      ),
    },
    {
      label: "Start",
      dataKey: "start",
      cellFormatter: (props) => (
        <Box>
          <Box>
            <Text fontSize="small" color="darkGrey">
              Expected:
            </Text>
            <Text>{props.row.expectedStart}</Text>
          </Box>
          <Box pt="x1">
            <Text fontSize="small" color="darkGrey">
              Actual:
            </Text>
            <Text>{props.row.actualStart}</Text>
          </Box>
        </Box>
      ),
    },
    {
      label: "End",
      dataKey: "end",
      cellFormatter: (props) => (
        <Box>
          <Box>
            <Text fontSize="small" color="darkGrey">
              Expected:
            </Text>
            <Text>{props.row.expectedEnd}</Text>
          </Box>
          <Box pt="x1">
            <Text fontSize="small" color="darkGrey">
              Actual:
            </Text>
            <Text>{props.row.actualEnd}</Text>
          </Box>
        </Box>
      ),
    },
    {
      label: "People",
      dataKey: "people",
      cellFormatter: (props) => (
        <Box>
          <Box>
            <Text fontSize="small" color="darkGrey">
              Expected:
            </Text>
            <Text>{props.row.expectedPeople}</Text>
          </Box>
          <Box pt="x1">
            <Text fontSize="small" color="darkGrey">
              Actual:
            </Text>
            <Text>{props.row.actualPeople}</Text>
          </Box>
        </Box>
      ),
    },
    { label: "Line", dataKey: "line" },
    { label: "Line leader", dataKey: "lineLeader" },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "workOrderCode",
      label: "Work Order code",
      type: "text" as const,
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "expectedStartFrom",
      label: "Expected start from",
      type: "date" as const,
    },
    {
      key: "expectedEndTo",
      label: "Expected end to",
      type: "date" as const,
    },
    {
      key: "lineName",
      label: "Line name",
      type: "text" as const,
    },
    {
      key: "lineLeader",
      label: "Line leader",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "tammyn@nulo...", value: "tammyn@nulo..." },
        { label: "saurabha@nul...", value: "saurabha@nul..." },
      ],
    },
    {
      key: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { label: "Stopped", value: "Stopped" },
        { label: "Running", value: "Running" },
        { label: "Completed", value: "Completed" },
        { label: "All", value: "All" },
      ],
    },
    {
      key: "hasProduction",
      label: "Has production",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      key: "reconciliationStatus",
      label: "Reconciliation status",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Reconciled", value: "Reconciled" },
        { label: "Pending", value: "Pending" },
        { label: "Not Required", value: "Not Required" },
      ],
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Jobs" subtitle="Nulogy Site" />}
      >
        <Flex
          gap="x2"
          px="x1"
          pb="x2"
          justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {/* Bulk Actions - Left Side */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
              <IconicButton icon="print" tooltip="Print Docket" onClick={handleBulkPrintDocket}>
                Print Docket
              </IconicButton>
              <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDelete}>
                Delete
              </IconicButton>
            </Flex>
          )}

          {/* Regular Actions - Right Side */}
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="getApp" tooltip="Import (CSV)">
              Import (CSV)
            </IconicButton>
            <IconicButton icon="publish" tooltip="Export (CSV)">
              Export (CSV)
            </IconicButton>
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

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
          overlay={false}
          closeOnOutsideClick={false}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const Customers = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // Closed by default
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    name: "",
    code: "",
    description: "",
    inactive: "All",
  });

  const [tableData, setTableData] = useState([
    {
      id: "1",
      name: "XYZ Manufacturing Corp",
      code: "123",
      description: "--",
      inactive: "No",
    },
    {
      id: "2",
      name: "ABC Industries Ltd",
      code: "456",
      description: "--",
      inactive: "Yes",
    },
    {
      id: "3",
      name: "Global Supply Solutions",
      code: "789",
      description: "Primary packaging supplier",
      inactive: "No",
    },
    {
      id: "4",
      name: "Metro Food Distributors",
      code: "101",
      description: "Regional food distribution partner",
      inactive: "No",
    },
    {
      id: "5",
      name: "Pacific Manufacturing Co",
      code: "202",
      description: "--",
      inactive: "Yes",
    },
    {
      id: "6",
      name: "Eastern Logistics Group",
      code: "303",
      description: "Transportation and logistics services",
      inactive: "No",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create customer clicked");
  };

  const tableColumns = [
    {
      label: "Name",
      dataKey: "name",
      cellFormatter: (props) => (
        <Link href={`#/customers/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Code",
      dataKey: "code",
      cellFormatter: (props) => (
        <Link href={`#/customers/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Description", dataKey: "description" },
    { label: "Inactive", dataKey: "inactive" },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "name",
      label: "Name",
      type: "text" as const,
    },
    {
      key: "code",
      label: "Code",
      type: "text" as const,
    },
    {
      key: "description",
      label: "Description",
      type: "text" as const,
    },
    {
      key: "inactive",
      label: "Inactive",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" },
      ],
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Customers" subtitle="Nulogy Site" />}
      >
        <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
          {/* Regular Actions - Right Side */}
          <IconicButton icon="add" tooltip="Create Customer" onClick={handleCreateNewClick}>
            Create Customer
          </IconicButton>
          <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
            Filter
          </IconicButton>
          <VerticalDivider />
          <IconicButton icon="getApp" tooltip="Import (CSV)">
            Import (CSV)
          </IconicButton>
          <IconicButton icon="publish" tooltip="Export (CSV)">
            Export (CSV)
          </IconicButton>
        </Flex>

        <Table columns={tableColumns} rows={paginatedData} keyField="id" compact />

        <Divider />

        <Pagination
          justifyContent="flex-end"
          currentPage={currentPage}
          totalPages={Math.ceil(tableData.length / rowsPerPage)}
          onSelectPage={handlePageSelect}
        />

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const WorkOrderPicking = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;

  const [pickListData, setPickListData] = useState([
    {
      id: "31374",
      pickListNumber: "31374",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "31375",
      pickListNumber: "31375",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "31378",
      pickListNumber: "31378",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "31391",
      pickListNumber: "31391",
      destination: "SL_1",
      status: "Cancelled",
    },
    {
      id: "31407",
      pickListNumber: "31407",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "31995",
      pickListNumber: "31995",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "31999",
      pickListNumber: "31999",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "32004",
      pickListNumber: "32004",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "32287",
      pickListNumber: "32287",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "32810",
      pickListNumber: "32810",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "32811",
      pickListNumber: "32811",
      destination: "Line_1",
      status: "Cancelled",
    },
    {
      id: "32913",
      pickListNumber: "32913",
      destination: "Line_1",
      status: "In-Progress",
    },
    {
      id: "32914",
      pickListNumber: "32914",
      destination: "Line_2",
      status: "Pending",
    },
  ]);

  const handleCreatePickList = () => {
    toast.success("Create pick list clicked");
  };

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleCancel = (pickList) => {
    toast.success(`Cancelled pick list ${pickList.pickListNumber}`);
    setPickListData((prevData) =>
      prevData.map((item) => (item.id === pickList.id ? { ...item, status: "Cancelled" } : item))
    );
  };

  const handleMarkReady = (pickList) => {
    toast.success(`Marked pick list ${pickList.pickListNumber} as ready to pick`);
    setPickListData((prevData) =>
      prevData.map((item) => (item.id === pickList.id ? { ...item, status: "Ready" } : item))
    );
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const pickListColumns = [
    {
      label: "Pick List #",
      dataKey: "pickListNumber",
      cellFormatter: (props) => (
        <Link href={`#/pick-lists/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Destination", dataKey: "destination" },
    { label: "Status", dataKey: "status" },
    {
      dataKey: "markReady",
      width: "40px",
      cellFormatter: (props) => {
        return props.row.status === "Pending" ? (
          <IconicButton icon="check" tooltip="Mark as ready to pick" onClick={() => handleMarkReady(props.row)} />
        ) : null;
      },
    },
    {
      dataKey: "cancel",
      width: "40px",
      cellFormatter: (props) => {
        return props.row.status === "In-Progress" || props.row.status === "Pending" ? (
          <IconicButton icon="close" tooltip="Cancel" onClick={() => handleCancel(props.row)} />
        ) : null;
      },
    },
  ];

  const paginatedData = pickListData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const workOrderBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#/work-orders">Work orders</Link>
      <Link href="#/work-orders/194258">Work order #194258</Link>
    </Breadcrumbs>
  );

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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        breadcrumbs={workOrderBreadcrumbs}
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => workOrderBreadcrumbs}
            title="Manage Picking for Work Order #194258 - WO-Nov"
          />
        )}
      >
        {/* Work Order Details */}
        <Box mb="x3">
          <DescriptionList columns={{ small: 2, medium: 3, large: 6 }}>
            <DescriptionGroup>
              <DescriptionTerm>Start:</DescriptionTerm>
              <DescriptionDetails>2024-Nov-22</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>End:</DescriptionTerm>
              <DescriptionDetails>2024-Dec-06</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Finished Good:</DescriptionTerm>
              <DescriptionDetails>FG-Nov</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer:</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#/customers/sample-customer-7" underline={false}>
                  Sample Customer 7
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Expected Production:</DescriptionTerm>
              <DescriptionDetails>500.0 ea</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Remaining Production:</DescriptionTerm>
              <DescriptionDetails>500.0 ea</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>

        {/* Tabs */}
        <Tabs defaultSelectedIndex={1}>
          <Tab label="Reservations">
            <Box py="x3">
              <Text>Reservations content would go here</Text>
            </Box>
          </Tab>
          <Tab label="Pick Lists">
            <Box py="x3">
              {/* Action Bar - No bulk actions, so always right-aligned */}
              <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
                <Button onClick={handleCreatePickList}>+ Create Pick List</Button>
              </Flex>

              <Table
                columns={pickListColumns}
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
                totalPages={Math.ceil(pickListData.length / rowsPerPage)}
                onSelectPage={handlePageSelect}
              />
            </Box>
          </Tab>
          <Tab label="Assigned Inventory">
            <Box py="x3">
              <Text>Assigned Inventory content would go here</Text>
            </Box>
          </Tab>
        </Tabs>
      </Page>
    </ApplicationFrame>
  );
};

export const ItemLocator = () => {
  const [selectedItemsToLocate, setSelectedItemsToLocate] = useState([]);
  const [selectedLocationResults, setSelectedLocationResults] = useState([]);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [hasSearched, setHasSearched] = useState(false);
  const [filters, setFilters] = useState({
    locationName: "",
    workOrderId: "",
    customerName: "",
    locationCode: "",
    workOrderCode: "",
    itemCode: "",
    palletNumber: "",
    itemCategory: "",
    lotCode: "",
    palletInTransit: "All",
    itemType: "",
    expiryDate: null,
    inventoryStatus: "All",
    sortOrder: "Location Name",
    itemFamily: "",
    inventoryCategory: "All",
    vendorName: "",
    inventoryHolds: "All Inventory",
  });

  const [itemsToLocateData, setItemsToLocateData] = useState([]);

  const [locationResultsData, setLocationResultsData] = useState([
    {
      id: "1",
      location: "Door 8",
      pallet: "10011",
      item: "123",
      itemDescription: "Strawberry Fruit Bar",
      lot: "--",
      expiry: "--",
      status: "Available",
      casesQty: "5.00 cs",
      baseQty: "100.00 ea",
    },
    {
      id: "2",
      location: "Door 8",
      pallet: "23424",
      item: "123",
      itemDescription: "Strawberry Fruit Bar",
      lot: "--",
      expiry: "--",
      status: "Available",
      casesQty: "50.00 cs",
      baseQty: "1000.00 ea",
    },
    {
      id: "3",
      location: "Door 8",
      pallet: "34312423",
      item: "123",
      itemDescription: "Strawberry Fruit Bar",
      lot: "--",
      expiry: "--",
      status: "Available",
      casesQty: "2.50 cs",
      baseQty: "50.00 ea",
    },
    {
      id: "4",
      location: "Floor 2",
      pallet: "0355",
      item: "123",
      itemDescription: "Strawberry Fruit Bar",
      lot: "LotA1",
      expiry: "01/11/2025",
      status: "Available",
      casesQty: "0.75 cs",
      baseQty: "15.00 ea",
    },
    {
      id: "5",
      location: "Line_1",
      pallet: "73648733",
      item: "123",
      itemDescription: "Strawberry Fruit Bar",
      lot: "123",
      expiry: "1234",
      status: "Available",
      casesQty: "4.00 cs",
      baseQty: "80.00 ea",
    },
  ]);

  const handleClearItemCart = () => {
    toast.success("Item cart cleared");
    setItemsToLocateData([]);
  };

  const handleViewItemCart = () => {
    toast.success("View item cart clicked");
  };

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handleItemsToLocateSelectionChange = (selectedRows) => {
    setSelectedItemsToLocate(selectedRows);
  };

  const handleLocationResultsSelectionChange = (selectedRows) => {
    setSelectedLocationResults(selectedRows);
  };

  const handleBulkDeleteItemsToLocate = () => {
    toast.success(`Deleted ${selectedItemsToLocate.length} items`);
    setItemsToLocateData((prevData) =>
      prevData.filter((row) => !selectedItemsToLocate.some((selected) => selected.id === row.id))
    );
    setSelectedItemsToLocate([]);
  };

  const handleEditLocation = (location) => {
    toast.success(`Edit location ${location.location} - ${location.pallet}`);
  };

  const handleAddPalletToCart = (location) => {
    toast.success(`Added pallet ${location.pallet} to item cart`);
  };

  const handleAddQuantityToCart = (location) => {
    toast.success(`Added quantity from ${location.pallet} to item cart`);
  };

  const handleRemoveFromCart = (location) => {
    toast.success(`Removed ${location.pallet} from item cart`);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const itemsToLocateColumns = [
    { label: "Item", dataKey: "item" },
    { label: "Item Description", dataKey: "itemDescription" },
    { label: "Full Plts Req'd", dataKey: "fullPltsReqd" },
    { label: "Cases Req'd", dataKey: "casesReqd" },
    { label: "Full Plts Sel'd", dataKey: "fullPltsSeld" },
    { label: "Cases Sel'd", dataKey: "casesSeld" },
    { label: "Full Plts Rem.", dataKey: "fullPltsRem" },
    { label: "Cases Rem.", dataKey: "casesRem" },
  ];

  const locationResultsColumns = [
    { label: "Location", dataKey: "location" },
    { label: "Pallet", dataKey: "pallet" },
    {
      label: "Item",
      dataKey: "item",
      cellFormatter: (props) => (
        <Link href={`#/items/${props.row.item}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Item Description", dataKey: "itemDescription" },
    { label: "Lot", dataKey: "lot" },
    { label: "Expiry", dataKey: "expiry" },
    { label: "Status", dataKey: "status" },
    { label: "Cases Qty", dataKey: "casesQty" },
    { label: "Base Qty", dataKey: "baseQty" },
    {
      dataKey: "edit",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton icon="edit" tooltip="Edit" onClick={() => handleEditLocation(props.row)} />
      ),
    },
    {
      dataKey: "addPallet",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton icon="add" tooltip="Add pallet to item cart" onClick={() => handleAddPalletToCart(props.row)} />
      ),
    },
    {
      dataKey: "addQuantity",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton
          icon="add"
          tooltip="Add quantity to item cart"
          onClick={() => handleAddQuantityToCart(props.row)}
        />
      ),
    },
    {
      dataKey: "remove",
      width: "40px",
      cellFormatter: (props) => (
        <IconicButton
          icon="delete"
          tooltip="Remove item from item cart"
          onClick={() => handleRemoveFromCart(props.row)}
        />
      ),
    },
  ];

  const paginatedLocationResults = locationResultsData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const filterFields = [
    {
      key: "locationName",
      label: "Location name",
      type: "text" as const,
    },
    {
      key: "workOrderId",
      label: "Work Order ID",
      type: "text" as const,
    },
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "locationCode",
      label: "Location code",
      type: "text" as const,
    },
    {
      key: "workOrderCode",
      label: "Work Order code",
      type: "text" as const,
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
    {
      key: "palletNumber",
      label: "Pallet number",
      type: "text" as const,
    },
    {
      key: "itemCategory",
      label: "Item category",
      type: "text" as const,
    },
    {
      key: "lotCode",
      label: "Lot code",
      type: "text" as const,
    },
    {
      key: "palletInTransit",
      label: "Pallet in transit",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
      ],
    },
    {
      key: "itemType",
      label: "Item type",
      type: "text" as const,
    },
    {
      key: "expiryDate",
      label: "Expiry date",
      type: "date" as const,
    },
    {
      key: "inventoryStatus",
      label: "Inventory Status",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Available", value: "Available" },
        { label: "Reserved", value: "Reserved" },
      ],
    },
    {
      key: "sortOrder",
      label: "Sort Order",
      type: "select" as const,
      options: [
        { label: "Location Name", value: "Location Name" },
        { label: "Item Code", value: "Item Code" },
        { label: "Expiry Date", value: "Expiry Date" },
      ],
    },
    {
      key: "itemFamily",
      label: "Item family",
      type: "text" as const,
    },
    {
      key: "inventoryCategory",
      label: "Inventory Category",
      type: "select" as const,
      options: [
        { label: "All", value: "All" },
        { label: "Raw Materials", value: "Raw Materials" },
        { label: "Finished Goods", value: "Finished Goods" },
      ],
    },
    {
      key: "vendorName",
      label: "Vendor name",
      type: "text" as const,
    },
    {
      key: "inventoryHolds",
      label: "Inventory Holds",
      type: "select" as const,
      options: [
        { label: "All Inventory", value: "All Inventory" },
        { label: "No Holds", value: "No Holds" },
        { label: "With Holds", value: "With Holds" },
      ],
    },
  ];

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setIsFilterSidebarOpen(false);
    setHasSearched(true);
    toast.success("Search completed with filters");
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
            title="Item Locator"
            subtitle="Nulogy Site"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="close" tooltip="Clear Item Cart" onClick={handleClearItemCart}>
                  Clear Item Cart
                </IconicButton>
                <IconicButton icon="visibility" tooltip="View Item Cart" onClick={handleViewItemCart}>
                  View Item Cart
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        {/* Items to Locate Section */}
        <Box mb="x4">
          <Heading3 mb="x2">Items to Locate</Heading3>

          <Flex
            gap="x2"
            px="x1"
            pb="x2"
            justifyContent={selectedItemsToLocate.length > 0 ? "space-between" : "flex-end"}
            alignItems="center"
          >
            {/* Bulk Actions - Left Side */}
            {selectedItemsToLocate.length > 0 && (
              <Flex gap="x2" alignItems="center">
                <Text mr="x2" color="darkGrey">
                  {selectedItemsToLocate.length} selected
                </Text>
                <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDeleteItemsToLocate}>
                  Delete
                </IconicButton>
              </Flex>
            )}

            {/* Regular Actions - Right Side */}
            <Flex gap="x2" alignItems="center">
              <IconicButton icon="getApp" tooltip="Quick Pallet Pick...">
                Quick Pallet Pick...
              </IconicButton>
              <IconicButton icon="publish" tooltip="Export (Excel)">
                Export (Excel)
              </IconicButton>
              <IconicButton icon="add" tooltip="Add Item...">
                Add Item...
              </IconicButton>
              <IconicButton icon="delete" tooltip="Delete">
                Delete
              </IconicButton>
            </Flex>
          </Flex>

          <Table
            columns={itemsToLocateColumns}
            rows={itemsToLocateData}
            hasSelectableRows
            keyField="id"
            onRowSelectionChange={handleItemsToLocateSelectionChange}
            compact
            noRowsContent="No items to locate"
          />
        </Box>

        {/* Locate Items Section */}
        <Box>
          <Heading3 mb="x2">Locate Items</Heading3>

          {/* Action Bar */}
          <Flex gap="x2" px="x1" pb="x2" justifyContent="space-between" alignItems="center">
            <Flex gap="x2" alignItems="center">
              <IconicButton icon="add" tooltip="Create Move...">
                Create Move...
              </IconicButton>
              <IconicButton icon="add" tooltip="Add to Shipment...">
                Add to Shipment...
              </IconicButton>
            </Flex>

            <Flex gap="x2" alignItems="center">
              <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
                Filter
              </IconicButton>
            </Flex>
          </Flex>

          {/* Location Results */}
          <Heading3 mb="x2">Location Results</Heading3>

          {hasSearched ? (
            <>
              {/* Location Results Action Bar */}
              <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
                <IconicButton icon="add" tooltip="Assign pallets...">
                  Assign pallets...
                </IconicButton>
                <IconicButton icon="edit" tooltip="Adjust inventory">
                  Adjust inventory
                </IconicButton>
                <IconicButton icon="refresh" tooltip="Change Status...">
                  Change Status...
                </IconicButton>
                <IconicButton icon="print" tooltip="Print Pallet Tags">
                  Print Pallet Tags
                </IconicButton>
                <IconicButton icon="publish" tooltip="Export">
                  Export
                </IconicButton>
              </Flex>

              <Table
                columns={locationResultsColumns}
                rows={paginatedLocationResults}
                hasSelectableRows
                keyField="id"
                onRowSelectionChange={handleLocationResultsSelectionChange}
                compact
              />

              <Divider />

              <Pagination
                justifyContent="flex-end"
                currentPage={currentPage}
                totalPages={Math.ceil(locationResultsData.length / rowsPerPage)}
                onSelectPage={handlePageSelect}
              />
            </>
          ) : (
            <Box py="x4" textAlign="center">
              <Text color="darkGrey">Please apply filters to search for items.</Text>
            </Box>
          )}
        </Box>

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />
      </Page>
    </ApplicationFrame>
  );
};

export const ShipOrdersV3 = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false); // Closed by default
  const [selectedRows, setSelectedRows] = useState([]); // Track selected rows
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    customerName: "",
    shipped: "No", // Default to "No" as shown in image
    shipTo: "",
    expectedShipDateFrom: null,
    expectedShipDateTo: null,
    referenceNumber: "",
    itemCode: "",
  });

  const [tableData, setTableData] = useState([
    {
      id: "59192",
      code: "59192",
      customer: "FRITO LAY",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "53633",
      code: "aasa",
      customer: "Colgate-Palmolive",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "18117",
      code: "18117",
      customer: "CPG",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "--",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "57415",
      code: "CP001",
      customer: "Colgate-Palmolive",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2025-Jan-09 08:51",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "18758",
      code: "AB-InDC",
      customer: "CAB",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2022-Apr-08 02:10",
      reference: "--",
      shipments: "1",
      notes: "--",
    },
    {
      id: "18053",
      code: "18053",
      customer: "CAB",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2021-Sep-14 02:01",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "18052",
      code: "18052",
      customer: "CAB",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2021-Sep-14 02:01",
      reference: "--",
      shipments: "0",
      notes: "--",
    },
    {
      id: "12182",
      code: "999",
      customer: "Sunshine Fruit Co.",
      shipped: "No",
      shipTo: "DHL Mississauga",
      expectedShip: "2017-Dec-22 04:04",
      reference: "--",
      shipments: "3",
      notes: "--",
    },
  ]);

  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create ship order clicked");
  };

  // Bulk action handlers
  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
    console.log("Selected rows:", selectedRows);
  };

  const handleBulkPrintShipOrderSheets = () => {
    toast.success(`Print ship order sheets initiated for ${selectedRows.length} ship orders`);
    setSelectedRows([]); // Clear selection after action
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedRows.length} ship orders`);
    // Remove selected ship orders from table data
    setTableData((prevData) => prevData.filter((row) => !selectedRows.some((selected) => selected.id === row.id)));
    setSelectedRows([]); // Clear selection after action
  };

  const tableColumns = [
    {
      label: "ID",
      dataKey: "id",
      cellFormatter: (props) => (
        <Link href={`#/ship-orders/${props.row.id}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Code", dataKey: "code" },
    {
      label: "Customer",
      dataKey: "customer",
      cellFormatter: (props) => (
        <Link href={`#/customers/${props.row.customer}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Shipped", dataKey: "shipped" },
    {
      label: "Ship to",
      dataKey: "shipTo",
      cellFormatter: (props) => (
        <Link href={`#/ship-to/${props.row.shipTo}`} underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Expected ship", dataKey: "expectedShip" },
    { label: "Reference", dataKey: "reference" },
    { label: "Shipments", dataKey: "shipments", align: "center" as const },
    { label: "Notes", dataKey: "notes" },
  ];

  const paginatedData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const filterFields = [
    {
      key: "customerName",
      label: "Customer name",
      type: "text" as const,
    },
    {
      key: "shipped",
      label: "Shipped",
      type: "select" as const,
      options: [
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" },
        { label: "All", value: "All" },
      ],
    },
    {
      key: "shipTo",
      label: "Ship to",
      type: "text" as const,
    },
    {
      key: "expectedShipDateFrom",
      label: "Expected ship date from",
      type: "date" as const,
    },
    {
      key: "expectedShipDateTo",
      label: "Expected ship date to",
      type: "date" as const,
    },
    {
      key: "referenceNumber",
      label: "Reference number",
      type: "text" as const,
    },
    {
      key: "itemCode",
      label: "Item code",
      type: "text" as const,
    },
  ];

  const handleFilterApply = (newFilters) => {
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
            },
          }}
          primaryNavigation={[
            {
              key: "company",
              label: "Company",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "operations",
              label: "Operations",
              type: "link" as const,
              props: { href: "#" },
            },
            {
              key: "reports",
              label: "Reports",
              type: "link" as const,
              props: { href: "#" },
            },
          ]}
          secondaryNavigation={[
            {
              key: "create",
              label: "Create",
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
        renderHeader={() => <Header renderBreadcrumbs={() => breadcrumbs} title="Ship orders" subtitle="Nulogy Site" />}
      >
        <Flex
          gap="x2"
          px="x1"
          pb="x2"
          justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
          alignItems="center"
        >
          {/* Bulk Actions - Left Side (with selection count) */}
          {selectedRows.length > 0 && (
            <Flex gap="x2" alignItems="center">
              <Text mr="x2" color="darkGrey">
                {selectedRows.length} selected
              </Text>
            </Flex>
          )}

          {/* Actions - Right Side (bulk actions replace regular actions when rows selected) */}
          <Flex gap="x2" alignItems="center">
            {selectedRows.length > 0 ? (
              <>
                {/* Bulk actions replace primary actions */}
                <IconicButton icon="print" tooltip="Print ship order sheets" onClick={handleBulkPrintShipOrderSheets}>
                  Print ship order sheets
                </IconicButton>
                <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDelete}>
                  Delete
                </IconicButton>
              </>
            ) : (
              <>
                {/* Regular table actions when no selection */}
                <IconicButton icon="add" tooltip="Create ship order" onClick={handleCreateNewClick}>
                  Create ship order
                </IconicButton>
                <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterClick}>
                  Filter
                </IconicButton>
                <VerticalDivider />
                <IconicButton icon="getApp" tooltip="Import (CSV)">
                  Import (CSV)
                </IconicButton>
                <IconicButton icon="publish" tooltip="Export (CSV)">
                  Export (CSV)
                </IconicButton>
              </>
            )}
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

        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={() => setIsFilterSidebarOpen(false)}
          onApply={handleFilterApply}
          fields={filterFields}
          initialFilters={filters}
        />
      </Page>
    </ApplicationFrame>
  );
};
