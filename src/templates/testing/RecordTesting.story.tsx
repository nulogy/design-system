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
  ToastContainer,
  toast,
} from "../../index";
import DeleteModal from "../builder/DeleteModal";

export default {
  title: "Templates/Testing/Record",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
    <Link href="#">Ship orders</Link>
  </Breadcrumbs>
);

export const ShipOrderDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [attachments, setAttachments] = useState([
    {
      id: 1,
      filename: "step 1.png",
      uploadedDate: "2025-Jun-12 12:16 PM",
      description: "test",
    },
  ]);

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSaveChanges = () => {
    handleCloseSidebar();
    toast.success("Ship order information updated successfully");
  };

  const handleDeleteAttachment = (attachment) => {
    setSelectedAttachment(attachment);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedAttachment(null);
  };

  const handleConfirmDelete = () => {
    if (selectedAttachment) {
      setAttachments((prevAttachments) => 
        prevAttachments.filter((attachment) => attachment.id !== selectedAttachment.id)
      );
      handleCloseDeleteModal();
      toast.success("Attachment deleted successfully");
    }
  };

  const handleAddAttachment = () => {
    const newAttachment = {
      id: Date.now(),
      filename: "new-file.pdf",
      uploadedDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      description: "New attachment",
    };
    setAttachments((prev) => [...prev, newAttachment]);
    toast.success("Attachment added successfully");
  };

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
      <Page
        breadcrumbs={breadcrumbs}
        title="Ship Order #59192"
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Ship Order #59192"
            subtitle="Nulogy Site"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="print" tooltip="Print Ship Order Sheet">
                  Print Ship Order Sheet
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        {/* Ship Order Information Section */}
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Ship Order Information</Heading2>
            <IconicButton icon="edit" onClick={handleEditClick}>
              Edit Ship Order Information
            </IconicButton>
          </Flex>
          <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
            <DescriptionGroup>
              <DescriptionTerm>Shipped</DescriptionTerm>
              <DescriptionDetails>No</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Shipped At</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Code</DescriptionTerm>
              <DescriptionDetails>59192</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#/customers/frito-lay" underline={false}>
                  FRITO LAY
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Reject Associated Shipment Items to Assigned Pallets</DescriptionTerm>
              <DescriptionDetails>No</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Case tracking</DescriptionTerm>
              <DescriptionDetails>Yes</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Ship to</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#/locations/mississauga" underline={false}>
                  DHL Mississauga
                </Link>
                <br />
                5671 Rolls drive
                <br />
                Mississauga, Ontario
                <br />
                M9C0A2
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
                <Link href="#/carriers/u-haul" underline={false}>
                  U-HAUL LOGISTICS
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Date</DescriptionTerm>
              <DescriptionDetails>2025-Jun-04</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Expected ship date</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Reference number</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Notes</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>

          {/* Custom Fields Subsection */}
          <Box mt="x4">
            <Heading3 mb="x2">Custom Fields</Heading3>
            <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
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
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Order Details</Heading2>
            <Flex gap="x2" alignItems="center">
              <Button>Manage Picking</Button>
              <Button>Locate Selected Items</Button>
            </Flex>
          </Flex>
          <Box mb="x2">
            <Text fontSize="small" color="darkGrey">
              ⓘ Modifications to order details are not available because this Ship Order is using case tracking and items have been added to Shipment 22770
            </Text>
          </Box>
          <Table
            columns={[
              { label: "PO No.", dataKey: "poNo" },
              {
                label: "Item",
                dataKey: "item",
                cellFormatter: (props) => (
                  <Link href={`#/items/${props.row.itemCode}`} underline={false}>
                    {props.cellData}
                  </Link>
                ),
              },
              { label: "Description", dataKey: "description" },
              { label: "Expected Qty", dataKey: "expectedQty" },
              { label: "Unit", dataKey: "unit" },
              { label: "Added Qty", dataKey: "addedQty" },
              { label: "Actual Qty", dataKey: "actualQty" },
            ]}
            rows={[
              {
                id: 1,
                poNo: "1",
                item: "1234",
                itemCode: "1234",
                description: "Strawberry Fruit Bar",
                expectedQty: "10.00000",
                unit: "ea",
                addedQty: "0.00000",
                actualQty: "0.00000",
              },
              {
                id: 2,
                poNo: "2",
                item: "123456",
                itemCode: "123456",
                description: "Bananas, Orange bundle",
                expectedQty: "5.00000",
                unit: "ea",
                addedQty: "5.00000",
                actualQty: "0.00000",
              },
            ]}
            hasSelectableRows
            keyField="id"
            compact
          />
        </Box>

        {/* Shipments Section */}
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Shipments</Heading2>
            <IconicButton icon="add" tooltip="Create Shipment">
              Create Shipment
            </IconicButton>
          </Flex>
          <Table
            columns={[
              {
                label: "ID",
                dataKey: "id",
                cellFormatter: (props) => (
                  <Link href={`#/shipments/${props.cellData}`} underline={false}>
                    Shipment {props.cellData}
                  </Link>
                ),
              },
              { label: "Consignee", dataKey: "consignee" },
              { label: "Shipped?", dataKey: "shipped" },
              { label: "Actual Ship", dataKey: "actualShip" },
            ]}
            rows={[
              {
                id: "22770",
                consignee: "DHL Mississauga",
                shipped: "No",
                actualShip: "—",
              },
            ]}
            keyField="id"
            compact
          />
        </Box>

        {/* Attachments Section */}
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Attachments</Heading2>
            <IconicButton icon="add" tooltip="Add Attachment" onClick={handleAddAttachment}>
              Add Attachment
            </IconicButton>
          </Flex>
          <Table
            columns={[
              {
                label: "Filename",
                dataKey: "filename",
                cellFormatter: (props) => (
                  <Link href={`#/attachments/${props.row.id}`} underline={false}>
                    {props.cellData}
                  </Link>
                ),
              },
              { label: "Uploaded Date", dataKey: "uploadedDate" },
              { label: "Description", dataKey: "description" },
              {
                dataKey: "delete",
                width: "40px",
                cellFormatter: (props) => (
                  <IconicButton 
                    icon="delete" 
                    tooltip="Delete" 
                    onClick={() => handleDeleteAttachment(props.row)}
                  />
                ),
              },
            ]}
            rows={attachments}
            keyField="id"
            compact
          />
        </Box>
      </Page>

      {/* Edit Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit ship order information"
        helpText="Ship Order #59192"
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
              <FieldLabel labelText="Code">
                <Input value="59192" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Customer">
                <Select
                  options={[
                    { value: "frito-lay", label: "FRITO LAY" },
                    { value: "other-customer", label: "Other Customer" },
                  ]}
                  value="frito-lay"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Case tracking">
                <Select
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                  value="yes"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Ship to" helpText="Read-only - cannot be modified">
                <Textarea 
                  value="DHL Mississauga&#10;5671 Rolls drive&#10;Mississauga, Ontario&#10;M9C0A2&#10;CA" 
                  disabled 
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Carrier">
                <Select
                  options={[
                    { value: "u-haul", label: "U-HAUL LOGISTICS" },
                    { value: "other-carrier", label: "Other Carrier" },
                  ]}
                  value="u-haul"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Date">
                <DatePicker selected={new Date("2025-06-04")} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Expected ship date">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Reference number">
                <Input value="" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Notes">
                <Textarea value="" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="custom so f1">
                <Input value="" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="custom so f2">
                <Input value="" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="custom so f3">
                <Input value="" />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete attachment"
        itemName={selectedAttachment?.filename}
        itemType="attachment"
      />
    </ApplicationFrame>
  );
};

export const ReceiveOrderDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedOrderRows, setSelectedOrderRows] = useState([]);
  const [orderDetailsData, setOrderDetailsData] = useState([
    {
      id: 1,
      item: "Soap Bottle - Juan H SoftSoap Gel Soap - 1L",
      itemCode: "soap-bottle-juan",
      description: "Soap Bottle - Juan H SoftSoap Gel Soap - 1L",
      quantity: "400.00",
      quantityOnReceipts: "0.00 ea",
      uom: "0",
      unitPurchasePrice: "",
      expectedDeliveryDate: "2025-Feb-10 12:00 AM",
    },
  ]);

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSaveChanges = () => {
    handleCloseSidebar();
    toast.success("Receive order information updated successfully");
  };

  // Order Details table handlers
  const handleOrderRowSelectionChange = (selectedRows) => {
    setSelectedOrderRows(selectedRows);
  };

  const handleBulkUpdateDeliveryDate = () => {
    toast.success(`Updated delivery date for ${selectedOrderRows.length} items`);
    setSelectedOrderRows([]);
  };

  const handleBulkDeleteItems = () => {
    setOrderDetailsData(prevData => 
      prevData.filter(item => !selectedOrderRows.some(selected => selected.id === item.id))
    );
    toast.success(`Deleted ${selectedOrderRows.length} items`);
    setSelectedOrderRows([]);
  };

  const handleImportItems = () => {
    toast.success("Import Items (CSV) functionality");
  };

  const handlePrintReceiveOrder = () => {
    toast.success("Print Receive Order Sheet functionality");
  };

  const handleEditItem = (item) => {
    toast.success(`Edit item: ${item.item}`);
  };

  const handleDeleteItem = (item) => {
    setOrderDetailsData(prevData => prevData.filter(row => row.id !== item.id));
    toast.success("Item deleted successfully");
  };

  const handleFilterOrderDetails = () => {
    toast.success("Filter functionality");
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">Receive orders</Link>
    </Breadcrumbs>
  );

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
      <Page
        breadcrumbs={breadcrumbs}
        title="Receive Order #45051"
        renderHeader={() => (
          <Header
            renderBreadcrumbs={() => breadcrumbs}
            title="Receive Order #45051"
            subtitle="Nulogy Site"
            renderActions={() => (
              <Flex gap="x2" alignItems="center">
                <IconicButton icon="print" tooltip="Export (Excel)">
                  Export (Excel)
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        {/* Receive Order Information Section */}
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Receive Order Information</Heading2>
            <IconicButton icon="edit" onClick={handleEditClick}>
              Edit Receive Order Information
            </IconicButton>
          </Flex>
          <DescriptionList columns={{ small: 1, medium: 2, large: 3 }}>
            <DescriptionGroup>
              <DescriptionTerm>Received</DescriptionTerm>
              <DescriptionDetails>No</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Code</DescriptionTerm>
              <DescriptionDetails>45051</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Vendor</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#/vendors/colgate-palmolive" underline={false}>
                  Colgate-Palmolive
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Purchaser</DescriptionTerm>
              <DescriptionDetails>Unspecified</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#/customers/colgate-palmolive" underline={false}>
                  Colgate-Palmolive
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Work Order</DescriptionTerm>
              <DescriptionDetails>
                <Link href="#/work-orders/197155" underline={false}>
                  Work Order 197155 - JH5G5-1
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>RO Date</DescriptionTerm>
              <DescriptionDetails>2025-Feb-03</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Carrier</DescriptionTerm>
              <DescriptionDetails>No Carrier</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Expected ship date</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Actual ship date</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Status</DescriptionTerm>
              <DescriptionDetails>Unspecified</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Reference</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Vendor notes</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Internal notes</DescriptionTerm>
              <DescriptionDetails>—</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>

        {/* Order Details Section */}
        <Box maxWidth="1360px" mx="auto" my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Order Details</Heading2>
            <Flex gap="x2" alignItems="center">
              <IconicButton icon="getApp" tooltip="Import Items (CSV)" onClick={handleImportItems}>
                Import Items (CSV)
              </IconicButton>
              <IconicButton icon="print" tooltip="Print Receive Order Sheet" onClick={handlePrintReceiveOrder}>
                Print Receive Order Sheet
              </IconicButton>
            </Flex>
          </Flex>
          
          {/* Table Action Bar following new table rules */}
          <Flex gap="x2" px="x1" pb="x2" justifyContent="flex-end" alignItems="center">
            {/* Selection count on left when rows selected */}
            {selectedOrderRows.length > 0 && (
              <Text color="darkGrey">
                {selectedOrderRows.length} selected
              </Text>
            )}
            
            {/* Actions on right - bulk actions replace regular actions when rows selected */}
            <Flex gap="x2" alignItems="center">
              {selectedOrderRows.length > 0 ? (
                <>
                  {/* Bulk actions replace primary/secondary actions */}
                  <IconicButton icon="edit" tooltip="Update expected delivery date" onClick={handleBulkUpdateDeliveryDate}>
                    Update expected delivery date
                  </IconicButton>
                  <IconicButton icon="delete" tooltip="Delete" onClick={handleBulkDeleteItems}>
                    Delete
                  </IconicButton>
                </>
              ) : (
                <>
                  {/* Regular table actions when no selection */}
                  <IconicButton icon="filter" tooltip="Filter" onClick={handleFilterOrderDetails}>
                    Filter
                  </IconicButton>
                </>
              )}
            </Flex>
          </Flex>
          
          <Table
            columns={[
              {
                label: "Item",
                dataKey: "item",
                cellFormatter: (props) => (
                  <Link href={`#/items/${props.row.itemCode}`} underline={false}>
                    {props.cellData}
                  </Link>
                ),
              },
              { label: "Description", dataKey: "description" },
              { label: "Quantity", dataKey: "quantity" },
              { label: "Quantity On Receipts", dataKey: "quantityOnReceipts" },
              { label: "UOM", dataKey: "uom" },
              { label: "Unit Purchase Price", dataKey: "unitPurchasePrice" },
              { label: "Expected Delivery Date", dataKey: "expectedDeliveryDate" },
              {
                dataKey: "edit",
                width: "40px",
                cellFormatter: (props) => (
                  <IconicButton 
                    icon="edit" 
                    tooltip="Edit" 
                    onClick={() => handleEditItem(props.row)}
                  />
                ),
              },
              {
                dataKey: "delete",
                width: "40px",
                cellFormatter: (props) => (
                  <IconicButton 
                    icon="delete" 
                    tooltip="Delete" 
                    onClick={() => handleDeleteItem(props.row)}
                  />
                ),
              },
            ]}
            rows={orderDetailsData}
            hasSelectableRows
            keyField="id"
            onRowSelectionChange={handleOrderRowSelectionChange}
            compact
          />
        </Box>
      </Page>

      {/* Edit Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit receive order information"
        helpText="Receive Order #45051"
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
              <FieldLabel labelText="Code">
                <Input value="45051" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Vendor">
                <Select
                  options={[
                    { value: "colgate-palmolive", label: "Colgate-Palmolive" },
                    { value: "other-vendor", label: "Other Vendor" },
                  ]}
                  value="colgate-palmolive"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Purchaser">
                <Select
                  options={[
                    { value: "unspecified", label: "Unspecified" },
                    { value: "john-doe", label: "John Doe" },
                  ]}
                  value="unspecified"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Customer">
                <Select
                  options={[
                    { value: "colgate-palmolive", label: "Colgate-Palmolive" },
                    { value: "other-customer", label: "Other Customer" },
                  ]}
                  value="colgate-palmolive"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Work Order">
                <Select
                  options={[
                    { value: "197155", label: "Work Order 197155 - JH5G5-1" },
                    { value: "other-work-order", label: "Other Work Order" },
                  ]}
                  value="197155"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="RO Date">
                <DatePicker selected={new Date("2025-02-03")} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Carrier">
                <Select
                  options={[
                    { value: "no-carrier", label: "No Carrier" },
                    { value: "ups", label: "UPS" },
                    { value: "fedex", label: "FedEx" },
                  ]}
                  value="no-carrier"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Expected ship date">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Actual ship date">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Status">
                <Select
                  options={[
                    { value: "unspecified", label: "Unspecified" },
                    { value: "pending", label: "Pending" },
                    { value: "completed", label: "Completed" },
                  ]}
                  value="unspecified"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Reference">
                <Input value="" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Vendor notes">
                <Textarea value="" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Internal notes">
                <Textarea value="" />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>
    </ApplicationFrame>
  );
};
