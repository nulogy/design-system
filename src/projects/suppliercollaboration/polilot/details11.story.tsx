import React, { useState } from "react";
import { toast, Tooltip } from "../../..";
import {
  materialsData1,
  materialsData2,
  materialsData5A,
  materialsData5B,
  materialsData6A,
  materialsData6B,
  materialsData7A,
  materialsData7B,
  productionRecordsData,
  nestedTableData1,
  nestedTableData2,
  nestedTableData3,
  nestedTableData4,
  nestedTableData5,
  nestedTableData6,
  nestedTableData7,
  nestedTableData8,
  nestedTableColumns,
  nestedTableColumns4th,
  nestedTableColumns567,
  productionRecordsColumns,
  consumptionTableColumns,
} from "./details11";
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

  // ActualProductionRecordNumberPill component
  const ActualProductionRecordNumberPill = ({ actualProductionRecordNumber }: { actualProductionRecordNumber: string }) => (
    <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
      <Tooltip tooltip={`Actual production record #${actualProductionRecordNumber}`} placement="left">
        <Box
          backgroundColor="lightGrey"
          px="half"
          borderRadius="small"
        >
          <Text
            color="darkGrey"
            fontSize="smaller"
            lineHeight="smallerText"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing=".05em"
          >
            {actualProductionRecordNumber}
          </Text>
        </Box>
      </Tooltip>
    </Flex>
  );

  // SubcomponentConsumptionRecordNumberPill component
  const SubcomponentConsumptionRecordNumberPill = ({ subcomponentConsumptionRecordItem }: { subcomponentConsumptionRecordItem: string }) => (
    <Flex py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
      <Tooltip tooltip={`Subcomponent consumption record #${subcomponentConsumptionRecordItem}`} placement="left">
        <Box
          backgroundColor="lightGrey"
          px="half"
          borderRadius="small"
        >
          <Text
            color="darkGrey"
            fontSize="smaller"
            lineHeight="smallerText"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing=".05em"
          >
            {subcomponentConsumptionRecordItem}
          </Text>
        </Box>
      </Tooltip>
    </Flex>
  );

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
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData1}
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
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData2}
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
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns}
              rows={nestedTableData3}
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
    },
    {
      id: "4",
      date: "2025-Aug-08",
      //lotCodeAndExpiry: "LOT-2025-004",
      customerLotCode: "LOT-2025-004",
      supplierLotCode: "SUP-LOT-004",
      expiryDate: "2026-08-08",
      palletNumber: "PAL-004",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "Equipment maintenance scheduled, production line optimization in progress",
      expandedContent: () => (
        <Box style={{ paddingLeft: "-56px" }}>
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns4th}
              rows={nestedTableData4}
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
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns567}
              rows={nestedTableData5}
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
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns567}
              rows={nestedTableData6}
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
          <Box style={{ paddingLeft: "298px" }}>
            <Table
              columns={nestedTableColumns567}
              rows={nestedTableData7}
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
        border="1px solid"
        borderColor="lightGrey"
        borderTop="none"
        borderTopLeftRadius="0"
        borderTopRightRadius="0"
        borderBottomLeftRadius="large"
        borderBottomRightRadius="large"
        p="half"
      >
        <Flex backgroundColor="whiteGrey" px="x2" py="x1" mb="x1" borderRadius="small">

            <Text fontSize="small" fontWeight="bold" lineHeight="smallCompact">Subcomponent consumption <Text as="span" color="midGrey" mx="x1" >&bull;</Text> <Text  as="span" color="midGrey" fontSize="small" fontWeight="bold" lineHeight="smallCompact" fontWeight="normal" >BOM revision 2.1</Text></Text>
        
        </Flex>
        {isEmpty ? (
          <Box py="x4" textAlign="center">
            <Text color="midGrey" fontSize="small">
              No consumption data available
            </Text>
          </Box>
        ) : (
          <Box mx="x1">
            <Table
            columns={consumptionTableColumns}
            rows={materials}
            keyField="item"
            compact={true}
            rowBorder={true}
            className="subcomponent-consumption-record-table"
            mb="x1"
            width="100%"
          />
          </Box>
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
