import React, { useState } from "react";
import { toast, Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
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
  Sidebar,
  Form,
  FormSection,
  Field,
  FieldLabel,
  Input,
  PrimaryButton,
  QuietButton,
  DatePicker,
  Select,
  Textarea,
  Toggle,
  Switcher,
  Switch,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Pagination,
} from "../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Details 9",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Production planning", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Quality control", href: "/" },
];

const secondaryMenu = [
  {
    name: "POLI lot",
    items: [
      { name: "Overview", href: "/" },
      { name: "Production records", href: "/" },
      { name: "Quality reports", href: "/" },
    ],
  },
];

export const Details9 = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Production records tab is index 1
  const [showProductionSidebar, setShowProductionSidebar] = useState(false);
  const [isEditingProduction, setIsEditingProduction] = useState(false);
  const [productionEntryType, setProductionEntryType] = useState<"quick" | "detailed">("quick");
  const [historyLogFilter, setHistoryLogFilter] = useState("All");
  const [actualQuantity, setActualQuantity] = useState("");
  const [productionRows, setProductionRows] = useState([
    {
      id: "row-1",
      outputNumber: "Output #001",
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      quantity: "",
    },
  ]);
  const [rowNotes, setRowNotes] = useState<Record<string, string>>({});
  const [rowConsumptions, setRowConsumptions] = useState<
    Record<
      string,
      Array<{
        id: string;
        item: string;
        lotCode: string;
        expiryDate: string;
        palletNumber: string;
        quantity: string;
        uom: string;
      }>
    >
  >({});

  // Header and Summary state
  const [userState] = useState({ role: "supplier" });
  const [productionComplete] = useState(false);
  const [collaborationState] = useState({
    status: "awaiting",
    activeCardAuthorRole: "customer",
  });
  const [acceptedItems] = useState({ request: false, proposal: false });
  const [poStatus] = useState("On time");

  // Edit state
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  const [editFormData, setEditFormData] = useState({
    supplierPOLineItemNumber: "SPLI-001",
    bomRevision: "Rev 1.2 – 2025-Jan-10",
    needByDate: new Date("2025-02-15"),
    carryOverSentTo: "",
  });

  // Details data
  const [detailsData] = useState({
    poNumber: "PO-2025-001",
    customerPoLineItem: "PLI-001",
    supplierPoLineItem: "SPLI-001",
    createdOn: "2025-Jan-15",
    supplier: "Global Manufacturing Co.",
    customerItemCode: "ITEM-001 – Premium Packaging Solution",
    supplierItemCode: "GMC-001",
    priority: "2 - Medium",
    itemOrderType: "Standard",
    customerLotCode: "LOT-2025-001",
    supplierLotCode: "GMC-LOT-001",
    expiryDate: "2026-01-15",
    bomRevision: "Rev 1.2 – 2025-Jan-10",
    productionStartDate: "2025-Feb-01",
    shipTo: "Global Manufacturing Co. Distribution Center",
    needByDate: "2025-Feb-15",
  });

  // SummaryDivider component
  const SummaryDivider = () => <Box width="1px" height="x6" backgroundColor="lightGrey" mx="x2" />;

  // Handler functions
  const handleCancelPOLineItem = () => {
    console.log("Cancel PO line item");
    // Add proper modal handling here if needed
    toast.success("PO line item cancellation initiated");
  };

  const handleEditDetails = () => {
    setShowEditSidebar(true);
  };

  const handleCloseEditSidebar = () => {
    setShowEditSidebar(false);
  };

  const handleSaveEditDetails = () => {
    setShowEditSidebar(false);
    toast.success("PO line item details saved successfully");
  };

  const [showConsumptionSidebar, setShowConsumptionSidebar] = useState(false);
  const [showAddConsumptionSidebar, setShowAddConsumptionSidebar] = useState(false);
  const [consumptionItems, setConsumptionItems] = useState([
    {
      id: "consumption-item-1",
      item: "",
      lotCode: "",
      expiryDate: null as Date | null,
      palletNumber: "",
      consumedQuantity: "",
      uom: "",
      parentDate: undefined as string | undefined,
      parentActualQuantity: undefined as string | undefined,
    },
  ]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [nestedExpandedRows, setNestedExpandedRows] = useState<string[]>([]);
  const [productionRecord, setProductionRecord] = useState({
    date: "",
    uom: "",
    expectedQuantity: "",
    actualQuantity: "",
    lotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    producedQuantity: "",
    note: "",
  });
  const [productionBatches, setProductionBatches] = useState([]);
  const [consumptionMaterials, setConsumptionMaterials] = useState([]);
  const [role, setRole] = useState("customer");
  const [showConfigBar, setShowConfigBar] = useState(true);
  const [fieldConfig, setFieldConfig] = useState({
    lotCodeRequired: true,
    palletNumberRequired: true,
    expiryDateRequired: true,
    sanofiRequired: true,
  });

  const primaryMenu = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Orders", href: "/orders" },
    { label: "Inventory", href: "/inventory" },
  ];

  const secondaryMenu = [
    { label: "Settings", href: "/settings" },
    { label: "Help", href: "/help" },
  ];

  const uomOptions = [
    { label: "Cases (cs)", value: "cs" },
    { label: "Pieces (pcs)", value: "pcs" },
    { label: "Kilograms (kg)", value: "kg" },
    { label: "Pounds (lbs)", value: "lbs" },
    { label: "Meters (m)", value: "m" },
    { label: "Feet (ft)", value: "ft" },
  ];

  const unitOptions = [
    { label: "kg", value: "kg" },
    { label: "g", value: "g" },
    { label: "mg", value: "mg" },
    { label: "lbs", value: "lbs" },
    { label: "oz", value: "oz" },
    { label: "ml", value: "ml" },
    { label: "l", value: "l" },
  ];

  // Nested table data for each expandable row
  const nestedTableData1 = [
    {
      id: "1-1",
      output: "Output #001",
      actualQuantity: "0 cases",
      lotCode: "LOT-2025-001",
      supplierLotCode: "SUP-LOT-001",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001",
      note: "Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements",
      expandedContent: () => (
        <Box>
          <Box mb="x1" p="x1" backgroundColor="lightBlue" borderRadius="small">
            <Text fontSize="small" color="darkBlue" fontWeight="medium">
              Output #001 - Production Batch Details
            </Text>
          </Box>
          <ConsumptionReport materials={[]} parentData={{ date: "2025-Feb-12", actualQuantity: "0 cases" }} />
        </Box>
      ),
    },
    {
      id: "1-2",
      output: "Output #001",
      actualQuantity: "5 cases",
      lotCode: "LOT-2025-001A",
      supplierLotCode: "SUP-LOT-001A",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001A",
      note: "Additional batch from same production run",
      expandedContent: () => (
        <Box>
          <Box mb="x1" p="x1" backgroundColor="lightGreen" borderRadius="small">
            <Text fontSize="small" color="darkGreen" fontWeight="medium">
              Output #001 - Additional Batch Information
            </Text>
          </Box>
          <ConsumptionReport
            materials={materialsData2}
            parentData={{ date: "2025-Feb-12", actualQuantity: "5 cases" }}
          />
        </Box>
      ),
    },
    {
      id: "1-3",
      output: "Output #001",
      actualQuantity: "3 cases",
      lotCode: "LOT-2025-001B",
      supplierLotCode: "SUP-LOT-001B",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001B",
      note: "Final batch completion",
      expandedContent: () => (
        <Box>
          <Box mb="x1" p="x1" backgroundColor="lightYellow" borderRadius="small">
            <Text fontSize="small" color="darkYellow" fontWeight="medium">
              Output #001 - Final Batch Completion
            </Text>
          </Box>
          <ConsumptionReport
            materials={materialsData1}
            parentData={{ date: "2025-Feb-12", actualQuantity: "3 cases" }}
          />
        </Box>
      ),
    },
  ];

  const nestedTableData2 = [
    {
      id: "2-1",
      output: "Output #002",
      actualQuantity: "12 cases",
      lotCode: "LOT-2025-002",
      supplierLotCode: "SUP-LOT-002",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-002",
      note: "Standard production run with normal quality metrics",
      expandedContent: () => (
        <ConsumptionReport
          materials={materialsData1}
          parentData={{ date: "2025-Mar-15", actualQuantity: "12 cases" }}
        />
      ),
    },
  ];

  const nestedTableData3 = [
    {
      id: "3-1",
      output: "Output #003",
      actualQuantity: "25 cases",
      lotCode: "LOT-2025-003",
      supplierLotCode: "SUP-LOT-003",
      expiryDate: "2026-04-20",
      palletNumber: "PAL-003",
      note: "High volume production batch for major customer order",
      expandedContent: () => (
        <Box>
          <Box mb="x1" p="x1" backgroundColor="lightOrange" borderRadius="small">
            <Text fontSize="small" color="darkOrange" fontWeight="medium">
              Output #003 - High Volume Production
            </Text>
          </Box>
          <ConsumptionReport
            materials={materialsData1}
            parentData={{ date: "2025-Apr-20", actualQuantity: "25 cases" }}
          />
        </Box>
      ),
    },
  ];

  const nestedTableData4 = [
    {
      id: "4-1",
      actualQuantity: "0 cases",
      lotCode: "LOT-2025-004",
      supplierLotCode: "SUP-LOT-004",
      expiryDate: "2026-08-08",
      palletNumber: "PAL-004",
      note: "Equipment maintenance scheduled, production line optimization in progress",
      expandedContent: () => (
        <Box>
          <Box mb="x1" p="x1" backgroundColor="lightRed" borderRadius="small">
            <Text fontSize="small" color="darkRed" fontWeight="medium">
              Equipment Maintenance - Production On Hold
            </Text>
          </Box>
          <ConsumptionReport materials={[]} parentData={{ date: "2025-Aug-08", actualQuantity: "0 cases" }} />
        </Box>
      ),
    },
  ];

  const nestedTableData5 = [
    {
      id: "5-1",
      actualQuantity: "8 cases",
      lotCode: "LOT-2025-005A",
      supplierLotCode: "SUP-LOT-005A",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-005A",
      note: "First batch from production run",
      expandedContent: () => (
        <ConsumptionReport
          materials={materialsData5A}
          parentData={{ date: "2025-May-15", actualQuantity: "8 cases" }}
        />
      ),
    },
    {
      id: "5-2",
      actualQuantity: "4 cases",
      lotCode: "LOT-2025-005B",
      supplierLotCode: "SUP-LOT-005B",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-005B",
      note: "Second batch completion",
      expandedContent: () => (
        <ConsumptionReport
          materials={materialsData5B}
          parentData={{ date: "2025-May-15", actualQuantity: "4 cases" }}
        />
      ),
    },
  ];

  const nestedTableData6 = [
    {
      id: "6-1",
      actualQuantity: "15 cases",
      lotCode: "LOT-2025-006A",
      supplierLotCode: "SUP-LOT-006A",
      expiryDate: "2026-04-22",
      palletNumber: "PAL-006A",
      note: "Quality approved batch",
      expandedContent: () => (
        <ConsumptionReport
          materials={materialsData6A}
          parentData={{ date: "2025-Apr-22", actualQuantity: "10 cases" }}
        />
      ),
    },
    {
      id: "6-2",
      actualQuantity: "8 cases",
      lotCode: "LOT-2025-006B",
      supplierLotCode: "SUP-LOT-006B",
      expiryDate: "2026-04-22",
      palletNumber: "PAL-006B",
      note: "Partial batch with quality issues",
      expandedContent: () => <ConsumptionReport materials={materialsData6B} />,
    },
  ];

  const nestedTableData7 = [
    {
      id: "7-1",
      actualQuantity: "0 cases",
      lotCode: "LOT-2025-007A",
      supplierLotCode: "SUP-LOT-007A",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-007A",
      note: "Production on hold - awaiting materials",
      expandedContent: () => <ConsumptionReport materials={materialsData7A} />,
    },
    {
      id: "7-2",
      actualQuantity: "0 cases",
      lotCode: "LOT-2025-007B",
      supplierLotCode: "SUP-LOT-007B",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-007B",
      note: "Delayed batch - material shortage",
      expandedContent: () => <EmptyConsumptionReport />,
    },
  ];

  const nestedTableData8 = [
    {
      id: "8-1",
      actualQuantity: "15 cases",
      lotCode: "LOT-2025-008",
      supplierLotCode: "SUP-LOT-008",
      expiryDate: "2026-06-05",
      palletNumber: "PAL-008",
      note: "Special order for premium customer, expedited processing",
      expandedContent: () => <ConsumptionReport materials={materialsData1} />,
    },
  ];

  // Nested table columns configuration
  const nestedTableColumns = [
    {
      label: "Output",
      dataKey: "output",
      width: "252px",
      cellRenderer: ({ row }: { row: any }) => {
        return (
          <Flex py="x2" mr="x1">
            <Text color="midGrey" fontSize="small">
              {row.output}
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Actual quantity",
      dataKey: "actualQuantity",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        return (
          <Flex py="x2" mr="x1">
            <Text>{row.actualQuantity}</Text>
          </Flex>
        );
      },
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If lot code is not required in config, show "-"
        if (!fieldConfig.lotCodeRequired) {
          return (
            <Flex py="x2">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }

        // If all lot codes are empty, don't render anything
        if (!row.lotCode && !row.supplierLotCode) {
          return null;
        }

        return (
          <Flex py="x2" gap="x0_25" flexDirection="column">
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.lotCode || ""}
            </TruncatedText>
            <TruncatedText
              fullWidth
              width="auto"
              maxWidth="152px"
              fontSize="small"
              lineHeight="smallTextCompressed"
              color="midGrey"
            >
              {row.supplierLotCode || ""}
            </TruncatedText>
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // If expiry date is not required in config, show "-"
        if (!fieldConfig.expiryDateRequired) {
          return (
            <Flex py="x2">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }

        // If expiry date is empty, don't render anything
        if (!row.expiryDate) {
          return null;
        }

        const formattedDate = formatDateToYYYYMonDD(row.expiryDate);
        return <Text>{formattedDate}</Text>;
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If pallet number is not required in config, show "-"
        if (!fieldConfig.palletNumberRequired) {
          return (
            <Flex py="x2">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }

        // If pallet number is empty, don't render anything
        if (!row.palletNumber) {
          return null;
        }

        return row.palletNumber;
      },
    },
    {
      label: "Note",
      dataKey: "note",
      width: "auto",
      cellRenderer: ({ row }: { row: any }) => {
        // If note is empty, don't render anything
        if (!row.note) {
          return null;
        }

        return (
          <Box py="x1">
            <Tooltip tooltip={row.note} placement="top">
              <Text
                fontSize="small"
                lineHeight="smallTextCompressed"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxHeight: "2.4em", // 2 lines * 1.2em line height
                  cursor: "help",
                }}
              >
                {row.note}
              </Text>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      label: "",
      dataKey: "spacer",
      width: "48px",
      headerFormatter: () => null,
      cellRenderer: () => null,
    },
  ];

  // Production records data
  const productionRecordsData = [
    {
      id: "1",
      date: "2025-Feb-12",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-001",
      supplierLotCode: "SUP-LOT-001",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001",
      expectedQuantity: "18 cases",
      actualQuantity: "8 cases",
      note: "Initial production batch with quality control checks completed",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData1}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "2",
      date: "2025-Mar-15",
      lotCodeAndExpiry: "LOT-2025-002",
      customerLotCode: "LOT-2025-002",
      supplierLotCode: "SUP-LOT-002",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-002",
      expectedQuantity: "12 cases",
      actualQuantity: "12 cases",
      note: "Standard production run with normal quality metrics",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData2}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "3",
      date: "2025-Apr-20",
      lotCodeAndExpiry: "LOT-2025-003",
      customerLotCode: "LOT-2025-003",
      supplierLotCode: "SUP-LOT-003",
      expiryDate: "2026-04-20",
      palletNumber: "PAL-003",
      expectedQuantity: "25 cases",
      actualQuantity: "25 cases",
      note: "High volume production batch for major customer order",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData3}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "4",
      date: "2025-Aug-08",
      lotCodeAndExpiry: "LOT-2025-004",
      customerLotCode: "LOT-2025-004",
      supplierLotCode: "SUP-LOT-004",
      expiryDate: "2026-08-08",
      palletNumber: "PAL-004",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "Equipment maintenance scheduled, production line optimization in progress",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData4}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "5",
      date: "2025-Mar-15",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-005",
      supplierLotCode: "SUP-LOT-005",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-005",
      expectedQuantity: "12 cases",
      actualQuantity: "12 cases",
      note: "Multi-batch production run with quality variations",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData5}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "6",
      date: "2025-Apr-22",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-006",
      supplierLotCode: "SUP-LOT-006",
      expiryDate: "2026-04-22",
      palletNumber: "PAL-006",
      expectedQuantity: "23 cases",
      actualQuantity: "23 cases",
      note: "Quality control batch with mixed results",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData6}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "7",
      date: "2025-May-10",
      lotCodeAndExpiry: "",
      customerLotCode: "LOT-2025-007",
      supplierLotCode: "SUP-LOT-007",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-007",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "Production on hold due to material shortage and supply chain delays",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "48px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData7}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
            />
          </Box>
        </Box>
      ),
    },
  ];

  const productionRecordsColumns = [
    {
      label: "Date",
      dataKey: "date",
      width: "120px",
      minWidth: "120px",
    },
    {
      label: "Expected quantity",
      dataKey: "expectedQuantity",
      width: "180px",
      minWidth: "180px",
    },
    {
      label: "Actual quantity",
      dataKey: "actualQuantity",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        return (
          <Flex py="x0_75" mr="x1">
            <Text>{row.actualQuantity}</Text>
          </Flex>
        );
      },
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "180px",
      headerFormatter: () => (
        <Box pt="x1_25" pb="x0_75">
          <Text>Lot code</Text>
          <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
            Customer's / Supplier's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Always show blank for parent table rows since detailed info is in nested tables
        return null;
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // Always show blank for parent table rows since detailed info is in nested tables
        return null;
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // Always show blank for parent table rows since detailed info is in nested tables
        return null;
      },
    },
    {
      label: "Note",
      dataKey: "note",
      width: "auto",
      cellRenderer: ({ row }: { row: any }) => {
        // Always show blank for parent table rows since detailed info is in nested tables
        return null;
      },
    },
    {
      label: "",
      dataKey: "actions",
      width: "32px",
      headerFormatter: () => null,
      cellRenderer: (props: { row: any }) => {
        // Hide the entire dropdown when Sanofi ref ID is off
        if (!fieldConfig.sanofiRequired) {
          return null;
        }

        return (
          <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
            <DropdownButton onClick={() => handleEditProduction(props.row)}>Edit production</DropdownButton>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddProduction = () => {
    setIsEditingProduction(false);
    setProductionBatches([]); // Clear batches when adding new production
    setProductionRecord({
      date: "",
      uom: "",
      expectedQuantity: "",
      actualQuantity: "",
      lotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      palletNumber: "",
      producedQuantity: "",
      note: "",
    });
    setShowProductionSidebar(true);
  };

  const handleEditProduction = (rowData: any) => {
    setIsEditingProduction(true);
    setProductionEntryType("detailed"); // Set to detailed mode for editing

    // Map row data to production record format
    setProductionRecord({
      date: rowData.date || "",
      uom: rowData.expectedQuantity ? rowData.expectedQuantity.split(" ")[1] || "" : "",
      expectedQuantity: rowData.expectedQuantity ? rowData.expectedQuantity.split(" ")[0] || "" : "",
      actualQuantity: rowData.actualQuantity ? rowData.actualQuantity.split(" ")[0] || "" : "",
      lotCode: rowData.customerLotCode || "",
      supplierLotCode: rowData.supplierLotCode || "",
      expiryDate: rowData.expiryDate || "",
      palletNumber: rowData.palletNumber || "",
      producedQuantity: rowData.actualQuantity ? rowData.actualQuantity.split(" ")[0] || "" : "",
      note: rowData.note || "",
    });

    // Populate production rows based on the row's nested data
    let nestedData = [];
    switch (rowData.id) {
      case "1":
        nestedData = nestedTableData1;
        break;
      case "2":
        nestedData = nestedTableData2;
        break;
      case "3":
        nestedData = nestedTableData3;
        break;
      case "4":
        nestedData = nestedTableData4;
        break;
      case "5":
        nestedData = nestedTableData5;
        break;
      default:
        nestedData = [];
    }

    // Convert nested data to production rows format
    const rows = nestedData.map((batch, index) => ({
      id: `row-${index + 1}`,
      outputNumber: batch.outputNumber || "",
      palletNumber: batch.palletNumber || "",
      customerLotCode: batch.customerLotCode || "",
      supplierLotCode: batch.supplierLotCode || "",
      expiryDate: batch.expiryDate || "",
      quantity: batch.actualQuantity ? batch.actualQuantity.split(" ")[0] || "" : "",
    }));

    // Populate notes from nested data
    const notes: Record<string, string> = {};
    nestedData.forEach((batch, index) => {
      if (batch.note) {
        notes[`row-${index + 1}`] = batch.note;
      }
    });

    setProductionRows(rows);
    setRowNotes(notes);

    // Extract consumption materials data for each production row
    const newRowConsumptions: Record<
      string,
      Array<{
        id: string;
        item: string;
        lotCode: string;
        expiryDate: string;
        palletNumber: string;
        quantity: string;
        uom: string;
      }>
    > = {};

    // For each production row, try to find corresponding consumption data
    rows.forEach((row, index) => {
      // Try to find consumption data from the corresponding batch
      const batch = nestedData[index];
      if (batch && batch.expandedContent && typeof batch.expandedContent === "function") {
        try {
          const expandedContent = batch.expandedContent();
          if (
            expandedContent &&
            expandedContent.props &&
            expandedContent.props.materials &&
            expandedContent.props.materials.length > 0
          ) {
            newRowConsumptions[row.id] = expandedContent.props.materials.map(
              (material: any, materialIndex: number) => ({
                ...material,
                id: material.id || `consumption-${Date.now()}-${index}-${materialIndex}`,
              })
            );
          }
        } catch (error) {
          console.log(`Error extracting consumption materials for row ${index}:`, error);
        }
      }
    });

    console.log("Extracted consumption materials for rows:", newRowConsumptions);
    setRowConsumptions(newRowConsumptions);
    setShowProductionSidebar(true);
  };

  const handleCloseProductionSidebar = () => {
    setShowProductionSidebar(false);
    setIsEditingProduction(false);
    setProductionEntryType("quick");
    setActualQuantity("");
    setProductionRows([
      {
        id: "row-1",
        outputNumber: "",
        palletNumber: "",
        customerLotCode: "",
        supplierLotCode: "",
        expiryDate: "",
        quantity: "",
      },
    ]);
    setRowNotes({});
    setRowConsumptions({});
    setProductionRecord({
      date: "",
      uom: "",
      expectedQuantity: "",
      actualQuantity: "",
      lotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      palletNumber: "",
      producedQuantity: "",
      note: "",
    });
    setProductionBatches([]);
  };

  const handleProductionFieldChange = (field: string, value: string) => {
    setProductionRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddAnotherProduction = () => {
    const newBatch = {
      id: `batch-${Date.now()}`,
      lotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      palletNumber: "",
      producedQuantity: "",
      note: "",
    };
    setProductionBatches((prev) => [...prev, newBatch]);
  };

  const handleRemoveBatch = (batchId: string) => {
    setProductionBatches((prev) => prev.filter((batch) => batch.id !== batchId));
  };

  const handleBatchFieldChange = (batchId: string, field: string, value: string) => {
    setProductionBatches((prev) => prev.map((batch) => (batch.id === batchId ? { ...batch, [field]: value } : batch)));
  };

  const handleFieldConfigChange = (field: string, value: boolean) => {
    setFieldConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProduction = () => {
    toast.success("Production record saved successfully!");
    handleCloseProductionSidebar();
  };

  const handleProductionRowChange = (rowId: string, field: string, value: string) => {
    setProductionRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)));
  };

  const handleAddProductionRow = () => {
    const newRow = {
      id: `row-${Date.now()}`,
      outputNumber: `Output #${String(productionRows.length + 1).padStart(3, "0")}`,
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      quantity: "",
    };
    setProductionRows((prev) => [...prev, newRow]);
  };

  const handleRemoveProductionRow = (rowId: string) => {
    if (productionRows.length > 1) {
      setProductionRows((prev) => prev.filter((row) => row.id !== rowId));
    }
  };

  const handleAddNote = (rowId: string) => {
    setRowNotes((prev) => ({
      ...prev,
      [rowId]: prev[rowId] || "",
    }));
  };

  const handleNoteChange = (rowId: string, value: string) => {
    setRowNotes((prev) => ({
      ...prev,
      [rowId]: value,
    }));
  };

  const handleAddConsumptionForRow = (rowId: string) => {
    setRowConsumptions((prev) => ({
      ...prev,
      [rowId]: prev[rowId] || [
        {
          id: `consumption-${Date.now()}`,
          item: "",
          lotCode: "",
          expiryDate: "",
          palletNumber: "",
          quantity: "",
          uom: "",
        },
      ],
    }));
  };

  const handleConsumptionRowChange = (rowId: string, consumptionId: string, field: string, value: string) => {
    setRowConsumptions((prev) => ({
      ...prev,
      [rowId]:
        prev[rowId]?.map((consumption) =>
          consumption.id === consumptionId ? { ...consumption, [field]: value } : consumption
        ) || [],
    }));
  };

  const handleAddConsumptionRow = (rowId: string) => {
    const newConsumption = {
      id: `consumption-${Date.now()}`,
      item: "",
      lotCode: "",
      expiryDate: "",
      palletNumber: "",
      quantity: "",
      uom: "",
    };
    setRowConsumptions((prev) => ({
      ...prev,
      [rowId]: [...(prev[rowId] || []), newConsumption],
    }));
  };

  const handleRemoveConsumptionRow = (rowId: string, consumptionId: string) => {
    console.log("Removing consumption row:", rowId, consumptionId);
    setRowConsumptions((prev) => {
      const currentConsumptions = prev[rowId] || [];
      const filteredConsumptions = currentConsumptions.filter((consumption) => consumption.id !== consumptionId);
      console.log("Before:", currentConsumptions.length, "After:", filteredConsumptions.length);
      return {
        ...prev,
        [rowId]: filteredConsumptions,
      };
    });
  };

  const handleOpenConsumptionSidebar = (
    materials: Array<{ item: string; lotCode: string; expiryDate: string; palletNumber: string; quantity: string }>,
    parentData?: { date: string; actualQuantity: string }
  ) => {
    // Parse materials and set up consumption items for the add consumption form
    const parsedItems = materials.map((material, index) => {
      const parts = material.quantity.split(" ");
      return {
        id: `consumption-item-${index + 1}`,
        item: material.item,
        lotCode: material.lotCode,
        expiryDate: material.expiryDate ? new Date(material.expiryDate) : null,
        palletNumber: material.palletNumber,
        consumedQuantity: parts[0] || "",
        uom: parts[1] || "",
        // Store parent data for help text
        parentDate: parentData?.date,
        parentActualQuantity: parentData?.actualQuantity,
      };
    });
    setConsumptionItems(parsedItems);
    setShowAddConsumptionSidebar(true);
  };

  const handleCloseConsumptionSidebar = () => {
    setShowConsumptionSidebar(false);
    setConsumptionMaterials([]);
  };

  const handleConsumptionFieldChange = (materialId: string, field: string, value: string) => {
    setConsumptionMaterials((prev) =>
      prev.map((material) => (material.id === materialId ? { ...material, [field]: value } : material))
    );
  };

  const handleSaveConsumption = () => {
    toast.success("Subcomponent consumption saved successfully!");
    handleCloseConsumptionSidebar();
  };

  const handleAddConsumptionReport = () => {
    setShowAddConsumptionSidebar(true);
  };

  const handleCloseAddConsumptionSidebar = () => {
    setShowAddConsumptionSidebar(false);
    setConsumptionItems([
      {
        id: "consumption-item-1",
        item: "",
        lotCode: "",
        expiryDate: null,
        palletNumber: "",
        consumedQuantity: "",
        uom: "",
        parentDate: undefined,
        parentActualQuantity: undefined,
      },
    ]);
  };

  const handleSaveAddConsumption = () => {
    toast.success("Subcomponent consumption added successfully!");
    handleCloseAddConsumptionSidebar();
  };

  const handleAddConsumptionItem = () => {
    const newItem = {
      id: `consumption-item-${Date.now()}`,
      item: "",
      lotCode: "",
      expiryDate: null as Date | null,
      palletNumber: "",
      consumedQuantity: "",
      uom: "",
      parentDate: undefined as string | undefined,
      parentActualQuantity: undefined as string | undefined,
    };
    setConsumptionItems((prev) => [...prev, newItem]);
  };

  const handleRemoveConsumptionItem = (itemId: string) => {
    setConsumptionItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleConsumptionItemFieldChange = (itemId: string, field: string, value: string) => {
    setConsumptionItems((prev) => prev.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)));
  };

  // Materials data for consumption reports
  const materialsData1 = [
    {
      item: "Acetaminophen 500mg",
      lotCode: "LOT-ACET-001",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-001",
      quantity: "2.5",
      uom: "kg",
    },
    {
      item: "Microcrystalline cellulose",
      lotCode: "LOT-MCC-001",
      expiryDate: "2026-04-20",
      palletNumber: "PAL-002",
      quantity: "1.2",
      uom: "kg",
    },
    {
      item: "Croscarmellose sodium",
      lotCode: "LOT-CCS-001",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-003",
      quantity: "0.3",
      uom: "kg",
    },
    {
      item: "Magnesium stearate",
      lotCode: "LOT-MS-001",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-004",
      quantity: "0.1",
      uom: "kg",
    },
    {
      item: "Hydroxypropyl methylcellulose",
      lotCode: "LOT-HPMC-001",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-005",
      quantity: "0.8",
      uom: "kg",
    },
    {
      item: "Talc powder",
      lotCode: "LOT-TALC-001",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-006",
      quantity: "0.5",
      uom: "kg",
    },
    {
      item: "FD&C Blue #2",
      lotCode: "LOT-BLUE-001",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-007",
      quantity: "0.02",
      uom: "kg",
    },
    {
      item: "Sodium benzoate",
      lotCode: "LOT-SB-001",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-008",
      quantity: "0.05",
      uom: "kg",
    },
  ];

  const materialsData2 = [
    {
      item: "Ibuprofen 200mg",
      lotCode: "LOT-IBU-002",
      expiryDate: "2026-04-10",
      palletNumber: "PAL-009",
      quantity: "1.8",
      uom: "kg",
    },
    {
      item: "Povidone K30",
      lotCode: "LOT-PVP-002",
      expiryDate: "2026-05-15",
      palletNumber: "PAL-010",
      quantity: "0.9",
      uom: "kg",
    },
    {
      item: "Sodium starch glycolate",
      lotCode: "LOT-SSG-002",
      expiryDate: "2026-06-20",
      palletNumber: "PAL-011",
      quantity: "0.4",
      uom: "kg",
    },
    {
      item: "Stearic acid",
      lotCode: "LOT-SA-002",
      expiryDate: "2026-07-25",
      palletNumber: "PAL-012",
      quantity: "0.2",
      uom: "kg",
    },
    {
      item: "FD&C Red #40",
      lotCode: "LOT-RED-002",
      expiryDate: "2026-08-30",
      palletNumber: "PAL-013",
      quantity: "0.05",
      uom: "kg",
    },
    {
      item: "Silicon dioxide",
      lotCode: "LOT-SD-002",
      expiryDate: "2026-09-15",
      palletNumber: "PAL-014",
      quantity: "0.3",
      uom: "kg",
    },
    {
      item: "Aspartame",
      lotCode: "LOT-ASP-002",
      expiryDate: "2026-10-20",
      palletNumber: "PAL-015",
      quantity: "0.1",
      uom: "kg",
    },
    {
      item: "Mint flavor",
      lotCode: "LOT-MF-002",
      expiryDate: "2026-11-25",
      palletNumber: "PAL-016",
      quantity: "0.02",
      uom: "kg",
    },
  ];

  const materialsData5A = [
    {
      item: "Ibuprofen 200mg",
      lotCode: "LOT-IBU-005A",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-017",
      quantity: "1.8",
      uom: "kg",
    },
    {
      item: "Povidone K30",
      lotCode: "LOT-PVP-005A",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-018",
      quantity: "0.9",
      uom: "kg",
    },
    {
      item: "Sodium starch glycolate",
      lotCode: "LOT-SSG-005A",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-019",
      quantity: "0.4",
      uom: "kg",
    },
    {
      item: "Stearic acid",
      lotCode: "LOT-SA-005A",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-020",
      quantity: "0.2",
      uom: "kg",
    },
    {
      item: "FD&C Red #40",
      lotCode: "LOT-RED-005A",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-021",
      quantity: "0.05",
      uom: "kg",
    },
    {
      item: "Silicon dioxide",
      lotCode: "LOT-SD-005A",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-022",
      quantity: "0.3",
      uom: "kg",
    },
    {
      item: "Aspartame",
      lotCode: "LOT-ASP-005A",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-023",
      quantity: "0.1",
      uom: "kg",
    },
    {
      item: "Mint flavor",
      lotCode: "LOT-MF-005A",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-024",
      quantity: "0.02",
      uom: "kg",
    },
  ];

  const materialsData5B = [
    {
      item: "Ibuprofen 200mg",
      lotCode: "LOT-IBU-005B",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-025",
      quantity: "0.9",
      uom: "kg",
    },
    {
      item: "Povidone K30",
      lotCode: "LOT-PVP-005B",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-026",
      quantity: "0.45",
      uom: "kg",
    },
    {
      item: "Sodium starch glycolate",
      lotCode: "LOT-SSG-005B",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-027",
      quantity: "0.2",
      uom: "kg",
    },
    {
      item: "Stearic acid",
      lotCode: "LOT-SA-005B",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-028",
      quantity: "0.1",
      uom: "kg",
    },
    {
      item: "FD&C Red #40",
      lotCode: "LOT-RED-005B",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-029",
      quantity: "0.025",
      uom: "kg",
    },
    {
      item: "Silicon dioxide",
      lotCode: "LOT-SD-005B",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-030",
      quantity: "0.15",
      uom: "kg",
    },
    {
      item: "Aspartame",
      lotCode: "LOT-ASP-005B",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-031",
      quantity: "0.05",
      uom: "kg",
    },
    {
      item: "Mint flavor",
      lotCode: "LOT-MF-005B",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-032",
      quantity: "0.01",
      uom: "kg",
    },
  ];

  const materialsData6A = [
    {
      item: "Acetaminophen 500mg",
      lotCode: "LOT-ACET-006A",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-033",
      quantity: "3.2",
      uom: "kg",
    },
    {
      item: "Microcrystalline cellulose",
      lotCode: "LOT-MCC-006A",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-034",
      quantity: "1.5",
      uom: "kg",
    },
    {
      item: "Croscarmellose sodium",
      lotCode: "LOT-CCS-006A",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-035",
      quantity: "0.4",
      uom: "kg",
    },
    {
      item: "Magnesium stearate",
      lotCode: "LOT-MS-006A",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-036",
      quantity: "0.15",
      uom: "kg",
    },
    {
      item: "Hydroxypropyl methylcellulose",
      lotCode: "LOT-HPMC-006A",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-037",
      quantity: "1.0",
      uom: "kg",
    },
    {
      item: "Talc powder",
      lotCode: "LOT-TALC-006A",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-038",
      quantity: "0.6",
      uom: "kg",
    },
    {
      item: "FD&C Blue #2",
      lotCode: "LOT-BLUE-006A",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-039",
      quantity: "0.03",
      uom: "kg",
    },
    {
      item: "Sodium benzoate",
      lotCode: "LOT-SB-006A",
      expiryDate: "2027-01-30",
      palletNumber: "PAL-040",
      quantity: "0.08",
      uom: "kg",
    },
  ];

  const materialsData6B = [
    {
      item: "Acetaminophen 500mg",
      lotCode: "LOT-ACET-006B",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-041",
      quantity: "1.7",
      uom: "kg",
    },
    {
      item: "Microcrystalline cellulose",
      lotCode: "LOT-MCC-006B",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-042",
      quantity: "0.8",
      uom: "kg",
    },
    {
      item: "Croscarmellose sodium",
      lotCode: "LOT-CCS-006B",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-043",
      quantity: "0.2",
      uom: "kg",
    },
    {
      item: "Magnesium stearate",
      lotCode: "LOT-MS-006B",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-044",
      quantity: "0.08",
      uom: "kg",
    },
    {
      item: "Hydroxypropyl methylcellulose",
      lotCode: "LOT-HPMC-006B",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-045",
      quantity: "0.5",
      uom: "kg",
    },
    {
      item: "Talc powder",
      lotCode: "LOT-TALC-006B",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-046",
      quantity: "0.3",
      uom: "kg",
    },
    {
      item: "FD&C Blue #2",
      lotCode: "LOT-BLUE-006B",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-047",
      quantity: "0.015",
      uom: "kg",
    },
    {
      item: "Sodium benzoate",
      lotCode: "LOT-SB-006B",
      expiryDate: "2027-01-30",
      palletNumber: "PAL-048",
      quantity: "0.04",
      uom: "kg",
    },
  ];

  const materialsData7A = [
    {
      item: "Pending - Acetaminophen 500mg",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Microcrystalline cellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Croscarmellose sodium",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Magnesium stearate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hydroxypropyl methylcellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Talc powder",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - FD&C Blue #2",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Sodium benzoate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
  ];

  const materialsData7B = [
    // Base materials (8 items)
    {
      item: "Pending - Acetaminophen 500mg",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Microcrystalline cellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Croscarmellose sodium",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Magnesium stearate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hydroxypropyl methylcellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Talc powder",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - FD&C Blue #2",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Sodium benzoate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },

    // Additional materials to reach 120 rows
    {
      item: "Pending - Lactose monohydrate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Povidone K30",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Colloidal silicon dioxide",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Stearic acid",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Sodium starch glycolate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Croscarmellose sodium",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hydroxypropyl cellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    { item: "Pending - Ethylcellulose", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Methylcellulose", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Carboxymethylcellulose sodium",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Polyethylene glycol 4000",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Polyethylene glycol 6000",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    { item: "Pending - Polysorbate 80", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Polysorbate 20", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sorbitan monooleate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Lecithin", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Glycerin", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Propylene glycol", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Ethanol", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Isopropanol", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Water for injection", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Purified water", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium chloride", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Potassium chloride", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Calcium chloride", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Magnesium chloride", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Sodium phosphate dibasic",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Sodium phosphate monobasic",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    { item: "Pending - Citric acid", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium citrate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Trisodium citrate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium acetate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium bicarbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Potassium bicarbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    { item: "Pending - Potassium carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Calcium carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Magnesium carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Zinc carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Iron carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Copper carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Manganese carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Chromium carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Nickel carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Cobalt carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Molybdenum carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Selenium carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Iodine carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Fluoride carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Chloride carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Bromide carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Iodide carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sulfate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Nitrate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Phosphate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Acetate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Citrate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Lactate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Malate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Fumarate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Succinate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Glutarate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Adipate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Pimelate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Suberate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Azelate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sebacate carbonate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Undecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dodecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tridecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetradecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentadecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexadecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptadecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octadecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonadecanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Eicosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heneicosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Docosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tricosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetracosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentacosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexacosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptacosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octacosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonacosanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Triacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hentriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dotriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tritriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetratriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentatriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexatriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptatriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octatriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonatriacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hentetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dotetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tritetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetratetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentatetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexatetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptatetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octatetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonatetracontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Henpentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dopentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tripentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetrapentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentapentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexapentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptapentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octapentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonapentacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Henhexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dohexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Trihexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetrahexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentahexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexahexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptahexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octahexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonahexacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Henheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Doheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Triheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetraheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentaheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexaheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptaheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octaheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonaheptacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Henoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dooctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Trioctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetraoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentaoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexaoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptaoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octaoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonaoctacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hennonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Dononacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Trinonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Tetranonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Pentanonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hexanonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Heptanonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Octanonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Nonanonacontanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Hectanedioate carbonate",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },

    // Additional materials to make it super long (200+ more items)
    {
      item: "Pending - Additional Material 001",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 002",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 003",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 004",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 005",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 006",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 007",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 008",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 009",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 010",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 011",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 012",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 013",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 014",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 015",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 016",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 017",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 018",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 019",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 020",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 021",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 022",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 023",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 024",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 025",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 026",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 027",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 028",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 029",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 030",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 031",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 032",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 033",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 034",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 035",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 036",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 037",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 038",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 039",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 040",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 041",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 042",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 043",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 044",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 045",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 046",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 047",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 048",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 049",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 050",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 051",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 052",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 053",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 054",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 055",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 056",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 057",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 058",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 059",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 060",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 061",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 062",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 063",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 064",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 065",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 066",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 067",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 068",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 069",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 070",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 071",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 072",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 073",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 074",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 075",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 076",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 077",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 078",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 079",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 080",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 081",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 082",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 083",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 084",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 085",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 086",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 087",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 088",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 089",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 090",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 091",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 092",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 093",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 094",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 095",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 096",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 097",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 098",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 099",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 100",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 101",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 102",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 103",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 104",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 105",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 106",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 107",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 108",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 109",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 110",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 111",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 112",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 113",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 114",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 115",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 116",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 117",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 118",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 119",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 120",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 121",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 122",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 123",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 124",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 125",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 126",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 127",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 128",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 129",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 130",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 131",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 132",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 133",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 134",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 135",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 136",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 137",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 138",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 139",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 140",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 141",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 142",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 143",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 144",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 145",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 146",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 147",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 148",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 149",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 150",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 151",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 152",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 153",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 154",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 155",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 156",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 157",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 158",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 159",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 160",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 161",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 162",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 163",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 164",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 165",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 166",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 167",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 168",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 169",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 170",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 171",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 172",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 173",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 174",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 175",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 176",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 177",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 178",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 179",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 180",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 181",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 182",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 183",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 184",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 185",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 186",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 187",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 188",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 189",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 190",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 191",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 192",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 193",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 194",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 195",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 196",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 197",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 198",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 199",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
    {
      item: "Pending - Additional Material 200",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
      uom: "TBD",
    },
  ];

  // Consumption table columns
  const consumptionTableColumns = [
    {
      label: "Item",
      dataKey: "item",
      width: "200px",
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "150px",
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "120px",
      cellRenderer: ({ row }: { row: any }) => {
        if (row.expiryDate === "TBD") {
          return <Text color="midGrey">TBD</Text>;
        }
        const formattedDate = formatDateToYYYYMonDD(row.expiryDate);
        return <Text>{formattedDate}</Text>;
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "120px",
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "80px",
    },
    {
      label: "UOM",
      dataKey: "uom",
      width: "60px",
    },
  ];

  // Reusable Consumption Report Component
  const ConsumptionReport = ({
    materials,
    parentData,
  }: {
    materials: Array<{
      item: string;
      lotCode: string;
      expiryDate: string;
      palletNumber: string;
      quantity: string;
      uom: string;
    }>;
    parentData?: { date: string; actualQuantity: string };
  }) => {
    // Check if materials array is empty or all items have "TBD" quantities (indicating 0 production)
    const isEmpty = materials.length === 0 || materials.every((material) => material.quantity === "TBD");

    return (
      <Box
        mx="28px"
        mb="x2"
        border="1px solid #ddd"
        borderTop="none"
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
        borderBottomLeftRadius="large"
        borderBottomRightRadius="large"
        p="x2"
      >
        <Flex justifyContent="space-between" alignItems="center" mb="x2" ml="x1">
          <Flex alignItems="baseline" gap="x1">
            <Heading4 mb="0">Subcomponent consumption</Heading4>
            <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
              BOM revision 2.1
            </Text>
          </Flex>
        </Flex>
        {isEmpty ? (
          <Box py="x4" textAlign="center">
            <Text color="midGrey" fontSize="small">
              No consumption data available
            </Text>
          </Box>
        ) : (
          <Table
            columns={consumptionTableColumns}
            rows={materials}
            keyField="item"
            compact={true}
            rowBorder={true}
            className="consumption-table"
          />
        )}
      </Box>
    );
  };

  const EmptyConsumptionReport = () => {
    return (
      <Box
        mx="28px"
        mb="x2"
        border="1px solid #ddd"
        borderTop="none"
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
        borderBottomLeftRadius="large"
        borderBottomRightRadius="large"
        p="x2"
      >
        <Heading4 mb="x2" ml="x1">
          Subcomponent consumption
        </Heading4>
        <Box py="x4" textAlign="center">
          <Text color="midGrey" fontSize="small" mb="x2">
            No consumption data available
          </Text>
          {role === "supplier" && (
            <PrimaryButton type="button" onClick={handleAddConsumptionReport}>
              Add consumption details
            </PrimaryButton>
          )}
        </Box>
      </Box>
    );
  };

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
              PO line items
            </Link>
          </Breadcrumbs>
        )}
        title="PO-2025-001"
        subtitle="ITEM-001 Premium Packaging"
        renderActions={() => (
          <Flex gap="x2" alignItems="center">
            <DropdownMenu>
              <DropdownButton onClick={handleCancelPOLineItem}>Cancel PO line item</DropdownButton>
            </DropdownMenu>
          </Flex>
        )}
        renderSummary={() => (
          <Summary breakpoint={1200} style={{ filter: "blur(3px)", pointerEvents: "none" }}>
            <Flex flexDirection="column" gap="half" alignItems="center" width="200px" justifyContent="center">
              <StatusIndicator
                alignSelf="center"
                type={
                  productionComplete ||
                  collaborationState.status === "accepted" ||
                  acceptedItems.request ||
                  acceptedItems.proposal
                    ? "success"
                    : collaborationState.activeCardAuthorRole !== userState.role
                      ? "warning"
                      : "quiet"
                }
              >
                {productionComplete ||
                collaborationState.status === "accepted" ||
                acceptedItems.request ||
                acceptedItems.proposal ? (
                  "Accepted"
                ) : collaborationState.activeCardAuthorRole === userState.role ? (
                  <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="184px">
                    {`Awaiting ${userState.role === "supplier" ? "customer" : "supplier"} response`}
                  </TruncatedText>
                ) : (
                  "Awaiting your response"
                )}
              </StatusIndicator>
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                For{" "}
                <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                  2 days
                </Text>
              </Text>
            </Flex>
            <SummaryDivider />
            <Flex flexDirection="column" gap="x0_5" width="200px" justifyContent="center">
              <Tooltip
                tooltip={
                  <Box>
                    <Text fontSize="small" lineHeight="smallRelaxed">
                      12,000 / 15,000 eaches
                    </Text>
                  </Box>
                }
              >
                <Box height="x1" mt="x1" mb="x0_25" width="100%" backgroundColor="blue" borderRadius="medium" />
              </Tooltip>

              <Flex justifyContent={productionComplete ? "space-between" : "center"}>
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                  <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                    90%
                  </Text>{" "}
                  produced
                </Text>

                {productionComplete && <StatusIndicator type="quiet">Completed</StatusIndicator>}
              </Flex>
            </Flex>
            <SummaryDivider />
            <Flex flexDirection="column" gap="half" width="200px" pt="x0_5" alignItems="center" justifyContent="center">
              {poStatus === "Late" && (
                <>
                  <StatusIndicator alignSelf="center" type="danger">
                    Late
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                      7 days
                    </Text>{" "}
                    past due date
                  </Text>
                </>
              )}
              {poStatus === "At risk" && (
                <>
                  <StatusIndicator alignSelf="center" type="warning">
                    At risk
                  </StatusIndicator>
                  <TruncatedText fullWidth fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    Current milestone 5 days late, previous 10 days late.
                  </TruncatedText>
                </>
              )}
              {poStatus === "Completed" && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Completed
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on January 24, 2025
                  </Text>
                </>
              )}
              {poStatus === "Cancelled" && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Cancelled
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on February 22, 2025
                  </Text>
                </>
              )}
              {poStatus === "On time" && (
                <>
                  <StatusIndicator alignSelf="center" type="success">
                    On time
                  </StatusIndicator>
                  <TruncatedText fullWidth fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    Previous milestone completed 2 days ahead of time. Current milestone 12 days till due date.
                  </TruncatedText>
                </>
              )}
            </Flex>
          </Summary>
        )}
      />
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
          
          /* Hide 2nd level nested table headers (1st tier nested) */
          .nested-table thead {
            height: 0 !important;
            overflow: hidden !important;
          }
          .nested-table thead th {
            height: 0 !important;
            padding: 0 !important;
            border: none !important;
            line-height: 0 !important;
            font-size: 0 !important;
          }
          
          /* Show headers for consumption tables (3rd level) */
          .consumption-table thead {
            height: auto !important;
            overflow: visible !important;
          }
          .consumption-table thead th {
            height: auto !important;
            padding: 0 0 8px 8px !important;
            border: none !important;
            border-bottom: 1px solid #e0e0e0 !important;
            line-height: normal !important;
            font-size: 12px !important;
            font-weight: bold !important;
            color: inherit !important;
          }
          
          /* Add extra padding-left to columns 2+ */
          .consumption-table thead th:nth-child(n+2) {
            padding-left: 16px !important;
          }
          
          /* Match consumption table column widths */
          .consumption-table thead th:nth-child(1) { width: 200px !important; }
          .consumption-table thead th:nth-child(2) { width: 150px !important; }
          .consumption-table thead th:nth-child(3) { width: 120px !important; }
          .consumption-table thead th:nth-child(4) { width: 120px !important; }
          .consumption-table thead th:nth-child(5) { width: 100px !important; }
          
          /* Style consumption table body cells */
          .consumption-table tbody td {
            padding: 8px 12px !important;
            font-size: 14px !important;
            line-height: 24px !important;
          }
          
          /* Ensure parent table row borders are visible */
          .parent-table tbody tr {
            border-bottom: 1px solid #e0e0e0 !important;
          }
          .parent-table tbody tr:last-child {
            border-bottom: none !important;
          }
          
          
        `}
      </style>
      <Page>
        <Flex
          justifyContent="flex-end"
          alignItems="center"
          gap="x2"
          mb="x1"
          style={{ filter: "blur(3px)", pointerEvents: "none" }}
        >
          <IconicButton icon="edit" aria-label="Edit" onClick={handleEditDetails}>
            Edit
          </IconicButton>
        </Flex>
        <Box mb="x3" style={{ filter: "blur(3px)", pointerEvents: "none" }}>
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">PO number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>{detailsData.poNumber}</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>{detailsData.customerPoLineItem}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>{detailsData.supplierPoLineItem}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Created on</Text>
              </DescriptionTerm>
              <DescriptionDetails>{detailsData.createdOn}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{role === "supplier" ? "Customer" : "Supplier"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>{detailsData.supplier}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>{detailsData.customerItemCode}</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's item code</Text>
              </DescriptionTerm>
              <DescriptionDetails>{detailsData.supplierItemCode}</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>
                  {detailsData.priority}{" "}
                  <Text as="span" color="midGrey" fontSize="small" lineHeight="smallRelaxed">
                    (Deactivated)
                  </Text>
                </Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Item order type</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{detailsData.itemOrderType}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{detailsData.customerLotCode}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{detailsData.supplierLotCode}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{detailsData.bomRevision}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Production start date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>
                  {detailsData.productionStartDate}{" "}
                  <Text as="span" color="midGrey" fontSize="small" lineHeight="smallRelaxed">
                    (Week 6)
                  </Text>
                </Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{detailsData.shipTo}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Need by date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>
                  {detailsData.needByDate}{" "}
                  <Text as="span" color="midGrey" fontSize="small" lineHeight="smallRelaxed">
                    (Week 7)
                  </Text>
                </Text>
              </DescriptionDetails>
            </DescriptionGroup>
            {productionComplete && (
              <>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Close production note</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>Production completed successfully</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Carry over sent to</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>-</DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration" style={{ filter: "blur(3px)", pointerEvents: "none" }}>
            <Card mt="x3">
              <Flex flexDirection="column" gap="x2" justifyContent="space-between">
                {/* Requested production vs Supplier's proposal comparison */}
                <Flex gap="x3" p="x2" pb="0">
                  <Flex flexDirection="column" gap="x0_5" mt="x9" pl="x2_5" flex={1} maxWidth="440px" minWidth="256px">
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Quantity
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Production due date
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Unit price
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Note
                    </Text>
                  </Flex>

                  <Flex flexDirection="column" gap="x0_5" flex={1} maxWidth="440px" minWidth="256px">
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" color="darkGrey" my="x1">
                      Requested production
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      15,000 eaches
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      2025-Feb-28
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      $12.50
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      Standard production requirements
                    </Text>
                  </Flex>

                  <Flex flexDirection="column" gap="x0_5" flex={1} maxWidth="440px" minWidth="256px">
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" color="darkGrey" my="x1">
                      {role === "supplier" ? "Customer's" : "Supplier's"} proposal
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      15,000 eaches
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      2025-Feb-28
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      $12.50
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" my="x1">
                      Agreed to standard requirements
                    </Text>
                  </Flex>
                </Flex>

                <Divider my="x2" />

                {/* Collaboration status and actions */}
                <Flex justifyContent="space-between" alignItems="center" p="x2">
                  <Flex alignItems="center" gap="x2">
                    <StatusIndicator type="success">Accepted</StatusIndicator>
                    <Text fontSize="small" color="midGrey">
                      Both parties have agreed to the proposal
                    </Text>
                  </Flex>
                  <Flex gap="x2">
                    <Button type="button" size="small">
                      View full proposal
                    </Button>
                    <PrimaryButton type="button" size="small">
                      Create new proposal
                    </PrimaryButton>
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </Tab>
          <Tab id="overview" label="Production records">
            <Box>
              {role === "supplier" && (
                <Flex justifyContent="flex-end" mt="x3" mb="x1">
                  <IconicButton icon="add" aria-label="Add production" onClick={handleAddProduction}>
                    Add production
                  </IconicButton>
                </Flex>
              )}

              <Box minWidth="1236px">
                <Table
                  columns={productionRecordsColumns}
                  rows={productionRecordsData}
                  hasExpandableRows={true}
                  expandedRows={expandedRows}
                  onRowExpansionChange={setExpandedRows}
                  keyField="id"
                  rowBorder={true}
                  compact={true}
                  className="parent-table"
                />
              </Box>
            </Box>
          </Tab>
          <Tab label="Attachments" style={{ filter: "blur(3px)", pointerEvents: "none" }}>
            <Box>
              <Text>Attachments content goes here...</Text>
            </Box>
          </Tab>
          <Tab label="Milestone performance" style={{ filter: "blur(3px)", pointerEvents: "none" }}>
            <Box>
              <Text>Milestone performance content goes here...</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            {/* Header */}
            <Box mt="x4">
              <Flex mx="x1" justifyContent="space-between" alignItems="flex-start" mb="x2">
                <Flex flexDirection="column">
                  <Text>Event / Modification</Text>
                  <Text color="midGrey" fontSize="small" lineHeight="smallTextCompressed">
                    User, date, and time
                  </Text>
                </Flex>
                <Flex justifyContent="flex-end">
                  <Switcher selected={historyLogFilter} onChange={(value) => setHistoryLogFilter(value)}>
                    <Switch value="All">All</Switch>
                    <Switch value="Production record">Production record</Switch>
                    <Switch value="Collaboration">Collaboration</Switch>
                    <Switch value="PO line item details">PO line item details</Switch>
                  </Switcher>
                </Flex>
              </Flex>
              <Divider m="0" />
            </Box>

            {/* Log */}
            <Flex flexDirection="column">
              {/* Group 1: January 29, 2025 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Header */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        for{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                    </Text>
                  </Box>

                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Actual quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            1,000 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            1,200 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            LOT-2025-001-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            LOT-2025-001-001A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Customer's lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            CUST-LOT-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            CUST-LOT-001A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Supplier's lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            SUP-LOT-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            SUP-LOT-001B
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expiry date modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            March 15, 2026
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            March 20, 2026
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Pallet number modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            PAL-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            PAL-002
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Note modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Standard production run
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Special handling required for temperature control
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        sarah.johnson@supplier.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 29th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        02:30:15PM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 1 and Group 2 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Group 2: January 28, 2025 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Header */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        for{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 28, 2025
                      </Box>
                    </Text>
                  </Box>

                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Date modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            January 25, 2025
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            January 28, 2025
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expected quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            1,000 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            1,200 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        system@nulogy.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 28th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        09:15:42AM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 2 and Group 3 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Group 3: Collaboration */}
              {(historyLogFilter === "All" || historyLogFilter === "Collaboration") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Header */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Collaboration
                      </Box>
                    </Text>
                  </Box>

                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Supplier UOM modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Pallets
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Cost per unit modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            US $45.50
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            US $48.75
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Lead time modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            14 days
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            18 days
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        tom.wilson@artisan.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 27th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        11:45:30AM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 3 and Group 4 */}
              {(historyLogFilter === "All" || historyLogFilter === "Collaboration") && <Divider m="0" />}

              {/* Group 4: January 26, 2025 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Header */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        for{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 26, 2025
                      </Box>
                    </Text>
                  </Box>

                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Date modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            January 24, 2025
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            January 26, 2025
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expected quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            800 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            900 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        quality.team@nulogy.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 26th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        03:20:18PM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 4 and Group 5 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Group 5: PO line item details */}
              {(historyLogFilter === "All" || historyLogFilter === "PO line item details") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Header */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        PO line item details
                      </Box>
                    </Text>
                  </Box>

                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          PO number modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            PO-2025-001-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            PO-2025-001-002
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Customer's PO line item number modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            CUST-LINE-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            CUST-LINE-001A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Priority modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Medium
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            High
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        jennifer.martinez@customer.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 25th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        10:15:25AM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 5 and Group 6 */}
              {(historyLogFilter === "All" || historyLogFilter === "PO line item details") && <Divider m="0" />}

              {/* Group 6: January 30, 2025 (Combined) */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Header */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        for{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 30, 2025
                      </Box>
                    </Text>
                  </Box>

                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Date modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            January 29, 2025
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            January 30, 2025
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expected quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            750 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            850 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Second DescriptionList for details */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Actual quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            800 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            950 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            LOT-2025-001-002
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            LOT-2025-001-002B
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Customer's lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            CUST-LOT-002
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            CUST-LOT-002A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Supplier's lot code modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            SUP-LOT-002
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            SUP-LOT-002B
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expiry date modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            March 18, 2026
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            March 22, 2026
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Pallet number modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            PAL-003
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            PAL-004
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Note modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Standard batch processing
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Enhanced quality control procedures applied
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        sarah.johnson@supplier.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 30th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        01:45:30PM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 6 and Group 7 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Group 7: January 31, 2025 (Combined) */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        for{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 31, 2025
                      </Box>
                    </Text>
                  </Box>
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Date modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            January 30, 2025
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            January 31, 2025
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expected quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            850 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            900 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Actual quantity modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            950 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            1,000 cases
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>

                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Lot code modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #01
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            LOT-2025-001-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            LOT-2025-001-001A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Lot code modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #02
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            LOT-2025-001-002
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            LOT-2025-001-002A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Lot code modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            LOT-2025-001-003
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            LOT-2025-001-003A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Customer's lot code modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            CUST-LOT-003
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            CUST-LOT-003A
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Supplier's lot code modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            SUP-LOT-003
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            SUP-LOT-003B
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Expiry date modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            March 22, 2026
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            March 25, 2026
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Pallet number modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            PAL-005
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            PAL-006
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Note modified
                        </Box>
                        <Box as="span" fontSize="small" color="black">
                          {" "}
                          – Batch #03
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Enhanced quality control procedures applied
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Final quality approval and packaging instructions updated
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        mike.rodriguez@supplier.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 31st, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        03:15:45PM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider between Group 7 and Group 8 */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Group 8: No header group */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* DescriptionList */}
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Batch status modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            In Progress
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Completed
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Quality check modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Pending
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Passed
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        quality.assurance@supplier.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        February 1st, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        08:30:15AM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider after the last group */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}
            </Flex>
            <Pagination currentPage={1} totalPages={5} justifyContent="flex-end" pt="x1" />
          </Tab>
        </Tabs>

        {/* Production Sidebar */}
        <Sidebar
          isOpen={showProductionSidebar}
          onClose={handleCloseProductionSidebar}
          title={isEditingProduction ? "Edit production record" : "Create production record"}
          width="1280px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton type="button" onClick={handleSaveProduction}>
                Save
              </PrimaryButton>
              <QuietButton type="button" onClick={handleCloseProductionSidebar}>
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Heading4 mt="x1" mb="x2">
                Production summary
              </Heading4>

              <Field>
                <FieldLabel labelText="Date" pb="x1" />
                <DatePicker
                  onChange={(date) =>
                    setProductionRecord((prev) => ({ ...prev, date: date ? date.toISOString().split("T")[0] : "" }))
                  }
                  selected={productionRecord.date ? new Date(productionRecord.date) : null}
                  inputProps={{ disabled: role === "customer" && isEditingProduction }}
                />
              </Field>

              <Flex gap="x2">
                <Box width="20em">
                  <Field>
                    <FieldLabel labelText="Expected quantity" pb="x1" />
                    <Input
                      value={productionRecord.expectedQuantity}
                      onChange={(e) => setProductionRecord((prev) => ({ ...prev, expectedQuantity: e.target.value }))}
                      disabled={role === "customer" && isEditingProduction}
                    />
                  </Field>
                </Box>
                <Box width="10em">
                  <Field>
                    <FieldLabel labelText="UOM" pb="x1" />
                    <Select
                      value={productionRecord.uom}
                      onChange={(value) => setProductionRecord((prev) => ({ ...prev, uom: String(value) }))}
                      disabled={role === "customer" && isEditingProduction}
                      options={[
                        { value: "kg", label: "kg" },
                        { value: "lb", label: "lb" },
                        { value: "g", label: "g" },
                        { value: "oz", label: "oz" },
                        { value: "cases", label: "cases" },
                      ]}
                    />
                  </Field>
                </Box>
              </Flex>

              <Divider mb="x3" />

              <Flex justifyContent="space-between" alignItems="center" mb="x2">
                <Heading4>Output record</Heading4>
              </Flex>

              <Box>
                {/* Custom table structure with nested rows */}
                <Box>
                  {/* Table Header */}
                  <Box display="flex" borderBottom="1px solid" borderColor="lightGrey" pb="x1">
                    <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                      Output number
                    </Box>
                    <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                      Pallet number
                      {role === "supplier" && fieldConfig.palletNumberRequired && (
                        <Text inline ml="x0_5" fontSize="small" color="darkGrey">
                          (Required)
                        </Text>
                      )}
                    </Box>
                    <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                      Customer's lot code
                    </Box>
                    <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                      Supplier's lot code
                      {role === "supplier" && fieldConfig.lotCodeRequired && (
                        <Text inline ml="x0_5" fontSize="small" color="darkGrey">
                          (Required)
                        </Text>
                      )}
                    </Box>
                    <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                      Expiry date
                      {role === "supplier" && fieldConfig.expiryDateRequired && (
                        <Text inline ml="x0_5" fontSize="small" color="darkGrey">
                          (Required)
                        </Text>
                      )}
                    </Box>
                    <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                      Quantity
                    </Box>
                    {role === "supplier" && <Box width="88px" pb="x1" pl="x1"></Box>}
                  </Box>

                  {/* Table Rows with nested content */}
                  {productionRows.map((row, index) => (
                    <Box key={row.id}>
                      {/* Main Production Row */}
                      <Box display="flex" alignItems="center" py="x0">
                        <Box flex="1">
                          <Input
                            value={row.outputNumber || ""}
                            onChange={(e) => handleProductionRowChange(row.id, "outputNumber", e.target.value)}
                            placeholder="Enter output number"
                            p="x1"
                            disabled={role === "customer" && isEditingProduction}
                          />
                        </Box>
                        <Box flex="1">
                          <Input
                            value={row.palletNumber}
                            onChange={(e) => handleProductionRowChange(row.id, "palletNumber", e.target.value)}
                            placeholder="Enter pallet number"
                            p="x1"
                            disabled={role === "customer" && isEditingProduction}
                          />
                        </Box>
                        <Box flex="1">
                          <Input
                            value={row.customerLotCode || ""}
                            onChange={(e) => handleProductionRowChange(row.id, "customerLotCode", e.target.value)}
                            placeholder="Enter customer's lot code"
                            p="x1"
                            disabled={role === "supplier"}
                          />
                        </Box>
                        <Box flex="1">
                          <Input
                            value={row.supplierLotCode || ""}
                            onChange={(e) => handleProductionRowChange(row.id, "supplierLotCode", e.target.value)}
                            placeholder="Enter supplier's lot code"
                            p="x1"
                            disabled={role === "customer"}
                          />
                        </Box>
                        <Box flex="1">
                          <Input
                            value={row.expiryDate}
                            onChange={(e) => handleProductionRowChange(row.id, "expiryDate", e.target.value)}
                            placeholder="Enter expiry date"
                            p="x1"
                            disabled={role === "customer" && isEditingProduction}
                          />
                        </Box>
                        <Box flex="1">
                          <Input
                            value={row.quantity}
                            onChange={(e) => handleProductionRowChange(row.id, "quantity", e.target.value)}
                            placeholder="Enter quantity"
                            p="x1"
                            disabled={role === "customer" && isEditingProduction}
                          />
                        </Box>
                        {role === "supplier" && (
                          <Box width="88px">
                            <Flex gap="x1" alignItems="center">
                              <DropdownMenu
                                trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                                placement="bottom-end"
                              >
                                <DropdownButton
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddConsumptionForRow(row.id);
                                  }}
                                >
                                  Add subcomponent consumption
                                </DropdownButton>
                                <DropdownButton
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddNote(row.id);
                                  }}
                                >
                                  Add note
                                </DropdownButton>
                              </DropdownMenu>
                              {productionRows.length > 1 && (
                                <IconicButton
                                  icon="removeCircleOutline"
                                  aria-label="Remove row"
                                  onClick={() => handleRemoveProductionRow(row.id)}
                                  type="button"
                                />
                              )}
                            </Flex>
                          </Box>
                        )}
                      </Box>

                      {/* Container for Consumption Details and Note */}
                      {(rowConsumptions[row.id] && rowConsumptions[row.id].length > 0) ||
                      rowNotes[row.id] !== undefined ? (
                        <Box p="x1" borderBottom="1px solid" borderBottomColor="lightGrey">
                          {/* Subcomponent consumption - Nested below this specific row */}
                          {rowConsumptions[row.id] && rowConsumptions[row.id].length > 0 && (
                            <Box border="1px solid" borderColor="lightGrey" borderRadius="large" p="x2" mb="x1" mt="x0">
                              <Heading4 mb="x1" fontSize="small">
                                Subcomponent consumption
                              </Heading4>
                              <Table
                                columns={[
                                  {
                                    label: "Item",
                                    dataKey: "item",
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x1" pr="x2" minWidth="8em" width="100%">
                                        <Input
                                          value={row.item}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "item",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Item"
                                          disabled={role === "customer"}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Lot",
                                    dataKey: "lotCode",
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x1" pr="x2" minWidth="8em" width="100%">
                                        <Input
                                          value={row.lotCode}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "lotCode",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Lot"
                                          disabled={role === "customer"}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Expiry",
                                    dataKey: "expiryDate",
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x1" pr="x2" minWidth="8em" width="100%">
                                        <Input
                                          value={row.expiryDate}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "expiryDate",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Expiry"
                                          disabled={role === "customer"}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Pallet",
                                    dataKey: "palletNumber",
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x1" pr="x2" minWidth="8em" width="100%">
                                        <Input
                                          value={row.palletNumber}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "palletNumber",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Pallet"
                                          disabled={role === "customer"}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Qty",
                                    dataKey: "quantity",
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x1" pr="x2" minWidth="8em" width="100%">
                                        <Input
                                          value={row.quantity}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "quantity",
                                              e.target.value
                                            )
                                          }
                                          placeholder="Qty"
                                          disabled={role === "customer"}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "UOM",
                                    dataKey: "uom",
                                    width: "100px",
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x1" pr="x2" minWidth="8em" width="100%" maxWidth="16em">
                                        <Select
                                          value={row.uom}
                                          onChange={(value) =>
                                            handleConsumptionRowChange(row.id, row.consumptionId, "uom", String(value))
                                          }
                                          options={[
                                            { value: "kg", label: "kg" },
                                            { value: "lb", label: "lb" },
                                            { value: "g", label: "g" },
                                            { value: "oz", label: "oz" },
                                            { value: "cases", label: "cases" },
                                          ]}
                                          disabled={role === "customer"}
                                        />
                                      </Box>
                                    ),
                                  },
                                  ...(role === "supplier"
                                    ? [
                                        {
                                          label: "",
                                          dataKey: "actions",
                                          width: "40px",
                                          cellRenderer: ({ row }: { row: any }) => (
                                            <IconicButton
                                              icon="removeCircleOutline"
                                              aria-label="Remove consumption row"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveConsumptionRow(row.id, row.consumptionId);
                                              }}
                                              type="button"
                                              pr="x2"
                                              py="x1"
                                            />
                                          ),
                                        },
                                      ]
                                    : []),
                                ]}
                                rows={rowConsumptions[row.id].map((consumption) => ({
                                  ...consumption,
                                  id: `${row.id}-${consumption.id}`,
                                  consumptionId: consumption.id,
                                }))}
                                keyField="id"
                                compact={true}
                                rowBorder={true}
                                className="subcomponent-consumption-edit-table"
                              />
                              {role === "supplier" && (
                                <Box mt="x1">
                                  <QuietButton
                                    icon="addCircleOutline"
                                    iconSide="left"
                                    fullWidth
                                    onClick={() => handleAddConsumptionRow(row.id)}
                                    type="button"
                                  >
                                    Add row
                                  </QuietButton>
                                </Box>
                              )}
                            </Box>
                          )}

                          {/* Note - Nested below this specific row */}
                          {rowNotes[row.id] !== undefined && (
                            <Box border="1px solid" borderColor="lightGrey" borderRadius="large" p="x2">
                              <Field>
                                <FieldLabel labelText="Note" pb="x1" />
                                <Textarea
                                  value={rowNotes[row.id]}
                                  onChange={(e) => handleNoteChange(row.id, e.target.value)}
                                  placeholder="Enter note for this row"
                                  disabled={role === "customer" && isEditingProduction}
                                />
                              </Field>
                            </Box>
                          )}
                        </Box>
                      ) : (
                        <Box borderBottom="1px solid" borderColor="lightGrey" />
                      )}
                    </Box>
                  ))}
                </Box>

                {role === "supplier" && (
                  <Box mt="x1">
                    <QuietButton
                      icon="addCircleOutline"
                      iconSide="left"
                      fullWidth
                      onClick={handleAddProductionRow}
                      type="button"
                    >
                      Add row
                    </QuietButton>
                  </Box>
                )}
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        {/* Consumption Details Sidebar */}
        <Sidebar
          isOpen={showConsumptionSidebar}
          onClose={handleCloseConsumptionSidebar}
          title="Edit consumption details"
          width="600px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton type="button" onClick={handleSaveConsumption}>
                Save
              </PrimaryButton>
              <QuietButton type="button" onClick={handleCloseConsumptionSidebar}>
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              {consumptionMaterials.map((material, index) => (
                <Box key={material.id} pb="x3">
                  <Field>
                    <FieldLabel labelText="Item" pb="x1" />
                    <Input
                      value={material.item}
                      onChange={(e) => handleConsumptionFieldChange(material.id, "item", e.target.value)}
                    />
                  </Field>
                  <Flex gap="x1">
                    <Field width="50%">
                      <FieldLabel labelText="Lot code" pb="x1" />
                      <Input
                        value={material.lotCode}
                        onChange={(e) => handleConsumptionFieldChange(material.id, "lotCode", e.target.value)}
                      />
                    </Field>
                    <Field width="50%">
                      <FieldLabel labelText="Pallet number" pb="x1" />
                      <Input
                        value={material.palletNumber}
                        onChange={(e) => handleConsumptionFieldChange(material.id, "palletNumber", e.target.value)}
                      />
                    </Field>
                  </Flex>
                  <Flex gap="x1">
                    <Field width="50%">
                      <FieldLabel labelText="Expiry date" pb="x1" />
                      <DatePicker
                        onChange={(date) =>
                          handleConsumptionFieldChange(
                            material.id,
                            "expiryDate",
                            date?.toISOString().split("T")[0] || ""
                          )
                        }
                        selected={
                          material.expiryDate && material.expiryDate !== "TBD"
                            ? new Date(material.expiryDate)
                            : undefined
                        }
                      />
                    </Field>
                    <Field width="50%">
                      <FieldLabel labelText="Quantity" pb="x1" />
                      <Input
                        type="number"
                        value={material.quantity}
                        onChange={(e) => handleConsumptionFieldChange(material.id, "quantity", e.target.value)}
                      />
                    </Field>
                  </Flex>
                  <Field>
                    <FieldLabel labelText="UOM" pb="x1" />
                    <Select
                      value={material.uom}
                      onChange={(value) => handleConsumptionFieldChange(material.id, "uom", String(value))}
                      options={[
                        { value: "kg", label: "kg" },
                        { value: "lb", label: "lb" },
                        { value: "g", label: "g" },
                        { value: "oz", label: "oz" },
                        { value: "cases", label: "cases" },
                      ]}
                    />
                  </Field>
                </Box>
              ))}
            </FormSection>
          </Form>
        </Sidebar>

        {/* Add/Edit Consumption Details Sidebar */}
        <Sidebar
          isOpen={showAddConsumptionSidebar}
          onClose={handleCloseAddConsumptionSidebar}
          title={
            consumptionItems.length > 0 && consumptionItems[0].item ? "Edit consumption details" : "Consumption record"
          }
          helpText={`Consumption for ${consumptionItems[0]?.parentActualQuantity || "[Actual quantity]"} on ${consumptionItems[0]?.parentDate || "[Date]"}`}
          width="600px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton type="button" onClick={handleSaveAddConsumption}>
                Save
              </PrimaryButton>
              <QuietButton type="button" onClick={handleCloseAddConsumptionSidebar}>
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              {consumptionItems.map((item, index) => (
                <Box key={item.id}>
                  {index > 0 && <Divider mb="x2_5" />}

                  <Flex justifyContent="space-between" alignItems="center" mb="x2">
                    <Heading4 pb="0">Subcomponent consumption: item {index + 1}</Heading4>
                    {consumptionItems.length > 1 && (
                      <IconicButton
                        icon="removeCircleOutline"
                        aria-label="Remove consumption item"
                        onClick={() => handleRemoveConsumptionItem(item.id)}
                        type="button"
                      />
                    )}
                  </Flex>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Item" pb="x1" />
                      <Input
                        value={item.item}
                        onChange={(e) => handleConsumptionItemFieldChange(item.id, "item", e.target.value)}
                        placeholder="Enter item name"
                      />
                    </Field>
                  </Box>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Lot code" pb="x1" />
                      <Input
                        value={item.lotCode}
                        onChange={(e) => handleConsumptionItemFieldChange(item.id, "lotCode", e.target.value)}
                        placeholder="Enter lot code"
                      />
                    </Field>
                  </Box>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Expiry date" pb="x1" />
                      <DatePicker
                        selected={item.expiryDate}
                        onChange={(date) =>
                          handleConsumptionItemFieldChange(item.id, "expiryDate", date?.toISOString())
                        }
                      />
                    </Field>
                  </Box>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Pallet number" pb="x1" />
                      <Input
                        value={item.palletNumber}
                        onChange={(e) => handleConsumptionItemFieldChange(item.id, "palletNumber", e.target.value)}
                        placeholder="Enter pallet number"
                      />
                    </Field>
                  </Box>

                  <Flex gap="x1">
                    <Box flex="1" pb="x3">
                      <Field>
                        <FieldLabel labelText="Quantity" pb="x1" />
                        <Input
                          type="number"
                          value={item.consumedQuantity}
                          onChange={(e) =>
                            handleConsumptionItemFieldChange(item.id, "consumedQuantity", e.target.value)
                          }
                          placeholder="Enter consumed quantity"
                        />
                      </Field>
                    </Box>
                    <Box flex="1" pb="x3">
                      <Field>
                        <FieldLabel labelText="UOM" pb="x1" />
                        <Select
                          value={item.uom}
                          onChange={(value) => handleConsumptionItemFieldChange(item.id, "uom", String(value))}
                          options={[
                            { value: "kg", label: "kg" },
                            { value: "lb", label: "lb" },
                            { value: "g", label: "g" },
                            { value: "oz", label: "oz" },
                            { value: "cases", label: "cases" },
                          ]}
                        />
                      </Field>
                    </Box>
                  </Flex>
                </Box>
              ))}

              <Box>
                <QuietButton type="button" icon="add" iconSide="left" fullWidth onClick={handleAddConsumptionItem}>
                  Add another consumption item details
                </QuietButton>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        {/* Floating Configuration */}
        {showConfigBar && (
          <Box
            position="fixed"
            bottom="x4"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="white"
            border="1px solid"
            borderColor="lightGrey"
            borderRadius="x1"
            boxShadow="medium"
          >
            <Flex alignItems="center" gap="x2" px="x2" py="x1">
              <Text fontSize="small">Tracking:</Text>
              <Tooltip tooltip="Controled by item setting. Makes the filed mandatory" placement="top">
                <Flex alignItems="center" gap="x1" width="200px">
                  <Text width="100px" fontSize="small" color="midGrey">
                    Lot code
                  </Text>
                  <Toggle
                    toggled={fieldConfig.lotCodeRequired}
                    onChange={(e) => handleFieldConfigChange("lotCodeRequired", e.target.checked)}
                  />
                </Flex>
              </Tooltip>
              <Tooltip tooltip="Controled by item setting. Makes the filed mandatory" placement="top">
                <Flex alignItems="center" gap="x1" width="200px">
                  <Text width="150px" fontSize="small" color="midGrey">
                    Expiry date
                  </Text>
                  <Toggle
                    toggled={fieldConfig.expiryDateRequired}
                    onChange={(e) => handleFieldConfigChange("expiryDateRequired", e.target.checked)}
                  />
                </Flex>
              </Tooltip>
              <Flex alignItems="center" gap="x1" width="200px">
                <Text width="100px" fontSize="small" color="midGrey">
                  Pallet
                </Text>
                <Toggle
                  toggled={fieldConfig.palletNumberRequired}
                  onChange={(e) => handleFieldConfigChange("palletNumberRequired", e.target.checked)}
                />
              </Flex>
              <Tooltip
                tooltip="Controled by Org POLI setting. Controls the display and batch production creation fileds."
                placement="top"
              >
                <Flex alignItems="center" gap="x1" width="200px">
                  <Text width="150px" fontSize="small" color="midGrey">
                    SANOFI req
                  </Text>
                  <Toggle
                    toggled={fieldConfig.sanofiRequired}
                    onChange={(e) => handleFieldConfigChange("sanofiRequired", e.target.checked)}
                  />
                </Flex>
              </Tooltip>
              <Flex alignItems="center" gap="x1" width="275px">
                <Text width="125px" fontSize="small" color="midGrey">
                  View as:
                </Text>
                <Switcher selected={role} onChange={setRole}>
                  <Switch value="supplier">Supplier</Switch>
                  <Switch value="customer">Customer</Switch>
                </Switcher>
              </Flex>
              <IconicButton
                icon="close"
                aria-label="Close configuration"
                onClick={() => setShowConfigBar(false)}
                type="button"
              />
            </Flex>
          </Box>
        )}

        {/* Edit Details Sidebar */}
        <Sidebar
          isOpen={showEditSidebar}
          onClose={handleCloseEditSidebar}
          title="Edit details"
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton type="button" onClick={handleSaveEditDetails}>
                Save
              </PrimaryButton>
              <QuietButton type="button" onClick={handleCloseEditSidebar}>
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3" py="x1">
            {/* Supplier's PO line item number - editable only by supplier */}
            {userState.role === "supplier" && (
              <Input
                labelText="Supplier's PO line item number"
                id="supplierPOLineItemNumber"
                value={editFormData.supplierPOLineItemNumber}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, supplierPOLineItemNumber: e.target.value }))}
              />
            )}

            {/* BOM revision and release date - editable */}
            <Input
              labelText="BOM revision and release date"
              id="bomRevision"
              autoFocus
              value={editFormData.bomRevision}
              onChange={(e) => setEditFormData((prev) => ({ ...prev, bomRevision: e.target.value }))}
            />

            {/* Need by date - editable */}
            <Flex flexDirection="column" gap="x1">
              <FieldLabel htmlFor="needByDate" labelText="Need by date" />
              <Box>
                <DatePicker
                  id="needByDate"
                  selected={editFormData.needByDate}
                  onChange={(date) => setEditFormData((prev) => ({ ...prev, needByDate: date }))}
                />
              </Box>
            </Flex>

            {/* Production complete fields */}
            {productionComplete && (
              <>
                {/* Carry over sent to - editable */}
                <Input
                  labelText="Carry over sent to"
                  id="carryOverSentTo"
                  value={editFormData.carryOverSentTo}
                  onChange={(e) => setEditFormData((prev) => ({ ...prev, carryOverSentTo: e.target.value }))}
                />
              </>
            )}
          </Flex>
        </Sidebar>

        <ToastContainer />
      </Page>
    </ApplicationFrame>
  );
};
