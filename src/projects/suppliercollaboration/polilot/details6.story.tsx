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
} from "../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Details 6",
};

export const Details6 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProductionSidebar, setShowProductionSidebar] = useState(false);
  const [showConsumptionSidebar, setShowConsumptionSidebar] = useState(false);
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
      note: "Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements",
      expandedContent: () => <ConsumptionReport materials={materialsData1} />,
    },
    {
      id: "1-2",
      actualQuantity: "5 cases",
      lotCode: "LOT-2025-001A",
      supplierLotCode: "SUP-LOT-001A",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001A",
      note: "Additional batch from same production run",
      expandedContent: () => <ConsumptionReport materials={materialsData2} />,
    },
    {
      id: "1-3",
      actualQuantity: "3 cases",
      lotCode: "LOT-2025-001B",
      supplierLotCode: "SUP-LOT-001B",
      expiryDate: "2026-Feb-12",
      palletNumber: "PAL-001B",
      note: "Final batch completion",
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
      expandedContent: () => <ConsumptionReport materials={materialsData5A} />,
    },
    {
      id: "5-2",
      actualQuantity: "4 cases",
      lotCode: "LOT-2025-005B",
      supplierLotCode: "SUP-LOT-005B",
      expiryDate: "2026-03-15",
      palletNumber: "PAL-005B",
      note: "Second batch completion",
      expandedContent: () => <ConsumptionReport materials={materialsData5B} />,
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
      expandedContent: () => <ConsumptionReport materials={materialsData6A} />,
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
      expandedContent: () => <ConsumptionReport materials={materialsData7B} />,
    },
  ];

  // Nested table columns configuration
  const nestedTableColumns = [
    {
      label: "",
      dataKey: "actualQuantity",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        return (
          <Flex py="x2" mr="x1">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {row.actualQuantity}
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "",
      dataKey: "lotCode",
      width: "180px",
      headerFormatter: () => null,
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
          <Box style={{ paddingLeft: "300px" }}>
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
          <Box style={{ paddingLeft: "300px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData5}
              keyField="id"
              rowBorder={true}
              className="nested-table"
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
          <Box style={{ paddingLeft: "300px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData6}
              keyField="id"
              rowBorder={true}
              className="nested-table"
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
          <Box style={{ paddingLeft: "300px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData7}
              keyField="id"
              rowBorder={true}
              className="nested-table"
              hasExpandableRows={true}
              expandedRows={nestedExpandedRows}
              onRowExpansionChange={setNestedExpandedRows}
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
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {row.actualQuantity}
            </Text>
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
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              Customer's / Supplier's
            </Text>
          )}
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // If lot code is not required in config, show "-"
        if (!fieldConfig.lotCodeRequired) {
          return (
            <Flex py="x0_75">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }

        // If all lot codes are empty, don't render anything
        if (!row.customerLotCode && !row.supplierLotCode) {
          return null;
        }

        return (
          <Flex py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerLotCode || ""}
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
          <Box py="x0_75">
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
      dataKey: "actions",
      width: "32px",
      headerFormatter: () => null,
      cellFormatter: (props: { row: any }) => {
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

  const handleOpenConsumptionSidebar = (
    materials: Array<{ item: string; lotCode: string; expiryDate: string; palletNumber: string; quantity: string }>
  ) => {
    // Parse materials and set up consumption state
    const parsedMaterials = materials.map((material, index) => {
      const parts = material.quantity.split(" ");
      return {
        id: `material-${index}`,
        item: material.item,
        lotCode: material.lotCode,
        expiryDate: material.expiryDate,
        palletNumber: material.palletNumber,
        quantity: parts[0] || "",
        unit: parts[1] || "kg",
      };
    });
    setConsumptionMaterials(parsedMaterials);
    setShowConsumptionSidebar(true);
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
    toast.success("Consumption details saved successfully!");
    handleCloseConsumptionSidebar();
  };

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
    {
      item: "Croscarmellose sodium",
      lotCode: "LOT-CCS-001",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-003",
      quantity: "0.3 kg",
    },
    {
      item: "Magnesium stearate",
      lotCode: "LOT-MS-001",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-004",
      quantity: "0.1 kg",
    },
    {
      item: "Hydroxypropyl methylcellulose",
      lotCode: "LOT-HPMC-001",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-005",
      quantity: "0.8 kg",
    },
    {
      item: "Talc powder",
      lotCode: "LOT-TALC-001",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-006",
      quantity: "0.5 kg",
    },
    {
      item: "FD&C Blue #2",
      lotCode: "LOT-BLUE-001",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-007",
      quantity: "0.02 kg",
    },
    {
      item: "Sodium benzoate",
      lotCode: "LOT-SB-001",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-008",
      quantity: "0.05 kg",
    },
  ];

  const materialsData2 = [
    {
      item: "Ibuprofen 200mg",
      lotCode: "LOT-IBU-002",
      expiryDate: "2026-04-10",
      palletNumber: "PAL-009",
      quantity: "1.8 kg",
    },
    {
      item: "Povidone K30",
      lotCode: "LOT-PVP-002",
      expiryDate: "2026-05-15",
      palletNumber: "PAL-010",
      quantity: "0.9 kg",
    },
    {
      item: "Sodium starch glycolate",
      lotCode: "LOT-SSG-002",
      expiryDate: "2026-06-20",
      palletNumber: "PAL-011",
      quantity: "0.4 kg",
    },
    {
      item: "Stearic acid",
      lotCode: "LOT-SA-002",
      expiryDate: "2026-07-25",
      palletNumber: "PAL-012",
      quantity: "0.2 kg",
    },
    {
      item: "FD&C Red #40",
      lotCode: "LOT-RED-002",
      expiryDate: "2026-08-30",
      palletNumber: "PAL-013",
      quantity: "0.05 kg",
    },
    {
      item: "Silicon dioxide",
      lotCode: "LOT-SD-002",
      expiryDate: "2026-09-15",
      palletNumber: "PAL-014",
      quantity: "0.3 kg",
    },
    {
      item: "Aspartame",
      lotCode: "LOT-ASP-002",
      expiryDate: "2026-10-20",
      palletNumber: "PAL-015",
      quantity: "0.1 kg",
    },
    {
      item: "Mint flavor",
      lotCode: "LOT-MF-002",
      expiryDate: "2026-11-25",
      palletNumber: "PAL-016",
      quantity: "0.02 kg",
    },
  ];

  const materialsData5A = [
    {
      item: "Ibuprofen 200mg",
      lotCode: "LOT-IBU-005A",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-017",
      quantity: "1.8 kg",
    },
    {
      item: "Povidone K30",
      lotCode: "LOT-PVP-005A",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-018",
      quantity: "0.9 kg",
    },
    {
      item: "Sodium starch glycolate",
      lotCode: "LOT-SSG-005A",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-019",
      quantity: "0.4 kg",
    },
    {
      item: "Stearic acid",
      lotCode: "LOT-SA-005A",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-020",
      quantity: "0.2 kg",
    },
    {
      item: "FD&C Red #40",
      lotCode: "LOT-RED-005A",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-021",
      quantity: "0.05 kg",
    },
    {
      item: "Silicon dioxide",
      lotCode: "LOT-SD-005A",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-022",
      quantity: "0.3 kg",
    },
    {
      item: "Aspartame",
      lotCode: "LOT-ASP-005A",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-023",
      quantity: "0.1 kg",
    },
    {
      item: "Mint flavor",
      lotCode: "LOT-MF-005A",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-024",
      quantity: "0.02 kg",
    },
  ];

  const materialsData5B = [
    {
      item: "Ibuprofen 200mg",
      lotCode: "LOT-IBU-005B",
      expiryDate: "2026-05-10",
      palletNumber: "PAL-025",
      quantity: "0.9 kg",
    },
    {
      item: "Povidone K30",
      lotCode: "LOT-PVP-005B",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-026",
      quantity: "0.45 kg",
    },
    {
      item: "Sodium starch glycolate",
      lotCode: "LOT-SSG-005B",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-027",
      quantity: "0.2 kg",
    },
    {
      item: "Stearic acid",
      lotCode: "LOT-SA-005B",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-028",
      quantity: "0.1 kg",
    },
    {
      item: "FD&C Red #40",
      lotCode: "LOT-RED-005B",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-029",
      quantity: "0.025 kg",
    },
    {
      item: "Silicon dioxide",
      lotCode: "LOT-SD-005B",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-030",
      quantity: "0.15 kg",
    },
    {
      item: "Aspartame",
      lotCode: "LOT-ASP-005B",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-031",
      quantity: "0.05 kg",
    },
    {
      item: "Mint flavor",
      lotCode: "LOT-MF-005B",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-032",
      quantity: "0.01 kg",
    },
  ];

  const materialsData6A = [
    {
      item: "Acetaminophen 500mg",
      lotCode: "LOT-ACET-006A",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-033",
      quantity: "3.2 kg",
    },
    {
      item: "Microcrystalline cellulose",
      lotCode: "LOT-MCC-006A",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-034",
      quantity: "1.5 kg",
    },
    {
      item: "Croscarmellose sodium",
      lotCode: "LOT-CCS-006A",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-035",
      quantity: "0.4 kg",
    },
    {
      item: "Magnesium stearate",
      lotCode: "LOT-MS-006A",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-036",
      quantity: "0.15 kg",
    },
    {
      item: "Hydroxypropyl methylcellulose",
      lotCode: "LOT-HPMC-006A",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-037",
      quantity: "1.0 kg",
    },
    {
      item: "Talc powder",
      lotCode: "LOT-TALC-006A",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-038",
      quantity: "0.6 kg",
    },
    {
      item: "FD&C Blue #2",
      lotCode: "LOT-BLUE-006A",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-039",
      quantity: "0.03 kg",
    },
    {
      item: "Sodium benzoate",
      lotCode: "LOT-SB-006A",
      expiryDate: "2027-01-30",
      palletNumber: "PAL-040",
      quantity: "0.08 kg",
    },
  ];

  const materialsData6B = [
    {
      item: "Acetaminophen 500mg",
      lotCode: "LOT-ACET-006B",
      expiryDate: "2026-06-15",
      palletNumber: "PAL-041",
      quantity: "1.7 kg",
    },
    {
      item: "Microcrystalline cellulose",
      lotCode: "LOT-MCC-006B",
      expiryDate: "2026-07-20",
      palletNumber: "PAL-042",
      quantity: "0.8 kg",
    },
    {
      item: "Croscarmellose sodium",
      lotCode: "LOT-CCS-006B",
      expiryDate: "2026-08-25",
      palletNumber: "PAL-043",
      quantity: "0.2 kg",
    },
    {
      item: "Magnesium stearate",
      lotCode: "LOT-MS-006B",
      expiryDate: "2026-09-30",
      palletNumber: "PAL-044",
      quantity: "0.08 kg",
    },
    {
      item: "Hydroxypropyl methylcellulose",
      lotCode: "LOT-HPMC-006B",
      expiryDate: "2026-10-15",
      palletNumber: "PAL-045",
      quantity: "0.5 kg",
    },
    {
      item: "Talc powder",
      lotCode: "LOT-TALC-006B",
      expiryDate: "2026-11-20",
      palletNumber: "PAL-046",
      quantity: "0.3 kg",
    },
    {
      item: "FD&C Blue #2",
      lotCode: "LOT-BLUE-006B",
      expiryDate: "2026-12-25",
      palletNumber: "PAL-047",
      quantity: "0.015 kg",
    },
    {
      item: "Sodium benzoate",
      lotCode: "LOT-SB-006B",
      expiryDate: "2027-01-30",
      palletNumber: "PAL-048",
      quantity: "0.04 kg",
    },
  ];

  const materialsData7A = [
    { item: "Pending - Acetaminophen 500mg", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Microcrystalline cellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
    },
    {
      item: "Pending - Croscarmellose sodium",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
    },
    { item: "Pending - Magnesium stearate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Hydroxypropyl methylcellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
    },
    { item: "Pending - Talc powder", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - FD&C Blue #2", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium benzoate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
  ];

  const materialsData7B = [
    { item: "Pending - Acetaminophen 500mg", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Microcrystalline cellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
    },
    {
      item: "Pending - Croscarmellose sodium",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
    },
    { item: "Pending - Magnesium stearate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    {
      item: "Pending - Hydroxypropyl methylcellulose",
      lotCode: "TBD",
      expiryDate: "TBD",
      palletNumber: "TBD",
      quantity: "TBD",
    },
    { item: "Pending - Talc powder", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - FD&C Blue #2", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
    { item: "Pending - Sodium benzoate", lotCode: "TBD", expiryDate: "TBD", palletNumber: "TBD", quantity: "TBD" },
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
        return formatDateToYYYYMonDD(row.expiryDate);
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
      width: "100px",
    },
  ];

  // Reusable Consumption Report Component
  const ConsumptionReport = ({
    materials,
  }: {
    materials: Array<{ item: string; lotCode: string; expiryDate: string; palletNumber: string; quantity: string }>;
  }) => (
    <Box my="x1" border="1px solid #ddd" borderRadius="4px" p="x2">
      <Flex justifyContent="space-between" alignItems="center" mb="x2">
        <Heading4>Consumption details</Heading4>
        <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
          <DropdownButton onClick={() => handleOpenConsumptionSidebar(materials)}>Edit consumption</DropdownButton>
        </DropdownMenu>
      </Flex>
      <Table columns={consumptionTableColumns} rows={materials} keyField="item" compact={true} rowBorder={true} />
    </Box>
  );

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
          /* Hide nested table headers */
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
                    <FieldLabel labelText="Unit" pb="x1" />
                    <Select
                      value={material.unit}
                      onChange={(value) => handleConsumptionFieldChange(material.id, "unit", String(value))}
                      options={unitOptions}
                    />
                  </Field>
                </Box>
              ))}
            </FormSection>
          </Form>
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
