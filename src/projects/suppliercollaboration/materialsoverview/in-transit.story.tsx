import React, { useState } from "react";
import {
  ApplicationFrame,
  Header,
  Page,
  Breadcrumbs,
  Link,
  Box,
  Text,
  Heading3,
  BrandedNavBar,
  Tabs,
  Tab,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  StatusIndicator,
  Table,
  Flex,
  TruncatedText,
  Card,
  Checkbox,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Materials overview/In-transit",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Analytics", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Items", href: "/" },
  { name: "Imports and exports", href: "/" },
];

const secondaryMenu = [
  {
    name: "Materials overview",
    items: [
      { name: "Inventory summary", href: "/" },
      { name: "In-transit", href: "/" },
    ],
  },
];

export const InTransit = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1); // Deliveries tab

  // Lot code column configuration
  const [showCustomerLotCode, setShowCustomerLotCode] = useState(true);
  const [showSupplierLotCode, setShowSupplierLotCode] = useState(true); // Always true, disabled

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="/supplier-collaboration">Home</Link>
      <Link href="/supplier-collaboration/materials-overview">Materials overview</Link>
    </Breadcrumbs>
  );

  // Delivery details data
  const deliveryDetails = {
    receiver: "Frank Smith",
    carrier: "LogisticsRUs",
    shippingCondition: "-",
    notes: "-",
    receiverAddress: "Oak street, Denver, Colorado, 80201, USA",
    actualShipDate: "Nov 6, 2025, 10:00 AM",
    expectedShipDate: "Nov 6, 2025, 10:00 AM",
    carrierShipperAppointment: "Nov 6, 2025, 10:00 AM",
    tmsNumber: "TMS_910000011",
    proNumber: "PRO_910000011",
    actualReceiveDate: "-",
    expectedReceiveDate: "Nov 4, 2025, 10:00 AM",
    carrierReceiverAppointment: "Nov 9, 2025, 10:00 AM",
    trailerNumber: "-",
    sealNumber: "-",
  };

  // Build header label based on configuration
  const getLotCodeHeaderLabel = () => {
    // If only Supplier is checked, don't show any label
    if (showSupplierLotCode && !showCustomerLotCode) {
      return "";
    }

    const labels: string[] = [];
    if (showCustomerLotCode) labels.push("Customer's");
    if (showSupplierLotCode) labels.push("Supplier's");

    return labels.length > 0 ? `(${labels.join(" / ")})` : "";
  };

  // Table data with 2-tier structure (main rows and sub-rows)
  const itemsData = [
    // Main row for item 1
    {
      id: "item-1",
      isMainRow: true,
      verticalAlign: "top",
      item: "2349-GranolaPack - Gr...",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      shippedPalletQuantity: "",
      requiredQuantity: "18,000 eaches",
      shippedQuantity: "18,000 eaches",
      receivedQuantity: "18,000 eaches",
      freightClass: "",
      notes: "",
    },
    // Sub-rows for item 1
    {
      id: "item-1-sub-1",
      isSubRow: true,
      parentId: "item-1",
      verticalAlign: "top",
      item: "",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "BRK489-VERY-LONG-CUSTOMER-LOT-CODE-THAT-SHOULD-TRUNCATE-WHEN-DISPLAYED-IN-THE-TABLE",
      supplierLotCode: "BRK489-SUP-VERY-LONG-SUPPLIER-LOT-CODE-THAT-SHOULD-ALSO-TRUNCATE-WHEN-DISPLAYED-IN-THE-TABLE",
      expiryDate: "2026-09-27",
      shippedPalletQuantity: "220 CHEP",
      requiredQuantity: "",
      shippedQuantity: "11,000 eaches",
      receivedQuantity: "11,000 eaches",
      freightClass: "",
      notes: "",
    },
    {
      id: "item-1-sub-2",
      isSubRow: true,
      parentId: "item-1",
      verticalAlign: "top",
      item: "",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "-",
      supplierLotCode: "LYN839-SUP",
      expiryDate: "2026-09-19",
      shippedPalletQuantity: "140 Plastic",
      requiredQuantity: "",
      shippedQuantity: "7,000 eaches",
      receivedQuantity: "7,000 eaches",
      freightClass: "",
      notes: "",
    },
    // Total row for item 1
    {
      id: "item-1-total",
      isTotalRow: true,
      parentId: "item-1",
      verticalAlign: "top",
      item: "",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      shippedPalletQuantity: "",
      requiredQuantity: "18,000 eaches",
      shippedQuantity: "18,000 eaches",
      receivedQuantity: "18,000 eaches",
      freightClass: "Class 70",
      notes: "",
    },
    // Main row for item 2
    {
      id: "item-2",
      isMainRow: true,
      verticalAlign: "top",
      item: "4687-ChocGranola-51...",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      shippedPalletQuantity: "",
      requiredQuantity: "26,000 eaches",
      shippedQuantity: "26,000 eaches",
      receivedQuantity: "26,000 eaches",
      freightClass: "",
      notes: "",
    },
    // Sub-rows for item 2
    {
      id: "item-2-sub-1",
      isSubRow: true,
      parentId: "item-2",
      verticalAlign: "top",
      item: "",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "ALC312",
      supplierLotCode: "-",
      expiryDate: "2026-09-06",
      shippedPalletQuantity: "260 CHEP",
      requiredQuantity: "",
      shippedQuantity: "13,000 eaches",
      receivedQuantity: "13,000 eaches",
      freightClass: "",
      notes: "",
    },
    {
      id: "item-2-sub-2",
      isSubRow: true,
      parentId: "item-2",
      verticalAlign: "top",
      item: "",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "CAR726",
      supplierLotCode: "-",
      expiryDate: "2026-09-26",
      shippedPalletQuantity: "260 CHEP",
      requiredQuantity: "",
      shippedQuantity: "13,000 eaches",
      receivedQuantity: "13,000 eaches",
      freightClass: "",
      notes: "",
    },
    // Total row for item 2
    {
      id: "item-2-total",
      isTotalRow: true,
      parentId: "item-2",
      verticalAlign: "top",
      item: "",
      poNumber: "",
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      shippedPalletQuantity: "",
      requiredQuantity: "26,000 eaches",
      shippedQuantity: "26,000 eaches",
      receivedQuantity: "26,000 eaches",
      freightClass: "Class 70",
      notes: "",
    },
  ];

  // Determine cell padding based on lot code configuration
  const cellPadding = showCustomerLotCode ? "x1" : "x2";
  // When customer is ON, use pt="x1" and pb="x3" for all cells except Lot code
  const cellPaddingTop = showCustomerLotCode ? "x1" : "x2";
  const cellPaddingBottom = showCustomerLotCode ? "x3" : "x2";
  // Header padding based on lot code configuration
  const headerPaddingBottom = showCustomerLotCode ? "x0_75" : "x1";

  // Table columns
  const columns = [
    {
      label: "Item",
      dataKey: "item",
      width: "200px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Item</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Sub-rows and total rows don't show item column
        if (row.isSubRow || row.isTotalRow) {
          return null;
        }
        return (
          <Box width="184px" ml="x1" mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            <TruncatedText fullWidth>{row.item}</TruncatedText>
          </Box>
        );
      },
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "120px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>PO number</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Total rows don't show PO number
        if (row.isTotalRow) {
          return null;
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            <Text color="midGrey">{row.poNumber || "-"}</Text>
          </Box>
        );
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "140px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Pallet number</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Total rows don't show pallet number
        if (row.isTotalRow) {
          return null;
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            <Text color="midGrey">{row.palletNumber || "-"}</Text>
          </Box>
        );
      },
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "240px",
      headerFormatter: () => {
        const label = getLotCodeHeaderLabel();
        return (
          <Box pt="x1" pb={headerPaddingBottom} pr="x1">
            <Text>Lot code</Text>
            {label && (
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                {label}
              </Text>
            )}
          </Box>
        );
      },
      cellRenderer: ({ row }: { row: any }) => {
        // Main rows don't show lot code
        if (row.isMainRow) {
          return (
            <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
              <Text color="midGrey">-</Text>
            </Box>
          );
        }
        // Total rows don't show lot code (return null instead of "-")
        if (row.isTotalRow) {
          return null;
        }

        // For sub-rows, determine primary and secondary values based on configuration
        let primaryValue: string;
        const secondaryValues: string[] = [];

        if (showCustomerLotCode) {
          // If Customer is checked, it's primary
          primaryValue = row.customerLotCode || "-";
          // Secondary row: Supplier
          if (showSupplierLotCode && row.supplierLotCode) {
            secondaryValues.push(row.supplierLotCode);
          }
        } else {
          // If Customer is not checked, Supplier is primary (only 1 value)
          primaryValue = row.supplierLotCode || "-";
        }

        // If all lot codes are empty or none are configured, don't render anything
        const hasAnyValue = row.customerLotCode || row.supplierLotCode;
        const hasAnyConfigured = showCustomerLotCode || showSupplierLotCode;
        if (!hasAnyValue || !hasAnyConfigured) {
          return (
            <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
              <Text color="midGrey">-</Text>
            </Box>
          );
        }

        // If customer is off, show only single value with x2 padding
        if (!showCustomerLotCode) {
          return (
            <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom} width="264px">
              <TruncatedText fullWidth fontSize="medium">
                {primaryValue}
              </TruncatedText>
            </Box>
          );
        }

        // If customer is on, show primary and secondary values
        return (
          <Flex
            mr="x1"
            pr="x1"
            py={secondaryValues.length > 0 ? "x0_75" : "x0_75"}
            gap="x0_25"
            flexDirection="column"
            alignItems="flex-start"
            style={{ alignSelf: "flex-start" }}
            width="264px"
          >
            <TruncatedText fullWidth fontSize="small" lineHeight="smallTextCompressed">
              {primaryValue}
            </TruncatedText>
            {secondaryValues.length > 0 && (
              <Flex gap="half" width="248px">
                {secondaryValues.map((value, index) => (
                  <React.Fragment key={index}>
                    {index > 0 && (
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                    )}
                    <TruncatedText fullWidth fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                      {value}
                    </TruncatedText>
                  </React.Fragment>
                ))}
              </Flex>
            )}
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "120px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Expiry date</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Total rows don't show expiry date
        if (row.isTotalRow) {
          return null;
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            {row.isMainRow ? <Text color="midGrey">-</Text> : <Text>{row.expiryDate || "-"}</Text>}
          </Box>
        );
      },
    },
    {
      label: "Shipped pallet quantity",
      dataKey: "shippedPalletQuantity",
      width: "180px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Shipped pallet quantity</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Total rows don't show shipped pallet quantity
        if (row.isTotalRow) {
          return null;
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            {row.isMainRow ? <Text color="midGrey">-</Text> : <Text>{row.shippedPalletQuantity || "-"}</Text>}
          </Box>
        );
      },
    },
    {
      label: "Required quantity",
      dataKey: "requiredQuantity",
      width: "140px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Required quantity</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Only main rows and total rows show required quantity
        if (row.isSubRow) {
          return (
            <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
              <Text color="midGrey">-</Text>
            </Box>
          );
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            <Text>{row.requiredQuantity}</Text>
          </Box>
        );
      },
    },
    {
      label: "Shipped quantity",
      dataKey: "shippedQuantity",
      width: "140px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Shipped quantity</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
          <Text>{row.shippedQuantity}</Text>
        </Box>
      ),
    },
    {
      label: "Received quantity",
      dataKey: "receivedQuantity",
      width: "140px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Received quantity</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
          <Text>{row.receivedQuantity}</Text>
        </Box>
      ),
    },
    {
      label: "Freight class",
      dataKey: "freightClass",
      width: "120px",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Freight class</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Total rows don't show freight class
        if (row.isTotalRow) {
          return (
            <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
              <Text color="midGrey">-</Text>
            </Box>
          );
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            <Text color="midGrey">-</Text>
          </Box>
        );
      },
    },
    {
      label: "Notes",
      dataKey: "notes",
      width: "auto",
      headerFormatter: () => (
        <Box pt="x1" pb={headerPaddingBottom}>
          <Text>Notes</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Total rows don't show notes
        if (row.isTotalRow) {
          return null;
        }
        return (
          <Box mr="x1" pt={cellPaddingTop} pb={cellPaddingBottom}>
            <Text color="midGrey">{row.notes || "-"}</Text>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
          
          /* Vertically align table header cells to top */
          table thead th {
            vertical-align: top !important;
          }
          
          /* Blur header content */
          header,
          [data-testid="header"],
          nav {
            filter: blur(3px);
            opacity: 0.5;
          }
          
          /* Blur tabs */
          [role="tablist"],
          [role="tab"] {
            filter: blur(3px);
            opacity: 0.5;
          }
          
          /* Blur status indicators - specifically OPEN (quiet) and RECEIVED (neutral) */
          [data-testid="status-indicator"],
          [role="status"] {
            filter: blur(3px) !important;
            opacity: 0.5 !important;
          }
          
          /* Blur delivery details section */
          dl,
          [data-testid="description-list"] {
            filter: blur(3px);
            opacity: 0.5;
          }
          
          /* Blur delivery title and details section title */
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          /* Target the delivery header section (Flex containing title and status) */
          div:has(> p[style*="font-size"]) + div:has([data-testid="status-indicator"]),
          div:has(> p[style*="font-size"]),
          /* Target Text components with large font size (delivery title) */
          p[style*="font-size: 18px"],
          p[style*="font-size: 1.125rem"] {
            filter: blur(3px) !important;
            opacity: 0.5 !important;
          }
          
          /* Blur all table columns except Lot code (4th column) */
          table thead th:not(:nth-child(4)),
          table tbody td:not(:nth-child(4)) {
            filter: blur(3px);
            opacity: 0.5;
          }
          
          /* Keep Lot code column (4th column) clear */
          table thead th:nth-child(4),
          table tbody td:nth-child(4) {
            filter: none !important;
            opacity: 1 !important;
          }
            
        `}
      </style>
      <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
        <Header breakpoints={{ medium: 1200 }} renderBreadcrumbs={() => breadcrumbs} title="Order 4310000007">
          <StatusIndicator type="quiet">OPEN</StatusIndicator>
        </Header>
        <Page>
          <Tabs selectedIndex={selectedTabIndex} onTabClick={(e, index) => setSelectedTabIndex(index)}>
            <Tab label="Details">
              <Box>
                <Text>Details content goes here...</Text>
              </Box>
            </Tab>
            <Tab label="Deliveries">
              <Card mt="x3" p="x3">
                {/* Delivery Header */}
                <Flex alignItems="center" gap="x1" mb="x3">
                  <Heading3 mb="0">Delivery 910000011</Heading3>
                  <StatusIndicator type="neutral">RECEIVED</StatusIndicator>
                </Flex>

                {/* Delivery Details */}
                <Box mb="x4">
                  <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 2, large: 4 }}>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Receiver</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.receiver}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Receiver address</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.receiverAddress}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Carrier</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.carrier}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Actual ship date</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        {deliveryDetails.actualShipDate}
                        {deliveryDetails.expectedShipDate && (
                          <Text as="span" color="midGrey" ml="x0_5">
                            (Expected {deliveryDetails.expectedShipDate})
                          </Text>
                        )}
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Shipping condition</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Text color="midGrey">{deliveryDetails.shippingCondition}</Text>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Carrier shipper appointment</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.carrierShipperAppointment}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Notes</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Text color="midGrey">{deliveryDetails.notes}</Text>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">TMS number</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.tmsNumber}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Actual receive date</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        {deliveryDetails.actualReceiveDate !== "-" ? (
                          deliveryDetails.actualReceiveDate
                        ) : (
                          <Text color="midGrey">{deliveryDetails.actualReceiveDate}</Text>
                        )}
                        {deliveryDetails.expectedReceiveDate && (
                          <Text as="span" color="midGrey" ml="x0_5">
                            (Expected {deliveryDetails.expectedReceiveDate})
                          </Text>
                        )}
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Pro number</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.proNumber}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Carrier receiver appointment</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>{deliveryDetails.carrierReceiverAppointment}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Trailer number</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Text color="midGrey">{deliveryDetails.trailerNumber}</Text>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Text color="darkGrey">Seal number</Text>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Text color="midGrey">{deliveryDetails.sealNumber}</Text>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>

                {/* Items Table */}
                <Box>
                  <Table columns={columns} rows={itemsData} keyField="id" rowBorder compact />
                </Box>
              </Card>
            </Tab>
            <Tab label="Attachments">
              <Box>
                <Text>Attachments content goes here...</Text>
              </Box>
            </Tab>
          </Tabs>
        </Page>
      </ApplicationFrame>

      {/* Floating Lot code configuration */}
      <Box
        position="fixed"
        bottom="x2"
        right="x2"
        zIndex={1001}
        backgroundColor="lightYellow"
        borderRadius="medium"
        boxShadow="large"
        p="x2"
        border="3px dotted"
        borderColor="yellow"
      >
        <Text fontSize="medium" fontWeight="medium" mb="x2">
          Configuration
        </Text>
        <Flex flexDirection="column" gap="x1">
          <Checkbox
            checked={showCustomerLotCode}
            onChange={(e) => setShowCustomerLotCode(e.target.checked)}
            labelText="Customer"
          />
          <Checkbox
            checked={showSupplierLotCode}
            onChange={(e) => setShowSupplierLotCode(e.target.checked)}
            labelText="Supplier"
            disabled
          />
        </Flex>
      </Box>
    </>
  );
};
