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
  title: "Projects/Supplier Collaboration/POLI lot/Details 2",
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

export const Details2 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showExpectedSidebar, setShowExpectedSidebar] = useState(false);
  const [showActualSidebar, setShowActualSidebar] = useState(false);
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
    { label: "Kilograms (kg)", value: "kg" },
    { label: "Pieces", value: "pieces" },
    { label: "Pounds (lb)", value: "lb" },
    { label: "Liters (L)", value: "L" },
    { label: "Gallons (gal)", value: "gal" },
    { label: "Meters (m)", value: "m" },
    { label: "Feet (ft)", value: "ft" },
  ];

  // Production records data
  const productionRecordsData = [
    {
      id: "1",
      date: "2025-Feb-12",
      lotCodeAndExpiry: "",
      customerLotCode: "",
      supplierLotCode: "",
      vendorLotCode: "",
      expiryDate: "",
      palletNumber: "",
      expectedQuantity: "18 cases",
      actualQuantity: "8 cases",
      note: "",
      expandedContent: () => (
        <Box style={{ marginTop: "-1px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>0 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="x0_25" flexDirection="column">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-001
                    </TruncatedText>
                    <Flex gap="half">
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        SUP-LOT-001
                      </TruncatedText>
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        VEN-LOT-001
                      </TruncatedText>
                    </Flex>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>2026-Feb-12</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-001</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip
                    tooltip="Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements"
                    placement="top"
                  >
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Production details for this lot - additional information about the manufacturing process, quality
                      checks, and any special handling requirements
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => setShowActualSidebar(true)}>
                      Edit actual production details
                    </DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>5 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="x0_25" flexDirection="column">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-001A
                    </TruncatedText>
                    <Flex gap="half">
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        SUP-LOT-001A
                      </TruncatedText>
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        VEN-LOT-001A
                      </TruncatedText>
                    </Flex>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>2026-Feb-12</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-001A</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Additional batch from same production run" placement="top">
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Additional batch from same production run
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => setShowActualSidebar(true)}>
                      Edit actual production details
                    </DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
              <tr>
                <td style={{ width: "48px", padding: "8px" }}></td>
                <td style={{ width: "120px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}></td>
                <td style={{ width: "180px", padding: "8px" }}>3 cases</td>
                <td style={{ width: "280px", padding: "8px" }}>
                  <Flex gap="x0_25" flexDirection="column">
                    <TruncatedText
                      fullWidth
                      width="auto"
                      maxWidth="152px"
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                    >
                      LOT-2025-001B
                    </TruncatedText>
                    <Flex gap="half">
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        SUP-LOT-001B
                      </TruncatedText>
                      <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                        /
                      </Text>
                      <TruncatedText
                        fullWidth
                        width="auto"
                        maxWidth="152px"
                        fontSize="small"
                        lineHeight="smallTextCompressed"
                        color="midGrey"
                      >
                        VEN-LOT-001B
                      </TruncatedText>
                    </Flex>
                  </Flex>
                </td>
                <td style={{ width: "150px", padding: "8px" }}>2026-Feb-12</td>
                <td style={{ width: "180px", padding: "8px" }}>PAL-001B</td>
                <td style={{ width: "auto", padding: "8px" }}>
                  <Tooltip tooltip="Final batch completion" placement="top">
                    <Text
                      fontSize="small"
                      lineHeight="smallTextCompressed"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxHeight: "2.4em",
                        cursor: "help",
                      }}
                    >
                      Final batch completion
                    </Text>
                  </Tooltip>
                </td>
                <td style={{ width: "60px", padding: "8px" }}>
                  <DropdownMenu
                    trigger={() => <IconicButton icon="more" aria-label="More actions" />}
                    placement="bottom-end"
                  >
                    <DropdownButton onClick={() => setShowActualSidebar(true)}>
                      Edit actual production details
                    </DropdownButton>
                    <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
                  </DropdownMenu>
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      ),
    },
    {
      id: "4",
      date: "2025-Aug-08",
      lotCodeAndExpiry: "LOT-2025-004",
      customerLotCode: "LOT-2025-004",
      supplierLotCode: "SUP-LOT-004",
      vendorLotCode: "VEN-LOT-004",
      expiryDate: "2026-08-08",
      palletNumber: "PAL-004",
      expectedQuantity: "0 cases",
      actualQuantity: "0 cases",
      note: "Equipment maintenance scheduled, production line optimization in progress",
    },
  ];

  const productionRecordsColumns = [
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
    },
    {
      label: "Lot code",
      dataKey: "lotCode",
      width: "280px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="smaller" lineHeight="smallerText" fontWeight="bold">
            Lot code
          </Text>
          <Text fontSize="smaller" lineHeight="smallerText" color="midGrey">
            Customer's / Supplier's / Vendor's
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => {
        // If all lot codes are empty, don't render anything
        if (!row.customerLotCode && !row.supplierLotCode && !row.vendorLotCode) {
          return null;
        }

        return (
          <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerLotCode || "-"}
            </TruncatedText>
            <Flex gap="half">
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.supplierLotCode || "-"}
              </TruncatedText>
              <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
                /
              </Text>
              <TruncatedText
                fullWidth
                width="auto"
                maxWidth="152px"
                fontSize="small"
                lineHeight="smallTextCompressed"
                color="midGrey"
              >
                {row.vendorLotCode || "-"}
              </TruncatedText>
            </Flex>
          </Flex>
        );
      },
    },
    {
      label: "Expiry date",
      dataKey: "expiryDate",
      width: "150px",
      cellRenderer: ({ row }: { row: any }) => {
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
          <Box px="x1" py="x0_75">
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
        // Show different actions based on whether row is collapsible
        if (props.row.expandedContent) {
          // Collapsible rows: only "Edit expected production details"
          return (
            <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
              <DropdownButton onClick={() => setShowExpectedSidebar(true)}>
                Edit expected production details
              </DropdownButton>
            </DropdownMenu>
          );
        } else {
          // Non-collapsible rows: "Edit expected production details", "Edit actual production details", "Delete"
          return (
            <DropdownMenu trigger={() => <IconicButton icon="more" aria-label="More actions" />} placement="bottom-end">
              <DropdownButton onClick={() => setShowExpectedSidebar(true)}>
                Edit expected production details
              </DropdownButton>
              <DropdownButton onClick={() => setShowActualSidebar(true)}>Edit actual production details</DropdownButton>
              <DropdownButton onClick={() => console.log("Delete clicked")}>Delete</DropdownButton>
            </DropdownMenu>
          );
        }
      },
    },
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

  const handleExpectedFieldChange = (field: string, value: string) => {
    setExpectedRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleActualFieldChange = (field: string, value: string) => {
    setActualRecord((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                  <Text>Overview content goes here...</Text>
                </Box>
              </Card>
            </Box>
          </Tab>

          <Tab id="production-records" label="Production records">
            <Box p="x4">
              <Flex justifyContent="flex-end" mb="x3">
                <DropdownMenu
                  trigger={() => (
                    <IconicButton icon="add" aria-label="Add production">
                      Add production
                    </IconicButton>
                  )}
                  placement="bottom-end"
                >
                  <DropdownButton onClick={handleExpectedProduction}>Expected details</DropdownButton>
                  <DropdownButton onClick={handleActualProduction}>Actual details</DropdownButton>
                </DropdownMenu>
              </Flex>

              <Table
                columns={productionRecordsColumns}
                rows={productionRecordsData}
                hasExpandableRows={true}
                expandedRows={[]}
                onRowExpansionChange={() => {}}
                keyField="id"
                rowBorder={true}
                compact={true}
                className="production-records-table"
              />

              <style>
                {`
                  .production-records-table tbody tr {
                    border-bottom: 1px solid #ddd !important;
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
                  <FieldLabel labelText="Date" pb="x1" />
                  <DatePicker
                    onChange={(date) => handleExpectedFieldChange("date", date?.toISOString() || "")}
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="UOM" pb="x1" />
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
                  <FieldLabel labelText="Expected Quantity" pb="x1" />
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
                  <FieldLabel labelText="Date" pb="x1" />
                  <DatePicker
                    onChange={(date) => handleActualFieldChange("date", date?.toISOString() || "")}
                    autoFocus
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="UOM" pb="x1" />
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
                  <FieldLabel labelText="Actual Quantity" pb="x1" />
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
                  <FieldLabel labelText="Lot Code" pb="x1" />
                  <Input
                    value={actualRecord.lotCode}
                    onChange={(e) => handleActualFieldChange("lotCode", e.target.value)}
                    placeholder="Enter lot code"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Expiry Date" pb="x1" />
                  <Input
                    value={actualRecord.expiryDate}
                    onChange={(e) => handleActualFieldChange("expiryDate", e.target.value)}
                    placeholder="Enter expiry date"
                  />
                </Field>
              </Box>
              <Box pb="x3">
                <Field>
                  <FieldLabel labelText="Note" pb="x1" />
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
