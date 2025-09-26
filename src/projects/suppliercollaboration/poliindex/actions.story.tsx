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
  Button,
  ButtonGroup,
  DropdownMenu,
  DropdownButton,
  DropdownItem,
  DropdownLink,
  Modal,
  ToastContainer,
  Divider,
  QuietButton,
  PrimaryButton,
} from "../../..";
import { AppTag } from "../../../AppTag";
import { poliRows, shouldShowEditBox } from "../utils/poliTableData";
import { formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI index/Actions",
};

export const Actions = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [role, setRole] = useState("supplier");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [poLineItemNumbers, setPoLineItemNumbers] = useState<string[]>([]);
  const [onlyBlankSupplierPo, setOnlyBlankSupplierPo] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [creationDateRange, setCreationDateRange] = useState({ startDate: null, endDate: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedItemsCount, setEditedItemsCount] = useState(0);

  const handleRowSelectionChange = (selectedRowIds: string[]) => {
    setSelectedRows(selectedRowIds);
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

  const shouldShowCustomerAwaitingBox = (row: any) => {
    if (role !== "customer") return false;
    const status = row.collaborationStatus;
    if (status === "draft") {
      return true;
    }
    return false;
  };

  const shouldShowSupplierAwaitingBox = (row: any) => {
    if (role !== "supplier") return false;
    const status = row.collaborationStatus;
    if (status === "awaiting") {
      return true;
    }
    return false;
  };

  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="#">Home</Link>
    </Breadcrumbs>
  );

  // Create compact columns with actions
  const compactColumns = [
    {
      label: "",
      dataKey: "comments",
      width: "40px",
      headerFormatter: () => (
        <Box width="100%" textAlign="center" px="x0_5" py="x1">
          <Text fontSize="small" fontWeight="bold">
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
          <Text fontSize="small" fontWeight="bold">
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
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
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
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
            PO line item number
          </Text>
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="normal" color="midGrey">
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
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
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
            <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
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
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
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
      label: "Actions",
      dataKey: "actions",
      width: "120px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
            Actions
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Box px="x1" py="x0_75">
          <DropdownMenu>
            <DropdownButton size="small">
              <Icon icon="more" size="x2" />
            </DropdownButton>
            <DropdownItem onClick={() => console.log("Edit", row.id)}>
              <Icon icon="edit" size="x2" />
              Edit
            </DropdownItem>
            <DropdownItem onClick={() => console.log("View details", row.id)}>
              <Icon icon="visibility" size="x2" />
              View details
            </DropdownItem>
            <DropdownItem onClick={() => console.log("Duplicate", row.id)}>
              <Icon icon="copy" size="x2" />
              Duplicate
            </DropdownItem>
            <DropdownItem onClick={() => setIsModalOpen(true)}>
              <Icon icon="delete" size="x2" />
              Delete
            </DropdownItem>
          </DropdownMenu>
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
      <ToastContainer />
      <Header breakpoints={{ medium: 1200 }} renderBreadcrumbs={() => breadcrumbs} title="PO line items" />
      <Page>
        {/* Actions Bar - Shows bulk actions when rows selected, otherwise shows regular actions */}
        <Flex justifyContent="space-between" alignItems="center" mb="x3">
          {selectedRows.length > 0 ? (
            <>
              {/* Left group - Selection info and deselect */}
              <Flex alignItems="center" gap="x2">
                {isEditMode ? (
                  <>
                    <Text fontSize="small" color="midGrey">
                      {selectedRows.length} item{selectedRows.length !== 1 ? "s" : ""} selected
                    </Text>
                    <Text fontSize="small" color="midGrey">
                      {" "}
                      •{" "}
                    </Text>
                    <Text fontSize="small" color="midGrey">
                      {editedItemsCount} item{editedItemsCount !== 1 ? "s" : ""} edited
                    </Text>
                    <QuietButton size="small" onClick={() => setEditedItemsCount(0)}>
                      Discard all edits
                    </QuietButton>
                  </>
                ) : (
                  <>
                    <Text fontSize="small" color="midGrey">
                      {selectedRows.length} item{selectedRows.length !== 1 ? "s" : ""} selected
                    </Text>
                    <QuietButton size="small" onClick={() => setSelectedRows([])}>
                      Deselect all
                    </QuietButton>
                  </>
                )}
              </Flex>
              {/* Right group - Actions */}
              <Flex gap="x2" alignItems="center">
                {isEditMode ? (
                  <>
                    <QuietButton onClick={() => setIsEditMode(false)}>Quit editing</QuietButton>
                    <PrimaryButton
                      onClick={() => {
                        setBulkAction("save");
                        setIsEditMode(false);
                        setEditedItemsCount(0);
                      }}
                    >
                      Save
                    </PrimaryButton>
                  </>
                ) : (
                  <>
                    <IconicButton
                      icon="check"
                      onClick={() => setBulkAction("accept")}
                      aria-label="Accept PO line item(s)"
                    >
                      Accept PO line item(s)
                    </IconicButton>
                    <IconicButton
                      icon="close"
                      onClick={() => setBulkAction("cancel")}
                      aria-label="Cancel PO line item(s)"
                    >
                      Cancel PO line item(s)
                    </IconicButton>
                    <IconicButton
                      icon="edit"
                      onClick={() => {
                        setBulkAction("edit");
                        setIsEditMode(true);
                        setEditedItemsCount(selectedRows.length);
                      }}
                      aria-label="Edit PO line item(s)"
                    >
                      Edit PO line item(s)
                    </IconicButton>
                    <VerticalDivider />
                    <DropdownMenu>
                      <DropdownButton size="small">More actions</DropdownButton>
                      <DropdownItem onClick={() => setBulkAction("export")}>
                        <Icon icon="getApp" size="x2" />
                        Export
                      </DropdownItem>
                      <DropdownItem onClick={() => setBulkAction("duplicate")}>
                        <Icon icon="copy" size="x2" />
                        Duplicate
                      </DropdownItem>
                      <DropdownItem onClick={() => setBulkAction("delete")}>
                        <Icon icon="delete" size="x2" />
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </>
                )}
              </Flex>
            </>
          ) : (
            <Flex justifyContent="flex-end" gap="x2" alignItems="center" width="100%">
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
          )}
        </Flex>
        <Box width="100%" overflowX="auto">
          <Box width="1000px">
            <style>
              {`
                tr {border-bottom: solid 1px #e4e7eb;}
                td, th {vertical-align: top;}
                th{padding-top: 0px !important; padding-bottom: 0px !important;}
                table td:nth-child(4),
                table th:nth-child(4) {
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
            <Select
              labelText="Priorities"
              placeholder="Select"
              options={priorityOptions}
              multiselect
              value={priorities}
              onChange={handlePrioritiesChange}
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalOpen} title="Delete PO Line Item" maxWidth="400px">
        <Box p="x4">
          <Text>Are you sure you want to delete this PO line item? This action cannot be undone.</Text>
        </Box>
        <ButtonGroup>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button
            onClick={() => setIsModalOpen(false)}
            style={{ backgroundColor: "#d32f2f", color: "white", borderColor: "#d32f2f" }}
          >
            Delete
          </Button>
        </ButtonGroup>
      </Modal>

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
