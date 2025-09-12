import React, { useState } from "react";
import { toast, Tooltip, ControlIcon } from "../../..";
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
  SummaryDivider,
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
} from "../../..";
import { formatDateToYYYYMonDD, formatDateWithWeek } from "../utils/dateUtils";

export default {
  title: "Projects/Supplier Collaboration/POLI lot/Details 3",
};

const primaryMenu = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "POLI",
    href: "/poli",
  },
  {
    name: "Lots",
    href: "/poli/lots",
  },
];

const secondaryMenu = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Settings",
    href: "/settings",
  },
  {
    name: "Logout",
    href: "/",
  },
];

export const Details3 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showExpectedSidebar, setShowExpectedSidebar] = useState(false);
  const [showActualSidebar, setShowActualSidebar] = useState(false);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [expectedRecord, setExpectedRecord] = useState({
    date: "",
    uom: "",
    expectedQuantity: "",
  });
  const [actualRecord, setActualRecord] = useState({
    date: "",
    uom: "",
    actualQuantity: "",
    lotCode: "",
    expiryDate: "",
    note: "",
  });

  const uomOptions = [
    { label: "Cases", value: "cases" },
    { label: "Pallets", value: "pallets" },
    { label: "Units", value: "units" },
    { label: "Pounds", value: "pounds" },
    { label: "Kilograms", value: "kilograms" },
  ];

  const productionRecordsData = [
    {
      id: "1",
      date: "2025-Feb-12",
      expectedQuantity: "10 cases",
      actualQuantity: "10 cases",
      expandedContent: () => {
        const nestedTableData = [
          {
            id: "nested-1-1",
            actualQuantity: "5 cases",
            lotCode: "LOT-2025-001",
            expiryDate: "2026-02-12",
            note: "First batch production completed successfully",
          },
          {
            id: "nested-1-2",
            actualQuantity: "3 cases",
            lotCode: "LOT-2025-002",
            expiryDate: "2026-02-13",
            note: "Second batch with improved quality control measures",
          },
          {
            id: "nested-1-3",
            actualQuantity: "2 cases",
            lotCode: "LOT-2025-003",
            expiryDate: "2026-02-14",
            note: "Final batch with minor adjustments to packaging",
          },
        ];

        const nestedTableColumns = [
          {
            label: "Quantity",
            dataKey: "actualQuantity",
            width: "150px",
          },
          {
            label: "Lot code",
            dataKey: "lotCode",
            width: "150px",
          },
          {
            label: "Expiry date",
            dataKey: "expiryDate",
            width: "150px",
          },
          {
            label: "Note",
            dataKey: "note",
            width: "auto",
          },
        ];

        return (
          <Table
            columns={nestedTableColumns}
            rows={nestedTableData}
            keyField="id"
            compact={true}
            rowBorder={true}
          />
        );
      },
    },
    {
      id: "2",
      date: "2025-Feb-13",
      expectedQuantity: "12 cases",
      actualQuantity: "12 cases",
      expandedContent: () => {
        const nestedTableData = [
          {
            id: "nested-2-1",
            actualQuantity: "8 cases",
            lotCode: "LOT-2025-004",
            expiryDate: "2026-02-15",
            note: "High volume production run with enhanced efficiency",
          },
          {
            id: "nested-2-2",
            actualQuantity: "4 cases",
            lotCode: "LOT-2025-005",
            expiryDate: "2026-02-16",
            note: "Secondary batch with quality improvements",
          },
        ];

        const nestedTableColumns = [
          {
            label: "Quantity",
            dataKey: "actualQuantity",
            width: "150px",
          },
          {
            label: "Lot code",
            dataKey: "lotCode",
            width: "150px",
          },
          {
            label: "Expiry date",
            dataKey: "expiryDate",
            width: "150px",
          },
          {
            label: "Note",
            dataKey: "note",
            width: "auto",
          },
        ];

        return (
          <Table
            columns={nestedTableColumns}
            rows={nestedTableData}
            keyField="id"
            compact={true}
            rowBorder={true}
          />
        );
      },
    },
    {
      id: "3",
      date: "2025-Feb-14",
      expectedQuantity: "25 cases",
      actualQuantity: "20 cases",
      expandedContent: () => {
        const nestedTableData = [
          {
            id: "nested-3-1",
            actualQuantity: "15 cases",
            lotCode: "LOT-2025-006",
            expiryDate: "2026-02-17",
            note: "Large scale production with automated systems",
          },
          {
            id: "nested-3-2",
            actualQuantity: "5 cases",
            lotCode: "LOT-2025-007",
            expiryDate: "2026-02-18",
            note: "Additional batch to meet increased demand",
          },
        ];

        const nestedTableColumns = [
          {
            label: "Quantity",
            dataKey: "actualQuantity",
            width: "150px",
          },
          {
            label: "Lot code",
            dataKey: "lotCode",
            width: "150px",
          },
          {
            label: "Expiry date",
            dataKey: "expiryDate",
            width: "150px",
          },
          {
            label: "Note",
            dataKey: "note",
            width: "auto",
          },
        ];

        return (
          <Table
            columns={nestedTableColumns}
            rows={nestedTableData}
            keyField="id"
            compact={true}
            rowBorder={true}
          />
        );
      },
    },
    {
      id: "4",
      date: "2025-Aug-08",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
    },
  ];

  const productionRecordsColumns = [
    {
      label: "Date",
      dataKey: "date",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // If this is an expanded content row, render the expanded content spanning all columns
        if (row.isExpandedContent) {
          return (
            <Box style={{ 
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ddd",
              padding: "8px",
              marginTop: "8px"
            }}>
              {row.expandedContent()}
            </Box>
          );
        }
        return row.date;
      },
      cellProps: ({ row }: { row: any }) => {
        // If this is an expanded content row, make it span all 5 columns
        if (row.isExpandedContent) {
          return { colSpan: 5 };
        }
        return {};
      },
    },
    {
      label: "Expected quantity",
      dataKey: "expectedQuantity",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // If this is an expanded content row, don't render anything (content spans all columns)
        if (row.isExpandedContent) {
          return null;
        }
        return row.expectedQuantity;
      },
      cellProps: ({ row }: { row: any }) => {
        // If this is an expanded content row, don't render this cell (spanned by first column)
        if (row.isExpandedContent) {
          return { style: { display: 'none' } };
        }
        return {};
      },
    },
    {
      label: "Actual quantity",
      dataKey: "actualQuantity",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
        // If this is an expanded content row, don't render anything (content spans all columns)
        if (row.isExpandedContent) {
          return null;
        }
        return row.actualQuantity;
      },
      cellProps: ({ row }: { row: any }) => {
        // If this is an expanded content row, don't render this cell (spanned by first column)
        if (row.isExpandedContent) {
          return { style: { display: 'none' } };
        }
        return {};
      },
    },
    {
      label: "",
      dataKey: "spacer",
      width: "auto",
      headerFormatter: () => null,
      cellFormatter: (props: { row: any }) => {
        // Don't show expand/collapse button for expanded content rows
        if (props.row.isExpandedContent) {
          return null;
        }
        
        // Only show expand/collapse button for rows with expandedContent
        if (!props.row.expandedContent) {
          return null;
        }
        
        const isExpanded = expandedRows.includes(props.row.id);
        
        return (
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <ControlIcon
              icon={isExpanded ? "upArrow" : "downArrow"}
              label={isExpanded ? "Collapse row" : "Expand row"}
              onClick={() => {
                setExpandedRows(prev => 
                  prev.includes(props.row.id) 
                    ? prev.filter(id => id !== props.row.id)
                    : [...prev, props.row.id]
                );
              }}
            />
          </Box>
        );
      },
      cellProps: ({ row }: { row: any }) => {
        // If this is an expanded content row, don't render this cell (spanned by first column)
        if (row.isExpandedContent) {
          return { style: { display: 'none' } };
        }
        return {};
      },
    },
    {
      label: "",
      dataKey: "actions",
      width: "56px",
      headerFormatter: () => null,
      cellFormatter: (props: { row: any }) => {
        // Don't show actions for expanded content rows
        if (props.row.isExpandedContent) {
          return null;
        }
        
        return (
          <DropdownMenu 
            trigger={() => <IconicButton icon="more" aria-label="More actions" />}
            placement="bottom-end"
          >
            <DropdownButton onClick={() => setShowExpectedSidebar(true)}>Edit expected production details</DropdownButton>
            <DropdownButton onClick={() => setShowActualSidebar(true)}>Edit actual production details</DropdownButton>
            <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
          </DropdownMenu>
        );
      },
      cellProps: ({ row }: { row: any }) => {
        // If this is an expanded content row, don't render this cell (spanned by first column)
        if (row.isExpandedContent) {
          return { style: { display: 'none' } };
        }
        return {};
      },
    }
  ];

  const handleExpectedProduction = () => {
    setShowExpectedSidebar(true);
  };

  const handleActualProduction = () => {
    setShowActualSidebar(true);
  };

  const handleCloseExpectedSidebar = () => {
    setShowExpectedSidebar(false);
    setExpectedRecord({
      date: "",
      uom: "",
      expectedQuantity: "",
    });
  };

  const handleCloseActualSidebar = () => {
    setShowActualSidebar(false);
    setActualRecord({
      date: "",
      uom: "",
      actualQuantity: "",
      lotCode: "",
      expiryDate: "",
      note: "",
    });
  };

  const handleExpectedFieldChange = (field: string, value: string) => {
    setExpectedRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleActualFieldChange = (field: string, value: string) => {
    setActualRecord(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveExpected = () => {
    console.log("Saving expected production record:", expectedRecord);
    toast.success("Expected production record added successfully");
    handleCloseExpectedSidebar();
  };

  const handleSaveActual = () => {
    console.log("Saving actual production record:", actualRecord);
    toast.success("Actual production record added successfully");
    handleCloseActualSidebar();
  };

  return (
    <ApplicationFrame navBar={<BrandedNavBar menuData={{ primaryMenu, secondaryMenu }} />}>
      <Page>

        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab id="overview" label="Overview">
            <Box p="x4">
              <Card>
                <Box p="x4">
                  <Heading4>POLI Lot Details</Heading4>
                  <DescriptionList>
                    <DescriptionGroup>
                      <DescriptionTerm>Lot Number</DescriptionTerm>
                      <DescriptionDetails>LOT-2025-001</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Status</DescriptionTerm>
                      <DescriptionDetails>
                        <StatusIndicator>Active</StatusIndicator>
                      </DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Created Date</DescriptionTerm>
                      <DescriptionDetails>{formatDateWithWeek("2025-02-12").formattedDate}</DescriptionDetails>
                    </DescriptionGroup>
                    <DescriptionGroup>
                      <DescriptionTerm>Expiry Date</DescriptionTerm>
                      <DescriptionDetails>{formatDateWithWeek("2026-02-12").formattedDate}</DescriptionDetails>
                    </DescriptionGroup>
                  </DescriptionList>
                </Box>
              </Card>
            </Box>
          </Tab>
          <Tab id="production-records" label="Production Records">
            <Box p="x4">
              <Flex justifyContent="flex-end" mb="x3">
                <DropdownMenu 
                  trigger={() => <IconicButton icon="add" aria-label="Add production">Add production</IconicButton>}
                  placement="bottom-end"
                >
                  <DropdownButton onClick={handleExpectedProduction}>Expected details</DropdownButton>
                  <DropdownButton onClick={handleActualProduction}>Actual details</DropdownButton>
                </DropdownMenu>
              </Flex>

              <Table
                columns={productionRecordsColumns}
                rows={productionRecordsData.map(row => {
                  const result = [row];
                  
                  // If this row is expanded, add the expanded content as a "row" below it
                  if (expandedRows.includes(row.id) && row.expandedContent) {
                    result.push({
                      id: `${row.id}-expanded`,
                      expandedContent: row.expandedContent,
                      // Add empty cells to match the column structure
                      date: "",
                      expectedQuantity: "",
                      actualQuantity: "",
                    });
                  }
                  
                  return result;
                }).flat()}
                keyField="id"
                rowBorder={true}
                compact={true}
                className="production-records-table"
              />

              <style>
                {`
                  .production-records-table tbody tr[data-expanded="true"] td:first-child {
                    vertical-align: top;
                  }
                `}
              </style>
            </Box>
          </Tab>
        </Tabs>

        {/* Expected Production Record Sidebar */}
        <Sidebar
          isOpen={showExpectedSidebar}
          title="Expected production details"
          onClose={handleCloseExpectedSidebar}
          width="500px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton onClick={handleSaveExpected}>Save</PrimaryButton>
              <QuietButton onClick={handleCloseExpectedSidebar}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Date"
                    pb="x1"
                  />
                  <DatePicker
                    onChange={(date) => handleExpectedFieldChange("date", date?.toISOString() || "")}
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="UOM"
                    pb="x1"
                  />
                  <Select
                    value={expectedRecord.uom}
                    onChange={(option) => handleExpectedFieldChange("uom", String(option || ""))}
                    options={uomOptions}
                    placeholder="Select unit of measure"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Expected Quantity"
                    pb="x1"
                  />
                  <Input
                    type="number"
                    value={expectedRecord.expectedQuantity}
                    onChange={(e) => handleExpectedFieldChange("expectedQuantity", e.target.value)}
                    placeholder="Enter expected quantity"
                  />
                </Field>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        {/* Actual Production Record Sidebar */}
        <Sidebar
          isOpen={showActualSidebar}
          title="Actual production details"
          onClose={handleCloseActualSidebar}
          width="500px"
          duration={0.25}
          closeOnOutsideClick={true}
          overlay="show"
          disableScroll={true}
          footer={
            <Flex gap="x2">
              <PrimaryButton onClick={handleSaveActual}>Save</PrimaryButton>
              <QuietButton onClick={handleCloseActualSidebar}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Form>
            <FormSection>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Date"
                    pb="x1"
                  />
                  <DatePicker
                    onChange={(date) => handleActualFieldChange("date", date?.toISOString() || "")}
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="UOM"
                    pb="x1"
                  />
                  <Select
                    value={actualRecord.uom}
                    onChange={(option) => handleActualFieldChange("uom", String(option || ""))}
                    options={uomOptions}
                    placeholder="Select unit of measure"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Actual Quantity"
                    pb="x1"
                  />
                  <Input
                    type="number"
                    value={actualRecord.actualQuantity}
                    onChange={(e) => handleActualFieldChange("actualQuantity", e.target.value)}
                    placeholder="Enter actual quantity"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Lot Code"
                    pb="x1"
                  />
                  <Input
                    value={actualRecord.lotCode}
                    onChange={(e) => handleActualFieldChange("lotCode", e.target.value)}
                    placeholder="Enter lot code"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Expiry Date"
                    pb="x1"
                  />
                  <Input
                    value={actualRecord.expiryDate}
                    onChange={(e) => handleActualFieldChange("expiryDate", e.target.value)}
                    placeholder="Enter expiry date"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel
                    labelText="Note"
                    pb="x1"
                  />
                  <Textarea
                    value={actualRecord.note}
                    onChange={(e) => handleActualFieldChange("note", e.target.value)}
                    placeholder="Enter notes"
                  />
                </Field>
              </Box>
            </FormSection>
          </Form>
        </Sidebar>

        <ToastContainer />
      </Page>
    </ApplicationFrame>
  );
};
