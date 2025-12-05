import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { Heading1, Heading2, toast, Tooltip } from "../../..";
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
  AsyncSelect,
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
import { ReconciledIcon } from "./ReconciledIcon";

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
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Customer's PO line item number
  const customerPOLineItemNumber = "POLI-001";

  // Customer's item code and description
  const customerItemCodeAndDescription = "12345678 – PR 24 SEPHORA ONLINE DELUXE OCT";

  // Sidebar state
  const [sidebarState, setSidebarState] = useState({
    edit: false,
    comments: false,
  });

  // Close production modal state
  const [isCloseProductionModalOpen, setIsCloseProductionModalOpen] = useState(false);
  const [closeProductionNote, setCloseProductionNote] = useState("");

  // Collaboration state
  const [collaborationState, setCollaborationState] = useState({
    status: "awaiting" as "awaiting" | "accepted",
    activeCardAuthorRole: "supplier" as "supplier" | "customer" | null,
  });

  // User state
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
  });

  // Production status state
  const [productionStatus, setProductionStatus] = useState<"Not started" | "In progress" | "Completed">("Not started");

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

  // Milestone status state
  const [poStatus, setPoStatus] = useState("At risk" as "Late" | "At risk" | "On time");

  // POLI status state
  const [poliStatus, setPoliStatus] = useState<"Open" | "Canceled" | "Completed">("Open");

  // UOM view state - defaults based on user role
  const [uomView, setUomView] = useState<"customer" | "supplier">(
    userState.role === "supplier" ? "supplier" : "customer"
  );

  // Details section expanded state
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  // Update UOM view when user role changes
  useEffect(() => {
    setUomView(userState.role === "supplier" ? "supplier" : "customer");
    // Update proposal unit default based on user role
    setFormData((prev) => ({
      ...prev,
      proposal: {
        ...prev.proposal,
        unit: userState.role === "supplier" ? "cases" : "eaches",
      },
    }));
  }, [userState.role]);

  // Acceptance modal state
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [acceptanceOption, setAcceptanceOption] = useState<"without-flagging" | "with-flagging">("without-flagging");
  const [isFlagged, setIsFlagged] = useState(false);
  const [isReconciled, setIsReconciled] = useState<boolean | null>(null); // null = not accepted yet, true = reconciled, false = not reconciled

  // Form data
  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: new Date("2025-02-15"),
      closeProductionNote: "Production completed",
      carryOverSentTo: "",
      priority: "High",
      customerLotCode: "LOT-2024-001",
      supplierLotCode: "SUP-LOT-001",
    },
    request: {
      quantity: "15,000",
      unit: "eaches",
      productionDueDate: "2025-Feb-28",
      unitPrice: "12.50",
      currency: "USD",
      reason: "Quality requirements",
      note: "Standard production requirements. All items must meet the specified quality standards and pass quality control inspections before shipment. Packaging must comply with industry standards and include proper labeling. Delivery should be completed within the agreed timeframe to ensure production schedules.",
    },
    proposal: {
      quantity: "15,500",
      unit: "cases",
      productionDueDate: "2025-Feb-28",
      unitPrice: "12.50",
      currency: "USD",
      reason: "Quality requirements",
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
    toast.success(`${collaborationState.activeCardAuthorRole === "customer" ? "Request" : "Proposal"} accepted`);
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
    toast.success(`${userState.role === "supplier" ? "Proposal" : "Request"} submitted`);
  };

  const acceptCustomerRequest = () => {
    setAcceptedItems((prev) => ({ ...prev, request: true }));
    toast.success("Request accepted");
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
      setIsReconciled(true); // Request reconciled
      toast.success("Proposal accepted");
    } else {
      // Keep original quantity but add flag
      setIsFlagged(true);
      setIsReconciled(false); // Request not reconciled
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
    // Update unit based on UOM view when entering edit mode for proposal
    if (mode === "proposal") {
      const newUnit = uomView === "supplier" ? "cases" : "eaches";
      // Stored quantity is always in eaches, convert based on UOM view
      const currentQuantityInEaches = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;

      let newQuantity = currentQuantityInEaches;
      // Convert quantity to match UOM view
      if (uomView === "supplier") {
        // Convert eaches to cases: divide by 20
        newQuantity = currentQuantityInEaches / 20;
      }
      // If customer UOM view, keep as eaches (no conversion needed)

      setFormData((prev) => ({
        ...prev,
        proposal: {
          ...prev.proposal,
          unit: newUnit,
          quantity: newQuantity.toLocaleString("en-US"),
        },
      }));
    }
  };

  // Function to submit updated proposal or request
  const submitUpdate = (mode: "request" | "proposal") => {
    exitEditMode();

    // Reset ALL acceptance status when either is updated (updating invalidates previous acceptances)
    setAcceptedItems({ request: false, proposal: false });

    if (mode === "request") {
      // Customer updated their request, now awaiting supplier's response
      setCollaborationState((prev) => ({
        ...prev,
        activeCardAuthorRole: "customer",
        status: "awaiting",
      }));
    } else if (mode === "proposal") {
      // Supplier updated their proposal, now awaiting customer's response
      setCollaborationState((prev) => ({
        ...prev,
        activeCardAuthorRole: "supplier",
        status: "awaiting",
      }));
    }

    // Reset reconciliation and flagged status
    setIsReconciled(null);
    setIsFlagged(false);

    toast.success(`${mode === "request" ? "Request" : "Proposal"} updated`);
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
      ("reason" in currentValues && "reason" in originalValues && currentValues.reason !== originalValues.reason) ||
      currentValues.note !== originalValues.note
    );
  };

  // Function to exit edit mode
  const exitEditMode = () => {
    // Restore original form values when canceling
    if (originalFormValues) {
      setFormData({
        request: { ...originalFormValues.request },
        proposal: { ...originalFormValues.proposal },
        edit: formData.edit, // Keep edit form data unchanged
      });
    }
    setEditMode(null);
    setOriginalFormValues(null);
  };

  // Function to handle cancel PO line item
  const handleCancelPOLineItem = () => {
    toast.success("PO line item cancelled");
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
        title={customerPOLineItemNumber}
        renderActions={() => (
          <Flex gap="x0_5" ml="x1" alignItems="center">
            <Box display="flex" alignItems="center" position="relative">
              <IconicButton
                icon="chatBubble"
                labelHidden
                tooltip="Comments (6)"
                onClick={() => openSidebar("comments")}
              >
                Comments (6)
              </IconicButton>
              <Box
                position="absolute"
                right="x0_5"
                top="x1"
                width="8px"
                height="8px"
                borderRadius="50%"
                backgroundColor={theme.colors.blue}
                style={{
                  outline: `3px solid ${theme.colors.whiteGrey}`,
                  outlineOffset: "0px",
                }}
              />
            </Box>
            {userState.role === "customer" && poliStatus !== "Canceled" && poliStatus !== "Completed" && (
              <>
                <VerticalDivider />
                <DropdownMenu>
                  <DropdownButton onClick={handleCancelPOLineItem}>Cancel PO line item</DropdownButton>
                </DropdownMenu>
              </>
            )}
          </Flex>
        )}
        renderSummary={() => {
          if (poliStatus === "Canceled") {
            return (
              <Summary breakpoint={120}>
                <Flex flexDirection="column" width="200px" justifyContent="center" pt="x0_5" gap="x0_5">
                  <Tooltip
                    tooltip={
                      <Box>
                        <Text fontSize="small" lineHeight="smallRelaxed">
                          {productionStatus === "Not started"
                            ? "0 / 15,000 eaches"
                            : productionStatus === "Completed"
                              ? "14,700 / 15,000 eaches"
                              : "7,500 / 15,000 eaches"}
                        </Text>
                      </Box>
                    }
                  >
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <Box
                        height="x1"
                        width="100%"
                        backgroundColor={productionStatus === "Not started" ? "lightGrey" : "grey"}
                        borderRadius="medium"
                      />
                    </Flex>
                  </Tooltip>
                  <Flex justifyContent={productionStatus === "Completed" ? "space-between" : "center"} alignItems="center" gap="x0_5">
                    <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed" style={{ whiteSpace: "nowrap" }}>
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        {productionStatus === "Not started" ? "0%" : productionStatus === "Completed" ? "98%" : "50%"}
                      </Text>{" "}
                      produced
                    </Text>
                    {productionStatus === "Completed" && (
                      <StatusIndicator type="quiet">
                        <Flex alignItems="center" gap="x0_5">
                          Completed
                        </Flex>
                      </StatusIndicator>
                    )}
                  </Flex>
                </Flex>
              </Summary>
            );
          }

          if (poliStatus === "Completed") {
            return (
              <Summary breakpoint={120}>
                <Flex flexDirection="column" width="200px" justifyContent="center" pt="x0_5" gap="x0_5">
                  <Tooltip
                    tooltip={
                      <Box>
                        <Text fontSize="small" lineHeight="smallRelaxed">
                          {productionStatus === "Not started"
                            ? "0 / 15,000 eaches"
                            : productionStatus === "Completed"
                              ? "14,700 / 15,000 eaches"
                              : "7,500 / 15,000 eaches"}
                        </Text>
                      </Box>
                    }
                  >
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <Box
                        height="x1"
                        width="100%"
                        backgroundColor={productionStatus === "Not started" ? "lightGrey" : "darkGrey"}
                        borderRadius="medium"
                      />
                    </Flex>
                  </Tooltip>
                  <Flex justifyContent={productionStatus === "Completed" ? "space-between" : "center"} alignItems="center" gap="x0_5">
                    <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed" style={{ whiteSpace: "nowrap" }}>
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        {productionStatus === "Not started" ? "0%" : productionStatus === "Completed" ? "98%" : "50%"}
                      </Text>{" "}
                      produced
                    </Text>
                    {productionStatus === "Completed" && (
                      <StatusIndicator type="quiet">
                        <Flex alignItems="center" gap="x0_5">
                          Completed
                        </Flex>
                      </StatusIndicator>
                    )}
                  </Flex>
                </Flex>
              </Summary>
            );
          }

          // Open - show current content
          return (
            <Summary breakpoint={120}>
              <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" pt="x0_5" gap="x0_5">
                <Flex height="x2_5" alignItems="center" justifyContent="center" gap="x0_5">
                  {acceptedItems.proposal && isReconciled !== null ? (
                    <Tooltip tooltip={isReconciled ? "Accepted with updated request" : "Accepted with retained request"}>
                      <Flex alignItems="center" gap="x0_5">
                        {(productionStatus === "Completed" ||
                          collaborationState.status === "accepted" ||
                          acceptedItems.request ||
                          acceptedItems.proposal) &&
                        acceptedItems.proposal &&
                        isFlagged &&
                        isReconciled !== false ? (
                          <StatusIndicator alignSelf="center" type="success">
                            <Flex alignItems="center" gap="x0_25">
                              Accepted
                              <Icon icon="error" size="x1_75" color="white" mr="-6px" />
                            </Flex>
                          </StatusIndicator>
                        ) : (
                          <StatusIndicator
                            alignSelf="center"
                            type={
                              acceptedItems.proposal && isReconciled === false
                                ? "neutral"
                                : productionStatus === "Completed" ||
                                    collaborationState.status === "accepted" ||
                                    acceptedItems.request ||
                                    acceptedItems.proposal
                                  ? "success"
                                  : collaborationState.activeCardAuthorRole !== userState.role
                                    ? "warning"
                                    : "quiet"
                            }
                          >
                            {productionStatus === "Completed" ||
                            collaborationState.status === "accepted" ||
                            acceptedItems.request ||
                            acceptedItems.proposal ? (
                              "Accepted"
                            ) : collaborationState.activeCardAuthorRole === userState.role ? (
                              <TruncatedText fontSize="smaller" lineHeight="smallerText" fullWidth maxWidth="184px">
                                {`Awaiting ${userState.role === "supplier" ? "customer" : "supplier"} response`}
                              </TruncatedText>
                            ) : (
                              "Requires your response"
                            )}
                          </StatusIndicator>
                        )}
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <ReconciledIcon variant={isReconciled ? "standard" : "flagged"} size={20} />
                        </Box>
                      </Flex>
                    </Tooltip>
                  ) : (
                    <>
                      {(productionStatus === "Completed" ||
                        collaborationState.status === "accepted" ||
                        acceptedItems.request ||
                        acceptedItems.proposal) &&
                      acceptedItems.proposal &&
                      isFlagged &&
                      isReconciled !== false ? (
                        <Tooltip tooltip="With flagged acceptance">
                          <StatusIndicator alignSelf="center" type="success">
                            <Flex alignItems="center" gap="x0_25">
                              Accepted
                              <Icon icon="error" size="x1_75" color="white" mr="-6px" />
                            </Flex>
                          </StatusIndicator>
                        </Tooltip>
                      ) : (
                        <StatusIndicator
                          alignSelf="center"
                          type={
                            productionStatus === "Completed" ||
                            collaborationState.status === "accepted" ||
                            acceptedItems.request ||
                            acceptedItems.proposal
                              ? "success"
                              : collaborationState.activeCardAuthorRole !== userState.role
                                ? "warning"
                                : "quiet"
                          }
                        >
                          {productionStatus === "Completed" ||
                          collaborationState.status === "accepted" ||
                          acceptedItems.request ||
                          acceptedItems.proposal ? (
                            "Accepted"
                          ) : collaborationState.activeCardAuthorRole === userState.role ? (
                            <TruncatedText fontSize="smaller" lineHeight="smallerText" fullWidth maxWidth="184px">
                              {`Awaiting ${userState.role === "supplier" ? "customer" : "supplier"} response`}
                            </TruncatedText>
                          ) : (
                            "Requires your response"
                          )}
                        </StatusIndicator>
                      )}
                    </>
                  )}
                </Flex>
                <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
                  {productionStatus === "Completed" ||
                    collaborationState.status === "accepted" ||
                    acceptedItems.request ||
                  acceptedItems.proposal ? (
                    <>
                      On{" "}
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        September 24, 2025
                      </Text>
                    </>
                  ) : (
                    <>
                      For{" "}
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        2 days
                      </Text>
                    </>
                  )}
                </Text>
              </Flex>
              <SummaryDivider />

              <Flex flexDirection="column" width="200px" justifyContent="center" pt="x0_5" gap="x0_5">
                <Tooltip
                  tooltip={
                    <Box>
                      <Text fontSize="small" lineHeight="smallRelaxed">
                        {productionStatus === "Not started"
                          ? "0 / 15,000 eaches"
                          : productionStatus === "Completed"
                            ? "14,850 / 15,000 eaches"
                            : "7,500 / 15,000 eaches"}
                      </Text>
                    </Box>
                  }
                >
                  <Flex height="x2_5" alignItems="center" justifyContent="center">
                    <Box
                      height="x1"
                      width="100%"
                      backgroundColor={
                        productionStatus === "Not started"
                          ? "lightGrey"
                          : productionStatus === "Completed"
                            ? "darkGrey"
                            : "blue"
                      }
                      borderRadius="medium"
                    />
                  </Flex>
                </Tooltip>

                <Flex justifyContent={productionStatus === "Completed" ? "space-between" : "center"} alignItems="center" gap="x0_5">
                  <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed" style={{ whiteSpace: "nowrap" }}>
                    <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                      {productionStatus === "Not started" ? "0%" : productionStatus === "Completed" ? "99%" : "50%"}
                    </Text>{" "}
                    produced
                  </Text>
                  {productionStatus === "Completed" && (
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
              <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" pt="x0_5" gap="x0_5">
                {poStatus === "Late" && (
                  <>
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <StatusIndicator type="danger">Late</StatusIndicator>
                    </Flex>
                    <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        Production done
                      </Text>{" "}
                      milestone
                    </Text>
                  </>
                )}
                {poStatus === "At risk" && (
                  <>
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <StatusIndicator alignSelf="center" type="warning">
                        At risk
                      </StatusIndicator>
                    </Flex>
                    <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        Production done
                      </Text>{" "}
                      milestone
                    </Text>
                  </>
                )}
                {poStatus === "On time" && (
                  <>
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <StatusIndicator alignSelf="center" type="success">
                        On time
                      </StatusIndicator>
                    </Flex>
                    <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        Production done
                      </Text>{" "}
                      milestone
                    </Text>
                  </>
                )}
              </Flex>
            </Summary>
          );
        }}
      >
        <Flex alignItems="flex-end" gap="x2" mt="x1" ml="-4px">
          <StatusIndicator type={poliStatus === "Completed" || poliStatus === "Canceled" ? "neutral" : "quiet"}>
            {poliStatus}
          </StatusIndicator>
          <Text pl="x2" borderLeft="1px solid" borderColor="grey">
            12345678 – PR 24 SEPHORA ONLINE DELUXE OCT
          </Text>
        </Flex>
      </Header>
      <Page>
        {/* Action bar above details */}
        <Flex justifyContent="flex-end" alignItems="center" gap="x0_5" mb="x3">
          <IconicButton
            icon={detailsExpanded ? "collapse" : "expand"}
            labelHidden
            tooltip={detailsExpanded ? "Collapse details" : "Expand details"}
            onClick={() => setDetailsExpanded(!detailsExpanded)}
          >
            {detailsExpanded ? "Collapse details" : "Expand details"}
          </IconicButton>
          <VerticalDivider />
          <IconicButton icon="edit" labelHidden tooltip="Edit details" onClick={() => openSidebar("edit")}>
            Edit details
          </IconicButton>
        </Flex>
        {detailsExpanded && (
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
                <Text color="darkGrey">Customer's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                  <Text>{customerPOLineItemNumber}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{formData.edit.supplierPOLineItemNumber || "-"}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Status</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                  <StatusIndicator type={poliStatus === "Completed" || poliStatus === "Canceled" ? "neutral" : "quiet"}>
                  {poliStatus}
                </StatusIndicator>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Created on</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>February 1, 2025</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                  <Text color="darkGrey">{userState.role === "customer" ? "Supplier" : "Customer"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Claudia Supplier</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                  <Link underline={false}>{customerItemCodeAndDescription}</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's item code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-ITEM-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Tags</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Flex flexWrap="wrap" gap="x0_25">
                  {assignedTags.expressShipment && (
                    <StatusIndicator type="quiet">
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Express shipment
                      </Text>
                    </StatusIndicator>
                  )}
                  {assignedTags.validatedForAssembly && (
                    <StatusIndicator type={userState.role === "customer" ? "success" : "quiet"}>
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Validated for assembly
                      </Text>
                    </StatusIndicator>
                  )}
                  {!assignedTags.expressShipment && !assignedTags.validatedForAssembly && <Text>-</Text>}
                </Flex>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>High</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>LOT-2024-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-LOT-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{formData.edit.bomRevision || "-"}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Warehouse A - 123 Main St, City, State 12345</Text>
              </DescriptionDetails>
            </DescriptionGroup>
              {productionStatus === "Completed" && (
                <>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Need by date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>
                  {formData.edit.needByDate
                    ? new Date(formData.edit.needByDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "-"}
                </Text>
              </DescriptionDetails>
            </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Close production note</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>{formData.edit.closeProductionNote || "-"}</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
        )}
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Flex flexDirection="column" alignItems="flex-end" mt="x2">
              <Box mb="x2">
                <Switcher selected={uomView} onChange={(value) => setUomView(value as "customer" | "supplier")}>
                  <Switch value="customer">Customer's UOM</Switch>
                  <Switch value="supplier">Supplier's UOM</Switch>
                </Switcher>
              </Box>
            </Flex>
            <Card p="x1" mt="x0" mx="auto" minWidth="696px" maxWidth="1126px">
              <Flex flexDirection="column" gap="x2">
                {/* Requested production vs Supplier's proposal comparison */}
                <Flex gap="x3" p="x2" pb="0">
                  <Flex flexDirection="column" gap="x0_5" mt="x9" pl="x2_5" flex={1} minWidth="160px" maxWidth="200px">
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Quantity
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Due date
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Unit (each) price
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Reason
                    </Text>
                    <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                      Note
                    </Text>
                  </Flex>

                  {/* Customer's request */}
                  <Box minWidth="236px" maxWidth="420px" flex={1}>
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
                                  request: {
                                    ...prev.request,
                                    unitPrice: e.target.value,
                                  },
                                }))
                              }
                              placeholder="1"
                              suffix={formData.request.currency}
                              suffixWidth="160px"
                            />
                          </Box>
                          <Box width="100%">
                            <Box height="40px"></Box>
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
                          <Text
                            my="x1"
                            style={{
                              textDecoration: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "none";
                                if (!supplierProposalMade) return "none";
                                const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                                const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                                const isDifferent = requestQty !== proposalQty;
                                if (!isDifferent) return "none";

                                // Request column (customer's request)
                                // If activeCardAuthorRole is "customer" (customer made request, awaiting supplier), highlight customer's value in grey
                                // If activeCardAuthorRole is "supplier" (supplier made proposal, awaiting customer), highlight customer's value in yellow
                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "customer" && awaitingSupplier) {
                                  return "underline"; // Customer's value, awaiting supplier response
                                } else if (userState.role === "supplier" && awaitingSupplier) {
                                  return "underline"; // Supplier viewing customer's request, awaiting supplier response
                                }
                                return "none";
                              })(),
                              textDecorationColor: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                                if (!supplierProposalMade) return "transparent";
                                const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                                const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                                const isDifferent = requestQty !== proposalQty;
                                if (!isDifferent) return "transparent";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "customer" && awaitingSupplier) {
                                  return theme.colors.grey; // Customer's value, awaiting supplier response
                                } else if (userState.role === "supplier" && awaitingSupplier) {
                                  return theme.colors.yellow; // Supplier viewing customer's request, awaiting supplier response
                                }
                                return "transparent";
                              })(),
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {uomView === "supplier"
                              ? `${(parseFloat(formData.request.quantity.replace(/,/g, "")) / 20).toLocaleString()}`
                              : formData.request.quantity}{" "}
                            {uomView === "supplier" ? "cases" : "eaches"}
                          </Text>
                          <Text
                            my="x1"
                            style={{
                              textDecoration: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "none";
                                if (!supplierProposalMade) return "none";
                                const isDifferent =
                                  formData.request.productionDueDate !== formData.proposal.productionDueDate;
                                if (!isDifferent) return "none";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "customer" && awaitingSupplier) {
                                  return "underline";
                                } else if (userState.role === "supplier" && awaitingCustomer) {
                                  return "underline";
                                }
                                return "none";
                              })(),
                              textDecorationColor: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                                if (!supplierProposalMade) return "transparent";
                                const isDifferent =
                                  formData.request.productionDueDate !== formData.proposal.productionDueDate;
                                if (!isDifferent) return "transparent";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "customer" && awaitingSupplier) {
                                  return theme.colors.grey;
                                } else if (userState.role === "supplier" && awaitingCustomer) {
                                  return theme.colors.yellow;
                                }
                                return "transparent";
                              })(),
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {formData.request.productionDueDate}
                          </Text>
                          <Text
                            my="x1"
                            style={{
                              textDecoration: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "none";
                                if (!supplierProposalMade) return "none";
                                const isDifferent = formData.request.unitPrice !== formData.proposal.unitPrice;
                                if (!isDifferent) return "none";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "customer" && awaitingSupplier) {
                                  return "underline";
                                } else if (userState.role === "supplier" && awaitingCustomer) {
                                  return "underline";
                                }
                                return "none";
                              })(),
                              textDecorationColor: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                                if (!supplierProposalMade) return "transparent";
                                const isDifferent = formData.request.unitPrice !== formData.proposal.unitPrice;
                                if (!isDifferent) return "transparent";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "customer" && awaitingSupplier) {
                                  return theme.colors.grey;
                                } else if (userState.role === "supplier" && awaitingCustomer) {
                                  return theme.colors.yellow;
                                }
                                return "transparent";
                              })(),
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {formData.request.unitPrice} {formData.request.currency}
                          </Text>
                          <Text my="x1" height="x3"></Text>
                          <Text my="x1" minHeight="96px">
                            {formData.request.note}
                          </Text>
                        </>
                      )}
                    </Flex>
                  </Box>

                  {/* Supplier's proposal */}
                  <Box maxWidth="420px" minWidth="236px" flex={1}>
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
                                  { value: "cases", label: "cases" },
                                  { value: "eaches", label: "eaches" },
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
                                disabled={userState.role !== "supplier"}
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
                                suffix={uomView === "supplier" ? "cases" : "eaches"}
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
                                  proposal: {
                                    ...prev.proposal,
                                    unitPrice: e.target.value,
                                  },
                                }))
                              }
                              placeholder="1"
                              suffix={formData.proposal.currency}
                              suffixWidth="160px"
                            />
                          </Box>
                          <Box width="100%">
                            <Select
                              options={[
                                { value: "Quality requirements", label: "Quality requirements" },
                                { value: "Production delay", label: "Production delay" },
                                { value: "Material shortage", label: "Material shortage" },
                                { value: "Equipment maintenance", label: "Equipment maintenance" },
                                { value: "Other", label: "Other" },
                              ]}
                              value={formData.proposal.reason}
                              onChange={(option) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  proposal: { ...prev.proposal, reason: option as string },
                                }))
                              }
                              width="100%"
                              placeholder="Select reason"
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
                          <Text
                            my="x1"
                            style={{
                              textDecoration: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "none";
                                if (!supplierProposalMade) return "none";
                                const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                                const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                                const isDifferent = requestQty !== proposalQty;
                                if (!isDifferent) return "none";

                                // Proposal column (supplier's proposal)
                                // Only underline when awaiting customer response (activeCardAuthorRole === "supplier")
                                // If activeCardAuthorRole is "supplier" (supplier made proposal, awaiting customer), highlight supplier's value in grey
                                // If activeCardAuthorRole is "customer" (customer made request, awaiting supplier), do NOT underline proposal (we underline request instead)
                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "supplier" && awaitingCustomer) {
                                  return "underline"; // Supplier's value, awaiting customer response
                                } else if (userState.role === "customer" && awaitingCustomer) {
                                  return "underline"; // Customer viewing supplier's proposal, awaiting customer response (yellow)
                                }
                                return "none";
                              })(),
                              textDecorationColor: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                                if (!supplierProposalMade) return "transparent";
                                const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                                const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                                const isDifferent = requestQty !== proposalQty;
                                if (!isDifferent) return "transparent";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "supplier" && awaitingCustomer) {
                                  return theme.colors.grey; // Supplier's value, awaiting customer response
                                } else if (userState.role === "customer" && awaitingCustomer) {
                                  return theme.colors.yellow; // Customer viewing supplier's proposal, awaiting customer response
                                }
                                return "transparent";
                              })(),
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {uomView === "supplier"
                              ? `${(parseFloat(formData.proposal.quantity.replace(/,/g, "")) / 20).toLocaleString()}`
                              : formData.proposal.quantity}{" "}
                            {uomView === "supplier" ? "cases" : "eaches"}
                          </Text>
                          <Text
                            my="x1"
                            style={{
                              textDecoration: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "none";
                                if (!supplierProposalMade) return "none";
                                const isDifferent =
                                  formData.request.productionDueDate !== formData.proposal.productionDueDate;
                                if (!isDifferent) return "none";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "supplier" && awaitingCustomer) {
                                  return "underline";
                                } else if (userState.role === "customer" && awaitingCustomer) {
                                  return "underline";
                                }
                                return "none";
                              })(),
                              textDecorationColor: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                                if (!supplierProposalMade) return "transparent";
                                const isDifferent =
                                  formData.request.productionDueDate !== formData.proposal.productionDueDate;
                                if (!isDifferent) return "transparent";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "supplier" && awaitingCustomer) {
                                  return theme.colors.grey;
                                } else if (userState.role === "customer" && awaitingCustomer) {
                                  return theme.colors.yellow;
                                }
                                return "transparent";
                              })(),
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {formData.proposal.productionDueDate}
                          </Text>
                          <Text
                            my="x1"
                            style={{
                              textDecoration: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "none";
                                if (!supplierProposalMade) return "none";
                                const isDifferent = formData.request.unitPrice !== formData.proposal.unitPrice;
                                if (!isDifferent) return "none";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "supplier" && awaitingCustomer) {
                                  return "underline";
                                } else if (userState.role === "customer" && awaitingCustomer) {
                                  return "underline";
                                }
                                return "none";
                              })(),
                              textDecorationColor: (() => {
                                if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                                if (!supplierProposalMade) return "transparent";
                                const isDifferent = formData.request.unitPrice !== formData.proposal.unitPrice;
                                if (!isDifferent) return "transparent";

                                const awaitingSupplier = collaborationState.activeCardAuthorRole === "customer";
                                const awaitingCustomer = collaborationState.activeCardAuthorRole === "supplier";

                                if (userState.role === "supplier" && awaitingCustomer) {
                                  return theme.colors.grey;
                                } else if (userState.role === "customer" && awaitingCustomer) {
                                  return theme.colors.yellow;
                                }
                                return "transparent";
                              })(),
                              textDecorationThickness: "2px",
                              textUnderlineOffset: "4px",
                            }}
                          >
                            {formData.proposal.unitPrice} {formData.proposal.currency}
                          </Text>
                          <Text my="x1">{formData.proposal.reason || "-"}</Text>
                          <Text my="x1">{formData.proposal.note}</Text>
                        </>
                      ) : (
                        <>
                          <Text my="x1">-</Text>
                          <Text my="x1">-</Text>
                          <Text my="x1">-</Text>
                          <Text my="x1" minHeight="96px">
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
                      <PrimaryButton
                        onClick={() => submitUpdate(editMode)}
                        disabled={!hasChanges(editMode) || poliStatus === "Canceled"}
                      >
                        {editMode === "request" ? "Submit request" : "Submit proposal"}
                      </PrimaryButton>
                      <QuietButton onClick={exitEditMode} disabled={poliStatus === "Canceled"}>
                        Cancel
                      </QuietButton>
                    </>
                  ) : (
                    <>
                      {/* Always show edit buttons based on user role */}
                      {userState.role === "supplier" && (
                        <>
                          <QuietButton onClick={() => enterEditMode("proposal")} disabled={poliStatus === "Canceled"}>
                            Update proposal
                          </QuietButton>
                          <QuietButton
                            onClick={acceptCustomerRequest}
                            disabled={
                              acceptedItems.request ||
                              poliStatus === "Canceled" ||
                              collaborationState.activeCardAuthorRole === null
                            }
                          >
                            Accept customer's request
                          </QuietButton>
                        </>
                      )}
                      {userState.role === "customer" && (
                        <>
                          <QuietButton onClick={() => enterEditMode("request")} disabled={poliStatus === "Canceled"}>
                            Update request
                          </QuietButton>
                          <QuietButton
                            onClick={acceptSupplierProposal}
                            disabled={
                              acceptedItems.proposal ||
                              poliStatus === "Canceled" ||
                              collaborationState.activeCardAuthorRole === null
                            }
                          >
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
            {userState.role === "supplier" && (
              <Flex justifyContent="flex-end" alignItems="center" gap="x3" mb="x3" px="x3" py="x2">
                <IconicButton icon="add" onClick={() => {}}>
                  Create production record
                </IconicButton>
                <IconicButton icon="close" onClick={() => setIsCloseProductionModalOpen(true)}>
                  Close production
                </IconicButton>
              </Flex>
            )}
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
          borderRadius="rounded"
          boxShadow="large"
          px="x2"
          py="x1"
          border="3px dotted"
          borderColor="yellow"
          backgroundColor="lightYellow"
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
              <Text fontSize="small" color="midGrey" width="60px" textAlign="right">
                Awaiting:
              </Text>
              <Select
                minWidth="200px"
                options={[
                  { value: "customer", label: "Supplier's response" },
                  { value: "supplier", label: "Customer's response" },
                  { value: "none", label: "None" },
                ]}
                value={
                  collaborationState.activeCardAuthorRole === null
                    ? "none"
                    : collaborationState.activeCardAuthorRole || "supplier"
                }
                onChange={(option) => {
                  if (option === "none") {
                    // Apply Accepted state - same as clicking Accept
                    if (collaborationState.activeCardAuthorRole === "customer") {
                      // Awaiting supplier's response, so accept the request
                      acceptCustomerRequest();
                    } else if (collaborationState.activeCardAuthorRole === "supplier") {
                      // Awaiting customer's response
                      if (userState.role === "customer") {
                        // Viewed as Customer - bring up Dual acceptance modal
                        acceptSupplierProposal();
                      } else {
                        // Viewed as Supplier - accept directly without modal
                        setAcceptedItems((prev) => ({ ...prev, proposal: true }));
                        setFormData((prev) => ({
                          ...prev,
                          request: {
                            ...prev.request,
                            quantity: prev.proposal.quantity,
                          },
                        }));
                        toast.success("Proposal accepted");
                      }
                    }
                    // Set to null to show "None" state
                    setCollaborationState((prev) => ({
                      ...prev,
                      activeCardAuthorRole: null,
                    }));
                  } else {
                  setCollaborationState((prev) => ({
                    ...prev,
                    activeCardAuthorRole: option as "supplier" | "customer",
                    }));
                }
                }}
                placeholder="Select author role"
                menuPlacement="top"
                width="160px"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center">
              <Text fontSize="small" color="midGrey" width="110px" textAlign="right">
                Milestone status:
              </Text>
              <Select
                maxWidth="120px"
                options={[
                  { value: "Late", label: "Late" },
                  { value: "At risk", label: "At risk" },
                  { value: "On time", label: "On time" },
                ]}
                value={poStatus}
                onChange={(option) => setPoStatus(option as "Late" | "At risk" | "On time")}
                placeholder="Select Milestone status"
                menuPlacement="top"
                width="160px"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center">
              <Text fontSize="small" color="midGrey" width="80px" textAlign="right">
                POLI status:
              </Text>
              <Select
                maxWidth="140px"
                options={[
                  { value: "Open", label: "Open" },
                  { value: "Canceled", label: "Canceled" },
                  { value: "Completed", label: "Completed" },
                ]}
                value={poliStatus}
                onChange={(option) => setPoliStatus(option as "Open" | "Canceled" | "Completed")}
                placeholder="Select POLI status"
                menuPlacement="top"
                width="160px"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center" width="220px">
              <Text fontSize="small" color="midGrey" width="90px" textAlign="right">
                Production:
              </Text>
              <Select
                minWidth="140px"
                options={[
                  { value: "Not started", label: "Not started" },
                  { value: "In progress", label: "In progress" },
                  { value: "Completed", label: "Completed" },
                ]}
                value={productionStatus}
                onChange={(option) => setProductionStatus(option as "Not started" | "In progress" | "Completed")}
                placeholder="Select production status"
                menuPlacement="top"
                width="160px"
              />
            </Flex>
            <VerticalDivider />
            <Flex gap="x1" justifyContent="center" alignItems="center" width="220px">
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
                toast.success("PO line item details saved");
              }}
            >
              Save
            </PrimaryButton>
            <QuietButton onClick={() => closeSidebar("edit")}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Flex flexDirection="column" gap="x3" py="x1">
          {/* PO number - disabled */}
          <Input labelText="PO number" id="poNumber" value="PO-00000004" disabled />

          {/* Customer's PO line item number - disabled */}
          <Input labelText="Customer's PO line item number" id="customerPOLineItemNumber" value="POLI-001" disabled />

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

          {/* Created on - disabled */}
          <Input labelText="Created on" id="createdOn" value="February 1, 2025" disabled />

          {/* Customer / Supplier - disabled */}
          <Input
            labelText={userState.role === "customer" ? "Supplier" : "Customer"}
            id="customerSupplier"
            value="Claudia Supplier"
            disabled
          />

          {/* Customer's item code and description - disabled */}
          <Input
            labelText="Customer's item code and description"
            id="customerItemCode"
            value={customerItemCodeAndDescription}
            disabled
          />

          {/* Supplier's item code - disabled */}
          <Input labelText="Supplier's item code" id="supplierItemCode" value="SUP-ITEM-001" disabled />

          {/* Tags - disabled */}
          <Input labelText="Tags" id="tags" value="" disabled />

          {/* Priority - editable only by customer */}
          {userState.role === "customer" && (
            <Select
              labelText="Priority"
              id="priority"
              value={formData.edit.priority}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, edit: { ...prev.edit, priority: value as string } }))
              }
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
                { value: "Urgent", label: "Urgent" },
              ]}
            />
          )}

          {/* Customer's lot code - editable only by customer */}
          {userState.role === "customer" && (
            <Input
              labelText="Customer's lot code"
              id="customerLotCode"
              value={formData.edit.customerLotCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, edit: { ...prev.edit, customerLotCode: e.target.value } }))
              }
            />
          )}

          {/* Supplier's lot code - editable only by supplier */}
          {userState.role === "supplier" && (
            <Input
              labelText="Supplier's lot code"
              id="supplierLotCode"
              value={formData.edit.supplierLotCode}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, edit: { ...prev.edit, supplierLotCode: e.target.value } }))
              }
            />
          )}

          {/* BOM revision and release date - editable by supplier and customer */}
          <AsyncSelect
            labelText="BOM revision and release date"
            placeholder="Start typing"
            loadOptions={loadOptions}
            value={formData.edit.bomRevision}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, edit: { ...prev.edit, bomRevision: value as string } }))
            }
          />

          {/* Ship to - disabled */}
          <Input labelText="Ship to" id="shipTo" value="Warehouse A - 123 Main St, City, State 12345" disabled />

          {/* Need by date - disabled */}
          <Input
            labelText="Need by date"
            id="needByDateDisplay"
            value={
              formData.edit.needByDate
                ? new Date(formData.edit.needByDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"
            }
            disabled
          />

          {/* Close production note - disabled, shown only if production complete */}
          {productionStatus === "Completed" && (
            <Input
              labelText="Close production note"
              id="closeProductionNote"
              value={formData.edit.closeProductionNote || "-"}
              disabled
            />
          )}

          {/* Carry over sent to - disabled, shown only if production complete */}
          {productionStatus === "Completed" && (
            <Input
              labelText="Carry over sent to"
              id="carryOverSentTo"
              value={formData.edit.carryOverSentTo || "-"}
              disabled
            />
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
            <PrimaryButton onClick={handleAcceptanceConfirm}>Accept proposal</PrimaryButton>
            <QuietButton onClick={handleAcceptanceCancel}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Box px="half">
          <Flex flexDirection="column" gap="x1">
            <Box mb="x1">
              <Flex alignItems="center" gap="x1">
              <Radio
                name="acceptance-option"
                value="without-flagging"
                  labelText="Accept and update request"
                checked={acceptanceOption === "without-flagging"}
                onChange={() => setAcceptanceOption("without-flagging")}
              />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ReconciledIcon variant="standard" size={20} />
                </Box>
              </Flex>
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed" ml="x3">
                This will update your requested quantity to match the supplier's proposal.
              </Text>
            </Box>
            <Divider m="0" />
            <Box mb="x1">
              <Flex alignItems="center" gap="x1">
              <Radio
                name="acceptance-option"
                value="with-flagging"
                  labelText="Accept and retain request"
                checked={acceptanceOption === "with-flagging"}
                onChange={() => setAcceptanceOption("with-flagging")}
              />
                <Box display="flex" alignItems="center" justifyContent="center">
                  <ReconciledIcon variant="flagged" size={20} />
                </Box>
              </Flex>
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed" ml="x3">
                This will accept the proposal but keep your requested quantity.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Modal>

      {/* Close Production Modal */}
      <Modal
        isOpen={isCloseProductionModalOpen}
        onRequestClose={() => setIsCloseProductionModalOpen(false)}
        title="Close production?"
        footerContent={
          <Flex justifyContent="flex-start" gap="x2">
            <PrimaryButton
              onClick={() => {
                // Handle close production
                setIsCloseProductionModalOpen(false);
                setCloseProductionNote("");
                toast.success("Production closed");
              }}
            >
              Yes, close production
            </PrimaryButton>
            <QuietButton
              onClick={() => {
                setIsCloseProductionModalOpen(false);
                setCloseProductionNote("");
              }}
            >
              No, cancel
            </QuietButton>
          </Flex>
        }
      >
        <Box px="half">
          <Text mb="x2">
            Close production manually to indicate that production is completed on this line item when it will not be
            produced in full.
          </Text>

          <Text fontSize="small" fontWeight="bold" lineHeight="smallCompressed">
            Actual attainment
          </Text>
          <Text mb="x2">8,187 liters / 9,157 liters (89.41% attainment)</Text>

          <Textarea
            labelText="Close production note"
            value={closeProductionNote}
            onChange={(e) => setCloseProductionNote(e.target.value)}
            placeholder="Provide reason(s) for closing production"
            rows={4}
          />
        </Box>
      </Modal>
    </ApplicationFrame>
  );
};

export const V2 = () => {
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

  // Form data
  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: new Date("2025-02-15"),
      closeProductionNote: "Production completed",
      carryOverSentTo: "",
    },
    request: {
      quantity: "15,000",
      unit: "eaches",
      productionDueDate: new Date("2025-02-28"),
      unitPrice: "12.50",
      currency: "USD",
      reason: "Quality requirements",
      note: "Standard production requirements. All items must meet the specified quality standards and pass quality control inspections before shipment. Packaging must comply with industry standards and include proper labeling. Delivery should be completed within the agreed timeframe to ensure production schedules.",
    },
    proposal: {
      quantity: "15,500",
      unit: "eaches",
      productionDueDate: new Date("2025-02-28"),
      unitPrice: "12.50",
      currency: "USD",
      reason: "Quality requirements",
      note: "Agreed to standard requirements",
    },
  });

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

  // POLI status state
  const [poliStatus, setPoliStatus] = useState<"Open" | "Canceled" | "Completed">("Open");

  // Acceptance modal state
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [acceptanceOption, setAcceptanceOption] = useState<"without-flagging" | "with-flagging">("without-flagging");
  const [isFlagged, setIsFlagged] = useState(false);

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
    toast.success(`${collaborationState.activeCardAuthorRole === "customer" ? "Request" : "Proposal"} accepted`);
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
    toast.success(`${userState.role === "supplier" ? "Proposal" : "Request"} submitted`);
  };

  const acceptCustomerRequest = () => {
    setAcceptedItems((prev) => ({ ...prev, request: true }));
    toast.success("Request accepted");
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
      toast.success("Proposal accepted");
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

    toast.success(`${mode === "request" ? "Request" : "Proposal"} updated`);
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
      ("reason" in currentValues && "reason" in originalValues && currentValues.reason !== originalValues.reason) ||
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
    toast.success("PO line item cancelled");
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
              {(productionComplete ||
                collaborationState.status === "accepted" ||
                acceptedItems.request ||
                acceptedItems.proposal) &&
              acceptedItems.proposal &&
              isFlagged ? (
                <Tooltip tooltip="With flagged acceptance">
                  <StatusIndicator alignSelf="center" type="success">
                    <Flex alignItems="center" gap="x0_25" pr="0">
                      Accepted
                      <Icon icon="error" size="x1_75" color="white" mr="-6px" />
                    </Flex>
                  </StatusIndicator>
                </Tooltip>
              ) : (
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
                  </Flex>
                </StatusIndicator>
              )}
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                On{" "}
                <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                  September 24, 2025
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
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x2">
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
                <Text color="darkGrey">Customer's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>POLI-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{formData.edit.supplierPOLineItemNumber || "-"}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Status</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <StatusIndicator type={poliStatus === "Completed" || poliStatus === "Canceled" ? "neutral" : "quiet"}>
                  {poliStatus}
                </StatusIndicator>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Created on</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>February 1, 2025</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "customer" ? "Supplier" : "Customer"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Claudia Supplier</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>TEST_ITEM_OPT_2 - this is the description of the item 2</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's item code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-ITEM-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Tags</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Flex flexWrap="wrap" gap="x0_25">
                  {assignedTags.expressShipment && (
                    <StatusIndicator type="quiet">
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Express shipment
                      </Text>
                    </StatusIndicator>
                  )}
                  {assignedTags.validatedForAssembly && (
                    <StatusIndicator type={userState.role === "customer" ? "success" : "quiet"}>
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Validated for assembly
                      </Text>
                    </StatusIndicator>
                  )}
                  {!assignedTags.expressShipment && !assignedTags.validatedForAssembly && <Text>-</Text>}
                </Flex>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>High</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>LOT-2024-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-LOT-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{formData.edit.bomRevision || "-"}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Warehouse A - 123 Main St, City, State 12345</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Need by date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>
                  {formData.edit.needByDate
                    ? new Date(formData.edit.needByDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "-"}
                </Text>
              </DescriptionDetails>
            </DescriptionGroup>
            {productionComplete && (
              <>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Close production note</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>{formData.edit.closeProductionNote || "-"}</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Carry over sent to</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>{formData.edit.carryOverSentTo || "-"}</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
        <style>
          {`
            .collaboration-card-request:hover:not(.card-edit-mode),
            .collaboration-card-proposal:hover:not(.card-edit-mode) {
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            }
          `}
        </style>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Flex flexDirection="column" gap="x2" maxWidth="1312px" mt="x3" mx="auto">
              {/* Requested production vs Supplier's proposal comparison */}
              <Flex gap="x3" justifyContent="space-around" alignItems="stretch" p="x2" pb="0">
                <Flex flexDirection="column" gap="x0_5" mt="96px" pl="x2_5" alignItems="flex-end">
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
                    Reason
                  </Text>
                  <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                    Note
                  </Text>
                </Flex>

                {/* Customer's request */}
                <Card
                  py="0"
                  minWidth="256px"
                  minHeight="440px"
                  flex={1}
                  boxShadow={editMode === "request" ? "medium" : "none"}
                  px="0"
                  backgroundColor={
                    acceptedItems.request ? "lightGreen" : editMode === "request" ? "white" : "whiteGrey"
                  }
                  border="1px solid"
                  borderRadius="large"
                  borderColor="lightGrey"
                  display="flex"
                  flexDirection="column"
                  className={`collaboration-card-request ${editMode === "request" ? "card-edit-mode" : ""} ${acceptedItems.proposal || editMode === "proposal" ? "card-deemphasized" : ""}`}
                  style={{ transition: "box-shadow 0.2s ease-in-out" }}
                >
                  <Flex
                    flexDirection="column"
                    gap="x0_25"
                    px="x2"
                    py="x1_5"
                    backgroundColor={
                      acceptedItems.request ? "green" : editMode === "request" ? "whiteGrey" : "lightGrey"
                    }
                    borderTopLeftRadius="large"
                    borderTopRightRadius="large"
                  >
                    <Flex alignItems="center" gap="x1" justifyContent="center">
                      <Text
                        fontWeight="medium"
                        color={
                          acceptedItems.request
                            ? "white"
                            : acceptedItems.proposal || editMode === "proposal"
                              ? "midGrey"
                              : undefined
                        }
                      >
                        {userState.role === "customer" ? "Your request" : "Customer's request"}
                      </Text>

                      {acceptedItems.request ? (
                        <Tooltip tooltip="Accepted">
                          <Box
                            backgroundColor="lightGreen"
                            borderRadius="medium"
                            p="x0_25"
                            width="x2_5"
                            height="x2_5"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon icon="check" size="x2" color="green" />
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
                    <Text
                      fontSize="small"
                      lineHeight="smallCompact"
                      textAlign="center"
                      color={
                        acceptedItems.request
                          ? "white"
                          : acceptedItems.proposal || editMode === "proposal"
                            ? "midGrey"
                            : "midGrey"
                      }
                    >
                      {acceptedItems.request ? (
                        <>
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                            by
                          </Text>{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                            John D.
                          </Text>{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                            on
                          </Text>{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                            February 6, 2025
                          </Text>
                        </>
                      ) : (
                        <>
                          by{" "}
                          <Text
                            as="span"
                            fontSize="small"
                            lineHeight="smallCompact"
                            color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : "black"}
                          >
                            John D.
                          </Text>{" "}
                          on{" "}
                          <Text
                            as="span"
                            fontSize="small"
                            lineHeight="smallCompact"
                            color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : "black"}
                          >
                            February 6, 2025
                          </Text>
                        </>
                      )}
                    </Text>
                  </Flex>

                  <Flex
                    flexDirection="column"
                    gap="x0_5"
                    px={editMode === "request" ? "x1" : "x2"}
                    py="x3"
                    backgroundColor={
                      acceptedItems.request ? "lightGreen" : editMode === "request" ? undefined : "whiteGrey"
                    }
                    borderRadius={acceptedItems.request ? undefined : "medium"}
                    borderBottomLeftRadius={acceptedItems.request ? "large" : undefined}
                    borderBottomRightRadius={acceptedItems.request ? "large" : undefined}
                    flex={1}
                  >
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
                          <DatePicker
                            selected={
                              formData.request.productionDueDate instanceof Date
                                ? formData.request.productionDueDate
                                : new Date(formData.request.productionDueDate)
                            }
                            onChange={(date) =>
                              setFormData((prev) => ({
                                ...prev,
                                request: { ...prev.request, productionDueDate: date || new Date() },
                              }))
                            }
                            placeholder="Enter production due date"
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
                          <Select
                            options={[
                              { value: "Quality requirements", label: "Quality requirements" },
                              { value: "Production delay", label: "Production delay" },
                              { value: "Material shortage", label: "Material shortage" },
                              { value: "Equipment maintenance", label: "Equipment maintenance" },
                              { value: "Other", label: "Other" },
                            ]}
                            value={formData.request.reason}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                request: { ...prev.request, reason: option as string },
                              }))
                            }
                            width="100%"
                            placeholder="Select reason"
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
                        <Flex flexDirection="column" gap="9.5px" flex={acceptedItems.request ? 1 : undefined} pt="8px">
                          <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                            {formData.request.quantity} {formData.request.unit}
                          </Text>
                          <Divider m="0" />
                          <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                            {formData.request.productionDueDate
                              ? formData.request.productionDueDate instanceof Date
                                ? formData.request.productionDueDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : formData.request.productionDueDate
                              : "-"}
                          </Text>
                          <Divider m="0" />
                          <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                            {formData.request.unitPrice} {formData.request.currency}
                          </Text>
                          <Divider m="0" />
                          <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                            -
                          </Text>
                          <Divider m="0" />
                          <TruncatedText
                            maxCharacters={256}
                            color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}
                          >
                            {formData.request.note}
                          </TruncatedText>
                        </Flex>
                      </>
                    )}
                  </Flex>

                  {!acceptedItems.request &&
                    (editMode === "request" ? (
                      <Flex gap="x2" p="x1" backgroundColor={undefined} borderRadius="medium">
                        <PrimaryButton
                          onClick={() => submitUpdate(editMode)}
                          disabled={!hasChanges(editMode)}
                          fullWidth
                        >
                          Submit request
                        </PrimaryButton>
                        <QuietButton onClick={exitEditMode} fullWidth>
                          Cancel
                        </QuietButton>
                      </Flex>
                    ) : (
                      <Flex p="x1" backgroundColor="whiteGrey" borderRadius="medium">
                        {userState.role === "supplier" && !acceptedItems.request && (
                          <QuietButton fullWidth onClick={acceptCustomerRequest}>
                            Accept customer's request
                          </QuietButton>
                        )}
                        {userState.role === "customer" && !acceptedItems.request && (
                          <QuietButton fullWidth onClick={() => enterEditMode("request")}>
                            Update request
                          </QuietButton>
                        )}
                      </Flex>
                    ))}
                </Card>

                {/* Supplier's proposal */}
                <Card
                  py="0"
                  minWidth="256px"
                  minHeight="440px"
                  flex={1}
                  boxShadow={editMode === "proposal" ? "medium" : "none"}
                  px="0"
                  backgroundColor={
                    acceptedItems.proposal ? "lightGreen" : editMode === "proposal" ? "white" : "whiteGrey"
                  }
                  border="1px solid"
                  borderRadius="large"
                  borderColor="lightGrey"
                  display="flex"
                  flexDirection="column"
                  className={`collaboration-card-proposal ${editMode === "proposal" ? "card-edit-mode" : ""} ${acceptedItems.request || editMode === "request" ? "card-deemphasized" : ""}`}
                  style={{ transition: "box-shadow 0.2s ease-in-out" }}
                >
                  <Flex
                    flexDirection="column"
                    gap="x0_25"
                    px="x2"
                    py="x1_5"
                    backgroundColor={
                      acceptedItems.proposal ? "green" : editMode === "proposal" ? "whiteGrey" : "lightGrey"
                    }
                    borderTopLeftRadius="large"
                    borderTopRightRadius="large"
                  >
                    <Flex alignItems="center" gap="x1" justifyContent="center">
                      <Text
                        fontWeight="medium"
                        color={
                          acceptedItems.proposal
                            ? "white"
                            : acceptedItems.request || editMode === "request"
                              ? "midGrey"
                              : undefined
                        }
                      >
                        {userState.role === "customer" ? "Supplier's proposal" : "Your proposal"}
                      </Text>
                      {acceptedItems.proposal ? (
                        <Tooltip tooltip="Accepted">
                          <Box
                            backgroundColor="lightGreen"
                            borderRadius="medium"
                            p="x0_25"
                            width="x2_5"
                            height="x2_5"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon icon="check" size="x2" color="green" />
                          </Box>
                        </Tooltip>
                      ) : (
                        <>
                          {(!acceptedItems.request &&
                            !acceptedItems.proposal &&
                            userState.role === "supplier" &&
                            collaborationState.activeCardAuthorRole === "supplier") ||
                          (userState.role === "customer" && collaborationState.activeCardAuthorRole === "supplier") ? (
                            <Tooltip
                              tooltip={
                                userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier"
                                  ? "Awaiting customer's response"
                                  : "Requires your response"
                              }
                            >
                              <Box
                                backgroundColor={
                                  userState.role === "supplier" &&
                                  collaborationState.activeCardAuthorRole === "supplier"
                                    ? "white"
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
                    <Text
                      fontSize="small"
                      lineHeight="smallCompact"
                      textAlign="center"
                      color={
                        acceptedItems.proposal
                          ? "white"
                          : acceptedItems.request || editMode === "request"
                            ? "midGrey"
                            : "midGrey"
                      }
                    >
                      {acceptedItems.proposal ? (
                        supplierProposalMade ? (
                          userState.role === "customer" ? (
                            <>
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                by
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                Supplier A.
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                on
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                February 6, 2025
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                by
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                you
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                on
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                February 6, 2025
                              </Text>
                            </>
                          )
                        ) : null
                      ) : supplierProposalMade ? (
                        userState.role === "customer" ? (
                          <>
                            by{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
                              Supplier A.
                            </Text>{" "}
                            on{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
                              February 6, 2025
                            </Text>
                          </>
                        ) : (
                          <>
                            by{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
                              you
                            </Text>{" "}
                            on{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
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

                  <Flex
                    flexDirection="column"
                    gap="x0_5"
                    px={editMode === "proposal" ? "x1" : "x2"}
                    py="x3"
                    backgroundColor={
                      acceptedItems.proposal ? "lightGreen" : editMode === "proposal" ? undefined : "whiteGrey"
                    }
                    borderRadius={acceptedItems.proposal ? undefined : "medium"}
                    borderBottomLeftRadius={acceptedItems.proposal ? "large" : undefined}
                    borderBottomRightRadius={acceptedItems.proposal ? "large" : undefined}
                    flex={1}
                  >
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
                          <DatePicker
                            selected={
                              formData.proposal.productionDueDate instanceof Date
                                ? formData.proposal.productionDueDate
                                : new Date(formData.proposal.productionDueDate)
                            }
                            onChange={(date) =>
                              setFormData((prev) => ({
                                ...prev,
                                proposal: { ...prev.proposal, productionDueDate: date || new Date() },
                              }))
                            }
                            placeholder="Enter production due date"
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
                          <Select
                            options={[
                              { value: "Quality requirements", label: "Quality requirements" },
                              { value: "Production delay", label: "Production delay" },
                              { value: "Material shortage", label: "Material shortage" },
                              { value: "Equipment maintenance", label: "Equipment maintenance" },
                              { value: "Other", label: "Other" },
                            ]}
                            value={formData.proposal.reason}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                proposal: { ...prev.proposal, reason: option as string },
                              }))
                            }
                            width="100%"
                            placeholder="Select reason"
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
                        <Flex flexDirection="column" gap="9.5px" flex={acceptedItems.proposal ? 1 : undefined} pt="8px">
                          <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                            {formData.proposal.quantity} {formData.proposal.unit}
                          </Text>
                          <Divider m="0" />
                          <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                            {formData.proposal.productionDueDate
                              ? formData.proposal.productionDueDate instanceof Date
                                ? formData.proposal.productionDueDate.toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })
                                : formData.proposal.productionDueDate
                              : "-"}
                          </Text>
                          <Divider m="0" />
                          <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                            {formData.proposal.unitPrice} {formData.proposal.currency}
                          </Text>
                          <Divider m="0" />
                          <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                            {formData.proposal.reason || "-"}
                          </Text>
                          <Divider m="0" />
                          <TruncatedText
                            maxCharacters={256}
                            color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}
                          >
                            {formData.proposal.note}
                          </TruncatedText>
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Text my="x1">-</Text>
                        <Text my="x1">-</Text>
                        <Text my="x1">-</Text>
                        <Text my="x1" minHeight="96px">
                          -
                        </Text>
                      </>
                    )}
                  </Flex>

                  {!acceptedItems.proposal &&
                    (editMode === "proposal" ? (
                      <Flex gap="x2" p="x1" backgroundColor={undefined} borderRadius="medium">
                        <PrimaryButton
                          onClick={() => submitUpdate(editMode)}
                          disabled={!hasChanges(editMode)}
                          fullWidth
                        >
                          Submit proposal
                        </PrimaryButton>
                        <QuietButton onClick={exitEditMode} fullWidth>
                          Cancel
                        </QuietButton>
                      </Flex>
                    ) : (
                      <Flex p="x1" backgroundColor="whiteGrey" borderRadius="medium">
                        {userState.role === "supplier" && !acceptedItems.proposal && (
                          <QuietButton fullWidth onClick={() => enterEditMode("proposal")}>
                            Update proposal
                          </QuietButton>
                        )}
                        {userState.role === "customer" && !acceptedItems.proposal && (
                          <QuietButton fullWidth onClick={acceptSupplierProposal}>
                            Accept supplier's proposal
                          </QuietButton>
                        )}
                      </Flex>
                    ))}
                </Card>
              </Flex>
            </Flex>
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
                toast.success("PO line item details saved");
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
            <PrimaryButton onClick={handleAcceptanceConfirm}>Accept proposal</PrimaryButton>
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
                labelText="Accept and update request"
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
                labelText="Accept and retain request"
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
export const V3 = () => {
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

  // Form data
  const [formData, setFormData] = useState({
    edit: {
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: new Date("2025-02-15"),
      closeProductionNote: "Production completed",
      carryOverSentTo: "",
    },
    request: {
      quantity: "15,000",
      unit: "eaches",
      productionDueDate: new Date("2025-02-28"),
      unitPrice: "12.50",
      currency: "USD",
      reason: "Quality requirements",
      note: "Standard production requirements. All items must meet the specified quality standards and pass quality control inspections before shipment. Packaging must comply with industry standards and include proper labeling. Delivery should be completed within the agreed timeframe to ensure production schedules.",
    },
    proposal: {
      quantity: "15,500",
      unit: "eaches",
      productionDueDate: new Date("2025-02-28"),
      unitPrice: "12.50",
      currency: "USD",
      reason: "Quality requirements",
      note: "Agreed to standard requirements",
    },
  });

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

  // POLI status state
  const [poliStatus, setPoliStatus] = useState<"Open" | "Canceled" | "Completed">("Open");

  // Acceptance modal state
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [acceptanceOption, setAcceptanceOption] = useState<"without-flagging" | "with-flagging">("without-flagging");
  const [isFlagged, setIsFlagged] = useState(false);

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
    toast.success(`${collaborationState.activeCardAuthorRole === "customer" ? "Request" : "Proposal"} accepted`);
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
    toast.success(`${userState.role === "supplier" ? "Proposal" : "Request"} submitted`);
  };

  const acceptCustomerRequest = () => {
    setAcceptedItems((prev) => ({ ...prev, request: true }));
    toast.success("Request accepted");
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
      toast.success("Proposal accepted");
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

    toast.success(`${mode === "request" ? "Request" : "Proposal"} updated`);
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
      ("reason" in currentValues && "reason" in originalValues && currentValues.reason !== originalValues.reason) ||
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
    toast.success("PO line item cancelled");
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
              {(productionComplete ||
                collaborationState.status === "accepted" ||
                acceptedItems.request ||
                acceptedItems.proposal) &&
              acceptedItems.proposal &&
              isFlagged ? (
                <Tooltip tooltip="With flagged acceptance">
                  <StatusIndicator alignSelf="center" type="success">
                    <Flex alignItems="center" gap="x0_25" pr="0">
                      Accepted
                      <Icon icon="error" size="x1_75" color="white" mr="-6px" />
                    </Flex>
                  </StatusIndicator>
                </Tooltip>
              ) : (
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
                  </Flex>
                </StatusIndicator>
              )}
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                On{" "}
                <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                  September 24, 2025
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
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x2">
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
                <Text color="darkGrey">Customer's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>POLI-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's PO line item number</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{formData.edit.supplierPOLineItemNumber || "-"}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Status</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <StatusIndicator type={poliStatus === "Completed" || poliStatus === "Canceled" ? "neutral" : "quiet"}>
                  {poliStatus}
                </StatusIndicator>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Created on</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>February 1, 2025</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">{userState.role === "customer" ? "Supplier" : "Customer"}</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Claudia Supplier</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's item code and description</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>TEST_ITEM_OPT_2 - this is the description of the item 2</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's item code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-ITEM-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Tags</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Flex flexWrap="wrap" gap="x0_25">
                  {assignedTags.expressShipment && (
                    <StatusIndicator type="quiet">
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Express shipment
                      </Text>
                    </StatusIndicator>
                  )}
                  {assignedTags.validatedForAssembly && (
                    <StatusIndicator type={userState.role === "customer" ? "success" : "quiet"}>
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Validated for assembly
                      </Text>
                    </StatusIndicator>
                  )}
                  {!assignedTags.expressShipment && !assignedTags.validatedForAssembly && <Text>-</Text>}
                </Flex>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Priority</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>High</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Customer's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>LOT-2024-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Supplier's lot code</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>SUP-LOT-001</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">BOM revision and release date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>{formData.edit.bomRevision || "-"}</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Ship to</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>Warehouse A - 123 Main St, City, State 12345</Text>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>
                <Text color="darkGrey">Need by date</Text>
              </DescriptionTerm>
              <DescriptionDetails>
                <Text>
                  {formData.edit.needByDate
                    ? new Date(formData.edit.needByDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "-"}
                </Text>
              </DescriptionDetails>
            </DescriptionGroup>
            {productionComplete && (
              <>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Close production note</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>{formData.edit.closeProductionNote || "-"}</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Carry over sent to</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    <Text>{formData.edit.carryOverSentTo || "-"}</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
        <style>
          {`
            .collaboration-card-request:hover:not(.card-edit-mode),
            .collaboration-card-proposal:hover:not(.card-edit-mode) {
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
            }
          `}
        </style>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Flex flexDirection="column" gap="x2" maxWidth="1312px" mt="x3" mx="auto">
              {/* Requested production vs Supplier's proposal comparison */}
              <Flex gap="x3" justifyContent="space-around" alignItems="stretch" p="x2" pb="0">
                {/* Customer's request */}
                <Card
                  py="0"
                  minWidth="256px"
                  minHeight="440px"
                  flex={1}
                  boxShadow={editMode === "request" ? "medium" : "none"}
                  px="0"
                  backgroundColor={
                    acceptedItems.request ? "lightGreen" : editMode === "request" ? "white" : "whiteGrey"
                  }
                  border="1px solid"
                  borderRadius="large"
                  borderColor="lightGrey"
                  display="flex"
                  flexDirection="column"
                  className={`collaboration-card-request ${editMode === "request" ? "card-edit-mode" : ""} ${acceptedItems.proposal || editMode === "proposal" ? "card-deemphasized" : ""}`}
                  style={{ transition: "box-shadow 0.2s ease-in-out" }}
                >
                  <Flex
                    flexDirection="column"
                    gap="x0_25"
                    px="x2"
                    py="x1_5"
                    backgroundColor={
                      acceptedItems.request ? "green" : editMode === "request" ? "whiteGrey" : "lightGrey"
                    }
                    borderTopLeftRadius="large"
                    borderTopRightRadius="large"
                  >
                    <Flex alignItems="center" gap="x1" justifyContent="center">
                      <Text
                        fontWeight="medium"
                        color={
                          acceptedItems.request
                            ? "white"
                            : acceptedItems.proposal || editMode === "proposal"
                              ? "midGrey"
                              : undefined
                        }
                      >
                        {userState.role === "customer" ? "Your request" : "Customer's request"}
                      </Text>

                      {acceptedItems.request ? (
                        <Tooltip tooltip="Accepted">
                          <Box
                            backgroundColor="lightGreen"
                            borderRadius="medium"
                            p="x0_25"
                            width="x2_5"
                            height="x2_5"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon icon="check" size="x2" color="green" />
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
                    <Text
                      fontSize="small"
                      lineHeight="smallCompact"
                      textAlign="center"
                      color={
                        acceptedItems.request
                          ? "white"
                          : acceptedItems.proposal || editMode === "proposal"
                            ? "midGrey"
                            : "midGrey"
                      }
                    >
                      {acceptedItems.request ? (
                        <>
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                            by
                          </Text>{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                            John D.
                          </Text>{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                            on
                          </Text>{" "}
                          <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                            February 6, 2025
                          </Text>
                        </>
                      ) : (
                        <>
                          by{" "}
                          <Text
                            as="span"
                            fontSize="small"
                            lineHeight="smallCompact"
                            color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : "black"}
                          >
                            John D.
                          </Text>{" "}
                          on{" "}
                          <Text
                            as="span"
                            fontSize="small"
                            lineHeight="smallCompact"
                            color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : "black"}
                          >
                            February 6, 2025
                          </Text>
                        </>
                      )}
                    </Text>
                  </Flex>

                  <Flex
                    flexDirection="column"
                    gap="x0_5"
                    px={editMode === "request" ? "x1" : "x2"}
                    py="x3"
                    backgroundColor={
                      acceptedItems.request ? "lightGreen" : editMode === "request" ? undefined : "whiteGrey"
                    }
                    borderRadius={acceptedItems.request ? undefined : "medium"}
                    borderBottomLeftRadius={acceptedItems.request ? "large" : undefined}
                    borderBottomRightRadius={acceptedItems.request ? "large" : undefined}
                    flex={1}
                  >
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
                          <DatePicker
                            selected={
                              formData.request.productionDueDate instanceof Date
                                ? formData.request.productionDueDate
                                : new Date(formData.request.productionDueDate)
                            }
                            onChange={(date) =>
                              setFormData((prev) => ({
                                ...prev,
                                request: { ...prev.request, productionDueDate: date || new Date() },
                              }))
                            }
                            placeholder="Enter production due date"
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
                          <Select
                            options={[
                              { value: "Quality requirements", label: "Quality requirements" },
                              { value: "Production delay", label: "Production delay" },
                              { value: "Material shortage", label: "Material shortage" },
                              { value: "Equipment maintenance", label: "Equipment maintenance" },
                              { value: "Other", label: "Other" },
                            ]}
                            value={formData.request.reason}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                request: { ...prev.request, reason: option as string },
                              }))
                            }
                            width="100%"
                            placeholder="Select reason"
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
                      <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="200px">
                        <DescriptionGroup>
                          <DescriptionTerm>Quantity</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                              {formData.request.quantity} {formData.request.unit}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Due date</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                              {formData.request.productionDueDate
                                ? formData.request.productionDueDate instanceof Date
                                  ? formData.request.productionDueDate.toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : formData.request.productionDueDate
                                : "-"}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Unit (each) price</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}>
                              {formData.request.unitPrice} {formData.request.currency}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Note</DescriptionTerm>
                          <DescriptionDetails>
                            <TruncatedText
                              maxCharacters={256}
                              color={acceptedItems.proposal || editMode === "proposal" ? "midGrey" : undefined}
                            >
                              {formData.request.note}
                            </TruncatedText>
                          </DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                    )}
                  </Flex>

                  {!acceptedItems.request &&
                    (editMode === "request" ? (
                      <Flex gap="x2" p="x1" backgroundColor={undefined} borderRadius="medium">
                        <PrimaryButton
                          onClick={() => submitUpdate(editMode)}
                          disabled={!hasChanges(editMode)}
                          fullWidth
                        >
                          Submit request
                        </PrimaryButton>
                        <QuietButton onClick={exitEditMode} fullWidth>
                          Cancel
                        </QuietButton>
                      </Flex>
                    ) : (
                      <Flex p="x1" backgroundColor="whiteGrey" borderRadius="medium">
                        {userState.role === "supplier" && !acceptedItems.request && (
                          <QuietButton fullWidth onClick={acceptCustomerRequest}>
                            Accept customer's request
                          </QuietButton>
                        )}
                        {userState.role === "customer" && !acceptedItems.request && (
                          <QuietButton fullWidth onClick={() => enterEditMode("request")}>
                            Update request
                          </QuietButton>
                        )}
                      </Flex>
                    ))}
                </Card>

                {/* Supplier's proposal */}
                <Card
                  py="0"
                  minWidth="256px"
                  minHeight="440px"
                  flex={1}
                  boxShadow={editMode === "proposal" ? "medium" : "none"}
                  px="0"
                  backgroundColor={
                    acceptedItems.proposal ? "lightGreen" : editMode === "proposal" ? "white" : "whiteGrey"
                  }
                  border="1px solid"
                  borderRadius="large"
                  borderColor="lightGrey"
                  display="flex"
                  flexDirection="column"
                  className={`collaboration-card-proposal ${editMode === "proposal" ? "card-edit-mode" : ""} ${acceptedItems.request || editMode === "request" ? "card-deemphasized" : ""}`}
                  style={{ transition: "box-shadow 0.2s ease-in-out" }}
                >
                  <Flex
                    flexDirection="column"
                    gap="x0_25"
                    px="x2"
                    py="x1_5"
                    backgroundColor={
                      acceptedItems.proposal ? "green" : editMode === "proposal" ? "whiteGrey" : "lightGrey"
                    }
                    borderTopLeftRadius="large"
                    borderTopRightRadius="large"
                  >
                    <Flex alignItems="center" gap="x1" justifyContent="center">
                      <Text
                        fontWeight="medium"
                        color={
                          acceptedItems.proposal
                            ? "white"
                            : acceptedItems.request || editMode === "request"
                              ? "midGrey"
                              : undefined
                        }
                      >
                        {userState.role === "customer" ? "Supplier's proposal" : "Your proposal"}
                      </Text>
                      {acceptedItems.proposal ? (
                        <Tooltip tooltip="Accepted">
                          <Box
                            backgroundColor="lightGreen"
                            borderRadius="medium"
                            p="x0_25"
                            width="x2_5"
                            height="x2_5"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <Icon icon="check" size="x2" color="green" />
                          </Box>
                        </Tooltip>
                      ) : (
                        <>
                          {(!acceptedItems.request &&
                            !acceptedItems.proposal &&
                            userState.role === "supplier" &&
                            collaborationState.activeCardAuthorRole === "supplier") ||
                          (userState.role === "customer" && collaborationState.activeCardAuthorRole === "supplier") ? (
                            <Tooltip
                              tooltip={
                                userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier"
                                  ? "Awaiting customer's response"
                                  : "Requires your response"
                              }
                            >
                              <Box
                                backgroundColor={
                                  userState.role === "supplier" &&
                                  collaborationState.activeCardAuthorRole === "supplier"
                                    ? "white"
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
                    <Text
                      fontSize="small"
                      lineHeight="smallCompact"
                      textAlign="center"
                      color={
                        acceptedItems.proposal
                          ? "white"
                          : acceptedItems.request || editMode === "request"
                            ? "midGrey"
                            : "midGrey"
                      }
                    >
                      {acceptedItems.proposal ? (
                        supplierProposalMade ? (
                          userState.role === "customer" ? (
                            <>
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                by
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                Supplier A.
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                on
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                February 6, 2025
                              </Text>
                            </>
                          ) : (
                            <>
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                by
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                you
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="lightGreen">
                                on
                              </Text>{" "}
                              <Text as="span" fontSize="small" lineHeight="smallCompact" color="white">
                                February 6, 2025
                              </Text>
                            </>
                          )
                        ) : null
                      ) : supplierProposalMade ? (
                        userState.role === "customer" ? (
                          <>
                            by{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
                              Supplier A.
                            </Text>{" "}
                            on{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
                              February 6, 2025
                            </Text>
                          </>
                        ) : (
                          <>
                            by{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
                              you
                            </Text>{" "}
                            on{" "}
                            <Text
                              as="span"
                              fontSize="small"
                              lineHeight="smallCompact"
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : "black"}
                            >
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

                  <Flex
                    flexDirection="column"
                    gap="x0_5"
                    px={editMode === "proposal" ? "x1" : "x2"}
                    py="x3"
                    backgroundColor={
                      acceptedItems.proposal ? "lightGreen" : editMode === "proposal" ? undefined : "whiteGrey"
                    }
                    borderRadius={acceptedItems.proposal ? undefined : "medium"}
                    borderBottomLeftRadius={acceptedItems.proposal ? "large" : undefined}
                    borderBottomRightRadius={acceptedItems.proposal ? "large" : undefined}
                    flex={1}
                  >
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
                          <DatePicker
                            selected={
                              formData.proposal.productionDueDate instanceof Date
                                ? formData.proposal.productionDueDate
                                : new Date(formData.proposal.productionDueDate)
                            }
                            onChange={(date) =>
                              setFormData((prev) => ({
                                ...prev,
                                proposal: { ...prev.proposal, productionDueDate: date || new Date() },
                              }))
                            }
                            placeholder="Enter production due date"
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
                          <Select
                            options={[
                              { value: "Quality requirements", label: "Quality requirements" },
                              { value: "Production delay", label: "Production delay" },
                              { value: "Material shortage", label: "Material shortage" },
                              { value: "Equipment maintenance", label: "Equipment maintenance" },
                              { value: "Other", label: "Other" },
                            ]}
                            value={formData.proposal.reason}
                            onChange={(option) =>
                              setFormData((prev) => ({
                                ...prev,
                                proposal: { ...prev.proposal, reason: option as string },
                              }))
                            }
                            width="100%"
                            placeholder="Select reason"
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
                      <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="160px">
                        <DescriptionGroup>
                          <DescriptionTerm>Quantity</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                              {formData.proposal.quantity} {formData.proposal.unit}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Due date</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                              {formData.proposal.productionDueDate
                                ? formData.proposal.productionDueDate instanceof Date
                                  ? formData.proposal.productionDueDate.toLocaleDateString("en-US", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })
                                  : formData.proposal.productionDueDate
                                : "-"}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Unit (each) price</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                              {formData.proposal.unitPrice} {formData.proposal.currency}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Reason</DescriptionTerm>
                          <DescriptionDetails>
                            <Text color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}>
                              {formData.proposal.reason || "-"}
                            </Text>
                          </DescriptionDetails>
                        </DescriptionGroup>
                        <DescriptionGroup>
                          <DescriptionTerm>Note</DescriptionTerm>
                          <DescriptionDetails>
                            <TruncatedText
                              maxCharacters={256}
                              color={acceptedItems.request || editMode === "request" ? "midGrey" : undefined}
                            >
                              {formData.proposal.note}
                            </TruncatedText>
                          </DescriptionDetails>
                        </DescriptionGroup>
                      </DescriptionList>
                    ) : (
                      <>
                        <Text my="x1">-</Text>
                        <Text my="x1">-</Text>
                        <Text my="x1">-</Text>
                        <Text my="x1" minHeight="96px">
                          -
                        </Text>
                      </>
                    )}
                  </Flex>

                  {!acceptedItems.proposal &&
                    (editMode === "proposal" ? (
                      <Flex gap="x2" p="x1" backgroundColor={undefined} borderRadius="medium">
                        <PrimaryButton
                          onClick={() => submitUpdate(editMode)}
                          disabled={!hasChanges(editMode)}
                          fullWidth
                        >
                          Submit proposal
                        </PrimaryButton>
                        <QuietButton onClick={exitEditMode} fullWidth>
                          Cancel
                        </QuietButton>
                      </Flex>
                    ) : (
                      <Flex p="x1" backgroundColor="whiteGrey" borderRadius="medium">
                        {userState.role === "supplier" && !acceptedItems.proposal && (
                          <QuietButton fullWidth onClick={() => enterEditMode("proposal")}>
                            Update proposal
                          </QuietButton>
                        )}
                        {userState.role === "customer" && !acceptedItems.proposal && (
                          <QuietButton fullWidth onClick={acceptSupplierProposal}>
                            Accept supplier's proposal
                          </QuietButton>
                        )}
                      </Flex>
                    ))}
                </Card>
              </Flex>
            </Flex>
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
                toast.success("PO line item details saved");
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
            <PrimaryButton onClick={handleAcceptanceConfirm}>Accept proposal</PrimaryButton>
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
                labelText="Accept and update request"
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
                labelText="Accept and retain request"
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
