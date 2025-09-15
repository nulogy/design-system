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
  title: "Projects/Supplier Collaboration/POLI lot/Details 5",
};

export const Details5 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showProductionSidebar, setShowProductionSidebar] = useState(false);
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
      width: "60px",
      headerFormatter: () => null,
      cellFormatter: (props: { row: any }) => {
        // Show Edit action for all rows
        return (
          <DropdownMenu
            trigger={() => <IconicButton icon="more" aria-label="More actions" />}
            placement="bottom-end"
          >
            <DropdownButton onClick={() => setShowProductionSidebar(true)}>Edit</DropdownButton>
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
    setProductionBatches((prev) =>
      prev.map((batch) => (batch.id === batchId ? { ...batch, [field]: value } : batch))
    );
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

  // Materials data for consumption reports
  const materialsData1 = [
    { label: "Active Ingredient", value: "Acetaminophen 500mg", quantity: "2.5 kg" },
    { label: "Binder", value: "Microcrystalline cellulose", quantity: "1.2 kg" },
    { label: "Disintegrant", value: "Croscarmellose sodium", quantity: "0.3 kg" },
    { label: "Lubricant", value: "Magnesium stearate", quantity: "0.1 kg" },
    { label: "Coating", value: "Hydroxypropyl methylcellulose", quantity: "0.8 kg" },
    { label: "Glidant", value: "Talc powder", quantity: "0.5 kg" },
    { label: "Colorant", value: "FD&C Blue #2", quantity: "0.02 kg" },
    { label: "Preservative", value: "Sodium benzoate", quantity: "0.05 kg" },
  ];

  const materialsData2 = [
    { label: "Active Ingredient", value: "Ibuprofen 200mg", quantity: "1.8 kg" },
    { label: "Binder", value: "Povidone K30", quantity: "0.9 kg" },
    { label: "Disintegrant", value: "Sodium starch glycolate", quantity: "0.4 kg" },
    { label: "Lubricant", value: "Stearic acid", quantity: "0.2 kg" },
    { label: "Colorant", value: "FD&C Red #40", quantity: "0.05 kg" },
    { label: "Glidant", value: "Silicon dioxide", quantity: "0.3 kg" },
    { label: "Sweetener", value: "Aspartame", quantity: "0.1 kg" },
    { label: "Flavoring", value: "Mint flavor", quantity: "0.02 kg" },
  ];

  const materialsData5A = [
    { label: "Active Ingredient", value: "Ibuprofen 200mg", quantity: "1.8 kg" },
    { label: "Binder", value: "Povidone K30", quantity: "0.9 kg" },
    { label: "Disintegrant", value: "Sodium starch glycolate", quantity: "0.4 kg" },
    { label: "Lubricant", value: "Stearic acid", quantity: "0.2 kg" },
    { label: "Colorant", value: "FD&C Red #40", quantity: "0.05 kg" },
    { label: "Glidant", value: "Silicon dioxide", quantity: "0.3 kg" },
    { label: "Sweetener", value: "Aspartame", quantity: "0.1 kg" },
    { label: "Flavoring", value: "Mint flavor", quantity: "0.02 kg" },
  ];

  const materialsData5B = [
    { label: "Active Ingredient", value: "Ibuprofen 200mg", quantity: "0.9 kg" },
    { label: "Binder", value: "Povidone K30", quantity: "0.45 kg" },
    { label: "Disintegrant", value: "Sodium starch glycolate", quantity: "0.2 kg" },
    { label: "Lubricant", value: "Stearic acid", quantity: "0.1 kg" },
    { label: "Colorant", value: "FD&C Red #40", quantity: "0.025 kg" },
    { label: "Glidant", value: "Silicon dioxide", quantity: "0.15 kg" },
    { label: "Sweetener", value: "Aspartame", quantity: "0.05 kg" },
    { label: "Flavoring", value: "Mint flavor", quantity: "0.01 kg" },
  ];

  const materialsData6A = [
    { label: "Active Ingredient", value: "Acetaminophen 500mg - 3.2 kg" },
    { label: "Binder", value: "Microcrystalline cellulose - 1.5 kg" },
    { label: "Disintegrant", value: "Croscarmellose sodium - 0.4 kg" },
    { label: "Lubricant", value: "Magnesium stearate - 0.15 kg" },
    { label: "Coating", value: "Hydroxypropyl methylcellulose - 1.0 kg" },
    { label: "Glidant", value: "Talc powder - 0.6 kg" },
    { label: "Colorant", value: "FD&C Blue #2 - 0.03 kg" },
    { label: "Preservative", value: "Sodium benzoate - 0.08 kg" },
  ];

  const materialsData6B = [
    { label: "Active Ingredient", value: "Acetaminophen 500mg - 1.7 kg" },
    { label: "Binder", value: "Microcrystalline cellulose - 0.8 kg" },
    { label: "Disintegrant", value: "Croscarmellose sodium - 0.2 kg" },
    { label: "Lubricant", value: "Magnesium stearate - 0.08 kg" },
    { label: "Coating", value: "Hydroxypropyl methylcellulose - 0.5 kg" },
    { label: "Glidant", value: "Talc powder - 0.3 kg" },
    { label: "Colorant", value: "FD&C Blue #2 - 0.015 kg" },
    { label: "Preservative", value: "Sodium benzoate - 0.04 kg" },
  ];

  const materialsData7A = [
    { label: "Active Ingredient", value: "Pending - Acetaminophen 500mg" },
    { label: "Binder", value: "Pending - Microcrystalline cellulose" },
    { label: "Disintegrant", value: "Pending - Croscarmellose sodium" },
    { label: "Lubricant", value: "Pending - Magnesium stearate" },
    { label: "Coating", value: "Pending - Hydroxypropyl methylcellulose" },
    { label: "Glidant", value: "Pending - Talc powder" },
    { label: "Colorant", value: "Pending - FD&C Blue #2" },
    { label: "Preservative", value: "Pending - Sodium benzoate" },
  ];

  const materialsData7B = [
    { label: "Active Ingredient", value: "Pending - Acetaminophen 500mg" },
    { label: "Binder", value: "Pending - Microcrystalline cellulose" },
    { label: "Disintegrant", value: "Pending - Croscarmellose sodium" },
    { label: "Lubricant", value: "Pending - Magnesium stearate" },
    { label: "Coating", value: "Pending - Hydroxypropyl methylcellulose" },
    { label: "Glidant", value: "Pending - Talc powder" },
    { label: "Colorant", value: "Pending - FD&C Blue #2" },
    { label: "Preservative", value: "Pending - Sodium benzoate" },
  ];

  // Reusable Consumption Report Component
  const ConsumptionReport = ({ materials }: { materials: Array<{ label: string; value: string }> }) => (
    
      <Flex justifyContent="space-between" alignItems="flex-start" my="x1" ml="x7">
        <DescriptionList density="compact" columns={4} fontSize="small">
          {materials.map((material, index) => (
            <DescriptionGroup key={index}>
              <DescriptionTerm>{material.label}</DescriptionTerm>
              <DescriptionDetails>{material.value}</DescriptionDetails>
            </DescriptionGroup>
          ))}
        </DescriptionList>
        <DropdownMenu
          trigger={() => <IconicButton icon="more" aria-label="More actions" />}
          placement="bottom-end"
          mr="x1"
        >
          <DropdownButton onClick={() => setShowProductionSidebar(true)}>
            Edit consumption details
          </DropdownButton>
        </DropdownMenu>
      </Flex>
    
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
          <Tab id="overview" label="Overview">
            <Box py="x4">
              <Flex justifyContent="flex-end" mb="x3">
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
          <Tab id="production-record" label="Production record">
            <Box py="x4">
              <Flex justifyContent="flex-end" mb="x3">
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
          title="Production record"
          width="600px"
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Production summary" pb="x1" />
                </Field>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Date" pb="x1" requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined} />
                    <DatePicker
                      onChange={(date) => handleProductionFieldChange("date", date?.toISOString() || "")}
                      selected={productionRecord.date ? new Date(productionRecord.date) : undefined}
                      inputProps={{ disabled: true }}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="UOM" pb="x1" requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined} />
                    <Select
                      value={productionRecord.uom}
                      onChange={(value) => handleProductionFieldChange("uom", String(value))}
                      options={uomOptions}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Expected quantity" pb="x1" />
                    <Input
                      type="number"
                      value={productionRecord.expectedQuantity}
                      onChange={(e) => handleProductionFieldChange("expectedQuantity", e.target.value)}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Note" pb="x1" />
                    <Textarea
                      value={productionRecord.note}
                      onChange={(e) => handleProductionFieldChange("note", e.target.value)}
                    />
                  </Field>
                </Box>
              </Box>

              <Box pb="x3">
                <Divider />
              </Box>

              <Box pb="x3">
                <Flex justifyContent="space-between" alignItems="center" mb="x2">
                  <Heading4 mb="x2">Production batch details</Heading4>
                </Flex>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Produced quantity" pb="x1" requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined} />
                    <Input
                      type="number"
                      value={productionRecord.producedQuantity}
                      onChange={(e) => handleProductionFieldChange("producedQuantity", e.target.value)}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Lot code" pb="x1" requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined} />
                    <Input
                      value={productionRecord.lotCode}
                      onChange={(e) => handleProductionFieldChange("lotCode", e.target.value)}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Expiry date" pb="x1" requirementText={fieldConfig.expiryDateRequired ? "(Required)" : undefined} />
                    <Input
                      value={productionRecord.expiryDate}
                      onChange={(e) => handleProductionFieldChange("expiryDate", e.target.value)}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Pallet number" pb="x1" requirementText={fieldConfig.palletNumberRequired ? "(Required)" : undefined} />
                    <Input
                      value={productionRecord.palletNumber}
                      onChange={(e) => handleProductionFieldChange("palletNumber", e.target.value)}
                    />
                  </Field>
                </Box>
                <Box pb="x3">
                  <Field>
                    <FieldLabel labelText="Note" pb="x1" />
                    <Textarea
                      value={productionRecord.note}
                      onChange={(e) => handleProductionFieldChange("note", e.target.value)}
                    />
                  </Field>
                </Box>
              </Box>

              {productionBatches.map((batch, index) => (
                <Box key={batch.id} pb="x3">
                  <Box pb="x3">
                    <Divider />
                  </Box>
                  <Box pb="x3">
                    <Flex justifyContent="space-between" alignItems="center" mb="x2">
                      <Heading4 mb="x2">Production batch {index + 2} details</Heading4>
                      <IconicButton
                        icon="removeCircleOutline"
                        aria-label="Remove batch"
                        onClick={() => handleRemoveBatch(batch.id)}
                        type="button"
                      />
                    </Flex>
                    <Box pb="x3">
                      <Field>
                        <FieldLabel labelText="Produced quantity" pb="x1" requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined} />
                        <Input
                          type="number"
                          value={batch.producedQuantity}
                          onChange={(e) => handleBatchFieldChange(batch.id, "producedQuantity", e.target.value)}
                        />
                      </Field>
                    </Box>
                    <Box pb="x3">
                      <Field>
                        <FieldLabel labelText="Lot code" pb="x1" requirementText={fieldConfig.lotCodeRequired ? "(Required)" : undefined} />
                        <Input
                          value={batch.lotCode}
                          onChange={(e) => handleBatchFieldChange(batch.id, "lotCode", e.target.value)}
                        />
                      </Field>
                    </Box>
                    <Box pb="x3">
                      <Field>
                        <FieldLabel labelText="Expiry date" pb="x1" requirementText={fieldConfig.expiryDateRequired ? "(Required)" : undefined} />
                        <Input
                          value={batch.expiryDate}
                          onChange={(e) => handleBatchFieldChange(batch.id, "expiryDate", e.target.value)}
                        />
                      </Field>
                    </Box>
                    <Box pb="x3">
                      <Field>
                        <FieldLabel labelText="Pallet number" pb="x1" requirementText={fieldConfig.palletNumberRequired ? "(Required)" : undefined} />
                        <Input
                          value={batch.palletNumber}
                          onChange={(e) => handleBatchFieldChange(batch.id, "palletNumber", e.target.value)}
                        />
                      </Field>
                    </Box>
                    <Box pb="x3">
                      <Field>
                        <FieldLabel labelText="Note" pb="x1" />
                        <Textarea
                          value={batch.note}
                          onChange={(e) => handleBatchFieldChange(batch.id, "note", e.target.value)}
                        />
                      </Field>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Box pb="x3">
                <Divider />
              </Box>

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

              <Flex gap="x2" justifyContent="flex-end">
                <Button onClick={handleCloseProductionSidebar}>Cancel</Button>
                <PrimaryButton onClick={handleSaveProduction} type="button">
                  Save
                </PrimaryButton>
              </Flex>
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
            <Text fontSize="x0_5">Tracking:</Text>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">Lot code</Text>
              <Toggle
                toggled={fieldConfig.lotCodeRequired}
                onChange={(e) => handleFieldConfigChange("lotCodeRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">Expiry date</Text>
              <Toggle
                toggled={fieldConfig.expiryDateRequired}
                onChange={(e) => handleFieldConfigChange("expiryDateRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">Pallet</Text>
              <Toggle
                toggled={fieldConfig.palletNumberRequired}
                onChange={(e) => handleFieldConfigChange("palletNumberRequired", e.target.checked)}
              />
            </Flex>
            <Flex alignItems="center" gap="x1">
              <Text fontSize="x0_25" color="midGrey">SANOFI req</Text>
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
