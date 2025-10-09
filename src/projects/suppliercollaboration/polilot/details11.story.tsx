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
  Radio,
  RadioGroup,
  Pagination,
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
import { uomOptions, unitOptions, detailsData, userState, collaborationState, acceptedItems, poStatus, editFormData, productionRecord, fieldConfig } from "./details11/optionsData";
import { productionRecordsData, productionRecordsColumns } from "./details11/productionRecordsData";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Details11",
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

export const Details11 = () => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Production records tab is index 1
  const [showProductionSidebar, setShowProductionSidebar] = useState(false);
  const [isEditingProduction, setIsEditingProduction] = useState(false);
  const [productionEntryType, setProductionEntryType] = useState<"quick" | "detailed">("quick");
  const [historyLogFilter, setHistoryLogFilter] = useState("All");
  const [actualQuantity, setActualQuantity] = useState("");
  const [productionRows, setProductionRows] = useState([
    { id: "row-1", palletNumber: "", customerLotCode: "", supplierLotCode: "", expiryDate: "", quantity: "" },
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

  // Reusable RecordNumberPill component
  const RecordNumberPill = ({ 
    number, 
    tooltip, 
          placement = "top",
    fontSize = "smaller",
    style,
    mr
  }: { 
    number: string; 
    tooltip: string; 
    placement?: "left" | "right" | "top" | "bottom";
    fontSize?: "smaller" | "small" ;
    style?: React.CSSProperties;
    mr?: string;
  }) => (
    <Tooltip tooltip={tooltip} placement={placement}>
      <Box
        backgroundColor="lightGrey"
        px="half"
        borderRadius="small"
        width="fit-content"
        mr={mr}
        style={{ display: 'inline-block' }}
      >
        <Text
          color="darkGrey"
          fontSize={fontSize}
          fontWeight="bold"
          textTransform="uppercase"
          letterSpacing=".05em"
          style={style}
        >
          {number}
        </Text>
      </Box>
    </Tooltip>
  );

  // ActualProductionRecordNumberPill component (using the reusable component)
  const ActualProductionRecordNumberPill = ({ actualProductionRecordNumber }: { actualProductionRecordNumber: string }) => (
    <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
      <RecordNumberPill 
        number={actualProductionRecordNumber}
        tooltip={`Actual production record #${actualProductionRecordNumber}`}
        placement="left"
      />
    </Flex>
  );

  // SubcomponentConsumptionRecordNumberPill component (using the reusable component)
  const SubcomponentConsumptionRecordNumberPill = ({ subcomponentConsumptionRecordItem }: { subcomponentConsumptionRecordItem: string }) => (

      <RecordNumberPill 
        number={subcomponentConsumptionRecordItem}
        tooltip={`Subcomponent consumption record #${subcomponentConsumptionRecordItem}`}
        placement="left" />

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
  // productionRecord now imported from optionsData.tsx
  const [productionRecordState, setProductionRecordState] = useState(productionRecord);
  const [consumptionMaterials, setConsumptionMaterials] = useState([]);
  const [role, setRole] = useState("customer");
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
      cellRenderer: ({ row }: { row: any }) => <ActualProductionRecordNumberPill actualProductionRecordNumber={row.actualProductionRecordNumber} />,
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
            <TruncatedText
              pr="x2"
              py="x1"
              fontSize="small"
              lineHeight="smallTextCompressed"
              maxCharacters={98}
            >
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
                lineHeight="smallCompressed"
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
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
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
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
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
            <TruncatedText
              pr="x2"
              py="x1"
                fontSize="small"
                lineHeight="smallTextCompressed"
              maxCharacters={98}
              >
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
            <RecordNumberPill 
              number={row.actualProductionRecordNumber}
              tooltip="Actual production record #001"
              placement="top"
            />
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
            <TruncatedText
              pr="x2"
              py="x1"
                fontSize="small"
                lineHeight="smallTextCompressed"
              maxCharacters={98}
              >
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
            rows={record.id === "1" ? nestedTableData1 : 
                  record.id === "2" ? nestedTableData2 :
                  record.id === "3" ? nestedTableData3 :
                  record.id === "4" ? nestedTableData4 :
                  record.id === "5" ? nestedTableData5 :
                  record.id === "6" ? nestedTableData6 :
                  record.id === "7" ? nestedTableData7 :
                  nestedTableData8}
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
    setProductionRecordState({
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
        }
      }
    });

    setRowConsumptions(newRowConsumptions);
    setShowProductionSidebar(true);
  };

  const handleCloseProductionSidebar = () => {
    setShowProductionSidebar(false);
    setIsEditingProduction(false);
    setProductionEntryType("quick");
    setActualQuantity("");
    setProductionRows([
      { id: "row-1", palletNumber: "", customerLotCode: "", supplierLotCode: "", expiryDate: "", quantity: "" },
    ]);
    setRowNotes({});
    setRowConsumptions({});
    setProductionRecordState({
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

  // Add cellRenderer to production records columns
  const productionRecordsColumnsWithRenderer = productionRecordsColumns.map(column => {
    if (column.dataKey === "actions") {
      return {
        ...column,
        cellRenderer: ({ row }: { row: any }) => (
          <Box pr="x1">
            <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
              <DropdownButton onClick={() => handleEditProduction(row.id)}>Edit production</DropdownButton>
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
          <RecordNumberPill 
            number={row.subcomponentConsumptionRecordItem}
            tooltip={`Subcomponent consumption record #${row.subcomponentConsumptionRecordItem}`}
            placement="left"
          />
        </Box>
      ),
    },
    {
      label: "Item",
      dataKey: "item",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed" >
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Pallet number",
      dataKey: "palletNumber",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed" >
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cellData}
        </Text>
      ),
    },
    {
      label: "UOM",
      dataKey: "uom",
      width: "auto",
      headerFormatter: ({ label }: { label: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed" >
          {label}
        </Text>
      ),
      cellFormatter: ({ cellData }: { cellData: string }) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cellData}
        </Text>
      ),
    },
  ];

  // Create nested table data with consumption table columns
  const { nestedTableData1, nestedTableData2, nestedTableData3, nestedTableData4, nestedTableData5, nestedTableData6, nestedTableData7, nestedTableData8 } = createNestedTableData(consumptionTableColumns);

  // ConsumptionReport and EmptyConsumptionReport components now imported from components.tsx

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
              {poStatus === "Late" as any && (
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
              {poStatus === "At risk" as any && (
                <>
                  <StatusIndicator alignSelf="center" type="warning">
                    At risk
                  </StatusIndicator>
                  <TruncatedText fullWidth fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    Current milestone 5 days late, previous 10 days late.
                  </TruncatedText>
                </>
              )}
              {poStatus === "Completed" as any && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Completed
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on January 24, 2025
                  </Text>
                </>
              )}
              {poStatus === "Cancelled" as any && (
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
        `}
      </style>
      <Page>
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x1">
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
                    <Switch value="Production record">Production record</Switch>
                    <Switch value="Subcomponent consumption">Subcomponent consumption</Switch>
                    <Switch value="Collaboration">Collaboration</Switch>
                    <Switch value="PO line item details">PO line item details</Switch>
                  </Switcher>
                </Flex>
              </Flex>
              <Divider m="0" />
            </Box>

            {/* Log */}
            <Flex flexDirection="column">
              {/* Entry 1: PO Line Item Details */}
              {(historyLogFilter === "All" || historyLogFilter === "PO line item details") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Group 1: PO Line Item Details */}
                  <Box mb="half">
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
                  
                  {/* Footer */}
                  <Box mt="half">
                    <Text fontSize="small" color="midGrey">
                      Modified by John Smith on January 29, 2025 at 2:30 PM
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider */}
              {(historyLogFilter === "All" || historyLogFilter === "PO line item details") && <Divider m="0" />}

              {/* Entry 2: Production Record + Actual Production Record */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && (
                <Flex flexDirection="column" gap="x2" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Group 1: Production Record */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Production record
                      </Box>
                    </Text>
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
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <RecordNumberPill 
                        number="001"
                        tooltip="Actual production record #001"
                        style={{ display: 'inline-block' }}
                      />
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 29, 2025
                      </Box>
                    </Text>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Customer's lot code modified
                        </Box>
                        </Flex>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Supplier's lot code modified
                        </Box>
                        </Flex>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Expiry date modified
                  </Box>
                </Flex>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Note modified
                        </Box>
                        </Flex>
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
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <RecordNumberPill 
                        number="002"
                        tooltip="Actual production record #002"
                        style={{ display: 'inline-block' }}
                      />
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 30, 2025
                      </Box>
                    </Text>
                  </Box>
                  <DescriptionList layout="auto" density="compact" descriptionTermMaxWidth="38.2%">
                    <DescriptionGroup>
                      <DescriptionTerm>
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="002"
                            tooltip="Actual production record #002"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                            Actual quantity modified
                        </Box>
                        </Flex>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="002"
                            tooltip="Actual production record #002"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                            Pallet number modified
                        </Box>
                        </Flex>
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
                  
                  {/* Footer */}
                  <Box mt="half">
                    <Text fontSize="small" color="midGrey">
                      Modified by Sarah Johnson on January 30, 2025 at 3:45 PM
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider */}
              {(historyLogFilter === "All" || historyLogFilter === "Production record") && <Divider m="0" />}

              {/* Subcomponent Consumption Record Entry */}
              {(historyLogFilter === "All" || historyLogFilter === "Subcomponent consumption") && (
                <Flex flexDirection="column" gap="x1" maxWidth="1280px" mx="x1" pt="x2_5" pb="x2_5">
                  {/* Subcomponent Consumption Record 001 */}
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <RecordNumberPill 
                        number="001"
                        tooltip="Subcomponent consumption record #001"
                        style={{ display: 'inline-block' }}
                      />
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                            January 29, 2025
                          </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                          </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production
                        </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                          </Box>
                      <RecordNumberPill 
                        number="001"
                        tooltip="Actual production record #001"
                        style={{ display: 'inline-block' }}
                      />
                    </Text>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Lot code modified
                          </Box>
                        </Flex>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Expiry date modified
                        </Box>
                        </Flex>
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
                        <Flex alignItems="center" gap="half">
                          <RecordNumberPill 
                            number="001"
                            tooltip="Actual production record #001"
                            style={{ fontSize: '12px' }}
                            mr="x1"
                          />
                        <Box as="span" color="black">
                          Pallet number modified
                        </Box>
                        </Flex>
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
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <RecordNumberPill 
                        number="002"
                        tooltip="Subcomponent consumption record #002"
                        style={{ display: 'inline-block' }}
                      />
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 30, 2025
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production
                      </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                      </Box>
                      <RecordNumberPill 
                        number="002"
                        tooltip="Actual production record #002"
                        style={{ display: 'inline-block' }}
                      />
                    </Text>
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
                  <Box mb="half">
                    <Text fontSize="small" lineHeight="smallCompact">
                      <Box as="span" color="black" fontWeight="bold">
                        Subcomponent consumption record
                        </Box>
                      <Box as="span" color="midGrey" mx="half">
                          {" "}
                        –{" "}
                        </Box>
                      <RecordNumberPill 
                        number="004"
                        tooltip="Subcomponent consumption record #004"
                        style={{ display: 'inline-block' }}
                      />
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                        </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        January 31, 2025
                          </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                        </Box>
                      <Box as="span" color="black" fontWeight="bold">
                        Actual production
                          </Box>
                      <Box as="span" color="midGrey" mx="half">
                        {" "}
                        –{" "}
                        </Box>
                      <RecordNumberPill 
                        number="004"
                        tooltip="Actual production record #004"
                        style={{ display: 'inline-block' }}
                      />
                    </Text>
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
                  
                  {/* Footer */}
                  <Box mt="half">
                    <Text fontSize="small" color="midGrey">
                      Modified by Production Manager on January 31, 2025 at 9:15 AM
                    </Text>
                  </Box>
                </Flex>
              )}

              {/* Divider */}
              {(historyLogFilter === "All" || historyLogFilter === "Subcomponent consumption") && <Divider m="0" />}

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
                    setProductionRecordState((prev) => ({ ...prev, date: date ? date.toISOString().split("T")[0] : "" }))
                  }
                  selected={productionRecordState.date ? new Date(productionRecordState.date) : null}
                  inputProps={{ disabled: role === "customer" && isEditingProduction }}
                />
              </Field>

              <Flex gap="x2">
                <Box width="20em">
                  <Field>
                    <FieldLabel labelText="Expected quantity" pb="x1" />
                    <Input
                      value={productionRecordState.expectedQuantity}
                      onChange={(e) => setProductionRecordState((prev) => ({ ...prev, expectedQuantity: e.target.value }))}
                      disabled={role === "customer" && isEditingProduction}
                    />
                  </Field>
                </Box>
                <Box width="10em">
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

              <Divider mb="x3" />

              <Flex justifyContent="space-between" alignItems="center" mb="x2">
                <Heading4>Production details</Heading4>
                {role === "supplier" && (
                  <Switcher
                    selected={productionEntryType}
                    onChange={(value) => {
                      setProductionEntryType(value as "quick" | "detailed");
                    }}
                  >
                    <Switch value="quick" type="button">
                      Quick mode
                    </Switch>
                    <Switch value="detailed" type="button">
                      Detailed mode
                    </Switch>
                  </Switcher>
                )}
              </Flex>

              {productionEntryType === "quick" ? (
                <Box width="21em">
                  <Field>
                    <FieldLabel labelText="Actual quantity" pb="x1" />
                    <Input
                      value={actualQuantity}
                      onChange={(e) => setActualQuantity(e.target.value)}
                      placeholder="Enter total production quantity"
                      suffix="kg"
                    />
                  </Field>
                </Box>
              ) : (
                <Box>
                  {/* Custom table structure with nested rows */}
                  <Box>
                    {/* Table Header */}
                    <Box display="flex" borderBottom="1px solid" borderColor="lightGrey" pb="x1">
                      <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                        Pallet number
                        {role === "supplier" && fieldConfigState.palletNumberRequired && (
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
                        {role === "supplier" && fieldConfigState.lotCodeRequired && (
                          <Text inline ml="x0_5" fontSize="small" color="darkGrey">
                            (Required)
                          </Text>
                        )}
                      </Box>
                      <Box flex="1" pb="x1" pl="x1" fontWeight="bold" fontSize="small">
                        Expiry date
                        {role === "supplier" && fieldConfigState.expiryDateRequired && (
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
                              <Box
                                border="1px solid"
                                borderColor="lightGrey"
                                borderRadius="large"
                                p="x2"
                                mb="x1"
                                mt="x0"
                              >
                                <Flex justifyContent="space-between" alignItems="center" mb="x2" ml="x1">
                                  <Flex alignItems="baseline" gap="x1">
                                    <Heading4 mb="0">Subcomponent consumption</Heading4>
                                    <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                                      BOM revision 2.1
                                    </Text>
                                  </Flex>
                                </Flex>
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
                                              handleConsumptionRowChange(
                                                row.id,
                                                row.consumptionId,
                                                "uom",
                                                String(value)
                                              )
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
              )}
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
                value={editFormDataState.supplierPOLineItemNumber}
                onChange={(e) => setEditFormDataState((prev) => ({ ...prev, supplierPOLineItemNumber: e.target.value }))}
              />
            )}

            {/* BOM revision and release date - editable */}
            <Input
              labelText="BOM revision and release date"
              id="bomRevision"
              autoFocus
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

