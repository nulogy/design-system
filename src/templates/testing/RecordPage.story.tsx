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
  Header,
  Heading2,
  Heading3,
  Table,
  Text,
  ToastContainer,
  toast,
} from "../../index";
import DeleteModal from "../builder/DeleteModal";

export default {
  title: "Templates/Testing/RecordPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const ShipOrderRecord = () => {
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

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#" underline={false}>
        Home
      </Link>
      <Link href="#" underline={false}>
        Operations
      </Link>
      <Link href="#" underline={false}>
        Ship Orders
      </Link>
    </Breadcrumbs>
  );

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSaveChanges = () => {
    toast.success("Ship order information updated successfully");
    setIsSidebarOpen(false);
  };

  const handleAttachFileClick = () => {
    setIsAttachmentSidebarOpen(true);
  };

  const handleCloseAttachmentSidebar = () => {
    setIsAttachmentSidebarOpen(false);
  };

  const handleSaveAttachment = () => {
    // Generate new attachment ID
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
      filename: "new-attachment.pdf", // This would come from the actual file input
      uploadedDate: currentDate,
      description: "New attachment", // This would come from the form data
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
    // Generate new shipment ID
    const newShipmentNumber = Math.max(...shipments.map((s) => parseInt(s.id))) + 1;
    const newShipment = {
      id: newShipmentNumber.toString(),
      shipmentId: `Shipment ${newShipmentNumber}`,
      consignee: "DHL Mississauga", // This would come from the form data
      shipped: "No",
      actualShip: "—",
    };

    setShipments((prev) => [...prev, newShipment]);
    toast.success("Shipment created successfully");
    setIsCreateShipmentSidebarOpen(false);
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
                <IconicButton icon="publish" tooltip="Print ship order sheet">
                  Print ship order sheet
                </IconicButton>
              </Flex>
            )}
          />
        )}
      >
        {/* Ship order information section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Ship order information</Heading2>
            <IconicButton icon="edit" onClick={handleEditClick}>
              Edit ship order information
            </IconicButton>
          </Flex>
          <DescriptionList columns={{ small: 2, medium: 3, large: 4 }}>
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
                <Link href="#" underline={false}>
                  FRITO LAY
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Restrict Associated</DescriptionTerm>
              <DescriptionDetails>No</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Shipment items to assigned pallets</DescriptionTerm>
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
                  DHL Mississauga
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
              <DescriptionTerm>Facility number</DescriptionTerm>
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

          {/* Custom fields subsection */}
          <Box mt="x4">
            <Heading3 mb="x2">Custom fields</Heading3>
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

        {/* Order details section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Order details</Heading2>
            <Flex gap="x2" alignItems="center">
              <IconicButton icon="edit">Manage packing</IconicButton>
              <IconicButton icon="search">Locate selected items</IconicButton>
            </Flex>
          </Flex>

          {/* Notification message */}
          <Box mb="x3" p="x2" backgroundColor="lightBlue" borderRadius="medium">
            <Text>
              ⓘ Modifications to order details are not available because this ship order is using case tracking and
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

        {/* Shipments section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Shipments</Heading2>
            <IconicButton icon="add" onClick={handleCreateShipmentClick}>
              Create shipment
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

        {/* Attachments section */}
        <Box my="x3" pb="x3">
          <Flex justifyContent="space-between" alignItems="center" mb="x2">
            <Heading2 mb="0">Attachments</Heading2>
            <IconicButton icon="add" onClick={handleAttachFileClick}>
              Attach file
            </IconicButton>
          </Flex>

          <Table
            rows={attachments}
            columns={[
              {
                label: "Filename",
                dataKey: "filename",
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
                label: "",
                dataKey: "actions",
                width: "40px",
                cellRenderer: ({ row }) => (
                  <IconicButton icon="delete" tooltip="Remove attachment" onClick={() => handleRemoveAttachment(row)} />
                ),
              },
            ]}
          />
        </Box>
      </Page>

      {/* Edit sidebar */}
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
                <Input value="59192" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Customer">
                <Select
                  options={[
                    { value: "frito-lay", label: "FRITO LAY" },
                    { value: "other", label: "Other Customer" },
                  ]}
                  value="frito-lay"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Restrict Associated">
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
              <FieldLabel labelText="Shipment items to assigned pallets">
                <Input placeholder="Enter shipment items assignment" />
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
              <FieldLabel labelText="Ship to">
                <Text>
                  DHL Mississauga
                  <br />
                  5671 Rolls drive
                  <br />
                  Mississauga, Ontario
                  <br />
                  M6C0A2
                  <br />
                  CA
                </Text>
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Facility number">
                <Input placeholder="Enter facility number" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Carrier">
                <Select
                  options={[
                    { value: "u-haul", label: "U HAUL LOGISTICS" },
                    { value: "other", label: "Other Carrier" },
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
                <Input placeholder="Enter reference number" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Notes">
                <Textarea placeholder="Enter notes" />
              </FieldLabel>
            </Box>

            {/* Custom Fields */}
            <Box pb="x3">
              <FieldLabel labelText="custom so f1">
                <Input placeholder="Enter custom field 1" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="custom so f2">
                <Input placeholder="Enter custom field 2" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="custom so f3">
                <Input placeholder="Enter custom field 3" />
              </FieldLabel>
            </Box>
          </FormSection>
        </Form>
      </Sidebar>

      {/* Attach file sidebar */}
      <Sidebar
        isOpen={isAttachmentSidebarOpen}
        onClose={handleCloseAttachmentSidebar}
        title="Attach file"
        helpText="Ship Order #59192"
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

      {/* Create shipment sidebar */}
      <Sidebar
        isOpen={isCreateShipmentSidebarOpen}
        onClose={handleCloseCreateShipmentSidebar}
        title="Create shipment"
        helpText="Ship Order #59192"
        footer={
          <Flex justifyContent="flex-start">
            <PrimaryButton onClick={handleSaveCreateShipment} mr="x2">
              Create shipment
            </PrimaryButton>
            <QuietButton onClick={handleCloseCreateShipmentSidebar}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Form>
          <FormSection>
            {/* Shipment information */}
            <Heading3 mb="x2">Shipment information</Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Ship Order">
                <Input value="59192 - DHL Mississauga" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Customer">
                <Select
                  options={[
                    { value: "frito-lay", label: "FRITO LAY" },
                    { value: "other", label: "Other Customer" },
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

            {/* Ship from */}
            <Heading3 mb="x2" mt="x4">
              Ship from
            </Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Address">
                <Textarea defaultValue="111 superman drive" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Phone">
                <Input placeholder="Enter phone number" />
              </FieldLabel>
            </Box>

            {/* Bill to */}
            <Heading3 mb="x2" mt="x4">
              Bill to
            </Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Bill to">
                <Select
                  options={[
                    { value: "frito-lay", label: "FRITO LAY" },
                    { value: "other", label: "Other" },
                  ]}
                  value="frito-lay"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Address">
                <Textarea defaultValue="Florida" />
              </FieldLabel>
            </Box>

            {/* Ship to */}
            <Heading3 mb="x2" mt="x4">
              Ship to
            </Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Ship to">
                <Select
                  options={[
                    { value: "dhl-mississauga", label: "DHL Mississauga" },
                    { value: "other", label: "Other" },
                  ]}
                  value="dhl-mississauga"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Code">
                <Text>DHLM</Text>
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Facility number">
                <Text>—</Text>
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Address">
                <Text>
                  5671 Rolls drive
                  <br />
                  Mississauga, Ontario
                  <br />
                  M6C0A2
                  <br />
                  Canada
                </Text>
              </FieldLabel>
            </Box>

            {/* Carrier details */}
            <Heading3 mb="x2" mt="x4">
              Carrier details
            </Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Name">
                <Select
                  options={[
                    { value: "u-haul", label: "U HAUL LOGISTICS" },
                    { value: "other", label: "Other" },
                  ]}
                  value="u-haul"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Contact">
                <Input defaultValue="Troy Uber" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Code">
                <Input defaultValue="UHAUL" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Phone">
                <Input placeholder="Enter phone number" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Type">
                <Text>TRUCK COMPANY</Text>
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Tracking or Pro number">
                <Input placeholder="Enter tracking or pro number" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Trailer number">
                <Input placeholder="Enter trailer number" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Seal number">
                <Input placeholder="Enter seal number" />
              </FieldLabel>
            </Box>

            {/* Dates */}
            <Heading3 mb="x2" mt="x4">
              Dates
            </Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Expected ship date">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Expected delivery date">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Actual ship date">
                <DatePicker selected={null} />
              </FieldLabel>
            </Box>

            {/* Other */}
            <Heading3 mb="x2" mt="x4">
              Other
            </Heading3>
            <Box pb="x3">
              <FieldLabel labelText="Freight charge terms">
                <Select
                  options={[
                    { value: "prepaid", label: "Prepaid" },
                    { value: "collect", label: "Collect" },
                    { value: "third-party", label: "Third Party" },
                  ]}
                  placeholder="Select freight charge terms"
                />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Freight charge amount">
                <Input placeholder="Enter freight charge amount" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Shipment notes">
                <Textarea placeholder="Enter shipment notes" />
              </FieldLabel>
            </Box>
            <Box pb="x3">
              <FieldLabel labelText="Internal notes">
                <Textarea placeholder="Enter internal notes" />
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
