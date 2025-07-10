import React, { useState } from "react";
import {
  ApplicationFrame,
  Header,
  Page,
  Table,
  Box,
  Flex,
  IconicButton,
  VerticalDivider,
  Breadcrumbs,
  Link,
  Switcher,
  Switch,
  Text,
  Icon,
  StatusIndicator,
  TruncatedText,
} from "../../..";
import { AppTag } from "../../../AppTag";
import { poliRows } from "../utils/poliTableData";

export default {
  title: "Projects/Supplier Collaboration/POLI index/Compact",
};

export const Compact = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [role, setRole] = useState("supplier");

  const handleRowSelectionChange = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  // Create compact columns manually to avoid type issues
  const compactColumns = [
    {
      label: "",
      dataKey: "comments",
      width: "40px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" fontWeight="bold">
            <Icon icon="chatBubble" size="x2_5" />
          </Text>
        </Box>
      ),
      cellRenderer: () => (
        <Box width="100%" textAlign="center" pr="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">0</Text>
        </Box>
      ),
    },
    {
      label: "",
      dataKey: "attachments",
      width: "40px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" fontWeight="bold">
            <Icon icon="attachment" size="x2_5" />
          </Text>
        </Box>
      ),
      cellRenderer: () => (
        <Box width="100%" textAlign="center" pr="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">0</Text>
        </Box>
      ),
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">PO number</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex px="x1" py="x0_75">
          <Link as="span" href="#" fontSize="small" lineHeight="smallTextCompressed" underline={false} color="black" hover="blue">
            {cellData}
          </Link>
        </Flex>
      ),
    },
    {
      label: "Customer's/Supplier's PO line item number",
      dataKey: "combinedPoLineItem",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">PO line item number</Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">Customer's / Supplier's</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" py="x0_75" flexDirection="column" gap="x0_25">
          <Link href="#" underline={false} fontSize="small" lineHeight="smallTextCompressed" color="black" title={row.poLineItemNumber}>
            {row.poLineItemNumber}
          </Link>
          <Flex gap="half" maxWidth="168px">
            {row.id === "1" ? (
              <Link
                href="#"
                fontSize="small"
                lineHeight="smallTextCompressed"
                underline={false}
                color="midGrey"
                hover="blue"
                forApp="shop-floor"
              >
                
                  <TruncatedText maxWidth="150px" fullWidth fontSize="small" lineHeight="smallTextCompressed" color="midGrey">{row.supplierPoLineItemNumber}</TruncatedText>
                
              </Link>
            ) : (
              <TruncatedText maxWidth="168px" fullWidth fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                {row.supplierPoLineItemNumber}
              </TruncatedText>
            )}
          </Flex>
        </Flex>
      ),
    },
    {
      label: "Created on",
      dataKey: "createdOn",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Created on</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: role === "supplier" ? "Customer" : "Supplier",
      dataKey: "customer",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">{role === "supplier" ? "Customer" : "Supplier"}</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{role === "supplier" ? cellData : "MySupplier"}</Text>
        </Box>
      ),
    },
    {
      label: "Customer's item code and description",
      dataKey: "customerItemCodeAndDescription",
      width: "300px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Item code and description</Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">Customer's / Supplier's</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="half" py="x0_75" gap="x0_25" flexDirection="column">
          <Flex gap="half">
            <Link href="#" fontSize="small" lineHeight="smallTextCompressed" underline={false} color="black" hover="blue">
              {row.customerItemCode}
            </Link>{" "}
            <Text as="span" fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              {" "}
              / {row.supplierItemCode}
            </Text>
          </Flex>
          <TruncatedText maxWidth="292px" fullWidth fontSize="small" lineHeight="smallTextCompressed">
            {row.customerItemDescription}
          </TruncatedText>
        </Flex>
      ),
    },
    {
      label: "Problems and risks",
      dataKey: "problemsAndRisks",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Problems and risks</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex flexWrap="wrap" gap="x0_25" px="x1" py="x0_75">
          {cellData === "At risk" && <StatusIndicator type="warning">{cellData}</StatusIndicator>}
          {cellData === "Late" && <StatusIndicator type="danger">{cellData}</StatusIndicator>}
          {!cellData && <Text fontSize="small" lineHeight="smallTextCompressed">-</Text>}
        </Flex>
      ),
    },
    {
      label: "Tags",
      dataKey: "tags",
      width: "150px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Tags</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Priority",
      dataKey: "priority",
      width: "150px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Priority</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Production progress",
      dataKey: "productionProgress",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Production progress</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Latest comment",
      dataKey: "lastComment",
      width: "250px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Latest comment</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex px="half" py="x0_75" flexDirection="column" gap="x0_25">
          <Link href="#" fontSize="small" lineHeight="smallTextCompressed" underline={false} color="black" hover="blue">
            <TruncatedText maxWidth="242px" fullWidth fontSize="small" lineHeight="smallTextCompressed">{cellData}</TruncatedText>
          </Link>
          <TruncatedText maxWidth="242px" fullWidth fontSize="smaller" lineHeight="smallerText" color="midGrey">by John A. on Jan 24, 2025 at 04:00pm</TruncatedText>
        </Flex>







      ),
    },
    {
      label: "Collaboration status",
      dataKey: "collaborationStatus",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Collaboration status</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "150px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Quantity</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Production due date",
      dataKey: "productionDueDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Production due date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Unit price",
      dataKey: "unitPrice",
      width: "150px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Unit price</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Currency",
      dataKey: "currency",
      width: "150px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Currency</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Reason",
      dataKey: "reason",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Reason</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Change note",
      dataKey: "changeNote",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Change note</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "BOM revision and release date",
      dataKey: "bomRevisionAndReleaseDate",
      width: "250px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">BOM revision and release date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Materials availability date",
      dataKey: "materialsAvailabilityDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Materials availability date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Production start date",
      dataKey: "productionStartDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Production start date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Can run now",
      dataKey: "canRunNow",
      width: "150px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Can run now</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Can run on production start date",
      dataKey: "canRunProductionStartDate",
      width: "250px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Can run on production start date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Next production date",
      dataKey: "nextProductionDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Next production date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Close production note",
      dataKey: "closeProductionNote",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Close production note</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Carry over sent to",
      dataKey: "carryOverSentTo",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Carry over sent to</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          {cellData === "N/A" ? (
            <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
          ) : (
            <Link href="#" fontSize="small" lineHeight="smallTextCompressed" underline={false} color="black" hover="blue">
              {cellData}
            </Link>
          )}
        </Box>
      ),
    },
    {
      label: "Need by date",
      dataKey: "needByDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Need by date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Ship to",
      dataKey: "shipTo",
      width: "150px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Ship to</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Shipped quantity",
      dataKey: "shippedQuantity",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Shipped quantity</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Received quantity",
      dataKey: "receivedQuantity",
      width: "200px",
      headerFormatter: () => (
        <Box px="half" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">Received quantity</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">{cellData}</Text>
        </Box>
      ),
    },
  ];

  // Create rows with combined PO line item data
  const compactRows = poliRows.map((row) => ({
    ...row,
    combinedPoLineItem: `${row.poLineItemNumber}\n${row.supplierPoLineItemNumber}`,
  }));

  return (
    <ApplicationFrame>
      <Header breakpoints={{ medium: 1200 }} renderBreadcrumbs={() => breadcrumbs} title="PO line items" />
      <Page>
        <Flex justifyContent="flex-end" alignItems="center" mb="x3">
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="publish" aria-label="Import">
              Import
            </IconicButton>
            <IconicButton icon="getApp" aria-label="Export">
              Export
            </IconicButton>
            <VerticalDivider />
            <IconicButton icon="chatBubble" aria-label="Collaboration status">
              Collaboration status
            </IconicButton>
            <VerticalDivider />
            <IconicButton icon="filter" aria-label="Filters">
              Filters
            </IconicButton>
          </Flex>
        </Flex>
        <Box width="100%" overflowX="auto">
          <Box width="6000px">
            <style>
              {`
                tr {border-bottom: solid 1px #e4e7eb;} /* Needed because of Table bug - RowBorder not working */
                td, th {vertical-align: top;} /* Needed because of Table bug - verticalAlignment not working */
                th{padding-top: 0px !important; padding-bottom: 0px !important;} /* Needed because of Table bug - no compact header version */
                table td:nth-child(4),
                table th:nth-child(4) {
                  border-left: 1px solid #E0E0E0 !important;
                }
                table td:nth-child(9),
                table th:nth-child(9) {
                  border-left: 1px solid #E0E0E0 !important;
                }
              `}
            </style>
            <Table
              columns={compactColumns}
              rows={compactRows}
              hasSelectableRows
              selectedRows={selectedRows}
              onRowSelectionChange={handleRowSelectionChange}
              compact
              rowBorder
            />
          </Box>
        </Box>
      </Page>
      {/* Floating Supplier/Customer Switcher */}
      <Box
        position="fixed"
        bottom="x2"
        left="50%"
        transform="translateX(-50%)"
        zIndex={1000}
        backgroundColor="white"
        borderRadius="medium"
        boxShadow="large"
        p="x2"
        border="1px solid"
        borderColor="lightGrey"
        display="flex"
        alignItems="center"
      >
        <Text fontSize="small" mr="x2">
          View as:
        </Text>
        <Switcher selected={role} onChange={setRole}>
          <Switch value="supplier">Supplier</Switch>
          <Switch value="customer">Customer</Switch>
        </Switcher>
      </Box>
    </ApplicationFrame>
  );
};
