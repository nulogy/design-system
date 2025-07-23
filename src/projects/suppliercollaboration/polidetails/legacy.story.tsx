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
} from "../../..";
import { POLICard } from "./components/POLICard";

export default {
  title: "Projects/Supplier Collaboration/POLI details/Legacy/Default",
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

  // Collaboration state
  const [collaborationState, setCollaborationState] = useState({
    status: "awaiting" as "awaiting" | "accepted",
    activeCardAuthorRole: "supplier" as "supplier" | "customer" | null,
  });

  // User state
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
  });

  // Production complete state
  const [productionComplete, setProductionComplete] = useState(false);

  // Supplier's proposal made state
  const [supplierProposalMade, setSupplierProposalMade] = useState(false);

  // Edit mode state
  const [editMode, setEditMode] = useState<"request" | "proposal" | null>(null);

  // PO status state
  const [poStatus, setPoStatus] = useState("At risk" as "Late" | "Completed" | "At risk" | "On time" | "Cancelled");

  // Form data
  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "23453",
      bomRevision: "Revision 2",
      needByDate: new Date("2024-01-01"),
      carryOverSentTo: "",
    },
    request: {
      quantity: "1 square yards",
      unit: "square yards",
      productionDueDate: "Dec 12, 2024",
      unitPrice: "1 USD",
      currency: "USD",
      note: "Some note",
    },
    proposal: {
      quantity: "1.5 square yards",
      unit: "square yards",
      productionDueDate: "Dec 15, 2024",
      unitPrice: "1.25 USD",
      currency: "USD",
      note: "Updated proposal with better pricing",
    },
  });

  // Sidebar functions
  const openSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: true }));
  };

  const closeSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: false }));
  };

  const acceptRequest = () => {
    setCollaborationState((prev) => ({
      ...prev,
      status: "accepted",
      showAcceptedCard: true,
    }));
    toast.success(
      `${collaborationState.activeCardAuthorRole === "customer" ? "Request" : "Proposal"} accepted successfully`
    );
  };

  const submitNewProposal = () => {
    setCollaborationState((prev) => ({
      ...prev,
      status: "awaiting",
      showAcceptedCard: false,
      hasNewCard: true,
      activeCardAuthorRole: userState.role,
    }));
    setSidebarState((prev) => ({ ...prev, newProposal: false }));
    toast.success(`${userState.role === "supplier" ? "Proposal" : "Request"} submitted successfully`);
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
        renderSummary={() => (
          <Summary breakpoint={1200}>
            <Flex flexDirection="column" gap="half" alignItems="center" width="200px" justifyContent="center">
              <StatusIndicator
                alignSelf="center"
                type={
                  productionComplete || collaborationState.status === "accepted"
                    ? "success"
                    : collaborationState.activeCardAuthorRole !== userState.role
                      ? "warning"
                      : "quiet"
                }
              >
                {productionComplete || collaborationState.status === "accepted" ? (
                  "Accepted"
                ) : collaborationState.activeCardAuthorRole === userState.role ? (
                  <TruncatedText fontSize="smaller" lineHeight="smallerText" fullWidth maxWidth="184px">
                    {`Awaiting ${userState.role === "supplier" ? "customer" : "supplier"} response`}
                  </TruncatedText>
                ) : (
                  "Awaiting your response"
                )}
              </StatusIndicator>
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                For{" "}
                <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                  5 days
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
      <Page>
        {/* Action bar above details */}
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x3">
          <IconicButton icon="edit" aria-label="Edit" onClick={() => openSidebar("edit")}>
            Edit
          </IconicButton>
          <VerticalDivider />
          <IconicButton icon="chatBubble" aria-label="Comments" onClick={() => openSidebar("comments")}>
            Comments
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
                  <DescriptionDetails>{formData.edit.carryOverSentTo || "N/A"}</DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Card p="x1" mt="x3">
              <Flex flexDirection="column" gap="x2" justifyContent="space-between">
                {/* Requested production vs Supplier's proposal comparison */}
                <Flex gap="x4" p="x2">
                  <Flex flexDirection="column" gap="x2_5" mt="x9" minWidth="180px">
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                      Quantity
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                      Production due date
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                      Unit price
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" minHeight="72px">
                      Note
                    </Text>
                  </Flex>

                  {/* Original request */}
                  <Box minWidth="440px">
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Heading4 mb="0">
                        {userState.role === "customer" ? "Your original request" : "Customer's original request"}
                      </Heading4>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        by{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          John D.
                        </Text>{" "}
                        on{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          January 24, 2025
                        </Text>
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap="x2_5">
                      <Text>1 square yards</Text>
                      <Text>Dec 12, 2024</Text>
                      <Text>1 USD</Text>
                      <Text>Some note</Text>
                    </Flex>
                  </Box>

                  {/* Customer's latest request */}
                  <Box minWidth="440px">
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Flex alignItems="center" gap="x1">
                        <Heading4 mb="0">
                          {userState.role === "customer" ? "Your latest request" : "Customer's latest request"}
                        </Heading4>

                        {userState.role === "supplier" && collaborationState.activeCardAuthorRole === "customer" && (
                          <Tooltip tooltip="Awaiting your response">
                            <Box
                              backgroundColor="yellow"
                              borderRadius="medium"
                              p="x0_25"
                              width="x3"
                              height="x3"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                            </Box>
                          </Tooltip>
                        )}
                        {userState.role === "customer" && collaborationState.activeCardAuthorRole === "customer" && (
                          <Tooltip tooltip="Awaiting supplier's response">
                            <Box
                              backgroundColor="whiteGrey"
                              borderRadius="medium"
                              p="x0_25"
                              width="x3"
                              height="x3"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                            </Box>
                          </Tooltip>
                        )}
                      </Flex>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        by{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          John D.
                        </Text>{" "}
                        on{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          February 5, 2025
                        </Text>
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap={editMode === "request" ? "x0_5" : "x2_5"}>
                      {editMode === "request" ? (
                        <>
                          <Flex gap="half" alignItems="center">
                            <Input
                              value={formData.request.quantity}
                              onChange={(e) => setFormData(prev => ({ ...prev, request: { ...prev.request, quantity: e.target.value } }))}
                              placeholder="Enter quantity"
                              width="61.8%"
                            />
                            <Select
                              options={[
                                { value: "square yards", label: "square yards" },
                                { value: "pieces", label: "pieces" },
                                { value: "meters", label: "meters" },
                                { value: "pounds", label: "pounds" },
                              ]}
                              value={formData.request.unit}
                              onChange={(option) => setFormData(prev => ({ ...prev, request: { ...prev.request, unit: option as string } }))}
                              width="38.2%"
                            />
                          </Flex>
                          <Input
                            value={formData.request.productionDueDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, request: { ...prev.request, productionDueDate: e.target.value } }))}
                            placeholder="Enter production due date"
                          />
                          <Flex gap="half" alignItems="center">
                            <Input
                              value={formData.request.unitPrice}
                              onChange={(e) => setFormData(prev => ({ ...prev, request: { ...prev.request, unitPrice: e.target.value } }))}
                              placeholder="Enter unit price"
                              width="61.8%"
                            />
                            <Select
                              options={[
                                { value: "USD", label: "USD" },
                                { value: "EUR", label: "EUR" },
                                { value: "GBP", label: "GBP" },
                                { value: "CAD", label: "CAD" },
                              ]}
                              value={formData.request.currency}
                              onChange={(option) => setFormData(prev => ({ ...prev, request: { ...prev.request, currency: option as string } }))}
                              width="38.2%"
                            />
                          </Flex>
                          <Input
                            value={formData.request.note}
                            onChange={(e) => setFormData(prev => ({ ...prev, request: { ...prev.request, note: e.target.value } }))}
                            placeholder="Enter note"
                          />
                        </>
                      ) : (
                        <>
                          <Text>{formData.request.quantity} {formData.request.unit}</Text>
                          <Text>{formData.request.productionDueDate}</Text>
                          <Text>{formData.request.unitPrice} {formData.request.currency}</Text>
                          <Text>{formData.request.note}</Text>
                        </>
                      )}
                    </Flex>
                  </Box>

                  {/* Supplier's latest proposal */}
                  <Box minWidth="440px">
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Flex alignItems="center" gap="x1">
                        <Heading4 mb="0">
                          {userState.role === "customer" ? "Supplier's latest proposal" : "Your latest proposal"}
                        </Heading4>
                        {(userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier") || 
                         (userState.role === "customer" && collaborationState.activeCardAuthorRole === "supplier") ? (
                          <Tooltip tooltip={userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier" ? "Awaiting customer's response" : "Awaiting your response"}>
                            <Box
                              backgroundColor={userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier" ? "whiteGrey" : "yellow"}
                              borderRadius="medium"
                              p="x0_25"
                              width="x3"
                              height="x3"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                            </Box>
                          </Tooltip>
                        ) : null}
                      </Flex>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact" fontStyle="italic">
                        {supplierProposalMade 
                          ? (userState.role === "customer" 
                              ? "by Supplier A. on February 6, 2025" 
                              : "by you on February 6, 2025")
                          : (userState.role === "customer"
                              ? "Supplier have not made a proposal yet"
                              : "You have not made a proposal yet")
                        }
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap={editMode === "proposal" ? "x0_5" : "x2_5"}>
                      {supplierProposalMade ? (
                        editMode === "proposal" ? (
                          <>
                            <Flex gap="half" alignItems="center">
                              <Input
                                value={formData.proposal.quantity}
                                onChange={(e) => setFormData(prev => ({ ...prev, proposal: { ...prev.proposal, quantity: e.target.value } }))}
                                placeholder="Enter quantity"
                                width="61.8%"
                              />
                              <Select
                                options={[
                                  { value: "square yards", label: "square yards" },
                                  { value: "pieces", label: "pieces" },
                                  { value: "meters", label: "meters" },
                                  { value: "pounds", label: "pounds" },
                                ]}
                                value={formData.proposal.unit}
                                onChange={(option) => setFormData(prev => ({ ...prev, proposal: { ...prev.proposal, unit: option as string } }))}
                                width="38.2%"
                              />
                            </Flex>
                            <Input
                              value={formData.proposal.productionDueDate}
                              onChange={(e) => setFormData(prev => ({ ...prev, proposal: { ...prev.proposal, productionDueDate: e.target.value } }))}
                              placeholder="Enter production due date"
                            />
                            <Flex gap="half" alignItems="center">
                              <Input
                                value={formData.proposal.unitPrice}
                                onChange={(e) => setFormData(prev => ({ ...prev, proposal: { ...prev.proposal, unitPrice: e.target.value } }))}
                                placeholder="Enter unit price"
                                width="61.8%"
                              />
                              <Select
                                options={[
                                  { value: "USD", label: "USD" },
                                  { value: "EUR", label: "EUR" },
                                  { value: "GBP", label: "GBP" },
                                  { value: "CAD", label: "CAD" },
                                ]}
                                value={formData.proposal.currency}
                                onChange={(option) => setFormData(prev => ({ ...prev, proposal: { ...prev.proposal, currency: option as string } }))}
                                width="38.2%"
                              />
                            </Flex>
                            <Input
                              value={formData.proposal.note}
                              onChange={(e) => setFormData(prev => ({ ...prev, proposal: { ...prev.proposal, note: e.target.value } }))}
                              placeholder="Enter note"
                            />
                          </>
                        ) : (
                          <>
                            <Text>{formData.proposal.quantity} {formData.proposal.unit}</Text>
                            <Text>{formData.proposal.productionDueDate}</Text>
                            <Text>{formData.proposal.unitPrice} {formData.proposal.currency}</Text>
                            <Text>{formData.proposal.note}</Text>
                          </>
                        )
                      ) : (
                        <>
                          <Text>-</Text>
                          <Text>-</Text>
                          <Text>-</Text>
                          <Text>-</Text>
                        </>
                      )}
                    </Flex>
                  </Box>
                </Flex>

                <Divider m="0" p="0" />

                {/* Action buttons */}
                <Flex gap="x2" px="x2" pb="x1">
                  {editMode ? (
                    <>
                      <PrimaryButton onClick={() => setEditMode(null)}>
                        {editMode === "request" ? "Submit request" : "Submit proposal"}
                      </PrimaryButton>
                      <QuietButton onClick={() => setEditMode(null)}>Cancel</QuietButton>
                    </>
                  ) : (
                    <>
                      {userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier" && (
                        <>
                          <QuietButton onClick={() => setEditMode("proposal")}>Update proposal</QuietButton>
                          <QuietButton>Accept customer's latest request</QuietButton>
                        </>
                      )}
                      {userState.role === "customer" && collaborationState.activeCardAuthorRole === "customer" && (
                        <>
                          <QuietButton onClick={() => setEditMode("request")}>Update request</QuietButton>
                          <QuietButton>Accept supplier's latest proposal</QuietButton>
                        </>
                      )}
                      {userState.role === "supplier" && collaborationState.activeCardAuthorRole === "customer" && (
                        <>
                          <PrimaryButton>Accept request</PrimaryButton>
                          <QuietButton onClick={() => setEditMode("proposal")}>Update proposal</QuietButton>
                        </>
                      )}
                      {userState.role === "customer" && collaborationState.activeCardAuthorRole === "supplier" && (
                        <>
                          <PrimaryButton>Accept proposal</PrimaryButton>
                          <QuietButton onClick={() => setEditMode("request")}>Update request</QuietButton>
                        </>
                      )}
                    </>
                  )}
                </Flex>
              </Flex>
            </Card>
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
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center">
              <Text fontSize="small" color="midGrey" width="120px" textAlign="right">
                Active request by:
              </Text>
              <Select
                options={[
                  { value: "supplier", label: "Supplier" },
                  { value: "customer", label: "Customer" },
                ]}
                value={collaborationState.activeCardAuthorRole || "supplier"}
                onChange={(option) =>
                  setCollaborationState((prev) => ({
                    ...prev,
                    activeCardAuthorRole: option as "supplier" | "customer",
                  }))
                }
                placeholder="Select author role"
                menuPlacement="top"
                width="160px"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center">
              <Text fontSize="small" color="midGrey" width="80px" textAlign="right">
                PO status:
              </Text>
              <Select
                options={[
                  { value: "Late", label: "Late" },
                  { value: "Completed", label: "Completed" },
                  { value: "At risk", label: "At risk" },
                  { value: "On time", label: "On time" },
                  { value: "Cancelled", label: "Cancelled" },
                ]}
                value={poStatus}
                onChange={(option) => setPoStatus(option as "Late" | "Completed" | "At risk" | "On time" | "Cancelled")}
                placeholder="Select PO status"
                menuPlacement="top"
                width="160px"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center" width="200px">
              <Checkbox
                id="productionComplete"
                checked={productionComplete}
                onChange={(e) => setProductionComplete(e.target.checked)}
                labelText="Production complete"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center" width="200px">
              <Checkbox
                id="supplierProposalMade"
                checked={supplierProposalMade}
                onChange={(e) => setSupplierProposalMade(e.target.checked)}
                labelText="Supplier's proposal made"
              />
            </Flex>
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

          {/* Need by date - editable */}
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

          {/* Production complete fields */}
          {productionComplete && (
            <>
              {/* Carry over sent to - editable */}
              <Input
                labelText="Carry over sent to"
                id="carryOverSentTo"
                value={formData.edit.carryOverSentTo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, edit: { ...prev.edit, carryOverSentTo: e.target.value } }))
                }
              />
            </>
          )}
        </Flex>
      </Sidebar>
    </ApplicationFrame>
  );
};
