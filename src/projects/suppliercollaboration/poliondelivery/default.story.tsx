import React, { useState } from "react";
import { toast, Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
  Heading3,
  Heading4,
  Icon,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  IconicButton,
  ToastContainer,
  BrandedNavBar,
  Tab,
  Tabs,
  Card,
  StatusIndicator,
  TruncatedText,
  Header,
  Summary,
  Divider,
  DropdownMenu,
  DropdownButton,
  Table,
  Button,
  PrimaryButton,
  QuietButton,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/POLI on Delivery",
  parameters: {
    layout: "fullscreen",
  },
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Production planning", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Quality control", href: "/" },
];

const secondaryMenu = [
  {
    name: "POLI on delivery",
    items: [
      { name: "Overview", href: "/" },
      { name: "Delivery tracking", href: "/" },
      { name: "Carrier management", href: "/" },
    ],
  },
];

export const Default = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  // Delivery data for the main table
  const deliveryData = [
    {
      id: "1",
      item: "-",
      poNumber: "-",
      customerPoLineItem: "-",
      supplierPoLineItem: "-",
      palletNumber: "-",
      lotCode: "-",
      expiryDate: "-",
      shippedPalletQuantity: "-",
      requiredQuantity: "-",
      shippedQuantity: "-",
      receivedQuantity: "-",
      freightClass: "-",
      notes: "-",
      expectedShipDate: "-",
      expectedReceiveDate: "-",
      nestedData: [
        {
          id: "1-1",
          item: "-",
          poNumber: "-",
          customerPoLineItem: "-",
          supplierPoLineItem: "-",
          palletNumber: "-",
          lotCode: "-",
          expiryDate: "-",
          shippedPalletQuantity: "-",
          requiredQuantity: "-",
          shippedQuantity: "-",
          receivedQuantity: "-",
          freightClass: "-",
          notes: "-",
          expectedShipDate: "-",
          expectedReceiveDate: "-",
        },
        {
          id: "1-2",
          item: "-",
          poNumber: "-",
          customerPoLineItem: "-",
          supplierPoLineItem: "-",
          palletNumber: "-",
          lotCode: "-",
          expiryDate: "-",
          shippedPalletQuantity: "-",
          requiredQuantity: "-",
          shippedQuantity: "-",
          receivedQuantity: "-",
          freightClass: "-",
          notes: "-",
          expectedShipDate: "-",
          expectedReceiveDate: "-",
        },
        {
          id: "1-3",
          item: "-",
          poNumber: "-",
          customerPoLineItem: "-",
          supplierPoLineItem: "-",
          palletNumber: "-",
          lotCode: "-",
          expiryDate: "-",
          shippedPalletQuantity: "-",
          requiredQuantity: "-",
          shippedQuantity: "-",
          receivedQuantity: "-",
          freightClass: "-",
          notes: "-",
          expectedShipDate: "-",
          expectedReceiveDate: "-",
        },
      ],
    },
    {
      id: "2",
      item: "-",
      poNumber: "-",
      customerPoLineItem: "-",
      supplierPoLineItem: "-",
      palletNumber: "-",
      lotCode: "-",
      expiryDate: "-",
      shippedPalletQuantity: "-",
      requiredQuantity: "-",
      shippedQuantity: "-",
      receivedQuantity: "-",
      freightClass: "-",
      notes: "-",
      expectedShipDate: "-",
      expectedReceiveDate: "-",
      nestedData: [
        {
          id: "2-1",
          item: "-",
          poNumber: "-",
          customerPoLineItem: "-",
          supplierPoLineItem: "-",
          palletNumber: "-",
          lotCode: "-",
          expiryDate: "-",
          shippedPalletQuantity: "-",
          requiredQuantity: "-",
          shippedQuantity: "-",
          receivedQuantity: "-",
          freightClass: "-",
          notes: "-",
          expectedShipDate: "-",
          expectedReceiveDate: "-",
        },
        {
          id: "2-2",
          item: "-",
          poNumber: "-",
          customerPoLineItem: "-",
          supplierPoLineItem: "-",
          palletNumber: "-",
          lotCode: "-",
          expiryDate: "-",
          shippedPalletQuantity: "-",
          requiredQuantity: "-",
          shippedQuantity: "-",
          receivedQuantity: "-",
          freightClass: "-",
          notes: "-",
          expectedShipDate: "-",
          expectedReceiveDate: "-",
        },
        {
          id: "2-3",
          item: "-",
          poNumber: "-",
          customerPoLineItem: "-",
          supplierPoLineItem: "-",
          palletNumber: "-",
          lotCode: "-",
          expiryDate: "-",
          shippedPalletQuantity: "-",
          requiredQuantity: "-",
          shippedQuantity: "-",
          receivedQuantity: "-",
          freightClass: "-",
          notes: "-",
          expectedShipDate: "-",
          expectedReceiveDate: "-",
        },
      ],
    },
  ];

  // Table columns for Details tab
  const detailsTableColumns = [
    {
      label: "Customer's item code and description",
      dataKey: "item",
      width: "200px",
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "120px",
    },
    {
      label: "Customer's PO line item number",
      dataKey: "customerPoLineItem",
      width: "200px",
    },
    {
      label: "Expected ship date",
      dataKey: "expectedShipDate",
      width: "150px",
    },
    {
      label: "Expected receive date",
      dataKey: "expectedReceiveDate",
      width: "150px",
    },
    {
      label: "Required quantity",
      dataKey: "requiredQuantity",
      width: "150px",
    },
    {
      label: "Shipped quantity",
      dataKey: "shippedQuantity",
      width: "150px",
    },
    {
      label: "Received quantity",
      dataKey: "receivedQuantity",
      width: "150px",
    },
  ];

  // Table columns for Deliveries tab
  const deliveriesTableColumns = [
    {
      label: "Customer's item code and description",
      dataKey: "item",
      width: "200px",
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "120px",
    },
    {
      label: "Customer's PO line item number",
      dataKey: "customerPoLineItem",
      width: "200px",
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "150px",
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "120px",
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "120px",
    },
    {
      label: "Shipped pallet quantity",
      dataKey: "shippedPalletQuantity",
      width: "180px",
    },
    {
      label: "Required quantity",
      dataKey: "requiredQuantity",
      width: "150px",
    },
    {
      label: "Shipped quantity",
      dataKey: "shippedQuantity",
      width: "150px",
    },
    {
      label: "Received quantity",
      dataKey: "receivedQuantity",
      width: "150px",
    },
    {
      label: "Freight class",
      dataKey: "freightClass",
      width: "120px",
    },
    {
      label: "Notes",
      dataKey: "notes",
      width: "auto",
    },
  ];

  // Create flattened table rows (no nesting)
  const tableRows = deliveryData.flatMap((delivery) => [
    delivery, // Main item row
    ...delivery.nestedData, // All nested rows
  ]);

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <ToastContainer />
      <Header
        breakpoints={{
          medium: 1200,
        }}
        renderBreadcrumbs={() => (
          <Breadcrumbs>
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Home
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()}>
              Materials overview
            </Link>
          </Breadcrumbs>
        )}
        title="Order 4310000007"
      />

      <Box p="x2">
        <Tabs selectedIndex={selectedTab} onTabClick={(e, index) => setSelectedTab(index)}>
          <Tab label="Details">
            <Box>
              <Box p="x3">
                <Box mb="x3" py="x1" px="x2">
                  <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 3 }}>
                    <DescriptionGroup>
                      <DescriptionTerm>PO number</DescriptionTerm>
                      <DescriptionDetails>PO-12345</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Customer</DescriptionTerm>
                      <DescriptionDetails>Acme Manufacturing Co.</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Supplier</DescriptionTerm>
                      <DescriptionDetails>Global Supply Solutions</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>

                <Table columns={detailsTableColumns} rows={tableRows} keyField="id" />
              </Box>
            </Box>
          </Tab>
          <Tab label="Deliveries">
            <Box>
              <Card>
                <Box p="x1">
                  <Heading3 mb="x1" px="x2">
                    Delivery 12345
                  </Heading3>

                  <Box mb="x3" py="x1" px="x2">
                    <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 3 }}>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Receiver</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>Markus Solem</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Receiver address</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>8 Avenue, New York, New York, 10004, USA</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Actual ship date</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>
                          <Text>-</Text>
                          <Text fontSize="small" color="midGrey">
                            (Expected Oct 7, 2025, 11:00 AM)
                          </Text>
                        </DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Actual receive date</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>
                          <Text>-</Text>
                          <Text fontSize="small" color="midGrey">
                            (Expected Oct 10, 2025, 11:00 AM)
                          </Text>
                        </DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Carrier</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>-</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Carrier shipper appointment</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>-</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Carrier receiver appointment</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>-</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Trailer number</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>TRAILER_910000013</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Shipping condition</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>-</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">TMS number</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>TMS_910000013</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Pro number</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>PRO_910000013</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Seal number</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>SEAL_910000013</DescriptionDetails>
                      </DescriptionGroup>
                      <DescriptionGroup>
                        <DescriptionTerm>
                          <Text color="darkGrey">Notes</Text>
                        </DescriptionTerm>
                        <DescriptionDetails>-</DescriptionDetails>
                      </DescriptionGroup>
                    </DescriptionList>
                  </Box>

                  <Table columns={deliveriesTableColumns} rows={tableRows} keyField="id" />
                </Box>
              </Card>
            </Box>
          </Tab>
          <Tab label="Attachments">
            <Box p="x4">
              <Text>Attachments content will go here</Text>
            </Box>
          </Tab>
        </Tabs>
      </Box>
    </ApplicationFrame>
  );
};
