import React, { useState } from "react";
import { toast, Tooltip, NDSProvider, Alert, InlineValidation } from "../../../..";
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
  AsyncSelect,
  Textarea,
  Toggle,
  Switcher,
  Switch,
  Radio,
  RadioGroup,
  Pagination,
  Modal,
  List,
  ListItem,
} from "../../../..";

export default {
  title: "Projects/Supplier Collaboration/Lot traceability/Validations/Simplified",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Production planning", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Quality control", href: "/" },
];

const secondaryMenu = [
  {
    name: "Lot traceability",
    items: [
      { name: "Overview", href: "/" },
      { name: "Production records", href: "/" },
      { name: "Quality reports", href: "/" },
    ],
  },
];

// Simplified component with InlineValidation error boxes
const InlineSimplified = () => {
  // Reusable RecordNumberPill component for Simplified
  const RecordNumberPill = ({
    number,
    tooltip,
    placement = "top",
    fontSize = "smaller",
    style,
    mr,
    backgroundColor = "lightGrey",
    textColor = "darkGrey",
    borderColor,
    boxShadow,
  }: {
    number: string;
    tooltip?: string;
    placement?: "left" | "right" | "top" | "bottom";
    fontSize?: "smaller" | "small";
    style?: React.CSSProperties;
    mr?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    boxShadow?: "small" | "medium" | "large";
  }) => {
    const pillContent = (
      <Box
        backgroundColor={backgroundColor}
        border={borderColor ? `solid 1px` : undefined}
        borderColor={borderColor}
        boxShadow={boxShadow}
        px="half"
        borderRadius="small"
        width="fit-content"
        mr={mr}
        style={{ display: "inline-block" }}
      >
        <Text
          color={textColor}
          fontSize={fontSize}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing=".05em"
          lineHeight="smallerText"
          style={style}
        >
          {number}
        </Text>
      </Box>
    );

    return tooltip ? (
      <Tooltip tooltip={tooltip} placement={placement}>
        {pillContent}
      </Tooltip>
    ) : (
      pillContent
    );
  };

  // Copy all the state and handlers from Details11
  const [showProductionSidebar, setShowProductionSidebar] = useState(true); // Open by default for errors
  const [isEditingProduction, setIsEditingProduction] = useState(false);

  // Helper to determine if we're in create/edit mode (should apply date dependency)
  const isInCreateEditMode = showProductionSidebar || isEditingProduction;
  const [productionEntryType, setProductionEntryType] = useState<"quick" | "detailed">("quick");
  const [historyLogFilter, setHistoryLogFilter] = useState("All");
  const [actualQuantity, setActualQuantity] = useState("");
  const [productionRows, setProductionRows] = useState<
    Array<{
      id: string;
      palletNumber: string;
      customerLotCode: string;
      supplierLotCode: string;
      expiryDate: string;
      quantity: string;
      uom: string;
      verticalAlign?: string;
    }>
  >([
    {
      id: "row-1",
      palletNumber: "PAL-001",
      customerLotCode: "CUST-001",
      supplierLotCode: "SUPP-001",
      expiryDate: "2024-12-31",
      quantity: "50",
      uom: "kg",
      verticalAlign: "top",
    },
    {
      id: "row-2",
      palletNumber: "PAL-DUPLICATE",
      customerLotCode: "CUST-004",
      supplierLotCode: "SUPP-DUPLICATE",
      expiryDate: "2024-12-31",
      quantity: "30",
      uom: "lb",
      verticalAlign: "top",
    }, // Duplicate record - same as row-4 and row-7
    {
      id: "row-3",
      palletNumber: "PAL-003",
      customerLotCode: "CUST-003",
      supplierLotCode: "",
      expiryDate: "2026-11-15",
      quantity: "75",
      uom: "cs",
      verticalAlign: "top",
    },
    {
      id: "row-4",
      palletNumber: "PAL-DUPLICATE",
      customerLotCode: "CUST-002",
      supplierLotCode: "",
      expiryDate: "2024-12-31",
      quantity: "45",
      uom: "kg",
      verticalAlign: "top",
    }, // Duplicate record - same as row-2 and row-7
    {
      id: "row-5",
      palletNumber: "PAL-005",
      customerLotCode: "CUST-005",
      supplierLotCode: "",
      expiryDate: "2024-09-10",
      quantity: "60",
      uom: "ea",
      verticalAlign: "top",
    }, // Empty supplier lot code for error
    {
      id: "row-6",
      palletNumber: "PAL-006",
      customerLotCode: "CUST-006",
      supplierLotCode: "SUPP-006",
      expiryDate: "2024-08-25",
      quantity: "90",
      uom: "g",
      verticalAlign: "top",
    },
    {
      id: "row-7",
      palletNumber: "PAL-DUPLICATE",
      customerLotCode: "CUST-007",
      supplierLotCode: "SUPP-DUPLICATE",
      expiryDate: "2024-12-31",
      quantity: "120",
      uom: "kg",
      verticalAlign: "top",
    }, // Duplicate record - same as row-2 and row-4
    {
      id: "row-8",
      palletNumber: "PAL-008",
      customerLotCode: "CUST-008",
      supplierLotCode: "SUPP-MISMATCH",
      expiryDate: "2024-06-15",
      quantity: "85",
      uom: "lb",
      verticalAlign: "top",
    },
    {
      id: "row-9",
      palletNumber: "PAL-009",
      customerLotCode: "CUST-009",
      supplierLotCode: "SUPP-MISMATCH",
      expiryDate: "2024-08-20",
      quantity: "95",
      uom: "lb",
      verticalAlign: "top",
    },
  ]);
  const [rowNotes, setRowNotes] = useState<Record<string, string>>({});

  // Function to detect duplicate production records
  const getDuplicateRecords = () => {
    const duplicates = [];
    const seen = new Map();

    productionRows.forEach((row, index) => {
      // Normalize empty lot codes to treat them as matching for duplicate detection
      const normalizedLotCode = row.supplierLotCode === "" ? "*EMPTY*" : row.supplierLotCode;
      const key = `${row.palletNumber}-${normalizedLotCode}-${row.expiryDate}`;
      if (seen.has(key)) {
        const existingIndex = seen.get(key);
        if (!duplicates.includes(existingIndex)) {
          duplicates.push(existingIndex);
        }
        duplicates.push(index);
      } else {
        seen.set(key, index);
      }
    });

    // Also check for duplicates where empty lot codes match non-empty ones
    // (same pallet number and expiry date, but one has empty lot code)
    productionRows.forEach((row, index) => {
      if (row.supplierLotCode === "") {
        const keyWithoutLotCode = `${row.palletNumber}-*-${row.expiryDate}`;
        productionRows.forEach((otherRow, otherIndex) => {
          if (
            otherIndex !== index &&
            otherRow.palletNumber === row.palletNumber &&
            otherRow.expiryDate === row.expiryDate &&
            otherRow.supplierLotCode !== ""
          ) {
            if (!duplicates.includes(index)) {
              duplicates.push(index);
            }
            if (!duplicates.includes(otherIndex)) {
              duplicates.push(otherIndex);
            }
          }
        });
      }
    });

    // Return all duplicate instances (including the first one)
    // Sort to ensure consistent ordering
    return duplicates
      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates from array
      .sort((a, b) => a - b)
      .map((index) => String(index + 1).padStart(3, "0"));
  };

  // Function to detect expiry date mismatches
  const getExpiryDateMismatchRecords = () => {
    const lotCodeGroups = new Map<string, Array<{ index: number; expiryDate: string }>>();

    // Group rows by supplier lot code
    productionRows.forEach((row, index) => {
      if (row.supplierLotCode && row.expiryDate) {
        if (!lotCodeGroups.has(row.supplierLotCode)) {
          lotCodeGroups.set(row.supplierLotCode, []);
        }
        lotCodeGroups.get(row.supplierLotCode)?.push({ index, expiryDate: row.expiryDate });
      }
    });

    // Find lot codes with multiple expiry dates
    const mismatchRecords: number[] = [];
    lotCodeGroups.forEach((rows, lotCode) => {
      if (rows.length > 1) {
        const expiryDates = new Set(rows.map((r) => r.expiryDate));
        if (expiryDates.size > 1) {
          // All rows in this group have mismatches
          rows.forEach((row) => mismatchRecords.push(row.index));
        }
      }
    });

    // Sort and format record numbers
    return mismatchRecords
      .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
      .sort((a, b) => a - b)
      .map((index) => String(index + 1).padStart(3, "0"));
  };

  // Function to detect lot code required errors
  const getLotCodeRequiredRecords = () => {
    const requiredRecords: number[] = [];
    productionRows.forEach((row, index) => {
      if (row.supplierLotCode === "" && (row.id === "row-4" || row.id === "row-5")) {
        requiredRecords.push(index);
      }
    });
    return requiredRecords
      .sort((a, b) => a - b)
      .map((index) => String(index + 1).padStart(3, "0"));
  };

  // Function to check if date is required (empty)
  const isDateRequired = () => {
    return !productionRecordState.date || productionRecordState.date === "";
  };

  // Function to check if a specific row is a duplicate
  const isRowDuplicate = (rowIndex) => {
    const duplicates = [];
    const seen = new Map();

    productionRows.forEach((row, index) => {
      const key = `${row.palletNumber}-${row.supplierLotCode}-${row.expiryDate}`;
      if (seen.has(key)) {
        const existingIndex = seen.get(key);
        if (!duplicates.includes(existingIndex)) {
          duplicates.push(existingIndex);
        }
        duplicates.push(index);
      } else {
        seen.set(key, index);
      }
    });

    // Only return true for duplicate instances (not the first one)
    const firstInstances = duplicates.filter(
      (index, pos) => duplicates.indexOf(index) === pos && duplicates.indexOf(index) === 0
    );
    const duplicateInstances = duplicates.filter((index) => !firstInstances.includes(index));
    return duplicateInstances.includes(rowIndex);
  };

  // Copy all other state and handlers from Details11...
  // (I'll copy the essential ones for the error demonstration)
  const [role] = useState<"supplier" | "customer">("supplier");
  const [productionRecordState, setProductionRecordState] = useState({
    date: "",
    bomRevision: "Rev 1.2",
    uom: "kg",
    expectedQuantity: "100",
    actualQuantity: "95",
    lotCode: "LOT-001",
  });

  // Copy handlers from Details11
  const handleProductionRowChange = (rowId: string, field: string, value: string) => {
    setProductionRows((prev) => prev.map((row) => (row.id === rowId ? { ...row, [field]: value } : row)));
  };

  const handleCloseProductionSidebar = () => {
    setShowProductionSidebar(false);
  };

  const handleSaveProduction = () => {
    console.log("Saving production...");
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

  const handleRemoveNote = (rowId: string) => {
    setRowNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[rowId];
      return newNotes;
    });
  };

  // Copy the main page content from Details11 but with InlineValidation error boxes
  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
        /* Force vertical alignment to top for all table cells */
        .production-record-table tbody tr td,
        .actual-production-record-table tbody tr td,
        .actual-production-edit-table tbody tr td {
          vertical-align: top !important;
        }

        /* Also target any nested tables */
        table tbody tr td {
          vertical-align: top !important;
        }

        /* Align actual production Flex rows to top */
        .actual-production-edit-table .flex-row {
          align-items: flex-start !important;
        }

        /* Align inputs and selects in actual production to top */
        .actual-production-edit-table .flex-row input,
        .actual-production-edit-table .flex-row select,
        .actual-production-edit-table .flex-row .nds-input,
        .actual-production-edit-table .flex-row .nds-select {
          vertical-align: top !important;
        }
        
        /* Remove border-bottom for actual production rows followed by error box */
        .actual-production-edit-table .flex-row:has(+ .error-message-box) {
          border-bottom: none !important;
        }
        
        /* Remove border-bottom from production rows that have errors */
        .actual-production-edit-table .flex-row.has-error {
          border-bottom: none !important;
        }
        `}
      </style>
      <ToastContainer />
      <Header
        breakpoints={{
          medium: 1200,
        }}
        renderBreadcrumbs={() => (
          <Breadcrumbs>
            <Link href="/supplier-collaboration">Supplier Collaboration</Link>
            <Link href="/supplier-collaboration/lottraceability">Lot traceability</Link>
            <Text>POLI details - Errors (Simplified)</Text>
          </Breadcrumbs>
        )}
      >
        <Summary title="Lot traceability #001 - POLI details - Errors (Simplified)" />
      </Header>

      <Page>
        <Tabs selectedIndex={0}>
          <Tab label="Details">
            <Box py="x3">
              {/* Main content with error states */}
              <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                <DescriptionGroup>
                  <DescriptionTerm>Status</DescriptionTerm>
                  <DescriptionDetails>
                    <StatusIndicator type="warning">Has errors</StatusIndicator>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Production date</DescriptionTerm>
                  <DescriptionDetails>January 15, 2025</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Expected quantity</DescriptionTerm>
                  <DescriptionDetails>100 kg</DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>Actual quantity</DescriptionTerm>
                  <DescriptionDetails>95 kg</DescriptionDetails>
                </DescriptionGroup>
              </DescriptionList>

              <Divider my="x3" />

              <Heading4 mb="x2">Production Records</Heading4>

              {/* Production records table with errors - using proper NDS table structure */}
              <Box minWidth="1236px">
                <Table
                  columns={[
                    {
                      label: "Date",
                      dataKey: "date",
                      width: "120px",
                    },
                    {
                      label: "Expected quantity",
                      dataKey: "expectedQuantity",
                      width: "180px",
                    },
                    {
                      label: "Actual quantity",
                      dataKey: "actualQuantity",
                      width: "180px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1">
                          <Text>{row.actualQuantity}</Text>
                        </Box>
                      ),
                    },
                    {
                      label: "Pallet number",
                      dataKey: "palletNumber",
                      width: "180px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text>{row.palletNumber}</Text>
                        </Box>
                      ),
                    },
                    {
                      label: "Customer's lot code",
                      dataKey: "customerLotCode",
                      width: "180px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text>{row.customerLotCode}</Text>
                        </Box>
                      ),
                    },
                    {
                      label: "Supplier's lot code",
                      dataKey: "supplierLotCode",
                      width: "180px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text color={row.supplierLotCode === "" ? "red" : "black"}>
                            {row.supplierLotCode || "Missing"}
                          </Text>
                        </Box>
                      ),
                    },
                    {
                      label: "Expiry date",
                      dataKey: "expiryDate",
                      width: "120px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text>{row.expiryDate}</Text>
                        </Box>
                      ),
                    },
                    {
                      label: "Note",
                      dataKey: "note",
                      width: "200px",
                      cellRenderer: ({ row }: { row: any }) => (
                        <Box py="x0_75" mr="x1" pl="half">
                          <Text>{row.note}</Text>
                        </Box>
                      ),
                    },
                  ]}
                  rows={[
                    {
                      id: "1",
                      date: "2025-Feb-12",
                      expectedQuantity: "8 cs",
                      actualQuantity: "8 cs",
                      palletNumber: "PAL-001",
                      customerLotCode: "CUST-001",
                      supplierLotCode: "SUPP-001",
                      expiryDate: "2024-12-31",
                      note: "First batch completed successfully",
                    },
                    {
                      id: "2",
                      date: "2025-Mar-15",
                      expectedQuantity: "12 cs",
                      actualQuantity: "12 cs",
                      palletNumber: "PAL-002",
                      customerLotCode: "CUST-002",
                      supplierLotCode: "", // Empty for error demonstration
                      expiryDate: "2024-12-31",
                      note: "Second batch with missing supplier lot code",
                    },
                  ]}
                  keyField="id"
                  rowBorder={true}
                  compact={true}
                  className="production-record-table"
                />
              </Box>

              {/* Error validation boxes */}
              <Box pb="x1" pl="x1_5">
                <InlineValidation errorMessage="Lot code is required for PAL-002." />
              </Box>
            </Box>
          </Tab>
        </Tabs>
      </Page>

      {/* Production Sidebar with InlineValidation */}
      <Sidebar
        isOpen={showProductionSidebar}
        onClose={handleCloseProductionSidebar}
        title="Create production record"
        width="1280px"
        duration={0.25}
        closeOnOutsideClick={true}
        overlay="show"
        disableScroll={true}
        footer={
          <Flex gap="x1_5">
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
          <Box position="relative">
            <Alert type="danger" title="Errors prevent the record from being saved" mb="0">
              <Box mb="x1">Please correct the highlighted errors and try again.</Box>
              {(() => {
                const duplicateRecords = getDuplicateRecords();
                const expiryMismatchRecords = getExpiryDateMismatchRecords();
                const lotCodeRequiredRecords = getLotCodeRequiredRecords();
                const hasErrors =
                  duplicateRecords.length > 0 ||
                  expiryMismatchRecords.length > 0 ||
                  lotCodeRequiredRecords.length > 0 ||
                  isDateRequired();

                if (!hasErrors) return null;

                return (
                  <List mt="x1" pl="x1_5">
                    {isDateRequired() && <ListItem>Date is required.</ListItem>}
                    {duplicateRecords.length > 0 && (
                      <ListItem>
                        <Flex alignItems="center" gap="x0_5" flexWrap="wrap">
                          <Flex gap="x0_5" alignItems="center">
                            {duplicateRecords.map((num) => (
                              <RecordNumberPill key={num} number={num} backgroundColor="lightRed" textColor="red" boxShadow="small" />
                            ))}
                          </Flex>
                          <Box position="relative" display="inline-block">
                            <Text pr="x3">Duplicate actual production records detected. Each record must have an unique combination of pallet number, lot code, and expiry date.</Text>
                            <Box
                              position="absolute"
                              right="x0"
                              top="x1"
                              width="20px"
                              height="20px"
                              borderRadius="50%"
                              backgroundColor="violet"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              zIndex={1}
                            >
                              <Text fontSize="small" color="white" fontWeight="bold">
                                1
                              </Text>
                            </Box>
                          </Box>
                        </Flex>
                      </ListItem>
                    )}
                    {expiryMismatchRecords.length > 0 && (
                      <ListItem>
                        <Flex alignItems="center" gap="x0_5" flexWrap="wrap">
                          <Flex gap="x0_5" alignItems="center">
                            {expiryMismatchRecords.map((num) => (
                              <RecordNumberPill key={num} number={num} backgroundColor="lightRed" textColor="red" boxShadow="small" />
                            ))}
                          </Flex>
                          <Box position="relative" display="inline-block">
                            <Text pr="x3">Expiry date mismatch detected. All actual production records sharing the same lot code must have identical expiry dates.</Text>
                            <Box
                              position="absolute"
                              right="x0"
                              top="x1"
                              width="20px"
                              height="20px"
                              borderRadius="50%"
                              backgroundColor="violet"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              zIndex={1}
                            >
                              <Text fontSize="small" color="white" fontWeight="bold">
                                3
                              </Text>
                            </Box>
                          </Box>
                        </Flex>
                      </ListItem>
                    )}
                    {lotCodeRequiredRecords.length > 0 && (
                      <ListItem>
                        <Flex alignItems="center" gap="x0_5" flexWrap="wrap">
                          <Flex gap="x0_5" alignItems="center">
                            {lotCodeRequiredRecords.map((num) => (
                              <RecordNumberPill key={num} number={num} backgroundColor="lightRed" textColor="red" boxShadow="small" />
                            ))}
                          </Flex>
                          <Box position="relative" display="inline-block">
                            <Text pr="x3">Lot code is required. Lot code tracking is enforced for the item being produced.</Text>
                            <Box
                              position="absolute"
                              right="x0"
                              top="x1"
                              width="20px"
                              height="20px"
                              borderRadius="50%"
                              backgroundColor="violet"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              zIndex={1}
                            >
                              <Text fontSize="small" color="white" fontWeight="bold">
                                4
                              </Text>
                            </Box>
                          </Box>
                        </Flex>
                      </ListItem>
                    )}
                  </List>
                );
              })()}
            </Alert>
            <Box
              position="absolute"
              right="x1"
              top="x1"
              width="20px"
              height="20px"
              borderRadius="50%"
              backgroundColor="violet"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
              cursor="pointer"
              title="Saving a report with an error brings up the error alert."
            >
              <Text fontSize="small" color="white" fontWeight="bold">
                6
              </Text>
            </Box>
          </Box>
          <Box py="x2">
            <Field>
              <Box position="relative">
                <FieldLabel labelText="Date" pb="x1" />
                <DatePicker
                  onChange={(date) =>
                    setProductionRecordState((prev) => ({
                      ...prev,
                      date: date ? date.toISOString().split("T")[0] : "",
                    }))
                  }
                  selected={productionRecordState.date ? new Date(productionRecordState.date) : null}
                  inputProps={{ disabled: role === "customer" && isEditingProduction }}
                  errorMessage="Required"
                />
                <Box
                  position="absolute"
                  right="x1"
                  top="x2"
                  width="20px"
                  height="20px"
                  borderRadius="50%"
                  backgroundColor="violet"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  zIndex={1}
                  cursor="pointer"
                  title="Date field is required. Validated on blur."
                >
                  <Text fontSize="small" color="white" fontWeight="bold">
                    5
                  </Text>
                </Box>
              </Box>
            </Field>

            <Flex gap="x1_5">
              <Box width="11.5em">
                <Field>
                  <FieldLabel labelText="Expected quantity" pb="x1" />
                  <Input
                    value={productionRecordState.expectedQuantity}
                    onChange={(e) =>
                      setProductionRecordState((prev) => ({ ...prev, expectedQuantity: e.target.value }))
                    }
                    disabled={role === "customer" && isEditingProduction}
                    inputWidth="11.5em"
                  />
                </Field>
              </Box>
              <Box width="8em">
                <Field>
                  <FieldLabel labelText="UOM" pb="x1" />
                  <Select
                    value={productionRecordState.uom}
                    onChange={(value) => setProductionRecordState((prev) => ({ ...prev, uom: String(value) }))}
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

            <Divider my="x3" />

            <Heading4 mb="x2">Actual production</Heading4>

            <Box borderBottom="solid 1px" borderColor="lightGrey">
              {/* Table Header */}
              <Flex py="x1" px="x1" borderBottom="solid 1px" borderColor="lightGrey" gap="x1">
                <Box width="18%">#</Box>
                <Box width="100%">Pallet number</Box>
                <Box width="100%">Customer's lot code</Box>
                <Box width="100%">Supplier's lot code</Box>
                <Box width="100%">Expiry date</Box>
                <Box width="100%">Quantity</Box>
                <Box width="100%">UOM</Box>
                <Box width="88px"></Box>
              </Flex>

              {/* Table Rows with nested content */}
              {(() => {
                const duplicateRecords = getDuplicateRecords();
                const expiryMismatchRecords = getExpiryDateMismatchRecords();
                const lotCodeRequiredRecords = getLotCodeRequiredRecords();
                const errorRecordNumbers = [...new Set([...duplicateRecords, ...expiryMismatchRecords, ...lotCodeRequiredRecords])];

                return productionRows.map((row, index) => {
                  const recordNumber = String(index + 1).padStart(3, "0");
                  const hasError = errorRecordNumbers.includes(recordNumber);

                  return (
                    <Box key={row.id}>
                      {/* Main Production Row */}
                      <Flex
                        alignItems="flex-start"
                        py="x0"
                        gap="x1"
                        className={`flex-row ${row.supplierLotCode === "" && row.id !== "row-4" && row.id !== "row-5" ? "has-error" : ""}`}
                        borderBottom={
                          row.supplierLotCode === "" && row.id !== "row-4" && row.id !== "row-5" && row.id !== "row-3"
                            ? "none"
                            : "solid 1px"
                        }
                        borderColor="lightGrey"
                      >
                        <Flex width="3em" alignItems="flex-start" justifyContent="center" ml="x1" mr="x0_5" pt="x2_5">
                          <RecordNumberPill 
                            number={recordNumber} 
                            backgroundColor={hasError ? "lightRed" : undefined}
                            textColor={hasError ? "red" : undefined}
                          />
                        </Flex>
                    <Box width="100%">
                      <Input
                        value={row.palletNumber}
                        onChange={(e) => handleProductionRowChange(row.id, "palletNumber", e.target.value)}
                        py="x1"
                        width="100%"
                      />
                    </Box>
                    <Box width="100%">
                      <Input
                        value={row.customerLotCode || ""}
                        onChange={(e) => handleProductionRowChange(row.id, "customerLotCode", e.target.value)}
                        py="x1"
                        width="100%"
                      />
                    </Box>
                    <Box width="100%">
                      <Input
                        value={row.supplierLotCode || ""}
                        onChange={(e) => handleProductionRowChange(row.id, "supplierLotCode", e.target.value)}
                        py="x1"
                        width="100%"
                        errorMessage={row.id === "row-4" || row.id === "row-5" ? "Required" : undefined}
                      />
                    </Box>
                    <Box width="100%">
                      <Input
                        value={row.expiryDate}
                        onChange={(e) => handleProductionRowChange(row.id, "expiryDate", e.target.value)}
                        py="x1"
                        width="100%"
                      />
                    </Box>
                    <Box width="100%">
                      <Input
                        value={row.quantity}
                        onChange={(e) => handleProductionRowChange(row.id, "quantity", e.target.value)}
                        py="x1"
                        width="100%"
                      />
                    </Box>
                    <Box width="100%" pt="x1">
                      <Select
                        value={row.uom}
                        onChange={(value) => handleProductionRowChange(row.id, "uom", String(value))}
                        options={[
                          { value: "kg", label: "kg" },
                          { value: "lb", label: "lb" },
                          { value: "g", label: "g" },
                          { value: "oz", label: "oz" },
                          { value: "cases", label: "cases" },
                        ]}
                        width="100%"
                      />
                    </Box>
                    <Box width="88px" pt="x1">
                      <Flex gap="x0_5" alignItems="center">
                        <DropdownMenu
                          trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                          placement="bottom-end"
                        >
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
                            tooltip="Remove actual production record"
                          />
                        )}
                      </Flex>
                    </Box>
                  </Flex>

                  {/* InlineValidation error box for supplier lot code */}
                  {row.id === "row-2" && row.supplierLotCode === "" && (
                    <Box pb="x1_5" pl="x1_5" className="error-message-box" position="relative">
                      <Box
                        position="absolute"
                        right="x1"
                        top="x0_25"
                        width="20px"
                        height="20px"
                        borderRadius="50%"
                        backgroundColor="violet"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        zIndex={1}
                        cursor="pointer"
                        title="Required fields: In the actual production record, lot code and Expiry date is required if the item tracking settings are on. Validated on submit (if validated on blur, the error may be thrown too frequently)."
                      >
                        <Text fontSize="small" color="white" fontWeight="bold">
                          1
                        </Text>
                      </Box>
                      <Box pr="x6">
                        <InlineValidation errorMessage="Lot code is required. Lot code tracking is enforced for the item being produced." />
                      </Box>
                    </Box>
                  )}

                  {/* Divider after error boxes if they are the last element before next row */}
                  {row.id === "row-2" && row.supplierLotCode === "" && (
                    <Box borderBottom="solid 1px" borderColor="lightGrey" />
                  )}

                  {/* Note section */}
                  {rowNotes[row.id] !== undefined && (
                    <Box ml="x6" border="1px solid" borderColor="lightGrey" borderRadius="medium" p="x0_25" mb="x1">
                      <Flex
                        backgroundColor="whiteGrey"
                        pl="x2"
                        pr="x0_75"
                        borderRadius="small"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                          Note
                        </Text>
                        <Flex alignItems="center" gap="x0_5">
                          <IconicButton
                            icon="upArrow"
                            aria-label="Collapse note"
                            tooltip="Collapse note"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              console.log("Toggle note");
                            }}
                          />
                          <IconicButton
                            icon="removeCircleOutline"
                            aria-label="Remove note"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveNote(row.id);
                            }}
                            tooltip="Remove note"
                          />
                        </Flex>
                      </Flex>
                      <Box px="x1" py="x1">
                        <Textarea
                          placeholder="Add a note for this production record..."
                          value={rowNotes[row.id] || ""}
                          onChange={(e) => handleNoteChange(row.id, e.target.value)}
                          rows={3}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Divider after Note section */}
                  {rowNotes[row.id] !== undefined && <Box borderBottom="solid 1px" borderColor="lightGrey" />}
                </Box>
                  );
                });
              })()}
            </Box>
          </Box>
        </Form>
      </Sidebar>
    </ApplicationFrame>
  );
};

export const Simplified = () => (
  <NDSProvider locale="en_US" variant="desktop">
    <InlineSimplified />
  </NDSProvider>
);
