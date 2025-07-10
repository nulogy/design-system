import React from "react";
import { Text, StatusIndicator, Icon, Box, Link } from "../../..";

const headerBoxStyle = { paddingLeft: 8, paddingRight: 8 };

export const poliColumns = [
  {
    label: (
      <Box width="100%" textAlign="center" style={headerBoxStyle}>
        <Text fontSize="small">
          <Icon icon="chatBubble" />
        </Text>
      </Box>
    ),
    dataKey: "comments",
    width: "60px",
    cellRenderer: () => (
      <Box width="100%" textAlign="center" px="half">
        <Text fontSize="small">0</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box width="100%" textAlign="center" style={headerBoxStyle}>
        <Text fontSize="small">
          <Icon icon="attachment" />
        </Text>
      </Box>
    ),
    dataKey: "attachments",
    width: "60px",
    cellRenderer: () => (
      <Box width="100%" textAlign="center" px="half">
        <Text fontSize="small">0</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">PO number</Text>
      </Box>
    ),
    dataKey: "poNumber",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Link href="#" fontSize="small" underline={false}>
          {cellData}
        </Link>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">PO line item number</Text>
      </Box>
    ),
    dataKey: "poLineItemNumber",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Link href="#" fontSize="small" underline={false}>
          {cellData}
        </Link>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Supplier PO line item number</Text>
      </Box>
    ),
    dataKey: "supplierPoLineItemNumber",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Created on</Text>
      </Box>
    ),
    dataKey: "createdOn",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Customer</Text>
      </Box>
    ),
    dataKey: "customer",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Customer's item code and description</Text>
      </Box>
    ),
    dataKey: "customerItemCodeAndDescription",
    width: "300px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Link href="#" fontSize="small" underline={false}>
          {cellData}
        </Link>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Supplier's item code</Text>
      </Box>
    ),
    dataKey: "supplierItemCode",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Problems and risks</Text>
      </Box>
    ),
    dataKey: "problemsAndRisks",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        {cellData === "At risk" ? (
          <StatusIndicator type="warning" fontSize="small">
            At risk
          </StatusIndicator>
        ) : cellData === "Late" ? (
          <StatusIndicator type="danger" fontSize="small">
            Late
          </StatusIndicator>
        ) : (
          <Text fontSize="small">{cellData}</Text>
        )}
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Tags</Text>
      </Box>
    ),
    dataKey: "tags",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Priority</Text>
      </Box>
    ),
    dataKey: "priority",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Production progress</Text>
      </Box>
    ),
    dataKey: "productionProgress",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}%</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Last comment (Note)</Text>
      </Box>
    ),
    dataKey: "lastComment",
    width: "250px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Collaboration status</Text>
      </Box>
    ),
    dataKey: "collaborationStatus",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <StatusIndicator type={cellData === "accepted" ? "success" : cellData === "awaiting" ? "warning" : "quiet"}>
          {cellData === "accepted" ? "Accepted" : cellData === "awaiting" ? "Awaiting response" : "Draft"}
        </StatusIndicator>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Quantity</Text>
      </Box>
    ),
    dataKey: "quantity",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Production due date</Text>
      </Box>
    ),
    dataKey: "productionDueDate",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Unit price</Text>
      </Box>
    ),
    dataKey: "unitPrice",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Currency</Text>
      </Box>
    ),
    dataKey: "currency",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Reason</Text>
      </Box>
    ),
    dataKey: "reason",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Change note</Text>
      </Box>
    ),
    dataKey: "changeNote",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">BOM revision and release date</Text>
      </Box>
    ),
    dataKey: "bomRevisionAndReleaseDate",
    width: "250px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Materials availability date</Text>
      </Box>
    ),
    dataKey: "materialsAvailabilityDate",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Production start date</Text>
      </Box>
    ),
    dataKey: "productionStartDate",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Can run (now)</Text>
      </Box>
    ),
    dataKey: "canRunNow",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Can run (Production start date)</Text>
      </Box>
    ),
    dataKey: "canRunProductionStartDate",
    width: "250px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Next production date</Text>
      </Box>
    ),
    dataKey: "nextProductionDate",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Close production note</Text>
      </Box>
    ),
    dataKey: "closeProductionNote",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Carry over sent to</Text>
      </Box>
    ),
    dataKey: "carryOverSentTo",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Need by date</Text>
      </Box>
    ),
    dataKey: "needByDate",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Ship to</Text>
      </Box>
    ),
    dataKey: "shipTo",
    width: "150px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Shipped quantity</Text>
      </Box>
    ),
    dataKey: "shippedQuantity",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
  {
    label: (
      <Box style={headerBoxStyle}>
        <Text fontSize="small">Received quantity</Text>
      </Box>
    ),
    dataKey: "receivedQuantity",
    width: "200px",
    cellRenderer: ({ cellData }: { cellData: string }) => (
      <Box px="half">
        <Text fontSize="small">{cellData}</Text>
      </Box>
    ),
  },
];

