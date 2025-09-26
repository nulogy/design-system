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
  CheckboxGroup,
  List,
  ListItem,
  DropdownMenu,
  DropdownButton,
  Textarea,
  Modal,
  Button,
  Radio,
} from "../../..";
import { POLICard } from "../polidetails/components/POLICard";

export default {
  title: "Projects/Supplier Collaboration/Dual acceptance/Details",
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
  const [supplierProposalMade, setSupplierProposalMade] = useState(true);

  // Edit mode state
  const [editMode, setEditMode] = useState<"request" | "proposal" | null>(null);

  // Original form values for change detection
  const [originalFormValues, setOriginalFormValues] = useState<{
    request: typeof formData.request;
    proposal: typeof formData.proposal;
  } | null>(null);

  // Acceptance state
  const [acceptedItems, setAcceptedItems] = useState<{
    request: boolean;
    proposal: boolean;
  }>({
    request: false,
    proposal: false,
  });

  // Assigned tags state
  const [assignedTags, setAssignedTags] = useState({
    validatedForAssembly: false,
    expressShipment: false,
  });

  // PO status state
  const [poStatus, setPoStatus] = useState("At risk" as "Late" | "Completed" | "At risk" | "On time" | "Cancelled");

  // Acceptance modal state
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [acceptanceOption, setAcceptanceOption] = useState<"without-flagging" | "with-flagging">("without-flagging");
  const [isFlagged, setIsFlagged] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: new Date("2025-02-15"),
      closeProductionNote: "Production completed successfully",
      carryOverSentTo: "",
    },
    request: {
      quantity: "15,000",
      unit: "eaches",
      productionDueDate: "2025-Feb-28",
      unitPrice: "12.50",
      currency: "USD",
      note: "Standard production requirements",
    },
    proposal: {
      quantity: "15,500",
      unit: "eaches",
      productionDueDate: "2025-Feb-28",
      unitPrice: "12.50",
      currency: "USD",
      note: "Agreed to standard requirements",
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

  const acceptCustomerRequest = () => {
    setAcceptedItems((prev) => ({ ...prev, request: true }));
    toast.success("Request accepted successfully");
  };

  const acceptSupplierProposal = () => {
    setIsAcceptanceModalOpen(true);
  };

  const handleAcceptanceConfirm = () => {
    setAcceptedItems((prev) => ({ ...prev, proposal: true }));
    
    if (acceptanceOption === "without-flagging") {
      // Update quantity in customer's requested production to match supplier's proposal
      setFormData((prev) => ({
        ...prev,
        request: {
          ...prev.request,
          quantity: prev.proposal.quantity,
        },
      }));
      toast.success("Proposal accepted successfully");
    } else {
      // Keep original quantity but add flag
      setIsFlagged(true);
      toast.success("Proposal accepted with flagging");
    }
    
    setIsAcceptanceModalOpen(false);
  };

  const handleAcceptanceCancel = () => {
    setIsAcceptanceModalOpen(false);
    setAcceptanceOption("without-flagging"); // Reset to default
  };

  // Function to enter edit mode and store original values
  const enterEditMode = (mode: "request" | "proposal") => {
    setEditMode(mode);
    setOriginalFormValues({
      request: { ...formData.request },
      proposal: { ...formData.proposal },
    });
  };

  // Function to submit updated proposal or request
  const submitUpdate = (mode: "request" | "proposal") => {
    exitEditMode();

    // Always reset acceptance status for the item being updated
    if (mode === "request") {
      setAcceptedItems((prev) => ({ ...prev, request: false }));
      // Customer updated their request, now awaiting supplier's response
      setCollaborationState((prev) => ({ ...prev, activeCardAuthorRole: "customer" }));
    } else if (mode === "proposal") {
      setAcceptedItems((prev) => ({ ...prev, proposal: false }));
      // Supplier updated their proposal, now awaiting customer's response
      setCollaborationState((prev) => ({ ...prev, activeCardAuthorRole: "supplier" }));
    }

    toast.success(`${mode === "request" ? "Request" : "Proposal"} updated successfully`);
  };

  // Function to check if form has changes
  const hasChanges = (mode: "request" | "proposal") => {
    if (!originalFormValues) return false;

    const currentValues = mode === "request" ? formData.request : formData.proposal;
    const originalValues = mode === "request" ? originalFormValues.request : originalFormValues.proposal;

    return (
      currentValues.quantity !== originalValues.quantity ||
      currentValues.unit !== originalValues.unit ||
      currentValues.productionDueDate !== originalValues.productionDueDate ||
      currentValues.unitPrice !== originalValues.unitPrice ||
      currentValues.currency !== originalValues.currency ||
      currentValues.note !== originalValues.note
    );
  };

  // Function to exit edit mode
  const exitEditMode = () => {
    setEditMode(null);
    setOriginalFormValues(null);
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
                <Flex alignItems="center" gap="x0_5" pr="0">
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
                    "Requires your response"
                  )}
                  {acceptedItems.proposal && isFlagged && (
                    <Icon icon="error" size="x1_75" color="white" />
                  )}
                </Flex>
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

                {productionComplete && (
                  <StatusIndicator type="quiet">
                    <Flex alignItems="center" gap="x0_5">
                      Completed
                      {isFlagged && <Icon icon="error" size="x2" color="white" />}
                    </Flex>
                  </StatusIndicator>
                )}
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
        </Flex>
        <Box mb="x3" pl="x3">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">PO number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>PO-00000004</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "customer" ? "Your item code and description" : "Customer's item code and description"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>TEST_ITEM_OPT_2 - this is the description of the item 2</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>-</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "supplier" ? "Your PO line item number" : "Supplier's PO line item number"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>-</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>-</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Item order type</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Supplier</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "customer" ? "Your lot code" : "Customer's lot code"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>LOT-2024-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "supplier" ? "Your lot code" : "Supplier's lot code"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-LOT-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer</Text>
              </DescriptionTerm>
              <DescriptionDetails>Claudia Supplier</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>-</Text>
              </DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Card p="x1" mt="x3">
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

                  {/* Customer's request */}
                  <Box maxWidth="440px" minWidth="256px" flex={1}>
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Flex alignItems="center" gap="x1">
                        <Heading4 mb="0">
                          {userState.role === "customer" ? "Your request" : "Customer's request"}
                        </Heading4>

                        {acceptedItems.request ? (
                          <Tooltip tooltip="Accepted">
                            <Box
                              backgroundColor="lightGreen"
                              borderRadius="medium"
                              p="x0_25"
                              width="x3"
                              height="x3"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon icon="check" size="x2_5" color="green" />
                            </Box>
                          </Tooltip>
                        ) : (
                          <>
                            {!acceptedItems.request &&
                              !acceptedItems.proposal &&
                              userState.role === "supplier" &&
                              collaborationState.activeCardAuthorRole === "customer" && (
                                <Tooltip tooltip="Requires your response">
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
                            {!acceptedItems.request &&
                              !acceptedItems.proposal &&
                              userState.role === "customer" &&
                              collaborationState.activeCardAuthorRole === "customer" && (
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
                          </>
                        )}
                      </Flex>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        by{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          John D.
                        </Text>{" "}
                        on{" "}
                        <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                          February 6, 2025
                        </Text>
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap="x0_5">
                      {editMode === "request" ? (
                        <>
                          {userState.role === "supplier" ? (
                            <Flex gap="half" alignItems="center" width="100%">
                              <Box minWidth="140px" flex="1" maxWidth="280px">
                                <Input
                                  value={formData.request.quantity}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      request: { ...prev.request, quantity: e.target.value },
                                    }))
                                  }
                                  placeholder="1"
                                  inputWidth="100%"
                                />
                              </Box>

                              <Select
                                options={[
                                  { value: "square yards", label: "square yards" },
                                  { value: "pieces", label: "pieces" },
                                  { value: "meters", label: "meters" },
                                  { value: "pounds", label: "pounds" },
                                ]}
                                value={formData.request.unit}
                                onChange={(option) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    request: { ...prev.request, unit: option as string },
                                  }))
                                }
                                width="100%"
                                minWidth="100px"
                                maxWidth="160px"
                              />
                            </Flex>
                          ) : (
                            <Box width="100%">
                              <Input
                                value={formData.request.quantity}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    request: { ...prev.request, quantity: e.target.value },
                                  }))
                                }
                                placeholder="1"
                                suffix={formData.request.unit}
                                suffixWidth="160px"
                              />
                            </Box>
                          )}
                          <Box width="100%">
                            <Input
                              value={formData.request.productionDueDate}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  request: { ...prev.request, productionDueDate: e.target.value },
                                }))
                              }
                              placeholder="Enter production due date"
                              inputWidth="100%"
                            />
                          </Box>
                          <Box width="100%">
                            <Input
                              value={formData.request.unitPrice}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  request: { ...prev.request, unitPrice: e.target.value },
                                }))
                              }
                              placeholder="1"
                              suffix={formData.request.currency}
                              suffixWidth="160px"
                            />
                          </Box>
                          <Box width="100%">
                            <Textarea
                              value={formData.request.note}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, request: { ...prev.request, note: e.target.value } }))
                              }
                              placeholder="Enter note"
                              rows={4}
                            />
                          </Box>
                        </>
                      ) : (
                        <>
                          <Text my="x1">
                            {formData.request.quantity} {formData.request.unit}
                          </Text>
                          <Text my="x1">{formData.request.productionDueDate}</Text>
                          <Text my="x1">
                            {formData.request.unitPrice} {formData.request.currency}
                          </Text>
                          <Text my="x1" minHeight="88px">
                            {formData.request.note}
                          </Text>
                        </>
                      )}
                    </Flex>
                  </Box>

                  {/* Supplier's proposal */}
                  <Box maxWidth="440px" minWidth="256px" flex={1}>
                    <Flex flexDirection="column" gap="x0_25" mb="x3">
                      <Flex alignItems="center" gap="x1">
                        <Heading4 mb="0">
                          {userState.role === "customer" ? "Supplier's proposal" : "Your proposal"}
                        </Heading4>
                        {acceptedItems.proposal ? (
                          <Tooltip tooltip="Accepted">
                            <Box
                              backgroundColor="lightGreen"
                              borderRadius="medium"
                              p="x0_25"
                              width="x3"
                              height="x3"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon icon="check" size="x2_5" color="green" />
                            </Box>
                          </Tooltip>
                        ) : (
                          <>
                            {(!acceptedItems.request &&
                              !acceptedItems.proposal &&
                              userState.role === "supplier" &&
                              collaborationState.activeCardAuthorRole === "supplier") ||
                            (userState.role === "customer" &&
                              collaborationState.activeCardAuthorRole === "supplier") ? (
                              <Tooltip
                                tooltip={
                                  userState.role === "supplier" &&
                                  collaborationState.activeCardAuthorRole === "supplier"
                                    ? "Awaiting customer's response"
                                    : "Requires your response"
                                }
                              >
                                <Box
                                  backgroundColor={
                                    userState.role === "supplier" &&
                                    collaborationState.activeCardAuthorRole === "supplier"
                                      ? "whiteGrey"
                                      : "yellow"
                                  }
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
                          </>
                        )}
                      </Flex>
                      <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                        {supplierProposalMade ? (
                          userState.role === "customer" ? (
                            <>
                              by{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                                Supplier A.
                              </Text>{" "}
                              on{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                                February 6, 2025
                              </Text>
                            </>
                          ) : (
                            <>
                              by{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                                you
                              </Text>{" "}
                              on{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="black">
                                February 6, 2025
                              </Text>
                            </>
                          )
                        ) : userState.role === "customer" ? (
                          "Supplier have not made a proposal yet"
                        ) : (
                          "You have not made a proposal yet"
                        )}
                      </Text>
                    </Flex>
                    <Flex flexDirection="column" gap="x0_5">
                      {editMode === "proposal" ? (
                        <>
                          {userState.role === "supplier" ? (
                            <Flex gap="half" alignItems="center" width="100%">
                              <Box minWidth="140px" flex="1" maxWidth="280px">
                                <Input
                                  value={formData.proposal.quantity}
                                  onChange={(e) =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      proposal: { ...prev.proposal, quantity: e.target.value },
                                    }))
                                  }
                                  placeholder="1"
                                  inputWidth="100%"
                                />
                              </Box>

                              <Select
                                options={[
                                  { value: "square yards", label: "square yards" },
                                  { value: "pieces", label: "pieces" },
                                  { value: "meters", label: "meters" },
                                  { value: "pounds", label: "pounds" },
                                ]}
                                value={formData.proposal.unit}
                                onChange={(option) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    proposal: { ...prev.proposal, unit: option as string },
                                  }))
                                }
                                width="100%"
                                minWidth="100px"
                                maxWidth="160px"
                              />
                            </Flex>
                          ) : (
                            <Box width="100%">
                              <Input
                                value={formData.proposal.quantity}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    proposal: { ...prev.proposal, quantity: e.target.value },
                                  }))
                                }
                                placeholder="1"
                                suffix={formData.proposal.unit}
                                suffixWidth="160px"
                              />
                            </Box>
                          )}
                          <Box width="100%">
                            <Input
                              value={formData.proposal.productionDueDate}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  proposal: { ...prev.proposal, productionDueDate: e.target.value },
                                }))
                              }
                              placeholder="Enter production due date"
                              inputWidth="100%"
                            />
                          </Box>
                          <Box width="100%">
                            <Input
                              value={formData.proposal.unitPrice}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  proposal: { ...prev.proposal, unitPrice: e.target.value },
                                }))
                              }
                              placeholder="1"
                              suffix={formData.proposal.currency}
                              suffixWidth="160px"
                            />
                          </Box>
                          <Box width="100%">
                            <Textarea
                              value={formData.proposal.note}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  proposal: { ...prev.proposal, note: e.target.value },
                                }))
                              }
                              placeholder="Enter note"
                              rows={4}
                            />
                          </Box>
                        </>
                      ) : supplierProposalMade ? (
                        <>
                          <Text my="x1">
                            {formData.proposal.quantity} {formData.proposal.unit}
                          </Text>
                          <Text my="x1">{formData.proposal.productionDueDate}</Text>
                          <Text my="x1">
                            {formData.proposal.unitPrice} {formData.proposal.currency}
                          </Text>
                          <Text my="x1">{formData.proposal.note}</Text>
                        </>
                      ) : (
                        <>
                          <Text my="x1">-</Text>
                          <Text my="x1">-</Text>
                          <Text my="x1">-</Text>
                          <Text my="x1" minHeight="88px">
                            -
                          </Text>
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
                      <PrimaryButton onClick={() => submitUpdate(editMode)} disabled={!hasChanges(editMode)}>
                        {editMode === "request" ? "Submit request" : "Submit proposal"}
                      </PrimaryButton>
                      <QuietButton onClick={exitEditMode}>Cancel</QuietButton>
                    </>
                  ) : (
                    <>
                      {/* Always show edit buttons based on user role */}
                      {userState.role === "supplier" && (
                        <>
                          <QuietButton onClick={() => enterEditMode("proposal")}>Update proposal</QuietButton>
                          <QuietButton onClick={acceptCustomerRequest} disabled={acceptedItems.request}>
                            Accept customer's request
                          </QuietButton>
                        </>
                      )}
                      {userState.role === "customer" && (
                        <>
                          <QuietButton onClick={() => enterEditMode("request")}>Update request</QuietButton>
                          <QuietButton onClick={acceptSupplierProposal} disabled={acceptedItems.proposal}>
                            Accept supplier's proposal
                          </QuietButton>
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

      {/* Acceptance Modal - Simplified for debugging */}
      <Modal
        isOpen={isAcceptanceModalOpen}
        onRequestClose={handleAcceptanceCancel}
        title="Accept supplier's proposal"
        maxWidth="649px"
        footerContent={
          <Flex justifyContent="flex-start" gap="x2">
            <PrimaryButton onClick={handleAcceptanceConfirm}>
              Accept proposal
            </PrimaryButton>
            <QuietButton onClick={handleAcceptanceCancel}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Box px="half">
          <Flex flexDirection="column" gap="x1">
            <Box mb="x1">
              <Radio
                name="acceptance-option"
                value="without-flagging"
                labelText="With standard/non-consequential acceptance"
                checked={acceptanceOption === "without-flagging"}
                onChange={() => setAcceptanceOption("without-flagging")}
              />
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed" ml="x3">
                This will update your requested quantity to match the supplier's proposal.
              </Text>
            </Box>
            <Divider m="0" />
            <Box mb="x1">
              <Radio
                name="acceptance-option"
                value="with-flagging"
                labelText="With flagged/consequential/exceptional/... acceptance"
                checked={acceptanceOption === "with-flagging"}
                onChange={() => setAcceptanceOption("with-flagging")}
              />
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed" ml="x3">
                This will accept the proposal but keep your requested quantity.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Modal>

    </ApplicationFrame>
  );
};
