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
        },
      ],
    },
  ];

  // Table columns
  const tableColumns = [
    {
      label: "Customer's item code and description",
      dataKey: "item",
      width: "200px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.item}</Text>
        </Flex>
      ),
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "120px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.poNumber}</Text>
        </Flex>
      ),
    },
    {
      label: "Customer's PO line item number",
      dataKey: "customerPoLineItem",
      width: "200px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.customerPoLineItem}</Text>
        </Flex>
      ),
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.palletNumber}</Text>
        </Flex>
      ),
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "120px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.lotCode}</Text>
        </Flex>
      ),
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "120px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.expiryDate}</Text>
        </Flex>
      ),
    },
    {
      label: "Shipped pallet quantity",
      dataKey: "shippedPalletQuantity",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.shippedPalletQuantity}</Text>
        </Flex>
      ),
    },
    {
      label: "Required quantity",
      dataKey: "requiredQuantity",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.requiredQuantity}</Text>
        </Flex>
      ),
    },
    {
      label: "Shipped quantity",
      dataKey: "shippedQuantity",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.shippedQuantity}</Text>
        </Flex>
      ),
    },
    {
      label: "Received quantity",
      dataKey: "receivedQuantity",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.receivedQuantity}</Text>
        </Flex>
      ),
    },
    {
      label: "Freight class",
      dataKey: "freightClass",
      width: "120px",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.freightClass}</Text>
        </Flex>
      ),
    },
    {
      label: "Notes",
      dataKey: "notes",
      width: "auto",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex alignItems="center" height="100%">
          <Text>{row.notes}</Text>
        </Flex>
      ),
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
          <Tab label="Details"></Tab>
          <Tab label="Deliveries">
            <Box>
              <Card>
                <Box p="x1">
                  <Heading3 mb="x1">Delivery 12345</Heading3>

                  <Box mb="x3">
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

                  <Divider mb="x3" />

                  <Table columns={tableColumns} rows={tableRows} keyField="id" compact />
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

        <Box mt="x3">
          <Card>
            <Box p="x3">
              <Flex justifyContent="space-between" alignItems="center" mb="x3">
                <Box>
                  <Heading4>Delivery status</Heading4>
                </Box>
                <Flex gap="x1">
                  <IconicButton icon="refresh" aria-label="Refresh" />
                  <IconicButton icon="filter" aria-label="Filter" />
                </Flex>
              </Flex>

              <Box mb="x3">
                <DescriptionList>
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
                  <DescriptionGroup>
                    <DescriptionTerm>Total expected quantity</DescriptionTerm>
                    <DescriptionDetails>55 cases</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Total delivered quantity</DescriptionTerm>
                    <DescriptionDetails>54 cases</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Delivery completion</DescriptionTerm>
                    <DescriptionDetails>
                      <StatusIndicator type="warning">98% complete</StatusIndicator>
                    </DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
              </Box>

              <Divider mb="x3" />

              <Table columns={tableColumns} rows={tableRows} keyField="id" compact />
            </Box>
          </Card>
        </Box>
      </Box>
    </ApplicationFrame>
  );
};
