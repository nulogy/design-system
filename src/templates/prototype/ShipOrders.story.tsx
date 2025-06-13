import React, { useState } from "react";
import { Meta } from "@storybook/react";
import {
  ApplicationFrame,
  Navigation,
  Page,
  Header,
  Breadcrumbs,
  Link,
  Table,
  Flex,
  IconicButton,
  Text,
  Box,
  Divider,
  Pagination,
  VerticalDivider,
  ToastContainer,
  toast,
  Heading2,
  Heading3,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Sidebar,
  Form,
  FormSection,
  FieldLabel,
  Input,
  Select,
  DatePicker,
  Textarea,
  PrimaryButton,
  QuietButton,
} from "../../index";
import FilterSidebar from "../builder/FilterSidebar";
import DeleteModal from "../builder/DeleteModal";

const meta: Meta = {
  title: "Templates/Prototype/Ship Orders",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const IndexToRecordFlow = () => {
  const [currentView, setCurrentView] = useState<"index" | "record">("index");
  const [selectedShipOrderId, setSelectedShipOrderId] = useState<string>("59192");

  // Index page states
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 25;
  const [filters, setFilters] = useState({
    customerName: "",
    shipped: "No",
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

  // Record page states
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAttachmentSidebarOpen, setIsAttachmentSidebarOpen] = useState(false);
  const [isCreateShipmentSidebarOpen, setIsCreateShipmentSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [shipments, setShipments] = useState([
    {
      id: "22770",
      shipmentId: "Shipment 22770",
      consignee: "CHS. Mississauga",
      shipped: "No",
      actualShip: "—",
    },
  ]);
  const [attachments, setAttachments] = useState([
    {
      id: "1",
      filename: "test 1.png",
      uploadedDate: "2025-Jun-19 12:16 PM",
      description: "test",
    },
  ]);

  // Navigation functions
  const handleRowClick = (shipOrderId: string) => {
    setSelectedShipOrderId(shipOrderId);
    setCurrentView("record");
  };

  const handleBackToIndex = () => {
    setCurrentView("index");
  };

  // Index page handlers
  const handleFilterClick = () => {
    setIsFilterSidebarOpen(true);
  };

  const handlePageSelect = (page) => {
    setCurrentPage(page);
  };

  const handleCreateNewClick = () => {
    toast.success("Create ship order clicked");
  };

  const handleRowSelectionChange = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const handleBulkPrintShipOrderSheets = () => {
    toast.success(`Print ship order sheets initiated for ${selectedRows.length} ship orders`);
    setSelectedRows([]);
  };

  const handleBulkDelete = () => {
    toast.success(`Deleted ${selectedRows.length} ship orders`);
    setTableData((prevData) => prevData.filter((row) => !selectedRows.some((selected) => selected.id === row.id)));
    setSelectedRows([]);
  };

  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
    setIsFilterSidebarOpen(false);
    toast.success("Filters applied successfully");
  };

  // Record page handlers
  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSaveChanges = () => {
    toast.success("Ship Order Information updated successfully");
    setIsSidebarOpen(false);
  };

  const handleAttachFileClick = () => {
    setIsAttachmentSidebarOpen(true);
  };

  const handleCloseAttachmentSidebar = () => {
    setIsAttachmentSidebarOpen(false);
  };

  const handleSaveAttachment = () => {
    const newAttachmentId = Math.max(...attachments.map((a) => parseInt(a.id))) + 1;
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const newAttachment = {
      id: newAttachmentId.toString(),
      filename: "new-attachment.pdf",
      uploadedDate: currentDate,
      description: "New attachment",
    };

    setAttachments((prev) => [...prev, newAttachment]);
    toast.success("File attached successfully");
    setIsAttachmentSidebarOpen(false);
  };

  const handleRemoveAttachment = (attachment) => {
    setSelectedAttachment(attachment);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAttachment(null);
  };

  const handleConfirmDelete = () => {
    if (selectedAttachment) {
      setAttachments((prev) => prev.filter((attachment) => attachment.id !== selectedAttachment.id));
      handleCloseDeleteModal();
      toast.success(`${selectedAttachment.filename} removed successfully`);
    }
  };

  const handleCreateShipmentClick = () => {
    setIsCreateShipmentSidebarOpen(true);
  };

  const handleCloseCreateShipmentSidebar = () => {
    setIsCreateShipmentSidebarOpen(false);
  };

  const handleSaveCreateShipment = () => {
    const newShipmentNumber = Math.max(...shipments.map((s) => parseInt(s.id))) + 1;
    const newShipment = {
      id: newShipmentNumber.toString(),
      shipmentId: `Shipment ${newShipmentNumber}`,
      consignee: "DHL Mississauga",
      shipped: "No",
      actualShip: "—",
    };

    setShipments((prev) => [...prev, newShipment]);
    toast.success("Shipment created successfully");
    setIsCreateShipmentSidebarOpen(false);
  };

  // Get selected ship order data
  const selectedShipOrder = tableData.find((order) => order.id === selectedShipOrderId);

  // Breadcrumbs
  const indexBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#" underline={false}>
        Home
      </Link>
      <Link href="#" underline={false}>
        Operations
      </Link>
    </Breadcrumbs>
  );

  const recordBreadcrumbs = (
    <Breadcrumbs>
      <Link href="#" underline={false}>
        Home
      </Link>
      <Link href="#" underline={false}>
        Operations
      </Link>
      <Link href="#" underline={false} onClick={handleBackToIndex}>
        Ship Orders
      </Link>
    </Breadcrumbs>
  );

  // Table columns for index
  const tableColumns = [
    {
      label: "ID",
      dataKey: "id",
      cellFormatter: (props) => (
        <Link href="#" underline={false} onClick={() => handleRowClick(props.row.id)}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Code",
      dataKey: "code",
      cellFormatter: (props) => (
        <Link href="#" underline={false} onClick={() => handleRowClick(props.row.id)}>
          {props.cellData}
        </Link>
      ),
    },
    {
      label: "Customer",
      dataKey: "customer",
      cellFormatter: (props) => (
        <Link href="#" underline={false}>
          {props.cellData}
        </Link>
      ),
    },
    { label: "Shipped", dataKey: "shipped" },
    {
      label: "Ship to",
      dataKey: "shipTo",
      cellFormatter: (props) => (
        <Link href="#" underline={false}>
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

  // Render index view
  if (currentView === "index") {
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
          breadcrumbs={indexBreadcrumbs}
          renderHeader={() => (
            <Header renderBreadcrumbs={() => indexBreadcrumbs} title="Ship orders" subtitle="Nulogy Site" />
          )}
        >
          <Flex
            gap="x2"
            px="x1"
            pb="x2"
            justifyContent={selectedRows.length > 0 ? "space-between" : "flex-end"}
            alignItems="center"
          >
            {selectedRows.length > 0 && (
              <Flex gap="x2" alignItems="center">
                <Text mr="x2" color="darkGrey">
                  {selectedRows.length} selected
                </Text>
              </Flex>
            )}

            <Flex gap="x2" alignItems="center">
              {selectedRows.length > 0 ? (
                <>
                  <IconicButton icon="print" tooltip="Print ship order sheets" onClick={handleBulkPrintShipOrderSheets}>
                    Print ship order sheets
                  </IconicButton>
                  <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDelete}>
                    Delete
                  </IconicButton>
                </>
              ) : (
                <>
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
  }

  // Render record view
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
              key: "operations",
              label: "Operations",
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
        breadcrumbs={recordBreadcrumbs}
        title={`Ship Order #${selectedShipOrderId}`}
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => recordBreadcrumbs}
            title={`Ship Order #${selectedShipOrderId}`}
            subtitle="Nulogy Site"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="publish" tooltip="Print Ship Order Sheet">
                  Print Ship Order Sheet
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        {/* Ship Order Information Section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Ship Order Information</Heading2>
            <IconicButton icon="edit" onClick={handleEditClick}>
              Edit Ship Order Information
            </IconicButton>
          </Flex>
          <DescriptionList columns={{ small: 2, medium: 3, large: 4 }}>
            <DescriptionGroup>
              <DescriptionTerm>Shipped</DescriptionTerm>
              <DescriptionDetails>{selectedShipOrder?.shipped || "No"}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Shipped At</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Code</DescriptionTerm>
              <DescriptionDetails>{selectedShipOrder?.code || selectedShipOrderId}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#" underline={false}>
                  {selectedShipOrder?.customer || "FRITO LAY"}
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Restrict Associated</DescriptionTerm>
              <DescriptionDetails>No</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Shipment Items to Assigned Pallets</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Case tracking</DescriptionTerm>
              <DescriptionDetails>Yes</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Ship to</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#" underline={false}>
                  {selectedShipOrder?.shipTo || "DHL Mississauga"}
                </Link>
                <br />
                5671 Rolls drive
                <br />
                Mississauga, Ontario
                <br />
                M6C0A2
                <br />
                CA
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Facility Number</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Carrier</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#" underline={false}>
                  U HAUL LOGISTICS
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Date</DescriptionTerm>
              <DescriptionDetails>2025-Jun-04</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Expected ship date</DescriptionTerm>
              <DescriptionDetails>{selectedShipOrder?.expectedShip || "—"}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Reference number</DescriptionTerm>
              <DescriptionDetails>{selectedShipOrder?.reference || "—"}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Notes</DescriptionTerm>
              <DescriptionDetails>{selectedShipOrder?.notes || "—"}</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>

          {/* Custom Fields Subsection */}
          <Box mt="x4">
            <Heading3 mb="x2">Custom Fields</Heading3>
            <DescriptionList columns={{ small: 2, medium: 3, large: 4 }}>
              <DescriptionGroup>
                <DescriptionTerm>custom so f1</DescriptionTerm>
                <DescriptionDetails>—</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>custom so f2</DescriptionTerm>
                <DescriptionDetails>—</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>custom so f3</DescriptionTerm>
                <DescriptionDetails>—</DescriptionDetails>
              </DescriptionGroup>
            </DescriptionList>
          </Box>
        </Box>

        {/* Order Details Section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Order Details</Heading2>
            <Flex gap="x2" alignItems="center">
              <IconicButton icon="edit">Manage Packing</IconicButton>
              <IconicButton icon="search">Locate Selected Items</IconicButton>
            </Flex>
          </Flex>

          {/* Notification Message */}
          <Box mb="x3" p="x2" backgroundColor="lightBlue" borderRadius="medium">
            <Text>
              ⓘ Modifications to order details are not available because this Ship Order is using case tracking and
              items have been added to Shipment 22770
            </Text>
          </Box>

          <Table
            rows={[
              {
                id: "1",
                poNo: "1",
                item: "1254",
                description: "Strawberry Fruit Bar",
                expectedQty: "10.00000",
                unit: "ea",
                addedQty: "0.00000",
                actualQty: "0.00000",
              },
              {
                id: "2",
                poNo: "2",
                item: "123456",
                description: "Bananas, Orange bundie",
                expectedQty: "5.00000",
                unit: "ea",
                addedQty: "5.00000",
                actualQty: "0.00000",
              },
            ]}
            columns={[
              {
                label: "PO No",
                dataKey: "poNo",
              },
              {
                label: "Item",
                dataKey: "item",
                cellRenderer: ({ cellData }) => (
                  <Link href="#" underline={false}>
                    {cellData}
                  </Link>
                ),
              },
              {
                label: "Description",
                dataKey: "description",
              },
              {
                label: "Expected Qty",
                dataKey: "expectedQty",
              },
              {
                label: "Unit",
                dataKey: "unit",
              },
              {
                label: "Added Qty",
                dataKey: "addedQty",
              },
              {
                label: "Actual Qty",
                dataKey: "actualQty",
              },
            ]}
          />
        </Box>

        {/* Shipments Section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Shipments</Heading2>
            <IconicButton icon="add" onClick={handleCreateShipmentClick}>
              Create Shipment
            </IconicButton>
          </Flex>

          <Table
            rows={shipments}
            columns={[
              {
                label: "ID",
                dataKey: "shipmentId",
                cellRenderer: ({ cellData }) => (
                  <Link href="#" underline={false}>
                    {cellData}
                  </Link>
                ),
              },
              {
                label: "Consignee",
                dataKey: "consignee",
                cellRenderer: ({ cellData }) => (
                  <Link href="#" underline={false}>
                    {cellData}
                  </Link>
                ),
              },
              {
                label: "Shipped?",
                dataKey: "shipped",
              },
              {
                label: "Actual Ship",
                dataKey: "actualShip",
              },
            ]}
          />
        </Box>

        {/* Attachments Section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Attachments</Heading2>
            <IconicButton icon="add" onClick={handleAttachFileClick}>
              Attach File
            </IconicButton>
          </Flex>

          <Table
            rows={attachments}
            columns={[
              {
                label: "Filename",
                dataKey: "filename",
                cellRenderer: ({ cellData }) => (
                  <Link href="#" underline={false}>
                    {cellData}
                  </Link>
                ),
              },
              {
                label: "Uploaded Date",
                dataKey: "uploadedDate",
              },
              {
                label: "Description",
                dataKey: "description",
              },
              {
                label: "Actions",
                dataKey: "actions",
                cellRenderer: ({ row }) => (
                  <IconicButton icon="delete" onClick={() => handleRemoveAttachment(row)}>
                    Remove
                  </IconicButton>
                ),
              },
            ]}
          />
        </Box>
      </Page>

      {/* Edit Ship Order Information Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit Ship Order Information"
        helpText={`Ship Order #${selectedShipOrderId}`}
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
              <FieldLabel labelText="Shipped">
                <Select
                  options={[
                    { value: "no", label: "No" },
                    { value: "yes", label: "Yes" },
                  ]}
                  value="no"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Shipped At">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Code">
                <Input value={selectedShipOrder?.code || selectedShipOrderId} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Customer">
                <Select
                  options={[
                    { value: "frito-lay", label: "FRITO LAY" },
                    { value: "colgate", label: "Colgate-Palmolive" },
                    { value: "cpg", label: "CPG" },
                    { value: "cab", label: "CAB" },
                    { value: "sunshine", label: "Sunshine Fruit Co." },
                  ]}
                  value="frito-lay"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Reference number">
                <Input placeholder="Enter reference number" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Notes">
                <Textarea placeholder="Enter notes" />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>

      {/* Attach File Sidebar */}
      <Sidebar
        isOpen={isAttachmentSidebarOpen}
        onClose={handleCloseAttachmentSidebar}
        title="Attach File"
        helpText={`Ship Order #${selectedShipOrderId}`}
        footer={
          <Flex justifyContent="flex-start">
            <PrimaryButton onClick={handleSaveAttachment} mr="x2">
              Attach
            </PrimaryButton>
            <QuietButton onClick={handleCloseAttachmentSidebar}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Form>
          <FormSection>
            <Box pb="x3">
              <FieldLabel labelText="Select file">
                <Input type="file" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Description">
                <Textarea placeholder="Enter file description" />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>

      {/* Create Shipment Sidebar */}
      <Sidebar
        isOpen={isCreateShipmentSidebarOpen}
        onClose={handleCloseCreateShipmentSidebar}
        title="Create Shipment"
        helpText={`Ship Order #${selectedShipOrderId}`}
        footer={
          <Flex justifyContent="flex-start">
            <PrimaryButton onClick={handleSaveCreateShipment} mr="x2">
              Create Shipment
            </PrimaryButton>
            <QuietButton onClick={handleCloseCreateShipmentSidebar}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Form>
          <FormSection>
            <Heading3 mb="x2">Shipment Information</Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Ship Order">
                <Input value={`${selectedShipOrderId} - ${selectedShipOrder?.shipTo || "DHL Mississauga"}`} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Customer">
                <Select
                  options={[
                    { value: "frito-lay", label: "FRITO LAY" },
                    { value: "colgate", label: "Colgate-Palmolive" },
                    { value: "cpg", label: "CPG" },
                    { value: "cab", label: "CAB" },
                    { value: "sunshine", label: "Sunshine Fruit Co." },
                  ]}
                  value="frito-lay"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Purchase order number">
                <Input placeholder="Enter purchase order number" />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Remove attachment"
        itemName={selectedAttachment?.filename}
        itemType="attachment"
      />
    </ApplicationFrame>
  );
};