export const poliRows = [
  {
    id: "1",
    poNumber: "4000023874",
    poLineItemNumber: "PO-2024-001-12345",
    supplierPoLineItemNumber: "SUP-PO-2024-001-23453",
    createdOn: "2024-01-01",
    customer: "MyCustomer",
    customerItemCode: "12345678",
    customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE OCT",
    customerItemCodeAndDescription: "12345678 - PR 24 SEPHORA ONLINE DELUXE OCT",
    supplierItemCode: "SUP-001",
    problemsAndRisks: "At risk",
    tags: "Urgent",
    priority: "High",
    productionProgress: "50",
    lastComment: "Initial proposal submitted with detailed specifications and quality requirements for the SEPHORA ONLINE DELUXE OCT collection",
    collaborationStatus: "awaiting",
    quantity: "100",
    productionDueDate: "2024-01-15",
    unitPrice: "$2.99",
    currency: "USD",
    reason: "Material availability",
    changeNote: "Initial proposal",
    bomRevisionAndReleaseDate: "Revision 2 - 2025-02-28",
    materialsAvailabilityDate: "2024-01-10",
    productionStartDate: "2024-01-12",
    canRunNow: "Yes",
    canRunProductionStartDate: "Yes",
    nextProductionDate: "2024-01-20",
    closeProductionNote: "Production on track",
    carryOverSentTo: "",
    needByDate: "2024-01-15",
    shipTo: "MySupplier TO",
    shippedQuantity: "0",
    receivedQuantity: "0",
  },
  {
    id: "2",
    poNumber: "4000023875",
    poLineItemNumber: "PO-2024-002-12346",
    supplierPoLineItemNumber: "SUP-PO-2024-002-23454",
    createdOn: "2024-01-02",
    customer: "MyCustomer",
    customerItemCode: "87654321",
    customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE NOV",
    customerItemCodeAndDescription: "87654321 - PR 24 SEPHORA ONLINE DELUXE NOV",
    supplierItemCode: "SUP-002",
    problemsAndRisks: "",
    tags: "Standard",
    priority: "Medium",
    productionProgress: "100",
    lastComment: "Production completed successfully with all quality checks passed and final inspection approved by quality assurance team",
    collaborationStatus: "accepted",
    quantity: "150",
    productionDueDate: "2024-01-20",
    unitPrice: "$3.15",
    currency: "USD",
    reason: "Volume discount",
    changeNote: "Final agreement",
    bomRevisionAndReleaseDate: "Revision 1 - 2025-01-15",
    materialsAvailabilityDate: "2024-01-05",
    productionStartDate: "2024-01-08",
    canRunNow: "Yes",
    canRunProductionStartDate: "Yes",
    nextProductionDate: "2024-01-25",
    closeProductionNote: "Production completed successfully",
    carryOverSentTo: "N/A",
    needByDate: "2024-01-20",
    shipTo: "MySupplier TO",
    shippedQuantity: "150",
    receivedQuantity: "150",
  },
  {
    id: "3",
    poNumber: "4000023876",
    poLineItemNumber: "PO-2024-003-12347",
    supplierPoLineItemNumber: "SUP-PO-2024-003-23455",
    createdOn: "2024-01-03",
    customer: "MyCustomer",
    customerItemCode: "11111111",
    customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE DEC",
    customerItemCodeAndDescription: "11111111 - PR 24 SEPHORA ONLINE DELUXE DEC",
    supplierItemCode: "SUP-003",
    problemsAndRisks: "Late",
    tags: "Review",
    priority: "High",
    productionProgress: "25",
    lastComment: "Quality review in progress - awaiting final approval from design team for color specifications and material composition",
    collaborationStatus: "draft",
    quantity: "75",
    productionDueDate: "2024-01-25",
    unitPrice: "$4.20",
    currency: "USD",
    reason: "Quality improvement",
    changeNote: "Quality review required",
    bomRevisionAndReleaseDate: "Revision 3 - 2025-03-15",
    materialsAvailabilityDate: "2024-01-15",
    productionStartDate: "2024-01-18",
    canRunNow: "No",
    canRunProductionStartDate: "Yes",
    nextProductionDate: "2024-01-30",
    closeProductionNote: "Awaiting quality approval",
    carryOverSentTo: "N/A",
    needByDate: "2024-01-25",
    shipTo: "MySupplier TO",
    shippedQuantity: "0",
    receivedQuantity: "0",
  },
  {
    id: "4",
    poNumber: "4000023877",
    poLineItemNumber: "PO-2024-004-12348",
    supplierPoLineItemNumber: "SUP-PO-2024-004-23456",
    createdOn: "2024-01-04",
    customer: "MyCustomer",
    customerItemCode: "22222222",
    customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE JAN",
    customerItemCodeAndDescription: "22222222 - PR 24 SEPHORA ONLINE DELUXE JAN",
    supplierItemCode: "SUP-004",
    problemsAndRisks: "",
    tags: "Standard",
    priority: "Low",
    productionProgress: "75",
    lastComment: "Production proceeding as planned with all materials received and assembly line running at optimal efficiency",
    collaborationStatus: "awaiting",
    quantity: "200",
    productionDueDate: "2024-01-30",
    unitPrice: "$1.85",
    currency: "USD",
    reason: "Standard order",
    changeNote: "No changes required",
    bomRevisionAndReleaseDate: "Revision 1 - 2025-01-20",
    materialsAvailabilityDate: "2024-01-08",
    productionStartDate: "2024-01-10",
    canRunNow: "Yes",
    canRunProductionStartDate: "Yes",
    nextProductionDate: "2024-02-05",
    closeProductionNote: "Production proceeding normally",
    carryOverSentTo: "N/A",
    needByDate: "2024-01-30",
    shipTo: "MySupplier TO",
    shippedQuantity: "50",
    receivedQuantity: "50",
  },
  {
    id: "5",
    poNumber: "4000023878",
    poLineItemNumber: "PO-2024-005-12349",
    supplierPoLineItemNumber: "SUP-PO-2024-005-23457",
    createdOn: "2024-01-05",
    customer: "MyCustomer",
    customerItemCode: "33333333",
    customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE FEB",
    customerItemCodeAndDescription: "33333333 - PR 24 SEPHORA ONLINE DELUXE FEB",
    supplierItemCode: "SUP-005",
    problemsAndRisks: "At risk",
    tags: "Urgent",
    priority: "High",
    productionProgress: "0",
    lastComment: "Materials delayed due to supply chain issues - awaiting shipment confirmation from overseas supplier with updated delivery timeline",
    collaborationStatus: "draft",
    quantity: "125",
    productionDueDate: "2024-02-05",
    unitPrice: "$3.75",
    currency: "USD",
    reason: "Delivery delay",
    changeNote: "Production delayed due to materials",
    bomRevisionAndReleaseDate: "Revision 2 - 2025-02-10",
    materialsAvailabilityDate: "2024-02-01",
    productionStartDate: "2024-02-03",
    canRunNow: "No",
    canRunProductionStartDate: "No",
    nextProductionDate: "2024-02-10",
    closeProductionNote: "Production delayed",
    carryOverSentTo: "N/A",
    needByDate: "2024-02-05",
    shipTo: "MySupplier TO",
    shippedQuantity: "0",
    receivedQuantity: "0",
  },
];

