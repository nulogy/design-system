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
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/PO details/Default",
  parameters: {
    layout: "fullscreen",
  },
};

const breadcrumbs = (
  <Breadcrumbs>
    <Link href="#">Home</Link>
    <Link href="#">PO line items</Link>
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

  // Sidebar state
  const [sidebarState, setSidebarState] = useState({
    edit: false,
    comments: false,
  });

  // User state
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
  });

  // Production complete state
  const [productionComplete, setProductionComplete] = useState(false);

  // Assigned tags state
  const [assignedTags, setAssignedTags] = useState({
    validatedForAssembly: false,
    expressShipment: false,
  });

  // PO status state
  const [poStatus, setPoStatus] = useState("At risk" as "Late" | "Completed" | "At risk" | "On time" | "Cancelled");

  // Form data
  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "23453",
      bomRevision: "Revision 2",
      needByDate: new Date("2025-Feb-28"),
      closeProductionNote: "Production completed successfully",
      carryOverSentTo: "",
    },
  });

  // Sidebar functions
  const openSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: true }));
  };

  const closeSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: false }));
  };

  // Function to handle cancel PO line item
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
            <Link href="#">PO line items</Link>
          </Breadcrumbs>
        )}
        title="12345678"
        subtitle="12345678 – PR 24 SEPHORA ONLINE DELUXE OCT"
        renderActions={() => (
          <Flex gap="x2" alignItems="center">
            <IconicButton icon="chatBubble" aria-label="Comments" onClick={() => openSidebar("comments")} />
            <DropdownMenu>
              <DropdownButton onClick={handleCancelPOLineItem}>Cancel PO line item</DropdownButton>
            </DropdownMenu>
          </Flex>
        )}
        renderSummary={() => (
          <Summary breakpoint={1200}>
            <Flex flexDirection="column" gap="half" alignItems="center" width="200px" justifyContent="center">
              <StatusIndicator alignSelf="center" type={productionComplete ? "success" : "quiet"}>
                {productionComplete ? "Completed" : "In Progress"}
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
                    on 2025-Jan-24
                  </Text>
                </>
              )}
              {poStatus === "Cancelled" && (
                <>
                  <StatusIndicator alignSelf="center" type="quiet">
                    Cancelled
                  </StatusIndicator>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    on 2025-Feb-22
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
      <Page>
        {/* Action bar above details */}
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x3">
          <IconicButton icon="edit" aria-label="Edit" onClick={() => openSidebar("edit")}>
            Edit
          </IconicButton>
        </Flex>
        <Box mb="x3" pl="x3">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">PO number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>4000023874</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>12345</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>23453</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Created on</Text>
              </DescriptionTerm>
              <DescriptionDetails>2025-Feb-01</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "supplier" ? "Customer" : "Supplier"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>MyCustomer</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>12345678 – PR 24 SEPHORA ONLINE DELUXE OCT</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's item code</Text>
              </DescriptionTerm>
              <DescriptionDetails>SUP-123456</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Item order type</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Standard</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Revision 2 – 2025-Feb-28</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Production start date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>2025-Feb-20</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>MySupplier TO</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Need by date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>2025-Feb-28</Text>
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
                  <DescriptionDetails>{formData.edit.carryOverSentTo || "-"}</DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Box p="x4">
              <Text>Collaboration content will go here</Text>
            </Box>
          </Tab>
          <Tab label="Production records">
            <Box p="x4">
              <Text>Record report that surfaces:</Text>
              <List mt="x2">
                <ListItem>Next production date</ListItem>
                <ListItem>Close production note</ListItem>
                <ListItem>Carry over sent to</ListItem>
                <ListItem>Production start date</ListItem>
              </List>
            </Box>
          </Tab>
          <Tab label="Attachments">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="Milestone performance">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            <Box p="x4">
              <Text>No changes</Text>
            </Box>
          </Tab>
        </Tabs>
        {/* Floating Settings Panel */}
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

      {/* Edit Sidebar */}
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
          {/* Supplier's PO line item number - editable only by supplier */}
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

          {/* BOM revision and release date - editable */}
          <Input
            labelText="BOM revision and release date - Use fancy 2 row select"
            id="bomRevision"
            autoFocus
            value={formData.edit.bomRevision}
            onChange={(e) => setFormData((prev) => ({ ...prev, edit: { ...prev.edit, bomRevision: e.target.value } }))}
          />

          {/* Need by date - editable only by customer */}
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

          {/* Assigned tags checkbox group - editable only by customer */}
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
