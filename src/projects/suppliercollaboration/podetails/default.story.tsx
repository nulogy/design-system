import React, { useState } from "react";
import { toast, Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
  Heading4,
  Icon,
  QuietButton,
  PrimaryButton,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Select,
  FieldLabel,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  Sidebar,
  IconicButton,
  VerticalDivider,
  ToastContainer,
  BrandedNavBar,
  Divider,
  Tab,
  Tabs,
  Input,
  Card,
  StatusIndicator,
  TruncatedText,
  Header,
  Summary,
  SummaryDivider,
  DatePicker,
  Switcher,
  Switch,
  Checkbox,
  List,
  ListItem,
  DropdownMenu,
  DropdownButton,
  CheckboxGroup,
  Textarea,
  Table,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/PO details/Default (Standalone)",
  parameters: {
    layout: "fullscreen",
  },
};

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
    <Link href="#">Purchase orders</Link>
  </Breadcrumbs>
);

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    const options = [
      { value: "supplier1", label: `Supplier A (${inputValue})` },
      { value: "supplier2", label: `Supplier B (${inputValue})` },
      { value: "supplier3", label: `Supplier C (${inputValue})` },
    ];
    callback(options.filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase())));
  }, 500);
};

export const Default = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [sidebarState, setSidebarState] = useState({
    edit: false,
    comments: false,
  });

  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
  });

  const [productionComplete, setProductionComplete] = useState(false);

  const [assignedTags, setAssignedTags] = useState({
    validatedForAssembly: false,
    expressShipment: false,
  });

  const [poStatus, setPoStatus] = useState("At risk" as "Late" | "Completed" | "At risk" | "On time" | "Cancelled");

  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "23453",
      bomRevision: "Revision 2",
      needByDate: new Date("2025-Feb-28"),
      closeProductionNote: "Production completed successfully",
      carryOverSentTo: "",
    },
  });

  const lineItemsColumns = [
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
      label: "PO line item number",
      dataKey: "poLineItemNumber",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
            PO line item number
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
      label: "Item code and description",
      dataKey: "itemCodeAndDescription",
      width: "320px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
            Item code and description
          </Text>
        </Box>
      ),
      cellRenderer: ({ row }: { row: any }) => (
        <Flex px="x1" py="x0_75" gap="x0_25" flexDirection="column">
          <Link href="#" underline={false} color="black" hover="blue" style={{ display: "block", maxWidth: "152px" }}>
            <TruncatedText fullWidth width="auto" maxWidth="152px" fontSize="small" lineHeight="smallTextCompressed">
              {row.customerItemCode}
            </TruncatedText>
          </Link>
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
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
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
      label: "Collaboration status",
      dataKey: "collaborationStatus",
      width: "200px",
      headerFormatter: () => (
        <Box px="x1" pt="x1_25" pb="x0_75">
          <Text fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
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
          {cellData === "awaiting" && userState.role === "supplier" && (
            <StatusIndicator type="warning" mt="x4" mb="x0_5">
              Awaiting your response
            </StatusIndicator>
          )}
          {cellData === "awaiting" && userState.role === "customer" && (
            <StatusIndicator type="quiet" mt="x0_5">
              Awaiting supplier response
            </StatusIndicator>
          )}
          {cellData === "draft" && userState.role === "supplier" && (
            <StatusIndicator type="quiet" mt="x0_5">
              Awaiting customer response
            </StatusIndicator>
          )}
          {cellData === "draft" && userState.role === "customer" && (
            <StatusIndicator type="warning" mt="x4" mb="x0_5">
              Awaiting your response
            </StatusIndicator>
          )}
        </Flex>
      ),
    },
  ];

  const lineItemsRows = [
    {
      id: "1",
      poLineItemNumber: "PO-2024-001-12345",
      customerItemCode: "12345678",
      customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE OCT",
      problemsAndRisks: "At risk",
      collaborationStatus: "awaiting",
    },
    {
      id: "2",
      poLineItemNumber: "PO-2024-002-12346",
      customerItemCode: "87654321",
      customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE NOV",
      problemsAndRisks: "",
      collaborationStatus: "accepted",
    },
    {
      id: "3",
      poLineItemNumber: "PO-2024-003-12347",
      customerItemCode: "11111111",
      customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE DEC",
      problemsAndRisks: "Late",
      collaborationStatus: "draft",
    },
  ];

  const openSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: true }));
  };

  const closeSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: false }));
  };

  const handleCancelPOLineItem = () => {
    toast.success("PO line item cancelled successfully");
  };

  return (
    <ApplicationFrame>
      <ToastContainer />
      <BrandedNavBar
        menuData={{
          primaryMenu: [
            { name: "Dashboard", href: "#" },
            { name: "Projects", href: "#" },
            { name: "Settings", href: "#" },
          ],
          secondaryMenu: [
            { name: "Profile", href: "#" },
            { name: "Logout", href: "#" },
          ],
        }}
      />
      <Header
        breakpoints={{
          medium: 1200,
        }}
        renderBreadcrumbs={() => (
          <Breadcrumbs>
            <Link href="#">Home</Link>
            <Link href="#">Purchase orders</Link>
          </Breadcrumbs>
        )}
        title="12345678"
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
              <StatusIndicator alignSelf="center" type="warning">
                Requires your response
              </StatusIndicator>
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                For{" "}
                <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                  2 days
                </Text>
              </Text>
            </Flex>
          </Summary>
        )}
      />
      <Page>
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x3">
          <IconicButton icon="edit" aria-label="Edit" onClick={() => openSidebar("edit")}>
            Edit
          </IconicButton>
        </Flex>
        <Box mb="x3" pl="x3">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 6 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Purchase order number</Text>
              </DescriptionTerm>
              <DescriptionDetails>12345678</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">External ID</Text>
              </DescriptionTerm>
              <DescriptionDetails>TestNov29b</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Type</Text>
              </DescriptionTerm>
              <DescriptionDetails>FIRM</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier</Text>
              </DescriptionTerm>
              <DescriptionDetails>Cosmetics Manufacturer 2</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Currency</Text>
              </DescriptionTerm>
              <DescriptionDetails>USD</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>-</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Line items">
            <Box p="x4">
              <Table columns={lineItemsColumns} rows={lineItemsRows} compact rowBorder />
            </Box>
          </Tab>
          <Tab label="History log">
            <Box p="x4">
              <Text>History log content will go here</Text>
            </Box>
          </Tab>
          <Tab label="Attachments">
            <Box p="x4">
              <Text>Attachments content will go here</Text>
            </Box>
          </Tab>
        </Tabs>
        <Box
          position="fixed"
          bottom="x1"
          left="50%"
          transform="translateX(-50%)"
          zIndex={1000}
          backgroundColor="white"
          borderRadius="medium"
          boxShadow="large"
          p="x2"
          border="1px solid"
          borderColor="lightGrey"
        >
          <Flex alignItems="center" gap="x1">
            <Switcher
              selected={userState.role}
              onChange={(value) => setUserState((prev) => ({ ...prev, role: value as "supplier" | "customer" }))}
            >
              <Switch value="supplier">Supplier</Switch>
              <Switch value="customer">Customer</Switch>
            </Switcher>
          </Flex>
        </Box>
      </Page>

      <Sidebar
        isOpen={sidebarState.edit}
        onClose={() => closeSidebar("edit")}
        title="Edit details"
        footer={
          <Flex gap="x2" justifyContent="flex-start">
            <PrimaryButton
              onClick={() => {
                closeSidebar("edit");
                toast.success("PO line item details saved successfully");
              }}
            >
              Save
            </PrimaryButton>
            <QuietButton onClick={() => closeSidebar("edit")}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Flex flexDirection="column" gap="x3" py="x1">
          {userState.role === "supplier" && (
            <Input
              labelText="Supplier's PO line item number"
              id="supplierPOLineItemNumber"
              value={formData.edit.supplierPOLineItemNumber}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, edit: { ...prev.edit, supplierPOLineItemNumber: e.target.value } }))
              }
            />
          )}

          <Input
            labelText="BOM revision and release date - Use fancy 2 row select"
            id="bomRevision"
            autoFocus
            value={formData.edit.bomRevision}
            onChange={(e) => setFormData((prev) => ({ ...prev, edit: { ...prev.edit, bomRevision: e.target.value } }))}
          />

          {userState.role === "customer" && (
            <Flex flexDirection="column" gap="x1">
              <FieldLabel htmlFor="needByDate" labelText="Need by date" />
              <Box>
                <DatePicker
                  id="needByDate"
                  selected={formData.edit.needByDate}
                  onChange={(date) => setFormData((prev) => ({ ...prev, edit: { ...prev.edit, needByDate: date } }))}
                />
              </Box>
            </Flex>
          )}

          {userState.role === "customer" && (
            <CheckboxGroup
              labelText="Assigned tags"
              name="assignedTags"
              checkedValue={[
                ...(assignedTags.validatedForAssembly ? ["validatedForAssembly"] : []),
                ...(assignedTags.expressShipment ? ["expressShipment"] : []),
              ]}
              onChange={(values) => {
                setAssignedTags({
                  validatedForAssembly: values.includes("validatedForAssembly"),
                  expressShipment: values.includes("expressShipment"),
                });
              }}
            >
              <Checkbox value="validatedForAssembly" labelText="Validated for assembly" />
              <Checkbox value="expressShipment" labelText="Express shipment" />
            </CheckboxGroup>
          )}
        </Flex>
      </Sidebar>
    </ApplicationFrame>
  );
};
