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

export default {
  title: "Templates/Testing/RecordPage",
  parameters: {
    layout: "fullscreen",
  },
} as Meta;

export const ShipOrderRecord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAttachmentSidebarOpen, setIsAttachmentSidebarOpen] = useState(false);

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
      <Link href="#">Operations</Link>
      <Link href="#">Ship Orders</Link>
    </Breadcrumbs>
  );

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
    toast.success("File attached successfully");
    setIsAttachmentSidebarOpen(false);
  };

  const handleRemoveAttachment = (filename: string) => {
    toast.success(`${filename} removed successfully`);
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
                <Link href="#">FRITO LAY</Link>
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
                <Link href="#">DHL Mississauga</Link>
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
                <Link href="#">U HAUL LOGISTICS</Link>
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
              <Button>Manage Packing</Button>
              <Button>Locate Selected Items</Button>
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
                cellRenderer: ({ cellData }) => <Link href="#">{cellData}</Link>,
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
            <Button>Create Shipment</Button>
          </Flex>

          <Table
            rows={[
              {
                id: "22770",
                shipmentId: "Shipment 22770",
                consignee: "CHS. Mississauga",
                shipped: "No",
                actualShip: "—",
              },
            ]}
            columns={[
              {
                label: "ID",
                dataKey: "shipmentId",
                cellRenderer: ({ cellData }) => <Link href="#">{cellData}</Link>,
              },
              {
                label: "Consignee",
                dataKey: "consignee",
                cellRenderer: ({ cellData }) => <Link href="#">{cellData}</Link>,
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
            <Button onClick={handleAttachFileClick}>Attach File</Button>
          </Flex>

          <Table
            rows={[
              {
                id: "1",
                filename: "test 1.png",
                uploadedDate: "2025-Jun-19 12:16 PM",
                description: "test",
              },
            ]}
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
                  <IconicButton
                    icon="delete"
                    tooltip="Remove attachment"
                    onClick={() => handleRemoveAttachment(row.filename)}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Page>

      {/* Edit Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        title="Edit Ship Order Information"
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
                <Input value="59192" disabled />
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

      {/* Attach File Sidebar */}
      <Sidebar
        isOpen={isAttachmentSidebarOpen}
        onClose={handleCloseAttachmentSidebar}
        title="Attach File"
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
    </ApplicationFrame>
  );
};
