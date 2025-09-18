import React, { useState, useEffect, useRef } from "react";
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
  Input,
  AsyncSelect,
  Select,
  Text,
  Icon,
  StatusIndicator,
  TruncatedText,
  Sidebar,
  Checkbox,
  DateRange,
  Tooltip,
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  Divider,
  QuietButton,
  Modal,
  PrimaryButton,
  Button,
  DangerButton,
  ButtonGroup,
  Toggle,
  Textarea,
  Heading2,
  Heading3,
  toast,
  InlineValidation,
  Alert,
  List,
  ListItem,
  ToastContainer,
  BrandedNavBar,
} from "../../..";
import { AppTag } from "../../../AppTag";
import { poliRows, shouldShowEditBox } from "../utils/poliTableData";
import { formatDateWithWeek, formatDateToYYYYMonDD } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Default",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Analytics", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Items", href: "/" },
  { name: "Imports and exports", href: "/" },
];

const secondaryMenu = [
  {
    name: <Icon icon="user"></Icon>,
    items: [
      { name: "Profile", href: "/" },
      { name: "Preferences", href: "/" },
      { name: "Logout", href: "/" },
    ],
  },
];

export const Default = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [role, setRole] = useState("supplier");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [poLineItemNumbers, setPoLineItemNumbers] = useState<string[]>([]);
  const [onlyBlankSupplierPo, setOnlyBlankSupplierPo] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [creationDateRange, setCreationDateRange] = useState({ startDate: null, endDate: null });

  // Custom view functionality
  const [selectedView, setSelectedView] = useState("Default view");
  const [isSavedView1ModalOpen, setIsSavedView1ModalOpen] = useState(false);
  const [isSavedView2ModalOpen, setIsSavedView2ModalOpen] = useState(false);
  const [isCreateNewViewModalOpen, setIsCreateNewViewModalOpen] = useState(false);
  const [isLotCodeHidden, setIsLotCodeHidden] = useState(false);
  const [filterVisibilityStates, setFilterVisibilityStates] = useState<Record<number, boolean>>({});
  const [lotCodes, setLotCodes] = useState<string[]>([]);
  const [customerLotCodes, setCustomerLotCodes] = useState<string[]>([]);
  const [supplierLotCodes, setSupplierLotCodes] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Record<string, string[]>>({
    "1": ["neutral"],
    "2": ["success"],
    "3": ["neutral", "success"],
    "4": ["success"],
    "5": ["neutral"],
    "6": ["success"],
    "7": ["neutral"],
    "8": ["success"],
    "9": ["neutral"],
    "10": ["success"],
  });

  // Saved view 1 state
  const [savedView1Title, setSavedView1Title] = useState("Saved view 1");
  const [savedView1Description, setSavedView1Description] = useState(
    "This view includes additional custom fields and priority levels for better project tracking and management."
  );
  const [savedView1ValidationErrors, setSavedView1ValidationErrors] = useState<Record<number, any>>({});
  const [savedView1FocusedRowId, setSavedView1FocusedRowId] = useState<number | null>(null);

  const handleRowSelectionChange = (selectedRowIds: string[]) => {
    // Filter out canceled rows from selection
    const filteredSelectedRows = selectedRowIds.filter((rowId) => {
      const row = compactRows.find((r) => r.id === rowId);
      return row && !isRowCanceled(row);
    });
    setSelectedRows(filteredSelectedRows);
  };

  const handlePoLineItemNumbersChange = (selectedValues: any) => {
    setPoLineItemNumbers(selectedValues || []);
  };

  const handleItemsChange = (selectedValues: any) => {
    setItems(selectedValues || []);
  };

  const handlePrioritiesChange = (selectedValues: any) => {
    setPriorities(selectedValues || []);
  };

  const handleCreationDateRangeChange = (range: any) => {
    setCreationDateRange({
      startDate: range.startDate,
      endDate: range.endDate,
    });
  };

  const loadPoLineItemNumbers = async (inputValue: string) => {
    // Simulate async search - in real app this would be an API call
    const allOptions = [
      { value: "PO-001-001", label: "PO-001-001" },
      { value: "PO-001-002", label: "PO-001-002" },
      { value: "PO-002-001", label: "PO-002-001" },
      { value: "PO-002-002", label: "PO-002-002" },
      { value: "PO-003-001", label: "PO-003-001" },
      { value: "PO-003-002", label: "PO-003-002" },
      { value: "PO-004-001", label: "PO-004-001" },
      { value: "PO-004-002", label: "PO-004-002" },
    ];

    return allOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadItems = async (inputValue: string) => {
    // Simulate async search - in real app this would be an API call
    const allOptions = [
      { value: "ITEM-001", label: "ITEM-001 - Widget A" },
      { value: "ITEM-002", label: "ITEM-002 - Widget B" },
      { value: "ITEM-003", label: "ITEM-003 - Component C" },
      { value: "ITEM-004", label: "ITEM-004 - Part D" },
      { value: "ITEM-005", label: "ITEM-005 - Assembly E" },
      { value: "ITEM-006", label: "ITEM-006 - Module F" },
      { value: "ITEM-007", label: "ITEM-007 - System G" },
      { value: "ITEM-008", label: "ITEM-008 - Unit H" },
    ];

    return allOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const priorityOptions = [
    { value: "1 - High", label: "1 - High" },
    { value: "2 - Medium", label: "2 - Medium" },
    { value: "3 - Low", label: "3 - Low" },
    {
      value: "7 - Some very long priority label that is deactivated",
      label: "7 - Some very long priority label that is deactivated",
    },
    { value: "4", label: "4" },
  ];

  const actionOptions = [
    { value: "edit", label: "Edit" },
    { value: "delete", label: "Delete" },
    { value: "duplicate", label: "Duplicate" },
    { value: "export", label: "Export" },
  ];

  const tagOptions = [
    { value: "neutral", label: "Neutral" },
    { value: "success", label: "Success" },
    { value: "warning", label: "Warning" },
    { value: "danger", label: "Danger" },
    { value: "quiet", label: "Quiet" },
  ];

  const getStatusIndicatorType = (type: string) => {
    return type as any; // Type corresponds directly to StatusIndicator type
  };

  const handleTagChange = (rowId: string, selectedTagValues: string[]) => {
    setSelectedTags((prev) => ({
      ...prev,
      [rowId]: selectedTagValues,
    }));
  };

  const handleCustomerLotCodesChange = (values: any) => {
    setCustomerLotCodes(values || []);
  };

  const handleSupplierLotCodesChange = (values: any) => {
    setSupplierLotCodes(values || []);
  };

  const handleCustomTagsChange = (values: any) => {
    setSelectedCustomTags(values || []);
  };

  const handleActionsChange = (values: any) => {
    setSelectedActions(values || []);
  };

  // Helper function to check if we should show additional box for customer awaiting response
  const shouldShowCustomerAwaitingBox = (row: any) => {
    if (role !== "customer") return false;
    const status = row.collaborationStatus;

    // Check if the collaboration status would display "Awaiting your response"
    if (status === "draft") {
      return true; // draft status shows "Awaiting your response" for customer
    }

    return false;
  };

  // Helper function to check if we should show additional box for supplier awaiting response
  const shouldShowSupplierAwaitingBox = (row: any) => {
    if (role !== "supplier") return false;
    const status = row.collaborationStatus;

    // Check if the collaboration status would display "Awaiting your response"
    if (status === "awaiting") {
      return true; // awaiting status shows "Awaiting your response" for supplier
    }

    return false;
  };

  // Helper function to check if a row is canceled
  const isRowCanceled = (row: any) => {
    const statuses = ["Open", "Completed", "Canceled"];
    const status = statuses[parseInt(row.id) % 3];
    return status === "Canceled";
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
      width: "40px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x0_5" py="x1">
          <Text fontSize="smaller" fontWeight="bold">
            <Icon icon="chatBubble" size="x2_5" />
          </Text>
        </Box>
      ),
      cellRenderer: () => (
        <Box width="100%" textAlign="center" pr="x0_5" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            0
          </Text>
        </Box>
      ),
    },
    {
      label: "",
      dataKey: "attachments",
      width: "40px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x0_5" py="x1">
          <Text fontSize="smaller" fontWeight="bold">
            <Icon icon="attachment" size="x2_5" />
          </Text>
        </Box>
      ),
      cellRenderer: () => (
        <Box width="100%" textAlign="center" pr="x0_5" py="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            0
          </Text>
        </Box>
      ),
    },
    {
      label: "PO number",
      dataKey: "poNumber",
      width: "184px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            PO number
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" width="100%">
          <Link href="#" underline={false} color="black" hover="blue">
            <TruncatedText
              fontSize="small"
              lineHeight="smallTextCompressed"
              maxCharacters={100}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                maxHeight: "32px",
                cursor: "pointer",
                /* Cross-browser fallback */
                lineHeight: "16px",
                position: "relative",
              }}
            >
              {cellData}
            </TruncatedText>
          </Link>
        </Box>
      ),
    },
    {
      label: "Customer's/Supplier's PO line item number",
      dataKey: "combinedPoLineItem",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            PO line item number
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">
            Customer's / Supplier's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" py="x0_75" flexDirection="column" gap="x0_25">
          <Link href="#" underline={false} color="black" hover="blue" maxWidth="184px">
            <TruncatedText
              fullWidth
              fontSize="small"
              lineHeight="smallTextCompressed"
              showTooltip={true}
              tooltipProps={{ tooltip: row.poLineItemNumber }}
            >
              {row.poLineItemNumber}
            </TruncatedText>
          </Link>
          <Flex gap="half" maxWidth="184px">
            {row.id === "1" ? (
              <Link
                href="#"
                fontSize="small"
                lineHeight="smallTextCompressed"
                underline={false}
                color="midGrey"
                hover="blue"
                forApp="shop-floor"
              >
                <TruncatedText
                  maxWidth="132px"
                  fullWidth
                  fontSize="small"
                  lineHeight="smallTextCompressed"
                  color="midGrey"
                >
                  {row.supplierPoLineItemNumber}
                </TruncatedText>
              </Link>
            ) : (
              <TruncatedText
                maxWidth="184px"
                fullWidth
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.supplierPoLineItemNumber}
              </TruncatedText>
            )}
          </Flex>
        </Flex>
      ),
    },
    {
      label: "Status",
      dataKey: "status",
      width: "160px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Status
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // Generate status based on row ID for variety
        const statuses = ["Open", "Completed", "Canceled"];
        const status = statuses[parseInt(row.id) % 3];

        // Determine StatusIndicator type based on status
        let indicatorType: "quiet" | "neutral" = "quiet";
        if (status === "Completed" || status === "Canceled") {
          indicatorType = "neutral";
        }

        return (
          <Flex flexWrap="wrap" gap="x0_25" px="x1" py="x0_75">
            <StatusIndicator type={indicatorType}>{status}</StatusIndicator>
          </Flex>
        );
      },
    },
    {
      label: "Creation date",
      dataKey: "createdOn",
      width: "152px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Creation date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => {
        const { formattedDate, weekNumber } = formatDateWithWeek(cellData);

        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {formattedDate}
            </Text>
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              (Week {weekNumber})
            </Text>
          </Flex>
        );
      },
    },
    {
      label: role === "supplier" ? "Customer" : "Supplier",
      dataKey: "customer",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            {role === "supplier" ? "Customer" : "Supplier"}
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" width="100%">
          <TruncatedText
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={100}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              maxHeight: "32px",
              /* Cross-browser fallback */
              lineHeight: "16px",
              position: "relative",
            }}
          >
            {role === "supplier" ? cellData : "MySupplier"}
          </TruncatedText>
        </Box>
      ),
    },
    {
      label: "Customer's item code and description",
      dataKey: "customerItemCodeAndDescription",
      width: "320px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Item code and description
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">
            Customer's / Supplier's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <Flex gap="half">
            <Link href="#" underline={false} color="black" hover="blue" style={{ display: "block", maxWidth: "152px" }}>
              <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
                {row.customerItemCode}
              </TruncatedText>
            </Link>
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
              /
            </Text>
            <Link
              href="#"
              underline={false}
              color="midGrey"
              hover="blue"
              style={{ display: "block", maxWidth: "152px" }}
            >
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.supplierItemCode}
              </TruncatedText>
            </Link>
          </Flex>
          <TruncatedText maxWidth="304px" fullWidth fontSize="small" lineHeight="smallTextCompressed">
            {row.customerItemDescription}
          </TruncatedText>
        </Flex>
      ),
    },
    {
      label: "Problems and risks",
      dataKey: "problemsAndRisks",
      width: "184px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Problems and risks
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex flexWrap="wrap" gap="x0_25" px="x1" py="x0_75">
          {cellData === "At risk" && <StatusIndicator type="warning">{cellData}</StatusIndicator>}
          {cellData === "Late" && <StatusIndicator type="danger">{cellData}</StatusIndicator>}
        </Flex>
      ),
    },
    {
      label: "Priority",
      dataKey: "priority",
      width: "184px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Priority
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <TruncatedText fullWidth width="auto" maxWidth="160px" fontSize="small" lineHeight="smallTextCompressed">
            {cellData}
          </TruncatedText>
          {row.priorityDeactivated && (
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              (Deactivated)
            </Text>
          )}
        </Flex>
      ),
    },
    {
      label: "Production progress",
      dataKey: "productionProgress",
      width: "240px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Production progress
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => <Box px="x1" py="x0_75"></Box>,
    },
    {
      label: "Latest comment",
      dataKey: "lastComment",
      width: "320px",
      headerFormatter: () => (
        <Flex px="x1" pt="x1_25" pb="x0_75" gap="x0_25" alignItems="center">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Latest comment
          </Text>
          <StatusIndicator type="danger" mt="x0_5">
            Ignore
          </StatusIndicator>
        </Flex>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex px="x1" py="x0_75" flexDirection="column" gap="x0_25">
          <Link href="#" fontSize="small" lineHeight="smallTextCompressed" underline={false} color="black" hover="blue">
            <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="304px">
              {cellData}
            </TruncatedText>
          </Link>
          <TruncatedText maxWidth="242px" fullWidth fontSize="smaller" lineHeight="smallerText" color="midGrey">
            by John A. on Jan 24, 2025 at 04:00pm
          </TruncatedText>
        </Flex>
      ),
    },
    {
      label: "Collaboration status",
      dataKey: "collaborationStatus",
      width: "320px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Collaboration status
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Flex px="x1" py="x0_25" width="100%">
          {cellData === "accepted" && (
            <StatusIndicator type="quiet" mt="x0_5">
              Accepted
            </StatusIndicator>
          )}
          {cellData === "awaiting" && role === "supplier" && (
            <StatusIndicator type="warning" mt="x4" mb="x0_5">
              Awaiting your response
            </StatusIndicator>
          )}
          {cellData === "awaiting" && role === "customer" && (
            <StatusIndicator type="quiet" mt="x0_5">
              Awaiting supplier response
            </StatusIndicator>
          )}
          {cellData === "draft" && role === "supplier" && (
            <StatusIndicator type="quiet" mt="x0_5">
              Awaiting customer response
            </StatusIndicator>
          )}
          {cellData === "draft" && role === "customer" && (
            <StatusIndicator type="warning" mt="x4" mb="x0_5">
              Awaiting your response
            </StatusIndicator>
          )}
        </Flex>
      ),
    },
    {
      label: "",
      dataKey: "newRequest",
      width: "240px",
      headerFormatter: () => <Box pl="x1" pt="x1_25" pb="x0_75"></Box>,
      cellRenderer: ({ row }: { row: any }) => {
        const getLabelText = () => {
          const status = row.collaborationStatus;

          // Get the collaboration status display text
          let collaborationStatusText = "";
          if (status === "accepted") {
            collaborationStatusText = "Accepted";
          } else if (status === "awaiting") {
            if (role === "supplier") {
              collaborationStatusText = "Awaiting your response";
            } else {
              collaborationStatusText = "Awaiting Supplier response";
            }
          } else if (status === "draft") {
            if (role === "supplier") {
              collaborationStatusText = "Awaiting customer response";
            } else {
              collaborationStatusText = "Awaiting your response";
            }
          }

          // Determine label based on collaboration status text and role
          if (collaborationStatusText === "Accepted") {
            return "Accepted request";
          } else if (collaborationStatusText === "Awaiting Supplier response" && role === "customer") {
            return "Your latest request";
          } else if (collaborationStatusText === "Awaiting customer response" && role === "supplier") {
            return "Your latest proposal";
          } else if (collaborationStatusText === "Awaiting your response" && role === "supplier") {
            return "Customer's latest request";
          } else if (collaborationStatusText === "Awaiting your response" && role === "customer") {
            return "Supplier's latest proposal";
          }

          return "Your new request";
        };

        return (
          <Flex pl="x1" py="x0_25" flexDirection="column" gap="x0_5">
            {shouldShowCustomerAwaitingBox(row) && (
              <Box pl="x1" pr="x0_5" py="x0_5">
                <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold" color="midGrey">
                  Your latest request
                </Text>
              </Box>
            )}
            {shouldShowSupplierAwaitingBox(row) && (
              <Box pl="x1" pr="x0_5" py="x0_5">
                <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold" color="midGrey">
                  Your latest proposal
                </Text>
              </Box>
            )}
            <Box
              pl="x1"
              py="x0_5"
              backgroundColor={
                shouldShowCustomerAwaitingBox(row) || shouldShowSupplierAwaitingBox(row) ? "lightYellow" : "transparent"
              }
              borderRadius="medium"
            >
              <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold" color="midGrey">
                {getLabelText()}
              </Text>
            </Box>
          </Flex>
        );
      },
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "184px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75" textAlign="right">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Quantity
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex flexDirection="column" py="x0_25" gap="x0_5">
          <Box pl="x1" py="x0_5" textAlign="right" pr="x2">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {cellData}
            </Text>
          </Box>
          {shouldShowCustomerAwaitingBox(row) && (
            <Box py="x0_5" textAlign="right" pr="x2" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                35
              </Text>
            </Box>
          )}
          {shouldShowSupplierAwaitingBox(row) && (
            <Box py="x0_5" textAlign="right" pr="x2" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                50
              </Text>
            </Box>
          )}
          {shouldShowEditBox(row.id, selectedRows) && (
            <Box p="x0_5" backgroundColor="lightBlue" borderRadius="medium">
              <Input
                type="number"
                value={cellData}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
            </Box>
          )}
        </Flex>
      ),
    },
    {
      label: "UOM",
      dataKey: "uom",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            UOM
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex flexDirection="column" py="x0_25" gap="x0_5">
          <Box px="x1" py="x0_5">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {cellData}
            </Text>
          </Box>
          {shouldShowCustomerAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                eaches
              </Text>
            </Box>
          )}
          {shouldShowSupplierAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                cases
              </Text>
            </Box>
          )}
          {shouldShowEditBox(row.id, selectedRows) && (
            <Box p="x0_5" backgroundColor="lightBlue" borderRadius="medium">
              <AsyncSelect
                value={cellData}
                options={[
                  { value: "cases", label: "cases" },
                  { value: "eaches", label: "eaches" },
                  { value: "pallets", label: "pallets" },
                ]}
                onChange={(option) => {
                  console.log(option);
                }}
              />
            </Box>
          )}
        </Flex>
      ),
    },
    {
      label: "Production due date",
      dataKey: "productionDueDate",
      width: "224px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Production due date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => {
        const { formattedDate, weekNumber } = formatDateWithWeek(cellData);

        return (
          <Flex flexDirection="column" py="x0_25" gap="x0_5">
            <Flex px="x1" py="x0_5" gap="x0_5" alignItems="baseline" flexDirection="row">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                {formattedDate}
              </Text>
              <Text fontSize="smaller" lineHeight="1" color="midGrey">
                (Week {weekNumber})
              </Text>
            </Flex>
            {shouldShowCustomerAwaitingBox(row) && (
              <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
                <Text fontSize="small" lineHeight="smallTextCompressed">
                  2024-02-15
                </Text>
              </Box>
            )}
            {shouldShowSupplierAwaitingBox(row) && (
              <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
                <Text fontSize="small" lineHeight="smallTextCompressed">
                  2024-02-20
                </Text>
              </Box>
            )}
          </Flex>
        );
      },
    },
    {
      label: "Unit price",
      dataKey: "unitPrice",
      width: "184px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75" textAlign="right">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Unit price
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex flexDirection="column" py="x0_25" gap="x0_5">
          <Box px="x1" py="x0_5" textAlign="right" pr="x2">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {cellData}
            </Text>
          </Box>
          {shouldShowCustomerAwaitingBox(row) && (
            <Box py="x0_5" textAlign="right" pr="x2" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                $3.50
              </Text>
            </Box>
          )}
          {shouldShowSupplierAwaitingBox(row) && (
            <Box py="x0_5" textAlign="right" pr="x2" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                $4.25
              </Text>
            </Box>
          )}
        </Flex>
      ),
    },
    {
      label: "Currency",
      dataKey: "currency",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Currency
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex flexDirection="column" py="x0_25" gap="x0_5">
          <Box px="x1" py="x0_5">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {cellData}
            </Text>
          </Box>
          {shouldShowCustomerAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                EUR
              </Text>
            </Box>
          )}
          {shouldShowSupplierAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                CAD
              </Text>
            </Box>
          )}
        </Flex>
      ),
    },
    {
      label: "Reason",
      dataKey: "reason",
      width: "320px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Reason
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex flexDirection="column" py="x0_25" gap="x0_5">
          <Box px="x1" py="x0_5">
            <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="304px">
              {cellData}
            </TruncatedText>
          </Box>
          {shouldShowCustomerAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                Quality improvement
              </Text>
            </Box>
          )}
          {shouldShowSupplierAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                Cost optimization
              </Text>
            </Box>
          )}
        </Flex>
      ),
    },
    {
      label: "Change note",
      dataKey: "changeNote",
      width: "320px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Change note
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData, row }: { cellData: any; row: any }) => (
        <Flex flexDirection="column" py="x0_25" gap="x0_5">
          <Box px="x1" py="x0_5">
            <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="304px">
              {cellData}
            </TruncatedText>
          </Box>
          {shouldShowCustomerAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                Updated specifications
              </Text>
            </Box>
          )}
          {shouldShowSupplierAwaitingBox(row) && (
            <Box px="x1" py="x0_5" backgroundColor="lightYellow" borderRadius="medium">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                Material change required
              </Text>
            </Box>
          )}
        </Flex>
      ),
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Lot code
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="normal" color="midGrey">
            Customer's / Supplier's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // If customer lot code exists, supplier lot code must also exist
        // If only supplier lot code exists, that's allowed
        const hasCustomerLot = row.customerLotCode && row.customerLotCode !== "-";
        const hasSupplierLot = row.supplierLotCode && row.supplierLotCode !== "-";
        
        // If customer lot exists but supplier lot doesn't, show both as "-"
        if (hasCustomerLot && !hasSupplierLot) {
          return (
            <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
              <TruncatedText fullWidth width="auto" maxWidth="180px" fontSize="small" lineHeight="smallTextCompressed">
                -
              </TruncatedText>
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="180px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                -
              </TruncatedText>
            </Flex>
          );
        }
        
        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText fullWidth width="auto" maxWidth="180px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerLotCode || "-"}
            </TruncatedText>
            <TruncatedText
              fullWidth
              width="auto"
              maxWidth="180px"
              fontSize="small"
              lineHeight="smallTextCompressed"
              color="midGrey"
            >
              {row.supplierLotCode || "-"}
            </TruncatedText>
          </Flex>
        );
      },
    },
    {
      label: "BOM revision and release date",
      dataKey: "bomRevisionAndReleaseDate",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            BOM revision and release date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => {
        // Extract date from "Revision X - YYYY-MM-DD" format
        const dateMatch = cellData.match(/(\d{4}-\d{2}-\d{2})/);
        if (dateMatch) {
          const { formattedDate, weekNumber } = formatDateWithWeek(dateMatch[1]);
          return (
            <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
              <Text fontSize="small" lineHeight="smallTextCompressed">
                <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="184px">
                  {cellData}
                </TruncatedText>
              </Text>
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                {formattedDate}
              </Text>
            </Flex>
          );
        }

        // Fallback to original text if no date found
        return (
          <Flex px="x1" py="x0_75" flexDirection="column">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {cellData}
            </Text>
          </Flex>
        );
      },
    },

    {
      label: "Next production date",
      dataKey: "nextProductionDate",
      width: "152px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Next production date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => {
        const { formattedDate, weekNumber } = formatDateWithWeek(cellData);

        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {formattedDate}
            </Text>
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              (Week {weekNumber})
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Close production note",
      dataKey: "closeProductionNote",
      width: "320px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Close production note
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75">
          <TruncatedText
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={100}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              maxHeight: "32px",
              cursor: "pointer",
              /* Cross-browser fallback */
              lineHeight: "16px",
              position: "relative",
            }}
          >
            {cellData}
          </TruncatedText>
        </Box>
      ),
    },
    {
      label: "Carry over sent to",
      dataKey: "carryOverSentTo",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Carry over sent to
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Box px="x1" py="x0_75" width="100%">
          <Link href="#" underline={false} color="black" hover="blue">
            <TruncatedText
              fontSize="small"
              lineHeight="smallTextCompressed"
              maxCharacters={100}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                maxHeight: "32px",
                cursor: "pointer",
                /* Cross-browser fallback */
                lineHeight: "16px",
                height: "32px",
                position: "relative",
              }}
            >
              {row.poNumber}
            </TruncatedText>
          </Link>
        </Box>
      ),
    },
    {
      label: "Need by date",
      dataKey: "needByDate",
      width: "152px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Need by date
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => {
        const { formattedDate, weekNumber } = formatDateWithWeek(cellData);

        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <Text fontSize="small" lineHeight="smallTextCompressed">
              {formattedDate}
            </Text>
            <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
              (Week {weekNumber})
            </Text>
          </Flex>
        );
      },
    },
    {
      label: "Ship to",
      dataKey: "shipTo",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Ship to
          </Text>
        </Box>
      ),
      cellRenderer: ({ cellData }: { cellData: any }) => (
        <Box px="x1" py="x0_75" width="100%">
          <TruncatedText
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={100}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              maxHeight: "32px",
              cursor: "pointer",
              /* Cross-browser fallback */
              lineHeight: "16px",
              position: "relative",
            }}
          >
            {cellData}
          </TruncatedText>
        </Box>
      ),
    },
  ];

  // Create rows with combined PO line item data
  const compactRows = poliRows.map((row) => ({
    ...row,
    combinedPoLineItem: `${row.poLineItemNumber}\n${row.supplierPoLineItemNumber}`,
    rowClassName: isRowCanceled(row) ? "canceled-row" : undefined,
    disabled: isRowCanceled(row), // Disable canceled rows
  }));

  // Create a filtered list of selectable rows (excluding canceled rows)
  const selectableRows = compactRows.filter((row) => !isRowCanceled(row));

  // Saved View 1 Configuration Data
  const savedView1Data = [
    {
      id: 1,
      isEditable: true,
      columnLabel: "PO number",
      database: "OrdersDB",
      databaseTable: "PurchaseOrders",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 2,
      isEditable: true,
      columnLabel: "Customer's/Supplier's PO line item number",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 3,
      isEditable: true,
      columnLabel: "Status",
      database: "StatusDB",
      databaseTable: "Statuses",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 4,
      isEditable: true,
      columnLabel: "Creation date",
      database: "OrdersDB",
      databaseTable: "Orders",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 5,
      isEditable: true,
      columnLabel: "Customer",
      database: "CustomersDB",
      databaseTable: "Customers",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 6,
      isEditable: true,
      columnLabel: "Customer's item code and description",
      database: "MaterialsDB",
      databaseTable: "Items",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 7,
      isEditable: true,
      columnLabel: "Problems and risks",
      database: "IssuesDB",
      databaseTable: "Risks",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 8,
      isEditable: true,
      columnLabel: "Priority",
      database: "PriorityDB",
      databaseTable: "Priorities",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 9,
      isEditable: true,
      columnLabel: "Production progress",
      database: "ProductionDB",
      databaseTable: "ProgressTracking",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 10,
      isEditable: true,
      columnLabel: "Latest comment",
      database: "CommentsDB",
      databaseTable: "Comments",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 11,
      isEditable: true,
      columnLabel: "Collaboration status",
      database: "CollaborationDB",
      databaseTable: "Statuses",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 12,
      isEditable: true,
      columnLabel: "Quantity",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 13,
      isEditable: true,
      columnLabel: "UOM",
      database: "MaterialsDB",
      databaseTable: "UnitsOfMeasure",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 14,
      isEditable: true,
      columnLabel: "Production due date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 15,
      isEditable: true,
      columnLabel: "Unit price",
      database: "PricingDB",
      databaseTable: "ItemPrices",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 16,
      isEditable: true,
      columnLabel: "Currency",
      database: "FinancialDB",
      databaseTable: "Currencies",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 17,
      isEditable: true,
      columnLabel: "Reason",
      database: "GeneralDB",
      databaseTable: "Reasons",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 18,
      isEditable: true,
      columnLabel: "Change note",
      database: "CollaborationDB",
      databaseTable: "ChangeNotes",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 19,
      isEditable: true,
      columnLabel: "LOT code and expiry date",
      database: "InventoryDB",
      databaseTable: "LotCodes",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 20,
      isEditable: true,
      columnLabel: "BOM revision and release date",
      database: "BOMDB",
      databaseTable: "BOMRevisions",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 21,
      isEditable: true,
      columnLabel: "Next production date",
      database: "ProductionDB",
      databaseTable: "Schedules",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 22,
      isEditable: true,
      columnLabel: "Close production note",
      database: "ProductionDB",
      databaseTable: "ProductionNotes",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 23,
      isEditable: true,
      columnLabel: "Carry over sent to",
      database: "LogisticsDB",
      databaseTable: "CarryOver",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 24,
      isEditable: true,
      columnLabel: "Need by date",
      database: "OrdersDB",
      databaseTable: "OrderLines",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 25,
      isEditable: true,
      columnLabel: "Ship to",
      database: "LogisticsDB",
      databaseTable: "ShippingAddresses",
      filterVisible: true,
      isEdited: false,
    },
    {
      id: 26,
      isEditable: true,
      columnLabel: "Tags",
      database: "TagsDB",
      databaseTable: "Tags",
      filterVisible: true,
      isEdited: false,
    },
  ];

  const DEFAULT_ROWS_COUNT = 25;
  const isDefaultRow = (rowId: number) => rowId <= DEFAULT_ROWS_COUNT;
  const isCustomRow = (rowId: number) => rowId > DEFAULT_ROWS_COUNT;

  const getFilterVisibility = (rowId: number, defaultValue: boolean) => {
    return filterVisibilityStates[rowId] !== undefined ? filterVisibilityStates[rowId] : defaultValue;
  };

  const toggleFilterVisibility = (rowId: number) => {
    setFilterVisibilityStates((prev) => ({
      ...prev,
      [rowId]: !getFilterVisibility(rowId, savedView1Data.find((row) => row.id === rowId)?.filterVisible || true),
    }));
  };

  // Helper functions for saved view 1
  const handleSavedView1InputChange = (id: number, field: string, value: any) => {
    // Placeholder implementation
  };

  const handleSavedView1ToggleChange = (id: number, field: string) => {
    // Placeholder implementation
  };

  const handleSavedView1Clear = (id: number) => {
    // Placeholder implementation
  };

  const handleRowFocus = (id: number, setFocusedRowId: (id: number | null) => void) => {
    setFocusedRowId(id);
  };

  const handleRowBlur = (
    id: number,
    data: any[],
    setFocusedRowId: (id: number | null) => void,
    setValidationErrors: (errors: any) => void
  ) => {
    setFocusedRowId(null);
  };

  const loadOptions = () => {
    return Promise.resolve([
      { value: "db1", label: "Database Option 1" },
      { value: "db2", label: "Database Option 2" },
    ]);
  };

  // LOT codes filter handlers
  const handleLotCodesChange = (selectedValues: any) => {
    setLotCodes(selectedValues || []);
  };

  const loadLotCodes = async (inputValue: string) => {
    // Mock data for LOT codes
    const mockLotCodes = [
      { value: "CUST001-SUP001", label: "CUST001 - SUP001\n2024-12-31" },
      { value: "CUST002-SUP002", label: "CUST002 - SUP002\n2024-11-15" },
      { value: "CUST003-SUP003", label: "CUST003 - SUP003\n2024-10-20" },
    ];

    return mockLotCodes.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadCustomerLotCodes = async (inputValue: string) => {
    const mockCustomerLotCodes = [
      { value: "LOT-2024-001", label: "LOT-2024-001" },
      { value: "LOT-2024-002", label: "LOT-2024-002" },
    ];

    return mockCustomerLotCodes.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  const loadSupplierLotCodes = async (inputValue: string) => {
    const mockSupplierLotCodes = [
      { value: "SUP-LOT-001", label: "SUP-LOT-001" },
    ];

    return mockSupplierLotCodes.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  // Modal footer content
  const savedView1ModalFooter = (
    <Flex alignItems="center" justifyContent="space-between" gap="x3">
      <ButtonGroup>
        <PrimaryButton onClick={() => setIsSavedView1ModalOpen(false)}>Save</PrimaryButton>
        <QuietButton
          onClick={() => {
            setIsSavedView1ModalOpen(false);
          }}
        >
          Cancel
        </QuietButton>
      </ButtonGroup>
      <QuietButton onClick={() => {}}>Delete custom view</QuietButton>
    </Flex>
  );

  const savedView1TableColumns = [
    {
      key: "orderNumber",
      label: "",
      cellRenderer: ({ row }: { row: any }) => {
        if (isDefaultRow(row.id)) {
          // Show row number for default rows
          const formattedNumber = row.id < 10 ? `0${row.id}` : row.id;
          return (
            <Text color="midGrey" fontSize="small" lineHeight="small" mx="x1" my="x1">
              {formattedNumber}
            </Text>
          );
        } else {
          // Show row number for custom rows (continuing the sequence)
          const formattedNumber = row.id < 10 ? `0${row.id}` : row.id;
          return (
            <Text color="midGrey" fontSize="small" lineHeight="small" mx="x1" my="x1">
              {formattedNumber}
            </Text>
          );
        }
      },
      width: "3%",
    },
    {
      key: "columnLabel",
      label: "Column label",
      cellRenderer: ({ row }) => {
        let content;
        if (isDefaultRow(row.id)) {
          const isGrayedOut = row.id === 19 && isLotCodeHidden;
          content = (
            <Flex alignItems="center" gap="x1" py="x1">
              <Text color={isGrayedOut ? "midGrey" : "black"}>{row.columnLabel}</Text>
              {row.isEditable && row.id !== 19 && <Icon icon="lock" size="x2_5" color="midGrey" />}
            </Flex>
          );
        } else {
          const hasError = savedView1ValidationErrors[row.id]?.columnLabel;
          content = (
            <Box py="x1" pr="x1" minWidth="8em" width="100%" data-row-id={row.id} pb={hasError ? "x1" : "x1"}>
              <Input
                value={row.columnLabel}
                onChange={(e) => handleSavedView1InputChange(row.id, "columnLabel", e.target.value)}
                onFocus={() => handleRowFocus(row.id, setSavedView1FocusedRowId)}
                onBlur={() =>
                  handleRowBlur(row.id, savedView1Data, setSavedView1FocusedRowId, setSavedView1ValidationErrors)
                }
                placeholder="Enter custom label"
                error={hasError}
                errorMessage={hasError}
              />
            </Box>
          );
        }
        return content;
      },
      width: "50%",
    },
    {
      key: "actions",
      label: "Visibility",
      width: "5%",
      cellRenderer: ({ row }) => {
        if (isDefaultRow(row.id)) {
          // All default rows get a toggle, but only LOT code is enabled
          const isEnabled = row.id === 19;
          const isToggled = row.id === 19 ? !isLotCodeHidden : true;

          return (
            <Box py="half">
              <Toggle
                toggled={isToggled}
                onChange={() => {
                  if (isEnabled) {
                    setIsLotCodeHidden(!isLotCodeHidden);
                  }
                }}
                disabled={!isEnabled}
              />
            </Box>
          );
        }
        return null;
      },
    },
  ];

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
          .main-table-container tr {border-bottom: solid 1px #e4e7eb;} /* Needed because of Table bug - RowBorder not working */
          .main-table-container td, th {vertical-align: top;} /* Needed because of Table bug - verticalAlignment not working */
          .main-table-container th{padding-top: 0px !important; padding-bottom: 0px !important;} /* Needed because of Table bug - no compact header version */
          .main-table-container table td:nth-child(4),
          .main-table-container table th:nth-child(4) {
            border-left: 1px solid #E0E0E0 !important;
          }
          .main-table-container table td:nth-child(10),
          .main-table-container table th:nth-child(10) {
            border-left: 1px solid #E0E0E0 !important;
          }
          /* Style for canceled rows */
          .main-table-container tr.canceled-row {
            background-color: #F9FAFB !important;
          }
          .main-table-container tr.canceled-row td {
            color: #6B7280 !important;
          }
          /* Keep links clickable and styled normally */
          .main-table-container tr.canceled-row a {
            color: #000000 !important;
            pointer-events: auto;
          }
          /* Disable checkbox for canceled rows */
          .main-table-container tr.canceled-row input[type="checkbox"] {
            pointer-events: none;
            opacity: 0.5;
          }
        `}
      </style>
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
            <DropdownMenu
              trigger={() => (
                <IconicButton icon="tune">
                  {selectedView === "Default view" ? "Custom view" : `Custom view: ${selectedView}`}
                </IconicButton>
              )}
            >
              <DropdownButton onClick={() => setSelectedView("Default view")}>
                <Flex alignItems="center" justifyContent="space-between" gap="x3">
                  <Text>Default view</Text>
                </Flex>
              </DropdownButton>
              <DropdownButton onClick={() => setSelectedView("Saved view 1")}>
                <Flex alignItems="center" justifyContent="space-between" gap="x3">
                  <Text>Saved view 1</Text>
                  <Flex alignItems="center">
                    <QuietButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSavedView1ModalOpen(true);
                      }}
                    >
                      Config
                    </QuietButton>
                  </Flex>
                </Flex>
              </DropdownButton>
              <DropdownButton onClick={() => setSelectedView("Saved view 2")}>
                <Flex alignItems="center" justifyContent="space-between" gap="x3">
                  <Text>Saved view 2</Text>
                  <Flex alignItems="center">
                    <QuietButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSavedView2ModalOpen(true);
                      }}
                    >
                      Config
                    </QuietButton>
                  </Flex>
                </Flex>
              </DropdownButton>
              <Divider my="x1" />
              <DropdownButton onClick={() => setIsCreateNewViewModalOpen(true)}>
                <Flex alignItems="center" justifyContent="space-between" gap="x3">
                  <Text>Create new view</Text>
                </Flex>
              </DropdownButton>
            </DropdownMenu>
            <VerticalDivider />
            <IconicButton icon="filter" aria-label="Filters" onClick={() => setIsFilterSidebarOpen(true)}>
              Filters
            </IconicButton>
          </Flex>
        </Flex>
        <Box width="100%" overflowX="auto">
          <Box width="5100px">
            <Box className="main-table-container">
              <Table
                columns={compactColumns}
                rows={compactRows}
                hasSelectableRows
                selectedRows={selectedRows}
                onRowSelectionChange={handleRowSelectionChange}
                compact
                rowBorder
              />
            </Box>
          </Box>
        </Box>
      </Page>

      {/* Filter Sidebar */}
      <Sidebar 
        isOpen={isFilterSidebarOpen} 
        onClose={() => setIsFilterSidebarOpen(false)} 
        title="Filters" 
        width="xs"
        footer={
          <Flex gap="x2">
            <PrimaryButton onClick={() => setIsFilterSidebarOpen(false)}>
              Apply
            </PrimaryButton>
            <QuietButton 
              onClick={() => {
                setCustomerLotCodes([]);
                setSupplierLotCodes([]);
              }}
            >
              Clear
            </QuietButton>
          </Flex>
        }
      >
        <Flex flexDirection="column" gap="x3">
          <Box>
            <AsyncSelect
              labelText="Customer's lot codes"
              placeholder="Start typing"
              loadOptions={loadCustomerLotCodes}
              multiselect
              value={customerLotCodes}
              onChange={handleCustomerLotCodesChange}
            />
          </Box>

          <Box>
            <AsyncSelect
              labelText="Supplier's lot codes"
              placeholder="Start typing"
              loadOptions={loadSupplierLotCodes}
              multiselect
              value={supplierLotCodes}
              onChange={handleSupplierLotCodesChange}
            />
          </Box>
        </Flex>
      </Sidebar>

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

      {/* Saved View 1 Modal */}
      <Modal
        isOpen={isSavedView1ModalOpen}
        onRequestClose={() => setIsSavedView1ModalOpen(false)}
        title="Saved view 1 configuration"
        maxWidth="976px"
        footerContent={savedView1ModalFooter}
      >
        <Box mb="x4">
          <Heading3 mb="x3">Details</Heading3>
          <Flex gap="x3">
            <Input
              mb="x3"
              labelText="Title"
              helpText="The title is used to identify the view throughout the application."
              placeholder="Enter custom view title"
              value={savedView1Title}
              onChange={(e) => setSavedView1Title(e.target.value)}
              requirementText="(Required)"
            />
            <Toggle mt="x6" onText="Set as default view" offText="Not set as default view" onChange={() => {}} />
          </Flex>
          <Box>
            <Textarea
              labelText="Description"
              placeholder="Enter custom view description"
              value={savedView1Description}
              onChange={(e) => setSavedView1Description(e.target.value)}
            />
          </Box>
        </Box>

        <Box>
          <Heading3 mb="x1">Configuration</Heading3>
          <Table rows={savedView1Data} columns={savedView1TableColumns} compact rowHovers={false} rowBorder={false} />
        </Box>
      </Modal>

      {/* Saved View 2 Modal */}
      <Modal
        isOpen={isSavedView2ModalOpen}
        onRequestClose={() => setIsSavedView2ModalOpen(false)}
        title="Saved view 2 configuration"
      >
        <Box p="x3">
          <Text>Saved view 2 configuration content</Text>
        </Box>
        <Flex mt="x3" justifyContent="flex-end" gap="x2">
          <Button onClick={() => setIsSavedView2ModalOpen(false)}>Cancel</Button>
          <PrimaryButton onClick={() => setIsSavedView2ModalOpen(false)}>Save</PrimaryButton>
        </Flex>
      </Modal>

      {/* Create New View Modal */}
      <Modal
        isOpen={isCreateNewViewModalOpen}
        onRequestClose={() => setIsCreateNewViewModalOpen(false)}
        title="Create new view"
      >
        <Box p="x3">
          <Text>Create new view content</Text>
        </Box>
        <Flex mt="x3" justifyContent="flex-end" gap="x2">
          <Button onClick={() => setIsCreateNewViewModalOpen(false)}>Cancel</Button>
          <PrimaryButton onClick={() => setIsCreateNewViewModalOpen(false)}>Create</PrimaryButton>
        </Flex>
      </Modal>

      <ToastContainer />
    </ApplicationFrame>
  );
};