export function getPoliColumns(role: "supplier" | "customer") {
  // Deep clone columns to avoid mutating the original
  const columns = poliColumns.map((col) => ({ ...col }));

  if (role === "customer") {
    // Replace 'Customer' column with 'Supplier's'
    const customerIdx = columns.findIndex((col) => col.dataKey === "customer");
    if (customerIdx !== -1) {
      columns[customerIdx] = {
        ...columns[customerIdx],
        label: (
          <Box style={headerBoxStyle}>
            <Text fontSize="small">Supplier's</Text>
          </Box>
        ),
        dataKey: "supplier",
        cellRenderer: ({ cellData }: { cellData: string }) => (
          <Box px="half">
            <Text fontSize="small">{cellData}</Text>
          </Box>
        ),
      };
    }
    // Change label and dataKey for 'Customer\'s item code and description'
    const itemDescIdx = columns.findIndex((col) => col.dataKey === "customerItemCodeAndDescription");
    if (itemDescIdx !== -1) {
      columns[itemDescIdx] = {
        ...columns[itemDescIdx],
        label: (
          <Box style={headerBoxStyle}>
            <Text fontSize="small">Item code and description</Text>
          </Box>
        ),
        dataKey: "itemCodeAndDescription",
        cellRenderer: columns[itemDescIdx].cellRenderer,
      };
    }
    // Change 'Supplier PO line item number' to 'Supplier's PO line item number' in customer view
    const supplierPoLineItemIdx = columns.findIndex((col) => col.dataKey === "supplierPoLineItemNumber");
    if (supplierPoLineItemIdx !== -1) {
      columns[supplierPoLineItemIdx] = {
        ...columns[supplierPoLineItemIdx],
        label: (
          <Box style={headerBoxStyle}>
            <Text fontSize="small">Supplier's PO line item number</Text>
          </Box>
        ),
        cellRenderer: columns[supplierPoLineItemIdx].cellRenderer,
      };
    }
  } else if (role === "supplier") {
    // Change 'PO line item number' to 'Customer's PO line item number' in supplier view
    const poLineItemIdx = columns.findIndex((col) => col.dataKey === "poLineItemNumber");
    if (poLineItemIdx !== -1) {
      columns[poLineItemIdx] = {
        ...columns[poLineItemIdx],
        label: (
          <Box style={headerBoxStyle}>
            <Text fontSize="small">Customer's PO line item number</Text>
          </Box>
        ),
        cellRenderer: columns[poLineItemIdx].cellRenderer,
      };
    }
    // Change 'Supplier PO line item number' to 'Supplier's PO line item number' in supplier view
    const supplierPoLineItemIdx = columns.findIndex((col) => col.dataKey === "supplierPoLineItemNumber");
    if (supplierPoLineItemIdx !== -1) {
      columns[supplierPoLineItemIdx] = {
        ...columns[supplierPoLineItemIdx],
        label: (
          <Box style={headerBoxStyle}>
            <Text fontSize="small">Supplier's PO line item number</Text>
          </Box>
        ),
        cellRenderer: columns[supplierPoLineItemIdx].cellRenderer,
      };
    }
  }
  return columns;
}

export function getPoliRows(role: "supplier" | "customer") {
  if (role === "customer") {
    // Map the rows to use the correct data keys for customer view
    return poliRows.map((row) => ({
      ...row,
      supplier: row.customer, // Map customer data to supplier key
      itemCodeAndDescription: row.customerItemCodeAndDescription, // Map customer item data to item key
    }));
  }
  return poliRows;
}
