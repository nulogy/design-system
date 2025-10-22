import React, { useState } from "react";
import { toast, Tooltip, NDSProvider, Alert, InlineValidation } from "../../..";
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
} from "../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../utils/dateUtils";
import {
  materialsData1,
  materialsData2,
  materialsData5A,
  materialsData5B,
  materialsData6A,
  materialsData6B,
  materialsData7A,
} from "./details11/materialsData";
import { createNestedTableData } from "./details11/nestedTableData";
import {
  uomOptions,
  unitOptions,
  detailsData,
  userState,
  collaborationState,
  acceptedItems,
  poStatus,
  editFormData,
  productionRecord,
  fieldConfig,
} from "./details11/optionsData";
import { productionRecordsData, productionRecordsColumns } from "./details11/productionRecordsData";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Errors",
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

// Reusable RecordNumberPill component
const RecordNumberPill = ({
  number,
  tooltip,
  placement = "top",
  fontSize = "smaller",
  style,
  mr,
}: {
  number: string;
  tooltip?: string;
  placement?: "left" | "right" | "top" | "bottom";
  fontSize?: "smaller" | "small";
  style?: React.CSSProperties;
  mr?: string;
}) => {
  const pillContent = (
    <Box
      backgroundColor="lightGrey"
      px="half"
      borderRadius="small"
      width="fit-content"
      mr={mr}
      style={{ display: "inline-block" }}
    >
      <Text
        color="darkGrey"
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

export const Details11 = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Production records tab is index 1
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
      supplierLotCode: "SUPP-DUPLICATE",
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
  const [rowConsumptions, setRowConsumptions] = useState<
    Record<
      string,
      Array<{
        id: string;
        item: string;
        customerLotCode: string;
        supplierLotCode: string;
        expiryDate: string;
        palletNumber: string;
        quantity: string;
        uom: string;
        pillNumber?: string;
        verticalAlign?: string;
      }>
    >
  >({});

  // Function to detect duplicate production records
  const getDuplicateRecords = () => {
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

    // Return only duplicate instances (not the first one)
    const firstInstances = duplicates.filter(
      (index, pos) => duplicates.indexOf(index) === pos && duplicates.indexOf(index) === 0
    );
    const duplicateInstances = duplicates.filter((index) => !firstInstances.includes(index));
    return duplicateInstances.map((index) => String(index + 1).padStart(3, "0"));
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

  // Function to detect duplicate consumption records
  const getDuplicateConsumptionRecords = (rowId) => {
    const duplicates = [];
    const seen = new Map();

    if (rowConsumptions[rowId]) {
      rowConsumptions[rowId].forEach((consumption, index) => {
        const key = `${consumption.supplierLotCode}-${consumption.expiryDate}-${consumption.palletNumber}`;
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
    }

    // Return only duplicate instances (not the first one)
    const firstInstances = duplicates.filter(
      (index, pos) => duplicates.indexOf(index) === pos && duplicates.indexOf(index) === 0
    );
    const duplicateInstances = duplicates.filter((index) => !firstInstances.includes(index));
    return duplicateInstances.map((index) => String(index + 1).padStart(3, "0"));
  };

  // Function to check if consumption records have duplicates
  const hasDuplicateConsumptionRecords = (rowId) => {
    return getDuplicateConsumptionRecords(rowId).length > 0;
  };

  // Prepopulate consumption data with errors
  React.useEffect(() => {
    setRowConsumptions({
      "row-1": [
        {
          id: "consumption-1-1",
          item: "Steel Components",
          customerLotCode: "CUST-LOT-001",
          supplierLotCode: "SUPP-LOT-001",
          expiryDate: "2024-12-31",
          palletNumber: "PAL-001",
          quantity: "25",
          uom: "kg",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-2",
          item: "Chemical Additives", // Item for demonstration
          customerLotCode: "CUST-LOT-002",
          supplierLotCode: "SUPP-DUPLICATE",
          expiryDate: "2024-12-31",
          palletNumber: "PAL-DUPLICATE",
          quantity: "15",
          uom: "", // Empty for error demonstration
          verticalAlign: "top",
        },
        {
          id: "consumption-1-3",
          item: "Component B",
          customerLotCode: "CUST-LOT-003",
          supplierLotCode: "SUPP-DUPLICATE",
          expiryDate: "2024-12-31",
          palletNumber: "PAL-DUPLICATE",
          quantity: "40",
          uom: "cs",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-4",
          item: "Plastic Resins",
          customerLotCode: "CUST-LOT-004",
          supplierLotCode: "SUPP-LOT-004",
          expiryDate: "2024-10-20",
          palletNumber: "PAL-004",
          quantity: "30",
          uom: "lb",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-5",
          item: "Chemical Additives", // Item for demonstration
          customerLotCode: "CUST-LOT-005",
          supplierLotCode: "SUPP-MISMATCH-CONSUMPTION",
          expiryDate: "2024-09-10",
          palletNumber: "PAL-005",
          quantity: "20",
          uom: "ea",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-6",
          item: "Chemical Additives",
          customerLotCode: "CUST-LOT-006",
          supplierLotCode: "SUPP-MISMATCH-CONSUMPTION",
          expiryDate: "2024-10-15",
          palletNumber: "PAL-006",
          quantity: "35",
          uom: "g",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-7",
          item: "Electronic Components",
          customerLotCode: "CUST-LOT-007",
          supplierLotCode: "",
          expiryDate: "2024-07-30",
          palletNumber: "PAL-007",
          quantity: "50",
          uom: "kg",
          verticalAlign: "top",
        },
      ],
    });
  }, []);

  // Header and Summary state
  // userState, collaborationState, acceptedItems, poStatus now imported from optionsData.tsx
  const [productionComplete] = useState(false);

  // Edit state
  const [showEditSidebar, setShowEditSidebar] = useState(false);
  // editFormData now imported from optionsData.tsx
  const [editFormDataState, setEditFormDataState] = useState(editFormData);

  // Details data
  // detailsData now imported from optionsData.tsx

  // SummaryDivider component
  const SummaryDivider = () => <Box width="1px" height="x6" backgroundColor="lightGrey" mx="x2" />;

  // ActualProductionRecordNumberPill component (using the reusable component)
  const ActualProductionRecordNumberPill = ({
    actualProductionRecordNumber,
  }: {
    actualProductionRecordNumber: string;
  }) => (
    <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
      <RecordNumberPill
        number={actualProductionRecordNumber}
        tooltip={`Actual production record #${actualProductionRecordNumber}`}
        placement="left"
      />
    </Flex>
  );

  // SubcomponentConsumptionRecordNumberPill component (using the reusable component)
  const SubcomponentConsumptionRecordNumberPill = ({
    subcomponentConsumptionRecordItem,
  }: {
    subcomponentConsumptionRecordItem: string;
  }) => (
    <RecordNumberPill
      number={subcomponentConsumptionRecordItem}
      tooltip={`Subcomponent consumption record #${subcomponentConsumptionRecordItem}`}
      placement="left"
    />
  );

  // Handler functions
  const handleCancelPOLineItem = () => {
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
  const [currentConsumptionRowId, setCurrentConsumptionRowId] = useState<string>("");
  const [consumptionItems, setConsumptionItems] = useState([
    {
      id: "consumption-item-1",
      item: "",
      customerLotCode: "",
      supplierLotCode: "",
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
  // productionRecord now imported from optionsData.tsx
  const [productionRecordState, setProductionRecordState] = useState(productionRecord);
  const [consumptionMaterials, setConsumptionMaterials] = useState([]);
  const [role, setRole] = useState("supplier");
  const [showConfigBar, setShowConfigBar] = useState(true);
  // fieldConfig now imported from optionsData.tsx
  const [fieldConfigState, setFieldConfigState] = useState(fieldConfig);

  // primaryMenu and secondaryMenu now imported from optionsData.tsx

  // uomOptions and unitOptions now imported from optionsData.tsx

  // Nested table data now imported from nestedTableData.tsx

  // Actual production report columns configuration
  const actualProductionReportColumns = [
    {
      label: "Number",
      dataKey: "actualProductionRecordNumber",
      width: "0px",
      cellRenderer: ({ row }: { row: any }) => (
        <ActualProductionRecordNumberPill actualProductionRecordNumber={row.actualProductionRecordNumber} />
      ),
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
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If pallet number is not required in config, show "-"
        if (!fieldConfigState.palletNumberRequired) {
          return (
            <Flex py="x0_75">
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
      label: "Lot code",
      dataKey: "lotCode",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If lot code is not required in config, show "-"
        if (!fieldConfigState.lotCodeRequired) {
          return (
            <Flex py="x0_75">
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
          <Flex py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.lotCode || ""}
            </TruncatedText>
            <TruncatedText
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
        if (!fieldConfigState.expiryDateRequired) {
          return (
            <Flex py="x0_75">
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
      label: "Note",
      dataKey: "note",
      width: "auto",
      cellRenderer: ({ row }: { row: any }) => {
        // If note is empty, don't render anything
        if (!row.note) {
          return null;
        }

        return (
          <Box py="x0_375">
            <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
              {row.note}
            </TruncatedText>
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

  // Custom nested table columns for 5th, 6th, 7th tables (Number column first)
  const nestedTableColumns567 = [
    {
      label: "Number",
      dataKey: "actualProductionRecordNumber",
      width: "0px",
      cellRenderer: ({ row }: { row: any }) => {
        // Check if this is from nestedTableData5 (id starts with "5-")
        const isFifthTable = row.id && row.id.startsWith("5-");
        // Check if this is from nestedTableData6 (id starts with "6-")
        const isSixthTable = row.id && row.id.startsWith("6-");

        let marginLeft = "-146px"; // Default for row 7 (was -96px)

        if (isFifthTable) {
          marginLeft = "-170px"; // More space for "Output #001", "Output #002" (was -120px)
        } else if (isSixthTable) {
          marginLeft = "-300px"; // Much more space for "Actual production record #001", "Actual production record #002" (was -250px)
        }

        return (
          <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml={marginLeft}>
            <Box
              backgroundColor={isSixthTable ? "white" : "midGrey"}
              borderColor={isSixthTable ? "whiteGrey" : undefined}
              borderWidth={isSixthTable ? "1px" : undefined}
              borderStyle={isSixthTable ? "solid" : undefined}
              px="half"
              borderRadius={isSixthTable ? "medium" : "small"}
              style={isSixthTable ? { border: "1px solid #E5E5E5" } : undefined}
            >
              <Text
                color={isSixthTable ? "midGrey" : "white"}
                fontSize="small"
                lineHeight="smallTextCompressed"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing=".05em"
              >
                {row.actualProductionRecordNumber}
              </Text>
            </Box>
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
          <Flex py="x0_75" mr="x1">
            <Text>{row.actualQuantity}</Text>
          </Flex>
        );
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If pallet number is not required in config, show "-"
        if (!fieldConfigState.palletNumberRequired) {
          return (
            <Flex py="x0_75">
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
      label: "Lot code",
      dataKey: "lotCode",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If lot code is not required in config, show "-"
        if (!fieldConfigState.lotCodeRequired) {
          return (
            <Flex py="x0_75">
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
          <Flex py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.lotCode || ""}
            </TruncatedText>
            <TruncatedText
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
      label: "Customer's lot code",
      dataKey: "customerLotCode",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If customer lot code is empty, don't render anything
        if (!row.customerLotCode) {
          return null;
        }

        return (
          <Flex py="x2">
            <TruncatedText width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerLotCode}
            </TruncatedText>
          </Flex>
        );
      },
    },
    {
      label: "Supplier's lot code",
      dataKey: "supplierLotCode",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If supplier lot code is empty, don't render anything
        if (!row.supplierLotCode) {
          return null;
        }

        return (
          <Flex py="x2">
            <TruncatedText width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.supplierLotCode}
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
        if (!fieldConfigState.expiryDateRequired) {
          return (
            <Flex py="x0_75">
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
        if (!fieldConfigState.palletNumberRequired) {
          return (
            <Flex py="x0_75">
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
          <Box py="x0_375">
            <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
              {row.note}
            </TruncatedText>
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

  // Custom nested table columns for 4th table (Number column first)
  const nestedTableColumns4th = [
    {
      label: "Number",
      dataKey: "actualProductionRecordNumber",
      width: "0px",
      cellRenderer: ({ row }: { row: any }) => {
        return (
          <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
            <RecordNumberPill number={row.actualProductionRecordNumber} placement="top" />
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
          <Flex py="x0_75" mr="x1">
            <Text>{row.actualQuantity}</Text>
          </Flex>
        );
      },
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If pallet number is not required in config, show "-"
        if (!fieldConfigState.palletNumberRequired) {
          return (
            <Flex py="x0_75">
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
      label: "Lot code",
      dataKey: "lotCode",
      width: "180px",
      cellRenderer: ({ row }: { row: any }) => {
        // If lot code is not required in config, show "-"
        if (!fieldConfigState.lotCodeRequired) {
          return (
            <Flex py="x0_75">
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
          <Flex py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.lotCode || ""}
            </TruncatedText>
            <TruncatedText
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
        if (!fieldConfigState.expiryDateRequired) {
          return (
            <Flex py="x0_75">
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
        if (!fieldConfigState.palletNumberRequired) {
          return (
            <Flex py="x0_75">
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
          <Box py="x0_375">
            <TruncatedText pr="x2" py="x1" fontSize="small" lineHeight="smallTextCompressed" maxCharacters={98}>
              {row.note}
            </TruncatedText>
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

  // Production records data now imported from productionRecordsData.tsx
  // Add expandedContent functions to the imported data
  const productionRecordsDataWithExpandedContent = productionRecordsData.map((record) => ({
    ...record,
    expandedContent: () => (
      <Box style={{ paddingLeft: "-56px" }}>
        <Box style={{ paddingLeft: "298px" }}>
          <Table
            columns={actualProductionReportColumns}
            rows={
              record.id === "1"
                ? nestedTableData1
                : record.id === "2"
                  ? nestedTableData2
                  : record.id === "3"
                    ? nestedTableData3
                    : record.id === "4"
                      ? nestedTableData4
                      : record.id === "5"
                        ? nestedTableData5
                        : record.id === "6"
                          ? nestedTableData6
                          : record.id === "7"
                            ? nestedTableData7
                            : nestedTableData8
            }
            keyField="id"
            rowBorder={true}
            className="actual-production-record-table"
            compact={true}
            hasExpandableRows={true}
            expandedRows={nestedExpandedRows}
            onRowExpansionChange={setNestedExpandedRows}
          />
        </Box>
      </Box>
    ),
  }));

  // Production records columns now imported from productionRecordsData.tsx

  const handleAddProduction = () => {
    setIsEditingProduction(false);
    setProductionRecordState({
      date: "",
      bomRevision: "",
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

    // Map row data to production record format with sample data
    setProductionRecordState({
      date: rowData.date || "2024-01-15",
      bomRevision: rowData.bomRevision || "BOM-2024-001",
      uom: rowData.expectedQuantity ? rowData.expectedQuantity.split(" ")[1] || "kg" : "kg",
      expectedQuantity: rowData.expectedQuantity ? rowData.expectedQuantity.split(" ")[0] || "100" : "100",
      actualQuantity: rowData.actualQuantity ? rowData.actualQuantity.split(" ")[0] || "95" : "95",
      lotCode: rowData.customerLotCode || "CUST-LOT-001",
      supplierLotCode: rowData.supplierLotCode || "SUPP-LOT-001",
      expiryDate: rowData.expiryDate || "2024-12-31",
      palletNumber: rowData.palletNumber || "PAL-001",
      producedQuantity: rowData.actualQuantity ? rowData.actualQuantity.split(" ")[0] || "95" : "95",
      note: rowData.note || "Production completed successfully with minor adjustments.",
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

    // Convert nested data to production rows format with sample data
    const rows =
      nestedData.length > 0
        ? nestedData.map((batch, index) => ({
            id: `row-${index + 1}`,
            palletNumber: batch.palletNumber || `PAL-${String(index + 1).padStart(3, "0")}`,
            customerLotCode: batch.customerLotCode || `CUST-${String(index + 1).padStart(3, "0")}`,
            supplierLotCode: batch.supplierLotCode || `SUPP-${String(index + 1).padStart(3, "0")}`,
            expiryDate: batch.expiryDate || "2025-12-31",
            quantity: batch.actualQuantity ? batch.actualQuantity.split(" ")[0] || "50" : "50",
            uom: batch.actualQuantity ? batch.actualQuantity.split(" ")[1] || "kg" : "kg",
            verticalAlign: "top",
          }))
        : [
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
              palletNumber: "PAL-002",
              customerLotCode: "CUST-002",
              supplierLotCode: "",
              expiryDate: "2024-12-31",
              quantity: "45",
              uom: "kg",
              verticalAlign: "top",
            },
          ];

    // Populate notes from nested data with sample notes
    const notes: Record<string, string> = {};
    if (nestedData.length > 0) {
      nestedData.forEach((batch, index) => {
        if (batch.note) {
          notes[`row-${index + 1}`] = batch.note;
        }
      });
    } else {
      // Add sample notes for the default rows
      notes["row-1"] = "First production batch completed successfully. Quality checks passed.";
      notes["row-2"] = "Second batch had minor temperature variations but within acceptable range.";
    }

    setProductionRows(rows);
    setRowNotes(notes);

    // Extract consumption materials data for each production row
    const newRowConsumptions: Record<
      string,
      Array<{
        id: string;
        item: string;
        customerLotCode: string;
        supplierLotCode: string;
        expiryDate: string;
        palletNumber: string;
        quantity: string;
        uom: string;
        pillNumber?: string;
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
                customerLotCode: material.lotCode || material.customerLotCode || "",
                supplierLotCode: material.supplierLotCode || "",
                // Remove the old lotCode field if it exists
                lotCode: undefined,
              })
            );
          }
        } catch (error) {}
      }
    });

    // If no consumption data was found, add sample consumption data
    if (Object.keys(newRowConsumptions).length === 0) {
      newRowConsumptions["row-1"] = [
        {
          id: "consumption-1-1",
          item: "Steel Components",
          customerLotCode: "RM-A-001",
          supplierLotCode: "RM-A-SUP-001",
          expiryDate: "2024-06-30",
          palletNumber: "RM-PAL-001",
          quantity: "25",
          uom: "kg",
          pillNumber: "001",
        },
        {
          id: "consumption-1-2",
          item: "Raw Material B",
          customerLotCode: "RM-B-001",
          supplierLotCode: "RM-B-SUP-001",
          expiryDate: "2024-08-15",
          palletNumber: "RM-PAL-002",
          quantity: "15",
          uom: "kg",
          pillNumber: "002",
        },
      ];
      newRowConsumptions["row-2"] = [
        {
          id: "consumption-2-1",
          item: "Steel Components",
          customerLotCode: "RM-A-002",
          supplierLotCode: "RM-A-SUP-002",
          expiryDate: "2024-06-30",
          palletNumber: "RM-PAL-003",
          quantity: "20",
          uom: "kg",
          pillNumber: "003",
        },
        {
          id: "consumption-2-2",
          item: "Component X",
          customerLotCode: "COMP-X-001",
          supplierLotCode: "COMP-X-SUP-001",
          expiryDate: "2024-09-20",
          palletNumber: "COMP-PAL-001",
          quantity: "10",
          uom: "kg",
          pillNumber: "004",
        },
      ];
    }

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
        palletNumber: "",
        customerLotCode: "",
        supplierLotCode: "",
        expiryDate: "",
        quantity: "",
        uom: "",
        verticalAlign: "top",
      },
    ]);
    setRowNotes({});
    setRowConsumptions({});
    setProductionRecordState({
      date: "",
      bomRevision: "",
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
  };

  const handleProductionFieldChange = (field: string, value: string) => {
    setProductionRecordState((prev) => ({
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
  };

  const handleRemoveBatch = (batchId: string) => {
    // Batch removal functionality removed
  };

  const handleBatchFieldChange = (batchId: string, field: string, value: string) => {
    // Batch field change functionality removed
  };

  const handleFieldConfigChange = (field: string, value: boolean) => {
    setFieldConfigState((prev) => ({
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
      palletNumber: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      quantity: "",
      uom: "",
      verticalAlign: "top",
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

  const handleRemoveNote = (rowId: string) => {
    setRowNotes((prev) => {
      const newNotes = { ...prev };
      delete newNotes[rowId];
      return newNotes;
    });
  };

  const handleAddConsumptionForRow = (rowId: string) => {
    console.log("Adding consumption for row:", rowId);
    setRowConsumptions((prev) => {
      const newConsumption = {
        id: `consumption-${Date.now()}`,
        item: "",
        customerLotCode: "",
        supplierLotCode: "",
        expiryDate: "",
        palletNumber: "",
        quantity: "",
        uom: "",
        pillNumber: "001",
        verticalAlign: "top",
      };

      const updatedConsumptions = [...(prev[rowId] || []), newConsumption];
      console.log("Updated consumptions for row:", rowId, updatedConsumptions);

      return {
        ...prev,
        [rowId]: updatedConsumptions,
      };
    });
  };

  const handleConsumptionRowChange = (rowId: string, consumptionId: string, field: string, value: string) => {
    console.log("handleConsumptionRowChange called:", { rowId, consumptionId, field, value });

    // Extract the actual row ID from the combined ID (e.g., "row-1-consumption-123" -> "row-1")
    const actualRowId = rowId.includes("-consumption-") ? rowId.split("-consumption-")[0] : rowId;
    console.log("Actual row ID:", actualRowId);

    setRowConsumptions((prev) => {
      const currentConsumptions = prev[actualRowId] || [];
      console.log("Current consumptions for row:", actualRowId, currentConsumptions);

      const updatedConsumptions = currentConsumptions.map((consumption) => {
        if (consumption.id === consumptionId) {
          console.log("Updating consumption:", consumption.id, "field:", field, "value:", value);
          // Ensure the consumption object has the new field structure
          const updatedConsumption = { ...consumption, [field]: value };
          // If updating lotCode field, map it to customerLotCode for backward compatibility
          if (field === "lotCode" && !updatedConsumption.customerLotCode) {
            updatedConsumption.customerLotCode = value;
          }
          return updatedConsumption;
        }
        return consumption;
      });

      console.log("Updated consumptions:", updatedConsumptions);

      return {
        ...prev,
        [actualRowId]: updatedConsumptions,
      };
    });
  };

  const handleAddConsumptionRow = (rowId: string) => {
    console.log("Adding consumption row for:", rowId);
    const currentConsumptions = rowConsumptions[rowId] || [];
    const newConsumption = {
      id: `consumption-${Date.now()}`,
      item: "",
      customerLotCode: "",
      supplierLotCode: "",
      expiryDate: "",
      palletNumber: "",
      quantity: "",
      uom: "",
      pillNumber: `${String(currentConsumptions.length + 1).padStart(3, "0")}`,
    };

    console.log("New consumption item:", newConsumption);
    console.log("Current consumptions before adding:", currentConsumptions);

    setRowConsumptions((prev) => {
      const updatedConsumptions = [...(prev[rowId] || []), newConsumption];
      console.log("Updated consumptions after adding:", updatedConsumptions);

      return {
        ...prev,
        [rowId]: updatedConsumptions,
      };
    });
  };

  const handleRemoveConsumptionRow = (rowId: string, consumptionId: string) => {
    setRowConsumptions((prev) => {
      const currentConsumptions = prev[rowId] || [];
      const filteredConsumptions = currentConsumptions.filter((consumption) => consumption.id !== consumptionId);
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
        customerLotCode: material.lotCode, // Map existing lotCode to customerLotCode for backward compatibility
        supplierLotCode: "",
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
        customerLotCode: "",
        supplierLotCode: "",
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
      customerLotCode: "",
      supplierLotCode: "",
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

  // Add cellRenderer to production records columns
  const productionRecordsColumnsWithRenderer = productionRecordsColumns.map((column) => {
    if (column.dataKey === "actions") {
      return {
        ...column,
        cellRenderer: ({ row }: { row: any }) => (
          <Box pr="x1">
            <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
              <DropdownButton onClick={() => handleEditProduction(row.id)}>Edit production record</DropdownButton>
            </DropdownMenu>
          </Box>
        ),
      };
    }
    return column;
  });

  // Materials data for consumption reports
  // materialsData1 now imported from materialsData.tsx

  // materialsData2 now imported from materialsData.tsx

  // materialsData5A now imported from materialsData.tsx

  // materialsData5B now imported from materialsData.tsx

  // materialsData6A now imported from materialsData.tsx

  // materialsData6B now imported from materialsData.tsx

  // materialsData7A now imported from materialsData.tsx

  // Consumption table columns
  const consumptionTableColumns = [
    {
      label: "#",
      dataKey: "subcomponentConsumptionRecordItem",
      width: "3em",
      cellRenderer: ({ row }: { row: any }) => (
        <Box py="x0_75" mr="x1" pl="half" display="flex" justifyContent="flex-start">
          <SubcomponentConsumptionRecordNumberPill
            subcomponentConsumptionRecordItem={row.subcomponentConsumptionRecordItem}
          />
        </Box>
      ),
    },
    {
      label: "Item code",
      dataKey: "item",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "180px",
      headerFormatter: ({ label }: { label: string }) => (
        <Flex flexDirection="column">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {label}
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
            (Customer's / Supplier's)
          </Text>
        </Flex>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        const hasCustomerLot = row.customerLotCode && row.customerLotCode !== "-";
        const hasSupplierLot = row.supplierLotCode && row.supplierLotCode !== "-";

        if (!hasCustomerLot && !hasSupplierLot) {
          return (
            <Flex py="x0_5">
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                -
              </Text>
            </Flex>
          );
        }

        return (
          <Flex py="x0_5" flexDirection="column" gap="x0_25">
            {hasCustomerLot && (
              <Text fontSize="small" lineHeight="smallTextCompressed">
                {row.customerLotCode}
              </Text>
            )}
            {hasSupplierLot && (
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                {row.supplierLotCode}
              </Text>
            )}
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "UOM",
      dataKey: "uom",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallTextCompressed">
          {cellData}
        </Text>
      ),
    },
  ];

  // Create nested table data with consumption table columns
  const {
    nestedTableData1,
    nestedTableData2,
    nestedTableData3,
    nestedTableData4,
    nestedTableData5,
    nestedTableData6,
    nestedTableData7,
    nestedTableData8,
  } = createNestedTableData(consumptionTableColumns);

  // ConsumptionReport and EmptyConsumptionReport components now imported from components.tsx

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
        /* Force vertical alignment to top for all table cells */
        .production-record-table tbody tr td,
        .actual-production-record-table tbody tr td,
        .subcomponent-consumption-record-table tbody tr td,
        .subcomponent-consumption-edit-table tbody tr td,
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
        
        /* Remove border-bottom for rows with has-error class */
        .subcomponent-consumption-edit-table tbody tr.has-error {
          border-bottom: none !important;
        }
        
        /* Remove border-bottom for rows followed by error box */
        .subcomponent-consumption-edit-table tbody tr:has(+ tr.error-message-row) {
          border-bottom: none !important;
        }
        
        /* Alternative approach: remove border from rows that are followed by InlineValidation */
        .subcomponent-consumption-edit-table tbody tr:last-child {
          border-bottom: none !important;
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
          <Flex gap="x1_5" alignItems="center">
            <DropdownMenu>
              <DropdownButton onClick={handleCancelPOLineItem}>Cancel PO line item</DropdownButton>
            </DropdownMenu>
          </Flex>
        )}
        renderSummary={() => (
          <Summary breakpoint={1200}>
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
                  <TruncatedText fontSize="small" lineHeight="smallTextCompressed" width="100%" maxWidth="184px">
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
              {poStatus === ("Late" as any) && (
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
              {poStatus === ("At risk" as any) && (
                <>
                  <StatusIndicator alignSelf="center" type="warning">
                    At risk
                  </StatusIndicator>
                  <TruncatedText width="100%" fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    Current milestone 5 days late, previous 10 days late.
                  </TruncatedText>
                </>
              )}
              {poStatus === ("Completed" as any) && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Completed
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on January 24, 2025
                  </Text>
                </>
              )}
              {poStatus === ("Cancelled" as any) && (
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
                  <TruncatedText width="100%" fontSize="small" color="midGrey" lineHeight="smallRelaxed">
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
            .production-record-table tbody tr {
            border-bottom: 1px solid #e4e7eb !important;
          }
          
          .actual-production-record-table {
            border-collapse: separate !important;
            border-spacing: 0 !important;
          }
          .actual-production-record-table > thead th {
            height: 0 !important;
            padding: 0 !important;
            line-height: 0 !important;
            font-size: 0 !important;
          }
          .actual-production-record-table > tbody tr {
            border-bottom: 1px solid #e4e7eb !important;
          }
          .actual-production-record-table > tbody tr td {
            border-bottom: 1px solid #e4e7eb !important;
          }
          .actual-production-record-table > tbody tr:first-child {
            border-top: none !important;
          }
          .actual-production-record-table > tbody tr:first-child td {
            border-top: none !important;
          }
          .actual-production-record-table > tbody tr:last-child {
            border-bottom: none !important;
          }
          .actual-production-record-table > tbody tr:last-child td {
            border-bottom: none !important;
          }
          
          /* Subcomponent consumption table styling */
          .subcomponent-consumption-record-table thead th {
            border-bottom: 1px solid #e4e7eb !important;
          }
          .subcomponent-consumption-record-table tbody tr {
            border-bottom: 1px solid #e4e7eb !important;
          }
          
          /* Remove border-bottom for rows with has-error class */
          .subcomponent-consumption-edit-table tbody tr.has-error {
            border-bottom: none !important;
          }
        `}
      </style>
      <Page>
        <Flex justifyContent="flex-end" alignItems="center" gap="x1_5" mb="x1">
          <IconicButton icon="edit" aria-label="Edit" onClick={handleEditDetails}>
            Edit
          </IconicButton>
        </Flex>
        <Box mb="x3">
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
          <Tab label="Collaboration">
            <Card mt="x3">
              <Flex flexDirection="column" gap="x1_5" justifyContent="space-between">
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
                  <Flex alignItems="center" gap="x1_5">
                    <StatusIndicator type="success">Accepted</StatusIndicator>
                    <Text fontSize="small" color="midGrey">
                      Both parties have agreed to the proposal
                    </Text>
                  </Flex>
                  <Flex gap="x1_5">
                    <Button type="button" size="medium">
                      View full proposal
                    </Button>
                    <PrimaryButton type="button" size="medium">
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
                  columns={productionRecordsColumnsWithRenderer}
                  rows={productionRecordsDataWithExpandedContent}
                  hasExpandableRows={true}
                  expandedRows={expandedRows}
                  onRowExpansionChange={setExpandedRows}
                  keyField="id"
                  rowBorder={true}
                  compact={true}
                  className="production-record-table"
                />
              </Box>
            </Box>
          </Tab>
          <Tab label="Attachments">
            <Box>
              <Text>Attachments content goes here...</Text>
            </Box>
          </Tab>
          <Tab label="Milestone performance">
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
                    <Switch value="PO line item details">PO line item details</Switch>
                    <Switch value="Collaboration">Collaboration</Switch>
                    <Switch value="Production record">Production record</Switch>
                  </Switcher>
                </Flex>
              </Flex>
              <Divider m="0" />
            </Box>

            {/* Log */}
            <Flex flexDirection="column">
              {/* Entry 1: PO Line Item Details */}
              {(historyLogFilter === "All" || historyLogFilter === "PO line item details") && (
                <Flex flexDirection="column" gap="x1_5" maxWidth="1280px" mx="x1" pt="x1_5" pb="x2_5">
                  {/* Group 1: PO Line Item Details */}
                  <Box pt="x1">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        PO line item details
                      </Box>
                    </Text>
                  </Box>
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

              {/* Divider */}
              {(historyLogFilter === "All" || historyLogFilter === "PO line item details") && <Divider m="0" />}

              {/* Entry 2: Production Record + Actual Production Record */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1_5" maxWidth="1280px" mx="x1" pt="x1_5" pb="x2_5">
                  {/* Group 1: Production Record */}
                  <Box pt="x1">
                    <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                    </Flex>
                  </Box>

                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
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

                  {/* Group 2: Actual Production Record 001 */}
                  <Box pt="x1">
                    <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <RecordNumberPill number="001" />
                    </Flex>
                  </Box>
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
                            950 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            1,150 cases
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

                  {/* Actual Production Record 002 */}
                  <Box pt="x1">
                    <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 30, 2025
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <RecordNumberPill number="002" />
                    </Flex>
                  </Box>
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
                            850 cases
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            920 cases
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
                  </DescriptionList>

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

              {/* Divider */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Subcomponent Consumption Record Entry */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1_5" maxWidth="1280px" mx="x1" pt="x1_5" pb="x2_5">
                  {/* Subcomponent Consumption Record 001 */}
                  <Box pt="x1">
                    <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <RecordNumberPill number="001" />
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                      </Box>
                      <RecordNumberPill number="001" />
                    </Flex>
                  </Box>

                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Item modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Raw Material A
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Raw Material A (Grade 2)
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
                            RM-2025-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            RM-2025-001A
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
                            March 10, 2026
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            March 15, 2026
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
                            PAL-RM-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            PAL-RM-002
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            500 kg
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            550 kg
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          UOM modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            kg
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            kg
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Subcomponent Consumption Record 002 */}
                  <Box pt="x1">
                    <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 30, 2025
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <RecordNumberPill number="002" />
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                      </Box>
                      <RecordNumberPill number="002" />
                    </Flex>
                  </Box>
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Item modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Raw Material B
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Raw Material B (Premium Grade)
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
                            LOT-B-001
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            LOT-B-002
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Quantity modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            150 kg
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            175 kg
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  {/* Subcomponent Consumption Record 004 */}
                  <Box pt="x1">
                    <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                      <Box as="span" color="midGrey">
                        for
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 31, 2025
                      </Box>
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <RecordNumberPill number="004" />
                      <Box as="span" color="midGrey">
                        –
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                      </Box>
                      <RecordNumberPill number="004" />
                    </Flex>
                  </Box>
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          Item modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            Raw Material C
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            Raw Material C (Enhanced Grade)
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
                            March 15, 2025
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            March 20, 2025
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Box as="span" color="black">
                          UOM modified
                        </Box>
                      </DescriptionTerm>
                      <DescriptionDetails>
                        <Flex as="span" alignItems="center" gap="half">
                          <Box as="span" color="midGrey">
                            lbs
                          </Box>
                          <Icon icon="arrowForward" color="grey" size="x2_5" />
                          <Box as="span" color="black">
                            kg
                          </Box>
                        </Flex>
                      </DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>

                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        production.manager@supplier.com
                      </Box>
                      on
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        January 30th, 2025
                      </Box>
                      at
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        09:15:45AM
                      </Box>
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Group 3: Collaboration */}
              {(historyLogFilter === "All" || historyLogFilter === "Collaboration") && (
                <Flex flexDirection="column" gap="x1_5" maxWidth="1280px" mx="x1" pt="x1_5" pb="x2_5">
                  {/* Header */}
                  <Box pt="x1">
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
                          Quantity modified
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
                          Unit price modified
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

              {/* Divider after the last group */}
              {(historyLogFilter === "All" || historyLogFilter === "Collaboration") && <Divider m="0" />}

              {/* Entry 5: Combined Production Record + Actual Production Record + Subcomponent Consumption Record */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x1_5" maxWidth="1280px" mx="x1" pt="x1_5" pb="x2_5">
                  {/* Group 1: Production Record */}
                  {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                    <>
                      <Box pt="x1">
                        <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                          <Box as="span" color="black" fontWeight="bold">
                            Production record
                          </Box>
                          <Box as="span" color="midGrey">
                            for
                          </Box>
                          <Box as="span" color="black" fontWeight="bold">
                            February 1, 2025
                          </Box>
                        </Flex>
                      </Box>
                      <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                        <DescriptionGroup>
                          <DescriptionTerm>
                            <Box as="span" color="black">
                              Expected quantity modified
                            </Box>
                          </DescriptionTerm>
                          <DescriptionDetails>
                            <Flex as="span" alignItems="center" gap="half">
                              <Box as="span" color="midGrey">
                                1,200 cases
                              </Box>
                              <Icon icon="arrowForward" color="grey" size="x2_5" />
                              <Box as="span" color="black">
                                1,500 cases
                              </Box>
                            </Flex>
                          </DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                    </>
                  )}

                  {/* Group 2: Actual Production Record 003 */}
                  {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                    <>
                      <Box pt="x1">
                        <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                          <Box as="span" color="black" fontWeight="bold">
                            Production record
                          </Box>
                          <Box as="span" color="midGrey">
                            for
                          </Box>
                          <Box as="span" color="black" fontWeight="bold">
                            February 1, 2025
                          </Box>
                          <Box as="span" color="midGrey">
                            –
                          </Box>
                          <Box as="span" color="black" fontWeight="bold">
                            Actual production record
                          </Box>
                          <RecordNumberPill number="003" />
                        </Flex>
                      </Box>
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
                                1,150 cases
                              </Box>
                              <Icon icon="arrowForward" color="grey" size="x2_5" />
                              <Box as="span" color="black">
                                1,480 cases
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
                                PAL-004
                              </Box>
                              <Icon icon="arrowForward" color="grey" size="x2_5" />
                              <Box as="span" color="black">
                                PAL-005
                              </Box>
                            </Flex>
                          </DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                    </>
                  )}

                  {/* Group 3: Subcomponent Consumption Record 005 */}
                  {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                    <>
                      <Box pt="x1">
                        <Flex fontSize="small" lineHeight="smallCompact" alignItems="center" gap="half">
                          <Box as="span" color="black" fontWeight="bold">
                            Production record
                          </Box>
                          <Box as="span" color="midGrey">
                            for
                          </Box>
                          <Box as="span" color="black" fontWeight="bold">
                            February 1, 2025
                          </Box>
                          <Box as="span" color="midGrey">
                            –
                          </Box>
                          <Box as="span" color="black" fontWeight="bold">
                            Actual production record
                          </Box>
                          <RecordNumberPill number="003" />
                          <Box as="span" color="midGrey">
                            –
                          </Box>
                          <Box as="span" color="black" fontWeight="bold">
                            Subcomponent consumption record
                          </Box>
                          <RecordNumberPill number="005" />
                        </Flex>
                      </Box>
                      <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                        <DescriptionGroup>
                          <DescriptionTerm>
                            <Box as="span" color="black">
                              Item modified
                            </Box>
                          </DescriptionTerm>
                          <DescriptionDetails>
                            <Flex as="span" alignItems="center" gap="half">
                              <Box as="span" color="midGrey">
                                Raw Material D
                              </Box>
                              <Icon icon="arrowForward" color="grey" size="x2_5" />
                              <Box as="span" color="black">
                                Raw Material D (Premium Grade)
                              </Box>
                            </Flex>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>
                            <Box as="span" color="black">
                              Quantity modified
                            </Box>
                          </DescriptionTerm>
                          <DescriptionDetails>
                            <Flex as="span" alignItems="center" gap="half">
                              <Box as="span" color="midGrey">
                                200 kg
                              </Box>
                              <Icon icon="arrowForward" color="grey" size="x2_5" />
                              <Box as="span" color="black">
                                250 kg
                              </Box>
                            </Flex>
                          </DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                    </>
                  )}

                  {/* Footer */}
                  <Box mt="half">
                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                      by
                      <Box as="span" color="black" fontWeight="normal" mx="half">
                        system.admin@nulogy.com
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

              {/* Divider after the combined entry */}
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
                Please correct the highlighted errors and try again.
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
                  9
                </Text>
              </Box>
            </Box>
            <Box py="x2">
              <Field>
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
                  errorMessage="Actual production records cannot be created for future dates."
                />
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
            </Box>

            <Divider mb="x3" />

            <Heading4 mb="x2">Actual production</Heading4>

            <Box className="actual-production-edit-table">
              {/* Custom table structure with nested rows */}
              <Box>
                {/* Table Header */}
                <Flex borderBottom="1px solid" borderColor="lightGrey" pr="56px" pb="x1" pl="52px" gap="x1">
                  <Box width="100%">
                    Pallet number
                    {role === "supplier" && fieldConfigState.palletNumberRequired && (
                      <Text fontSize="small" inline ml="x0_5" color="darkGrey">
                        (Required)
                      </Text>
                    )}
                  </Box>
                  <Box width="100%">Customer's lot code</Box>
                  <Box width="100%">
                    Supplier's lot code
                    {role === "supplier" && fieldConfigState.lotCodeRequired && (
                      <Text fontSize="small" inline ml="x0_5" color="darkGrey">
                        (Required)
                      </Text>
                    )}
                  </Box>
                  <Box width="100%">
                    Expiry date
                    {role === "supplier" && fieldConfigState.expiryDateRequired && (
                      <Text fontSize="small" inline ml="x0_5" color="darkGrey">
                        (Required)
                      </Text>
                    )}
                  </Box>
                  <Box width="100%">Quantity</Box>
                  <Box width="75%">UOM</Box>
                </Flex>

                {/* Table Rows with nested content */}
                {productionRows.map((row, index) => (
                  <Box key={row.id}>
                    {/* Main Production Row */}
                    <Flex alignItems="center" py="x0" gap="x1" className="flex-row">
                      <Flex width="3em" alignItems="center" justifyContent="center" ml="x1" mr="x0_5" pt="x2_5">
                        <RecordNumberPill number={`${String(index + 1).padStart(3, "0")}`} />
                      </Flex>
                      <Box width="100%">
                        <Input
                          value={row.palletNumber}
                          onChange={(e) => handleProductionRowChange(row.id, "palletNumber", e.target.value)}
                          py="x1"
                          disabled={role === "customer" && isEditingProduction}
                          width="100%"
                        />
                      </Box>
                      <Box width="100%">
                        <Input
                          value={row.customerLotCode || ""}
                          onChange={(e) => handleProductionRowChange(row.id, "customerLotCode", e.target.value)}
                          py="x1"
                          disabled={role === "supplier"}
                          width="100%"
                        />
                      </Box>
                      <Box width="100%">
                        <Input
                          value={row.supplierLotCode || ""}
                          onChange={(e) => handleProductionRowChange(row.id, "supplierLotCode", e.target.value)}
                          py="x1"
                          disabled={role === "customer"}
                          width="100%"
                          errorMessage={
                            (row.id === "row-2" || row.id === "row-5") && row.supplierLotCode === ""
                              ? "Required"
                              : undefined
                          }
                        />
                      </Box>
                      <Box width="100%">
                        <Input
                          value={row.expiryDate}
                          onChange={(e) => handleProductionRowChange(row.id, "expiryDate", e.target.value)}
                          py="x1"
                          disabled={role === "customer" && isEditingProduction}
                          width="100%"
                        />
                      </Box>
                      <Box width="100%">
                        <Input
                          value={row.quantity}
                          onChange={(e) => handleProductionRowChange(row.id, "quantity", e.target.value)}
                          py="x1"
                          disabled={role === "customer" && isEditingProduction}
                          width="100%"
                        />
                      </Box>
                      <Box width="100%" pt="x1">
                        <Select
                          value={row.uom}
                          onChange={(value) => handleProductionRowChange(row.id, "uom", String(value))}
                          options={uomOptions}
                          disabled={role === "customer" && isEditingProduction}
                          width="100%"
                        />
                      </Box>
                      {role === "supplier" && (
                        <Box width="68px" mx="x1" pt="x1">
                          <Flex gap="x0_5" alignItems="center">
                            <DropdownMenu
                              trigger={() => <IconicButton icon="more" aria-label="More actions" disabled={false} />}
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
                                aria-label="Remove actual production record"
                                onClick={() => handleRemoveProductionRow(row.id)}
                                tooltip="Remove actual production record"
                                disabled={false}
                              />
                            )}
                          </Flex>
                        </Box>
                      )}
                    </Flex>

                    {/* Container for Consumption Details and Note */}
                    {(rowConsumptions[row.id] && rowConsumptions[row.id].length > 0) ||
                    rowNotes[row.id] !== undefined ? (
                      <Box pl="52px" borderBottom="1px solid" borderBottomColor="lightGrey">
                        {/* Note - Nested below this specific row */}
                        {rowNotes[row.id] !== undefined && (
                          <Box
                            border="1px solid"
                            borderColor="lightGrey"
                            borderRadius="medium"
                            p="x0_25"
                            mb="x1"
                            pb="x1"
                          >
                            <Flex
                              backgroundColor="whiteGrey"
                              pl="x2"
                              pr="x0_5"
                              py={role === "supplier" ? "0" : "x1"}
                              mb="x1"
                              borderRadius="small"
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                Note
                              </Text>
                              {role === "supplier" && (
                                <IconicButton
                                  icon="removeCircleOutline"
                                  aria-label="Remove note"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleRemoveNote(row.id);
                                  }}
                                  disabled={false}
                                  tooltip="Remove note"
                                />
                              )}
                            </Flex>
                            <Box px="x1">
                              <Textarea
                                value={rowNotes[row.id]}
                                onChange={(e) => handleNoteChange(row.id, e.target.value)}
                                disabled={role === "customer" && isEditingProduction}
                              />
                            </Box>
                          </Box>
                        )}
                        {/* Subcomponent consumption - Nested below this specific row */}
                        {rowConsumptions[row.id] && rowConsumptions[row.id].length > 0 && (
                          <Box
                            border="1px solid"
                            borderColor="lightGrey"
                            borderRadius="medium"
                            p="x0_25"
                            mb="x1"
                            mt="x0"
                          >
                            <Flex backgroundColor="whiteGrey" px="x2" py="x1" mb="x1" borderRadius="small">
                              <Text fontSize="small" fontWeight="bold" lineHeight="smallTextBase">
                                Subcomponent consumption{" "}
                                <Text as="span" color="midGrey" mx="x1">
                                  &bull;
                                </Text>{" "}
                                <Link
                                  href="/bom/revision/2.1"
                                  openInNewTab
                                  underline={false}
                                  color="midGrey"
                                  fontSize="small"
                                  fontWeight="normal"
                                  lineHeight="smallTextCompressed"
                                >
                                  BOM revision 2.1
                                </Link>
                              </Text>
                            </Flex>
                            <Box px="x1_5" pb="x1">
                              <Table
                                columns={[
                                  {
                                    label: "#",
                                    dataKey: "recordNumber",
                                    width: "40px",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          #
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x2" px="x1" display="flex" alignItems="center" justifyContent="center">
                                        <RecordNumberPill
                                          number={row.pillNumber || String(row.index + 1).padStart(3, "0")}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Item code",
                                    dataKey: "item",
                                    width: "400px",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          Item code
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
                                        <AsyncSelect
                                          value={row.item}
                                          onChange={(value) =>
                                            handleConsumptionRowChange(row.id, row.consumptionId, "item", String(value))
                                          }
                                          disabled={role === "customer"}
                                          loadOptions={async (inputValue) => {
                                            // Mock async search - replace with actual API call
                                            const mockItems = [
                                              { value: "Raw Material A", label: "Raw Material A" },
                                              { value: "Raw Material B", label: "Raw Material B" },
                                              { value: "Raw Material C", label: "Raw Material C" },
                                              { value: "Component X", label: "Component X" },
                                              { value: "Component Y", label: "Component Y" },
                                            ];
                                            return mockItems.filter((item) =>
                                              item.label.toLowerCase().includes(inputValue.toLowerCase())
                                            );
                                          }}
                                          errorMessage={row.item === "" ? "Required" : undefined}
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Customer's lot code",
                                    dataKey: "customerLotCode",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          Customer's lot code
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
                                        <Input
                                          value={row.customerLotCode || ""}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "customerLotCode",
                                              e.target.value
                                            )
                                          }
                                          disabled={role === "supplier"}
                                          inputWidth="100%"
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Supplier's lot code",
                                    dataKey: "supplierLotCode",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          Supplier's lot code
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
                                        <Input
                                          value={row.supplierLotCode || ""}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "supplierLotCode",
                                              e.target.value
                                            )
                                          }
                                          disabled={role === "customer"}
                                          inputWidth="100%"
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Expiry",
                                    dataKey: "expiryDate",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          Expiry
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
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
                                          disabled={role === "customer"}
                                          inputWidth="100%"
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Pallet",
                                    dataKey: "palletNumber",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          Pallet
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
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
                                          disabled={role === "customer"}
                                          inputWidth="100%"
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "Quantity",
                                    dataKey: "quantity",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          Quantity
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
                                        <Input
                                          type="number"
                                          value={row.quantity}
                                          onChange={(e) =>
                                            handleConsumptionRowChange(
                                              row.id,
                                              row.consumptionId,
                                              "quantity",
                                              e.target.value
                                            )
                                          }
                                          disabled={role === "customer"}
                                          inputWidth="100%"
                                        />
                                      </Box>
                                    ),
                                  },
                                  {
                                    label: "UOM",
                                    dataKey: "uom",
                                    width: "240px",
                                    headerFormatter: () => (
                                      <Box py="x0_25">
                                        <Text fontSize="small" lineHeight="smallTextCompressed">
                                          UOM
                                        </Text>
                                      </Box>
                                    ),
                                    cellRenderer: ({ row }: { row: any }) => (
                                      <Box py="x0_5" pr="x1">
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
                                          width="100%"
                                          errorMessage={row.uom === "" ? "Required" : undefined}
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
                                          headerFormatter: () => null,
                                          cellRenderer: ({ row }: { row: any }) => (
                                            <IconicButton
                                              icon="removeCircleOutline"
                                              aria-label="Remove subcomponent consumption record"
                                              onClick={(e) => {
                                                e.preventDefault();
                                                handleRemoveConsumptionRow(row.id, row.consumptionId);
                                              }}
                                              disabled={false}
                                              tooltip="Remove subcomponent consumption record"
                                              pr="x1"
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
                                    disabled={false}
                                  >
                                    Add subcomponent consumption record
                                  </QuietButton>
                                </Box>
                              )}
                            </Box>
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
                <Box mt="x1" pl="52px">
                  <QuietButton
                    icon="addCircleOutline"
                    iconSide="left"
                    fullWidth
                    onClick={handleAddProductionRow}
                    type="button"
                    disabled={false}
                  >
                    Add actual production record
                  </QuietButton>
                </Box>
              )}
            </Box>
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
            <Flex gap="x1_5">
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
                    <FieldLabel labelText="Item code" pb="x1" />
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
            <Flex gap="x1_5">
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
                        aria-label="Remove subcomponent consumption record"
                        onClick={() => handleRemoveConsumptionItem(item.id)}
                        tooltip="Remove subcomponent consumption record"
                        disabled={false}
                      />
                    )}
                  </Flex>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Item code" pb="x1" />
                      <Input
                        value={item.item}
                        onChange={(e) => handleConsumptionItemFieldChange(item.id, "item", e.target.value)}
                      />
                    </Field>
                  </Box>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Customer's lot code" pb="x1" />
                      <Input
                        value={item.customerLotCode || ""}
                        onChange={(e) => handleConsumptionItemFieldChange(item.id, "customerLotCode", e.target.value)}
                      />
                    </Field>
                  </Box>

                  <Box pb="x3">
                    <Field>
                      <FieldLabel labelText="Supplier's lot code" pb="x1" />
                      <Input
                        value={item.supplierLotCode || ""}
                        onChange={(e) => handleConsumptionItemFieldChange(item.id, "supplierLotCode", e.target.value)}
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
            <Flex alignItems="center" gap="x1_5" px="x2" py="x1">
              <Text fontSize="small">Tracking:</Text>
              <Tooltip tooltip="Controled by item setting. Makes the filed mandatory" placement="top">
                <Flex alignItems="center" gap="x1" width="200px">
                  <Text width="100px" fontSize="small" color="midGrey">
                    Lot code
                  </Text>
                  <Toggle
                    toggled={fieldConfigState.lotCodeRequired}
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
                    toggled={fieldConfigState.expiryDateRequired}
                    onChange={(e) => handleFieldConfigChange("expiryDateRequired", e.target.checked)}
                  />
                </Flex>
              </Tooltip>
              <Flex alignItems="center" gap="x1" width="200px">
                <Text width="100px" fontSize="small" color="midGrey">
                  Pallet
                </Text>
                <Toggle
                  toggled={fieldConfigState.palletNumberRequired}
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
                    toggled={fieldConfigState.sanofiRequired}
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
            <Flex gap="x1_5" justifyContent="flex-start">
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
                value={editFormDataState.supplierPOLineItemNumber}
                onChange={(e) =>
                  setEditFormDataState((prev) => ({ ...prev, supplierPOLineItemNumber: e.target.value }))
                }
              />
            )}

            {/* BOM revision and release date - editable */}
            <Input
              labelText="BOM revision and release date"
              id="bomRevision"
              value={editFormDataState.bomRevision}
              onChange={(e) => setEditFormDataState((prev) => ({ ...prev, bomRevision: e.target.value }))}
            />

            {/* Need by date - editable */}
            <Flex flexDirection="column" gap="x1">
              <FieldLabel htmlFor="needByDate" labelText="Need by date" />
              <Box>
                <DatePicker
                  id="needByDate"
                  selected={editFormDataState.needByDate}
                  onChange={(date) => setEditFormDataState((prev) => ({ ...prev, needByDate: date }))}
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
                  value={editFormDataState.carryOverSentTo}
                  onChange={(e) => setEditFormDataState((prev) => ({ ...prev, carryOverSentTo: e.target.value }))}
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

export const Default = () => (
  <NDSProvider locale="en_US" variant="desktop">
    <Details11 />
  </NDSProvider>
);

// Default2 component with InlineValidation error boxes (old approach)
const Details11Default2 = () => {
  // Reusable RecordNumberPill component for Default2
  const RecordNumberPill = ({
    number,
    tooltip,
    placement = "top",
    fontSize = "smaller",
    style,
    mr,
  }: {
    number: string;
    tooltip?: string;
    placement?: "left" | "right" | "top" | "bottom";
    fontSize?: "smaller" | "small";
    style?: React.CSSProperties;
    mr?: string;
  }) => {
    const pillContent = (
      <Box
        backgroundColor="lightGrey"
        px="half"
        borderRadius="small"
        width="fit-content"
        mr={mr}
        style={{ display: "inline-block" }}
      >
        <Text
          color="darkGrey"
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
      supplierLotCode: "SUPP-DUPLICATE",
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
  const [rowConsumptions, setRowConsumptions] = useState<
    Record<
      string,
      Array<{
        id: string;
        item: string;
        customerLotCode: string;
        supplierLotCode: string;
        expiryDate: string;
        palletNumber: string;
        quantity: string;
        uom: string;
        pillNumber?: string;
        verticalAlign?: string;
      }>
    >
  >({});

  // Function to detect duplicate production records
  const getDuplicateRecords = () => {
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

    // Return only duplicate instances (not the first one)
    const firstInstances = duplicates.filter(
      (index, pos) => duplicates.indexOf(index) === pos && duplicates.indexOf(index) === 0
    );
    const duplicateInstances = duplicates.filter((index) => !firstInstances.includes(index));
    return duplicateInstances.map((index) => String(index + 1).padStart(3, "0"));
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

  // Function to detect duplicate consumption records
  const getDuplicateConsumptionRecords = (rowId) => {
    const duplicates = [];
    const seen = new Map();

    if (rowConsumptions[rowId]) {
      rowConsumptions[rowId].forEach((consumption, index) => {
        const key = `${consumption.supplierLotCode}-${consumption.expiryDate}-${consumption.palletNumber}`;
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
    }

    // Return only duplicate instances (not the first one)
    const firstInstances = duplicates.filter(
      (index, pos) => duplicates.indexOf(index) === pos && duplicates.indexOf(index) === 0
    );
    const duplicateInstances = duplicates.filter((index) => !firstInstances.includes(index));
    return duplicateInstances.map((index) => String(index + 1).padStart(3, "0"));
  };

  // Function to check if consumption records have duplicates
  const hasDuplicateConsumptionRecords = (rowId) => {
    return getDuplicateConsumptionRecords(rowId).length > 0;
  };

  // Prepopulate consumption data with errors
  React.useEffect(() => {
    setRowConsumptions({
      "row-1": [
        {
          id: "consumption-1-1",
          item: "Steel Components",
          customerLotCode: "CUST-LOT-001",
          supplierLotCode: "SUPP-LOT-001",
          expiryDate: "2024-12-31",
          palletNumber: "PAL-001",
          quantity: "25",
          uom: "kg",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-2",
          item: "Chemical Additives", // Item for demonstration
          customerLotCode: "CUST-LOT-002",
          supplierLotCode: "SUPP-DUPLICATE",
          expiryDate: "2024-12-31",
          palletNumber: "PAL-DUPLICATE",
          quantity: "15",
          uom: "", // Empty for error demonstration
          verticalAlign: "top",
        },
        {
          id: "consumption-1-3",
          item: "Component B",
          customerLotCode: "CUST-LOT-003",
          supplierLotCode: "SUPP-DUPLICATE",
          expiryDate: "2024-12-31",
          palletNumber: "PAL-DUPLICATE",
          quantity: "40",
          uom: "cs",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-4",
          item: "Plastic Resins",
          customerLotCode: "CUST-LOT-004",
          supplierLotCode: "SUPP-LOT-004",
          expiryDate: "2024-10-20",
          palletNumber: "PAL-004",
          quantity: "30",
          uom: "lb",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-5",
          item: "Chemical Additives", // Item for demonstration
          customerLotCode: "CUST-LOT-005",
          supplierLotCode: "SUPP-MISMATCH-CONSUMPTION",
          expiryDate: "2024-09-10",
          palletNumber: "PAL-005",
          quantity: "20",
          uom: "ea",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-6",
          item: "Chemical Additives",
          customerLotCode: "CUST-LOT-006",
          supplierLotCode: "SUPP-MISMATCH-CONSUMPTION",
          expiryDate: "2024-10-15",
          palletNumber: "PAL-006",
          quantity: "35",
          uom: "g",
          verticalAlign: "top",
        },
        {
          id: "consumption-1-7",
          item: "Electronic Components",
          customerLotCode: "CUST-LOT-007",
          supplierLotCode: "",
          expiryDate: "2024-07-30",
          palletNumber: "PAL-007",
          quantity: "50",
          uom: "kg",
          verticalAlign: "top",
        },
      ],
    });
  }, []);

  // Copy all other state and handlers from Details11...
  // (I'll copy the essential ones for the error demonstration)
  const [role] = useState<"supplier" | "customer">("supplier");
  const [productionRecordState, setProductionRecordState] = useState({
    date: "2025-01-15",
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

  // Define RecordNumberPill locally for Default2 (not exported from NDS)

  // Copy the main page content from Details11 but with InlineValidation error boxes
  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
        /* Force vertical alignment to top for all table cells */
        .production-record-table tbody tr td,
        .actual-production-record-table tbody tr td,
        .subcomponent-consumption-record-table tbody tr td,
        .subcomponent-consumption-edit-table tbody tr td,
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
        
        /* Remove border-bottom for rows with has-error class */
        .subcomponent-consumption-edit-table tbody tr.has-error {
          border-bottom: none !important;
        }
        
        /* Remove border-bottom for rows followed by error box */
        .subcomponent-consumption-edit-table tbody tr:has(+ tr.error-message-row) {
          border-bottom: none !important;
        }
        
        /* Alternative approach: remove border from rows that are followed by InlineValidation */
        .subcomponent-consumption-edit-table tbody tr:last-child {
          border-bottom: none !important;
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
            <Link href="/supplier-collaboration/polilot">POLI lot</Link>
            <Text>Details 11 - Errors (InlineValidation)</Text>
          </Breadcrumbs>
        )}
      >
        <Summary title="POLI lot #001 - Details 11 - Errors (InlineValidation)" />
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

              <Box mt="x2" pl="x1_5">
                <InlineValidation errorMessage="Item and UOM are required for consumption record #002." />
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
              Please correct the highlighted errors and try again.
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
                9
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
                    8
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
              </Flex>

              {/* Table Rows with nested content */}
              {productionRows.map((row, index) => (
                <Box key={row.id}>
                  {/* Main Production Row */}
                  <Flex
                    alignItems="center"
                    py="x0"
                    gap="x1"
                    className={`flex-row ${row.supplierLotCode === "" || isRowDuplicate(index) ? "has-error" : ""}`}
                    borderBottom={
                      row.supplierLotCode === "" || isRowDuplicate(index) || row.id === "row-9" || row.id === "row-2"
                        ? "none"
                        : "solid 1px"
                    }
                    borderColor="lightGrey"
                  >
                    <Flex width="3em" alignItems="center" justifyContent="center" ml="x1" mr="x0_5">
                      <RecordNumberPill number={`${String(index + 1).padStart(3, "0")}`} />
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
                        width="100%"
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
                    <Box width="100%">
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
                  </Flex>

                  {/* InlineValidation error box for supplier lot code */}
                  {(row.id === "row-2" || row.id === "row-5") && row.supplierLotCode === "" && (
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
                        title="Required fields: In the actual production and subcomponent consumption record, lot code and Expiry date is required if the item tracking settings are on. Validated on submit (if validated on blur, the error may be thrown too frequently)."
                      >
                        <Text fontSize="small" color="white" fontWeight="bold">
                          {row.id === "row-2" ? "1" : "6"}
                        </Text>
                      </Box>
                      <Box pr="x6">
                        <InlineValidation errorMessage="Lot code is required. Lot code tracking is enforced for the item being produced." />
                      </Box>
                    </Box>
                  )}

                  {/* InlineValidation error box for expiry date mismatch */}
                  {row.id === "row-9" && (
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
                        title="If there are multiple actual production records for the same supplier's lot code, the expiry dates across them (if they are specified), must be consistent - one supplier's lot code cannot be associated with multiple expiry dates. Validated on blur. When the condition is met the error is displayed below the 2nd row that meets the criteria."
                      >
                        <Text fontSize="small" color="white" fontWeight="bold">
                          4
                        </Text>
                      </Box>
                      <Box pr="x6">
                        <InlineValidation errorMessage="Expiry date mismatch detected (#008). All actual production records sharing the same lot code must have identical expiry dates." />
                      </Box>
                    </Box>
                  )}

                  {/* InlineValidation error box for duplicate records */}
                  {isRowDuplicate(index) && (
                    <Box pb="x1_5" pl="x1_5" className="error-message-box" position="relative">
                      <Tooltip
                        tooltip="Each actual production record must be unique for the following combination of fields: pallet number, supplier's lot code, and expiry date. Validated on blur. As soon as the condition is met, the error is displayed below all except the first row where this condition is met."
                        placement="top"
                      >
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
                        >
                          <Text fontSize="small" color="white" fontWeight="bold">
                            1
                          </Text>
                        </Box>
                      </Tooltip>
                      <Box pr="x6">
                        <InlineValidation
                          errorMessage={`Duplicate actual production record detected (#002). Each record must have an unique combination of lot code, expiry date, and pallet number.`}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Divider after error boxes if they are the last element before next row */}
                  {(((row.id === "row-2" || row.id === "row-5") && row.supplierLotCode === "") ||
                    row.id === "row-3" ||
                    row.id === "row-9" ||
                    isRowDuplicate(index)) &&
                    !(rowConsumptions[row.id] && rowConsumptions[row.id].length > 0) &&
                    row.id !== "row-2" && <Box borderBottom="solid 1px" borderColor="lightGrey" />}

                  {/* Subcomponent Consumption Table */}
                  {rowConsumptions[row.id] && rowConsumptions[row.id].length > 0 && (
                    <Box ml="x4">
                      {/* Table Header */}
                      <Flex py="x0_5" px="x1" borderBottom="solid 1px" borderColor="lightGrey" gap="x1">
                        <Box width="40px" textAlign="center">
                          <Text fontSize="small" fontWeight="bold">
                            #
                          </Text>
                        </Box>
                        <Box width="140px">
                          <Text fontSize="small" fontWeight="bold">
                            Item code
                          </Text>
                        </Box>
                        <Box width="160px">
                          <Text fontSize="small" fontWeight="bold">
                            Customer's lot code
                          </Text>
                        </Box>
                        <Box width="160px">
                          <Text fontSize="small" fontWeight="bold">
                            Supplier's lot code
                          </Text>
                        </Box>
                        <Box width="140px">
                          <Text fontSize="small" fontWeight="bold">
                            Expiry date
                          </Text>
                        </Box>
                        <Box width="140px">
                          <Text fontSize="small" fontWeight="bold">
                            Pallet number
                          </Text>
                        </Box>
                        <Box width="140px">
                          <Text fontSize="small" fontWeight="bold">
                            Quantity
                          </Text>
                        </Box>
                        <Box width="140px">
                          <Text fontSize="small" fontWeight="bold">
                            UOM
                          </Text>
                        </Box>
                      </Flex>

                      {/* Individual Consumption Rows */}
                      {rowConsumptions[row.id].map((consumption, index) => (
                        <Box key={consumption.id}>
                          {/* Consumption Row */}
                          <Flex
                            py="x0_5"
                            px="x1"
                            gap="x1"
                            alignItems="center"
                            borderBottom={
                              index === 2 && hasDuplicateConsumptionRecords(row.id)
                                ? "none"
                                : index === 5 && consumption.id === "consumption-1-6"
                                  ? "none"
                                  : "solid 1px"
                            }
                            borderColor="lightGrey"
                          >
                            <Box width="40px" display="flex" justifyContent="center">
                              <RecordNumberPill number={String(index + 1).padStart(3, "0")} />
                            </Box>
                            <Box width="140px">
                              <Input
                                value={consumption.item}
                                onChange={(e) => console.log("Item changed:", e.target.value)}
                                placeholder="Enter item"
                                inputWidth="140px"
                              />
                            </Box>
                            <Box width="160px">
                              <Input
                                inputWidth="160px"
                                value={consumption.customerLotCode || ""}
                                onChange={(e) => console.log("Customer lot code changed:", e.target.value)}
                              />
                            </Box>
                            <Box width="160px">
                              <Input
                                inputWidth="160px"
                                value={consumption.supplierLotCode || ""}
                                onChange={(e) => console.log("Supplier lot code changed:", e.target.value)}
                              />
                            </Box>
                            <Box width="140px">
                              <DatePicker
                                selected={consumption.expiryDate ? new Date(consumption.expiryDate) : null}
                                onChange={(date) => console.log("Expiry date changed:", date)}
                              />
                            </Box>
                            <Box width="140px">
                              <Input
                                inputWidth="140px"
                                value={consumption.palletNumber || ""}
                                onChange={(e) => console.log("Pallet number changed:", e.target.value)}
                              />
                            </Box>
                            <Box width="140px">
                              <Input
                                inputWidth="140px"
                                type="number"
                                min="0"
                                value={consumption.quantity || ""}
                                onChange={(e) => console.log("Quantity changed:", e.target.value)}
                              />
                            </Box>
                            <Box width="140px">
                              <Select
                                value={consumption.uom || ""}
                                onChange={(value) => console.log("UOM changed:", value)}
                                options={[
                                  { value: "kg", label: "kg" },
                                  { value: "lb", label: "lb" },
                                  { value: "cs", label: "cs" },
                                  { value: "ea", label: "ea" },
                                  { value: "g", label: "g" },
                                ]}
                              />
                            </Box>
                          </Flex>

                          {/* Error box for duplicate consumption records - show only on duplicate instances */}
                          {index === 2 && hasDuplicateConsumptionRecords(row.id) && (
                            <Box mt="x0_25" pb="x0_5" pl="x3" position="relative">
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
                                title="Each subcomponent consumption record must be unique for the following combination of fields: item code, supplier's lot code, expiry date, and pallet number. Validated on blur. As soon as the condition is met, the error is displayed below all except the first row where this condition is met."
                              >
                                <Text fontSize="small" color="white" fontWeight="bold">
                                  2
                                </Text>
                              </Box>
                              <Box pr="x6">
                                <InlineValidation
                                  errorMessage={`Duplicate subcomponent consumption record detected (#002). Each record must have an unique combination of item code, lot code, expiry date, and pallet number.`}
                                />
                              </Box>
                            </Box>
                          )}

                          {/* Divider after duplicate consumption error */}
                          {index === 2 && hasDuplicateConsumptionRecords(row.id) && (
                            <Box borderBottom="solid 1px" borderColor="lightGrey" />
                          )}

                          {/* Error box for expiry date mismatch - show after row 006 */}
                          {consumption.id === "consumption-1-6" && (
                            <Box mt="x0_25" pb="x0_5" pl="x3" position="relative">
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
                                title="If there are multiple subcomponent consumption records for the same item code and supplier's lot code, the expiry dates across them (if they are specified) must match. Validated on blur. When the condition is met the error is displayed below the 2nd row that meets the criteria."
                              >
                                <Text fontSize="small" color="white" fontWeight="bold">
                                  5
                                </Text>
                              </Box>
                              <Box pr="x6">
                                <InlineValidation errorMessage="Expiry date mismatch detected (#005). All subcomponent consumption records sharing the same item code and lot code must have identical expiry dates." />
                              </Box>
                            </Box>
                          )}

                          {/* Divider after expiry date mismatch error */}
                          {consumption.id === "consumption-1-6" && (
                            <Box borderBottom="solid 1px" borderColor="lightGrey" />
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}

                  {/* Error 7 - Multiple errors for row-2 */}
                  {row.id === "row-2" && (
                    <Box mt="x0_25" pb="x0_5" pl="x1_5" mb="x1" position="relative">
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
                        title="Multiple errors on a single row: Use InlineValidation with list (NDS)."
                      >
                        <Text fontSize="small" color="white" fontWeight="bold">
                          7
                        </Text>
                      </Box>
                      <Box pr="x6">
                        <InlineValidation errorList={["Error 1", "Error 2"]} />
                      </Box>
                    </Box>
                  )}

                  {/* Note section for row-2 */}
                  {row.id === "row-2" && (
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
                              console.log("Remove note clicked");
                            }}
                            tooltip="Remove note"
                          />
                        </Flex>
                      </Flex>
                      <Box px="x1" py="x1">
                        <Textarea
                          placeholder="Add a note for this production record..."
                          value=""
                          onChange={(e) => {
                            console.log("Note changed:", e.target.value);
                          }}
                          rows={3}
                        />
                      </Box>
                    </Box>
                  )}

                  {/* Divider after Note section for row-2 */}
                  {row.id === "row-2" && <Box borderBottom="solid 1px" borderColor="lightGrey" />}
                </Box>
              ))}
            </Box>
          </Box>
        </Form>
      </Sidebar>
    </ApplicationFrame>
  );
};

export const Default2 = () => (
  <NDSProvider locale="en_US" variant="desktop">
    <Details11Default2 />
  </NDSProvider>
);
