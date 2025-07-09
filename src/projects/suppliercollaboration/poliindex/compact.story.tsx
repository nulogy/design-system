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
      width: "60px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x1">
          <Text fontSize="small">
            <Icon icon="chatBubble" />
          </Text>
        </Box>
      ),
      cellRenderer: () => (
        <Box width="100%" textAlign="center" px="x1">
          <Text fontSize="small">0</Text>
        </Box>
      ),
    },
    {
      label: "",
      dataKey: "attachments",
      width: "60px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x1">
          <Text fontSize="small">
            <Icon icon="attachment" />
          </Text>
        </Box>
      ),
      cellRenderer: () => (
        <Box width="100%" textAlign="center" px="x1">
          <Text fontSize="small">0</Text>
        </Box>
      ),
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1">
          <Text fontSize="small">PO number</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1">
          <Link href="#" fontSize="small" underline={false} color="black" hover="blue">
            {cellData}
          </Link>
        </Box>
      ),
    },
    {
      label: "Customer's/Supplier's PO line item number",
      dataKey: "combinedPoLineItem",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1">
          <Text fontSize="small">PO line item number</Text>
          <Text fontSize="smaller">Customer's / Supplier's</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" flexDirection="column">
          <Link href="#" fontSize="small" underline={false} color="black" hover="blue" title={row.poLineItemNumber}>
            {row.poLineItemNumber}
          </Link>
          <Flex alignItems="center" gap="half">
            {row.id === "1" ? (
              <Link
                href="#"
                fontSize="smaller"
                lineHeight="smallerText"
                underline={false}
                color="black"
                hover="blue"
                forApp="shop-floor"
              >
                {row.supplierPoLineItemNumber}
              </Link>
            ) : (
              <Text as="span" fontSize="smaller" color="midGrey">
                {row.supplierPoLineItemNumber}
              </Text>
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
        <Box px="x1">
          <Text fontSize="small">Created on</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: role === "supplier" ? "Customer" : "Supplier",
      dataKey: "customer",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1">
          <Text fontSize="small">{role === "supplier" ? "Customer" : "Supplier"}</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1">
          <Text fontSize="small">{role === "supplier" ? cellData : "MySupplier"}</Text>
        </Box>
      ),
    },
    {
      label: "Customer's item code and description",
      dataKey: "customerItemCodeAndDescription",
      width: "300px",
      headerFormatter: () => (
        <Box px="x1">
          <Text fontSize="small">Item code and description</Text>
          <Text fontSize="smaller">Customer's / Supplier's</Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" flexDirection="column">
          <Box>
            <Link href="#" fontSize="small" underline={false} color="black" hover="blue">
              {row.customerItemCode}
            </Link>{" "}
            <Text as="span" fontSize="smaller" color="midGrey">
              {" "}
              / {row.supplierItemCode}
            </Text>
          </Box>
          <Text as="span" fontSize="smaller" color="midGrey">
            {row.customerItemDescription}
          </Text>
        </Flex>
      ),
    },
    {
      label: "Problems and risks",
      dataKey: "problemsAndRisks",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1">
          <Text fontSize="small">Problems and risks</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1">
          {cellData === "At risk" && <StatusIndicator type="warning">{cellData}</StatusIndicator>}
          {cellData === "Late" && <StatusIndicator type="danger">{cellData}</StatusIndicator>}
          {!cellData && <Text fontSize="small">-</Text>}
        </Box>
      ),
    },
    {
      label: "Tags",
      dataKey: "tags",
      width: "150px",
      headerFormatter: () => (
        <Box px="x1">
          <Text fontSize="small">Tags</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Priority",
      dataKey: "priority",
      width: "150px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Priority</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Production progress",
      dataKey: "productionProgress",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Production progress</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Latest comment",
      dataKey: "lastComment",
      width: "250px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Latest comment</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Link href="#" fontSize="small" underline={false} color="black" hover="blue">
            {cellData}
          </Link>
        </Box>
      ),
    },
    {
      label: "Collaboration status",
      dataKey: "collaborationStatus",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Collaboration status</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "150px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Quantity</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Production due date",
      dataKey: "productionDueDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Production due date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Unit price",
      dataKey: "unitPrice",
      width: "150px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Unit price</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Currency",
      dataKey: "currency",
      width: "150px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Currency</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Reason",
      dataKey: "reason",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Reason</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Change note",
      dataKey: "changeNote",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Change note</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "BOM revision and release date",
      dataKey: "bomRevisionAndReleaseDate",
      width: "250px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">BOM revision and release date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Materials availability date",
      dataKey: "materialsAvailabilityDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Materials availability date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Production start date",
      dataKey: "productionStartDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Production start date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Can run now",
      dataKey: "canRunNow",
      width: "150px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Can run now</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Can run on production start date",
      dataKey: "canRunProductionStartDate",
      width: "250px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Can run on production start date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Next production date",
      dataKey: "nextProductionDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Next production date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Close production note",
      dataKey: "closeProductionNote",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Close production note</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Carry over sent to",
      dataKey: "carryOverSentTo",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Carry over sent to</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          {cellData === "N/A" ? (
            <Text fontSize="small">{cellData}</Text>
          ) : (
            <Link href="#" fontSize="small" underline={false} color="black" hover="blue">
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
        <Box px="half">
          <Text fontSize="small">Need by date</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Ship to",
      dataKey: "shipTo",
      width: "150px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Ship to</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Shipped quantity",
      dataKey: "shippedQuantity",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Shipped quantity</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
        </Box>
      ),
    },
    {
      label: "Received quantity",
      dataKey: "receivedQuantity",
      width: "200px",
      headerFormatter: () => (
        <Box px="half">
          <Text fontSize="small">Received quantity</Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="half">
          <Text fontSize="small">{cellData}</Text>
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
