import React, { useState } from "react";
import { toast, Tooltip } from "../../../..";
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
} from "../../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/Progress/Details 7",
};

export const Details7 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProductionSidebar, setShowProductionSidebar] = useState(false);
  const [showConsumptionSidebar, setShowConsumptionSidebar] = useState(false);
  const [selectedConsumptionData, setSelectedConsumptionData] = useState<
    Array<{ item: string; lotCode: string; expiryDate: string; palletNumber: string; quantity: string }>
  >([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [nestedExpandedRows, setNestedExpandedRows] = useState<string[]>([]);
  const [productionRecord, setProductionRecord] = useState({
    date: "",
    uom: "",
    expectedQuantity: "",
    actualQuantity: "",
    lotCode: "",
    expiryDate: "",
    palletNumber: "",
    producedQuantity: "",
    note: "",
  });
  const [productionBatches, setProductionBatches] = useState([]);
  const [consumptionMaterials, setConsumptionMaterials] = useState([]);
  const [fieldConfig, setFieldConfig] = useState({
    lotCodeRequired: false,
    palletNumberRequired: false,
    expiryDateRequired: false,
    sanofiRequired: false,
  });

  // Materials data for consumption reports
  const materialsData1 = [
    {
      item: "Acetaminophen 500mg",
      lotCode: "LOT-ACET-001",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-001",
      quantity: "2.5 kg",
    },
    {
      item: "Microcrystalline cellulose",
      lotCode: "LOT-MCC-001",
      expiryDate: "2026-04-20",
      palletNumber: "PAL-002",
      quantity: "1.2 kg",
    },
  ];

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
      actualQuantity: "0 cases",
      lotCode: "LOT-2025-001",
      supplierLotCode: "SUP-LOT-001",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001",
      note: "Production details for this lot",
      consumptionData: [],
    },
    {
      id: "1-2",
      actualQuantity: "5 cases",
      lotCode: "LOT-2025-001A",
      supplierLotCode: "SUP-LOT-001A",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001A",
      note: "Additional batch from same production run",
      consumptionData: materialsData1,
    },
  ];

  const nestedTableData2 = [
    {
      id: "2-1",
      actualQuantity: "12 cases",
      lotCode: "LOT-2025-002",
      supplierLotCode: "SUP-LOT-002",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-002",
      note: "Standard production run",
      consumptionData: materialsData1,
    },
  ];

  const nestedTableData3 = [
    {
      id: "3-1",
      actualQuantity: "25 cases",
      lotCode: "LOT-2025-003",
      supplierLotCode: "SUP-LOT-003",
      expiryDate: "2026-04-20",
      palletNumber: "PAL-003",
      note: "High volume production batch",
      consumptionData: materialsData1,
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
      note: "Equipment maintenance scheduled",
      consumptionData: [],
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
      consumptionData: materialsData1,
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
      consumptionData: materialsData1,
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
      note: "Production on hold",
      consumptionData: [],
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
      note: "Special order for premium customer",
      consumptionData: materialsData1,
    },
  ];

  // Nested table columns configuration
  const nestedTableColumns = [
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
            {fieldConfig.sanofiRequired && (
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
            )}
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

        return formatDateToYYYYMonDD(row.expiryDate);
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
      dataKey: "consumption",
      width: "40px",
      headerFormatter: () => null,
      cellRenderer: ({ row }: { row: any }) => {
        if (!row.consumptionData || row.consumptionData.length === 0) return null;
        return (
          <Flex justifyContent="center" py="x0_75" pr="x1">
            <IconicButton
              icon="arrowForward"
              aria-label="Consumption details"
              onClick={() => handleOpenConsumptionSidebar(row.consumptionData)}
            />
          </Flex>
        );
      },
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData1}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData2}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData3}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData4}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData5}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData6}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData7}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
            />
          </Box>
        </Box>
      ),
    },
    {
      id: "8",
      date: "2025-Jun-05",
      lotCodeAndExpiry: "LOT-2025-008",
      customerLotCode: "LOT-2025-008",
      supplierLotCode: "SUP-LOT-008",
      expiryDate: "2026-06-05",
      palletNumber: "PAL-008",
      expectedQuantity: "15 cases",
      actualQuantity: "15 cases",
      note: "Special order for premium customer, expedited processing",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "356px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData8}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              compact={true}
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
          {fieldConfig.sanofiRequired && (
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              Customer's / Supplier's
            </Text>
          )}
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Always show "-" for parent table rows since detailed info is in nested tables
        return (
          <Flex py="x0_75">
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              -
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // Always show "-" for parent table rows since detailed info is in nested tables
        return (
          <Flex py="x0_75">
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              -
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // Always show "-" for parent table rows since detailed info is in nested tables
        return (
          <Flex py="x0_75">
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              -
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Note",
      dataKey: "note",
      width: "auto",
      cellRenderer: ({ row }: { row: any }) => {
        // Always show "-" for parent table rows since detailed info is in nested tables
        return (
          <Flex py="x0_75">
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              -
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "",
      dataKey: "actions",
      width: "32px",
      headerFormatter: () => null,
      cellRenderer: (props: { row: any }) => {
        // Show Edit action for all rows
        return (
          <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
            <DropdownButton onClick={() => setShowProductionSidebar(true)}>Edit production</DropdownButton>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleAddProduction = () => {
    setShowProductionSidebar(true);
  };

  const handleCloseProductionSidebar = () => {
    setShowProductionSidebar(false);
    setProductionRecord({
      date: "",
      uom: "",
      expectedQuantity: "",
      actualQuantity: "",
      lotCode: "",
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

  const handleCloseConsumptionSidebar = () => {
    setShowConsumptionSidebar(false);
    setConsumptionMaterials([]);
  };

  const handleOpenConsumptionSidebar = (
    materials: Array<{ item: string; lotCode: string; expiryDate: string; palletNumber: string; quantity: string }>
  ) => {
    setSelectedConsumptionData(materials);
    setShowConsumptionSidebar(true);
  };

  const handleConsumptionFieldChange = (materialId: string, field: string, value: string) => {
    setConsumptionMaterials((prev) =>
      prev.map((material) => (material.id === materialId ? { ...material, [field]: value } : material))
    );
  };

  const handleSaveConsumption = () => {
    toast.success("Consumption details saved successfully!");
    handleCloseConsumptionSidebar();
  };

  // Materials data for consumption reports

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
        return formatDateToYYYYMonDD(row.expiryDate);
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "120px",
    },
    {
      label: "Consumed quantity",
      dataKey: "quantity",
      width: "100px",
    },
  ];

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
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
            padding: 8px 12px !important;
            border: none !important;
            border-bottom: 1px solid #e0e0e0 !important;
            line-height: normal !important;
            font-size: 14px !important;
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
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab id="overview" label="Production record">
            <Box>
              <Flex justifyContent="flex-end" mb="x1">
                <IconicButton icon="add" aria-label="Add production" onClick={handleAddProduction}>
                  Add production
                </IconicButton>
              </Flex>

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
        </Tabs>

        {/* Production Sidebar */}
        <Sidebar
          isOpen={showProductionSidebar}
          onClose={handleCloseProductionSidebar}
          title="Create production record"
          width="600px"
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
                <FieldLabel
                  labelText="Date"
                  pb="x1"
                  requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                />
                <DatePicker
                  onChange={(date) => handleProductionFieldChange("date", date?.toISOString() || "")}
                  selected={productionRecord.date ? new Date(productionRecord.date) : undefined}
                  inputProps={{ disabled: true }}
                />
              </Field>

              <Field width="50%">
                <FieldLabel
                  labelText="UOM"
                  pb="x1"
                  requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                />
                <Select
                  value={productionRecord.uom}
                  onChange={(value) => handleProductionFieldChange("uom", String(value))}
                  options={uomOptions}
                />
              </Field>

              <Field width="50%" pb="x1">
                <FieldLabel labelText="Expected quantity" pb="x1" />
                <Input
                  type="number"
                  value={productionRecord.expectedQuantity}
                  onChange={(e) => handleProductionFieldChange("expectedQuantity", e.target.value)}
                />
              </Field>

              <Divider mb="x3" />

              <Flex justifyContent="space-between" alignItems="center" mb="x2">
                <Heading4>Production details: Batch 1</Heading4>
              </Flex>

              <Field width="50%">
                <FieldLabel
                  labelText="Produced quantity"
                  pb="x1"
                  requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                />
                <Input
                  type="number"
                  value={productionRecord.producedQuantity}
                  onChange={(e) => handleProductionFieldChange("producedQuantity", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel
                  labelText="Lot code"
                  pb="x1"
                  requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                />
                <Input
                  value={productionRecord.lotCode}
                  onChange={(e) => handleProductionFieldChange("lotCode", e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel
                  labelText="Expiry date"
                  pb="x1"
                  requirementText={fieldConfig.expiryDateRequired ? "(Required)" : undefined}
                />
                <DatePicker
                  onChange={(date) => handleProductionFieldChange("date", date?.toISOString() || "")}
                  selected={productionRecord.date ? new Date(productionRecord.date) : undefined}
                />
              </Field>

              <Field>
                <FieldLabel
                  labelText="Pallet number"
                  pb="x1"
                  requirementText={fieldConfig.palletNumberRequired ? "(Required)" : undefined}
                />
                <Input
                  value={productionRecord.palletNumber}
                  onChange={(e) => handleProductionFieldChange("palletNumber", e.target.value)}
                />
              </Field>

              <Field pb="x1">
                <FieldLabel labelText="Note" pb="x1" />
                <Textarea
                  value={productionRecord.note}
                  onChange={(e) => handleProductionFieldChange("note", e.target.value)}
                />
              </Field>

              {productionBatches.map((batch, index) => (
                <Box key={batch.id}>
                  <Divider mb="x2_5" />

                  <Flex justifyContent="space-between" alignItems="center" mb="x2">
                    <Heading4 pb="0">Production details: batch {index + 2}</Heading4>
                    <IconicButton
                      icon="removeCircleOutline"
                      aria-label="Remove batch"
                      onClick={() => handleRemoveBatch(batch.id)}
                      type="button"
                    />
                  </Flex>

                  <Field>
                    <FieldLabel
                      labelText="Produced quantity"
                      pb="x1"
                      requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                    />
                    <Input
                      type="number"
                      value={batch.producedQuantity}
                      onChange={(e) => handleBatchFieldChange(batch.id, "producedQuantity", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      labelText="Lot code"
                      pb="x1"
                      requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined}
                    />
                    <Input
                      value={batch.lotCode}
                      onChange={(e) => handleBatchFieldChange(batch.id, "lotCode", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      labelText="Expiry date"
                      pb="x1"
                      requirementText={fieldConfig.expiryDateRequired ? "(Required)" : undefined}
                    />
                    <Input
                      value={batch.expiryDate}
                      onChange={(e) => handleBatchFieldChange(batch.id, "expiryDate", e.target.value)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel
                      labelText="Pallet number"
                      pb="x1"
                      requirementText={fieldConfig.palletNumberRequired ? "(Required)" : undefined}
                    />
                    <Input
                      value={batch.palletNumber}
                      onChange={(e) => handleBatchFieldChange(batch.id, "palletNumber", e.target.value)}
                    />
                  </Field>

                  <Field pb="x1">
                    <FieldLabel labelText="Note" pb="x1" />
                    <Textarea
                      value={batch.note}
                      onChange={(e) => handleBatchFieldChange(batch.id, "note", e.target.value)}
                    />
                  </Field>
                </Box>
              ))}

              <Divider mb="x3" />

              <Box pb="x3">
                <QuietButton
                  icon="addCircleOutline"
                  iconSide="left"
                  fullWidth
                  onClick={handleAddAnotherProduction}
                  type="button"
                >
                  Add another production batch details
                </QuietButton>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        {/* Consumption Details Sidebar */}
        <Sidebar
          isOpen={showConsumptionSidebar}
          onClose={handleCloseConsumptionSidebar}
          title="Consumption details"
          helpText="Consumption for [item] on [Date]"
          width="1024px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
        >
          <Table
            columns={consumptionTableColumns}
            rows={selectedConsumptionData}
            keyField="item"
            compact={true}
            rowBorder={true}
          />
        </Sidebar>

        {/* Floating Configuration */}
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
            <Flex alignItems="center" gap="x1" width="200px">
              <Text width="100px" fontSize="small" color="midGrey">
                Lot code
              </Text>
              <Toggle
                toggled={fieldConfig.lotCodeRequired}
                onChange={(e) => handleFieldConfigChange("lotCodeRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1" width="200px">
              <Text width="150px" fontSize="small" color="midGrey">
                Expiry date
              </Text>
              <Toggle
                toggled={fieldConfig.expiryDateRequired}
                onChange={(e) => handleFieldConfigChange("expiryDateRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1" width="200px">
              <Text width="100px" fontSize="small" color="midGrey">
                Pallet
              </Text>
              <Toggle
                toggled={fieldConfig.palletNumberRequired}
                onChange={(e) => handleFieldConfigChange("palletNumberRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1" width="200px">
              <Text width="150px" fontSize="small" color="midGrey">
                SANOFI req
              </Text>
              <Toggle
                toggled={fieldConfig.sanofiRequired}
                onChange={(e) => handleFieldConfigChange("sanofiRequired", e.target.checked)}
              />
            </Flex>
          </Flex>
        </Box>

        <ToastContainer />
      </Page>
    </ApplicationFrame>
  );
};
