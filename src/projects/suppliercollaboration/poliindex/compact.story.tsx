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
  Text,
  Icon,
  StatusIndicator,
  TruncatedText,
  Sidebar,
  Checkbox,
  DateRange,
  Tooltip,
} from "../../..";
import { AppTag } from "../../../AppTag";
import { poliRows, shouldShowEditBox } from "../utils/poliTableData";
import { formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI index/Compact",
};

export const Compact = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [role, setRole] = useState("supplier");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [poLineItemNumbers, setPoLineItemNumbers] = useState<string[]>([]);
  const [onlyBlankSupplierPo, setOnlyBlankSupplierPo] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [creationDateRange, setCreationDateRange] = useState({ startDate: null, endDate: null });

  const handleRowSelectionChange = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
  };

  const handlePoLineItemNumbersChange = (selectedValues: any) => {
    setPoLineItemNumbers(selectedValues || []);
  };

  const handleItemsChange = (selectedValues: any) => {
    setItems(selectedValues || []);
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
  }));

  return (
    <ApplicationFrame>
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
            <VerticalDivider />
            <IconicButton icon="filter" aria-label="Filters" onClick={() => setIsFilterSidebarOpen(true)}>
              Filters
            </IconicButton>
          </Flex>
        </Flex>
        <Box width="100%" overflowX="auto">
          <Box width="4940px">
            <style>
              {`
                tr {border-bottom: solid 1px #e4e7eb;} /* Needed because of Table bug - RowBorder not working */
                td, th {vertical-align: top;} /* Needed because of Table bug - verticalAlignment not working */
                th{padding-top: 0px !important; padding-bottom: 0px !important;} /* Needed because of Table bug - no compact header version */
                table td:nth-child(4),
                table th:nth-child(4) {
                  border-left: 1px solid #E0E0E0 !important;
                }
                table td:nth-child(9),
                table th:nth-child(9) {
                  border-left: 1px solid #E0E0E0 !important;
                }
              `}
            </style>
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
      </Page>

      {/* Filter Sidebar */}
      <Sidebar isOpen={isFilterSidebarOpen} onClose={() => setIsFilterSidebarOpen(false)} title="Filters" width="xs">
        <Flex flexDirection="column" gap="x3">
          <Box>
            <AsyncSelect
              labelText="PO line item number"
              helpText="Search by customer's or supplier's PO line item item number"
              placeholder="Start typing"
              loadOptions={loadPoLineItemNumbers}
              multiselect
              value={poLineItemNumbers}
              onChange={handlePoLineItemNumbersChange}
            />
            <Checkbox
              checked={onlyBlankSupplierPo}
              onChange={(e) => setOnlyBlankSupplierPo(e.target.checked)}
              labelText="Only line items with a blank supplier PO line item number"
            />
          </Box>
          <Box>
            <AsyncSelect
              labelText="Item"
              helpText="Search by customer's or supplier's item code, or item description"
              placeholder="Start typing"
              loadOptions={loadItems}
              multiselect
              value={items}
              onChange={handleItemsChange}
            />
          </Box>
          <Box>
            <DateRange
              labelProps={{
                labelText: "Creation date range",
              }}
              startDateInputProps={{
                placeholder: "YYYY-Mon-DD",
                inputWidth: "168px",
              }}
              endDateInputProps={{
                placeholder: "YYYY-Mon-DD",
                inputWidth: "168px",
              }}
              onRangeChange={handleCreationDateRangeChange}
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
    </ApplicationFrame>
  );
};
