import React, { useState, useRef, useEffect, useMemo } from "react";
import { toast, Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
  Heading2,
  Heading3,
  Heading4,
  Icon,
  QuietButton,
  PrimaryButton,
  Button,
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
  Modal,
  ButtonGroup,
  IconicButton,
  VerticalDivider,
  ToastContainer,
  BrandedNavBar,
  Divider,
  Pagination,
  Tab,
  Tabs,
  Table,
  Input,
  Textarea,
  AsyncSelect,
  Card,
  StatusIndicator,
  TruncatedText,
  Header,
  Summary,
  SummaryItem,
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
} from "../../..";
import { POLICard } from "./components/POLICard";
import { EditableRow } from "./components/EditableRow";

export default {
  title: "Projects/Supplier Collaboration/POLI details/Combined",
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

export const Default = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardsRowRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Scroll state
  const [scrollState, setScrollState] = useState({
    scrollPosition: 0,
    maxScrollLeft: 0,
    isOverflowing: false,
  });

  // Sidebar stateSwitcher
  const [sidebarState, setSidebarState] = useState({
    filters: false,
    edit: false,
    comments: false,
    newProposal: false,
  });

  // Collaboration state
  const [collaborationState, setCollaborationState] = useState({
    status: "awaiting" as "awaiting" | "accepted",
    showAcceptedCard: false,
    hasNewCard: false,
    activeCardAuthorRole: "supplier" as "supplier" | "customer" | null,
  });

  // User state
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
    viewMode: "supplier" as "supplier" | "customer",
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
    newProposal: {
      quantity: "100",
      uom: "cases",
      productionDueDate: new Date("2024-01-01"),
      unitPrice: "2.99",
      currency: "USD",
      changeReason: "",
      changeNote: "",
    },
    edit: {
      poNumber: "4000023874",
      customerItemCode: "12345678",
      customerItemDescription: "PR 24 SEPHORA ONLINE DELUXE OCT",
      customerPOLineItemNumber: "12345",
      supplierPOLineItemNumber: "23453",
      creationDate: new Date("2024-01-01"),
      customer: "MyCustomer",
      bomRevision: "Revision 2",
      bomReleaseDate: new Date("2025-02-28"),
      needByDate: new Date("2024-01-01"),
      shipTo: "MySupplier TO",
      carryOverSentTo: "",
      shortCloseReason: "",
    },
  });

  // Filter state - using switcher instead of checkboxes
  const [filterState, setFilterState] = useState({
    viewMode: "minimal" as "all" | "minimal",
  });

  // View mode state for Card/List switcher
  const [viewMode, setViewMode] = useState("card" as "card" | "list");

  // Table rows state
  const [hiddenRows, setHiddenRows] = useState<any[]>([]);

  // Helper functions
  const formatDateForDisplay = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const calculateCardsWidth = () => {
    const cardWidth = 480; // Fixed width for each card
    const cardBorderWidth = 2; // 1px left border + 1px right border
    const gapWidth = 16;
    const effectiveGapWidth = gapWidth - 2; // Account for border overlap (1px from each card)
    let numberOfCards = 0;
    let cardBreakdown = [];

    if (filterState.viewMode === "all") {
      // Show all cards
      numberOfCards = 4; // Original + 3 old cards
      cardBreakdown.push("Base 4 cards (Original + 3 old cards)");

      // User's latest request/proposal - shown in both views
      numberOfCards++;
      cardBreakdown.push("User's latest request/proposal");

      // Handle latest request/proposal cards
      if (collaborationState.status === "accepted") {
        // When accepted, show the previously active card as regular
        if (collaborationState.activeCardAuthorRole) {
          numberOfCards++;
          cardBreakdown.push("Previously active card (accepted state)");
        }
      } else {
        // When not accepted, show active card or previously active card
        if (collaborationState.activeCardAuthorRole) {
          if (collaborationState.hasNewCard) {
            // Show previously active as regular + new active card
            numberOfCards += 2;
            cardBreakdown.push("Previously active card + new active card");
          } else {
            // Show current active card
            numberOfCards++;
            cardBreakdown.push("Current active card");
          }
        }
      }

      // Handle accepted card
      if (collaborationState.showAcceptedCard) {
        numberOfCards++;
        cardBreakdown.push("Accepted card");
      }
    } else {
      // Minimal view: Original + User's latest + Latest + New proposal button
      numberOfCards = 1; // Original only
      cardBreakdown.push("Base 1 card (Original only)");

      // User's latest request/proposal - shown in both views
      numberOfCards++;
      cardBreakdown.push("User's latest request/proposal");

      // Handle latest request/proposal cards
      if (collaborationState.status === "accepted") {
        // When accepted, show the previously active card as regular
        if (collaborationState.activeCardAuthorRole) {
          numberOfCards++;
          cardBreakdown.push("Previously active card (accepted state)");
        }
      } else {
        // When not accepted, show active card or previously active card
        if (collaborationState.activeCardAuthorRole) {
          if (collaborationState.hasNewCard) {
            // Show previously active as regular + new active card
            numberOfCards += 2;
            cardBreakdown.push("Previously active card + new active card");
          } else {
            // Show current active card
            numberOfCards++;
            cardBreakdown.push("Current active card");
          }
        }
      }

      // Handle accepted card
      if (collaborationState.showAcceptedCard) {
        numberOfCards++;
        cardBreakdown.push("Accepted card");
      }
    }

    // New proposal button - always at the end
    if (collaborationState.status !== "accepted" && !productionComplete) {
      numberOfCards++;
      cardBreakdown.push("New proposal button");
    }

    const totalWidth = numberOfCards * cardWidth + (numberOfCards - 1) * effectiveGapWidth;
    console.log("Card width calculation:", { numberOfCards, totalWidth, cardBreakdown });
    return totalWidth;
  };

  const calculatedWidth = useMemo(calculateCardsWidth, [
    filterState.viewMode,
    collaborationState.status,
    collaborationState.showAcceptedCard,
    collaborationState.hasNewCard,
    collaborationState.activeCardAuthorRole,
    productionComplete,
  ]);

  const widthKey = useMemo(() => {
    return `${filterState.viewMode}-${collaborationState.status}-${collaborationState.showAcceptedCard}-${collaborationState.hasNewCard}-${collaborationState.activeCardAuthorRole}-${productionComplete}`;
  }, [
    filterState.viewMode,
    collaborationState.status,
    collaborationState.showAcceptedCard,
    collaborationState.hasNewCard,
    collaborationState.activeCardAuthorRole,
    productionComplete,
  ]);

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

  // Scroll effect
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const handleScroll = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        const maxScrollLeft = scrollWidth - clientWidth;
        setScrollState({
          scrollPosition: scrollLeft,
          maxScrollLeft,
          isOverflowing: scrollWidth > clientWidth,
        });
      };

      handleScroll(); // Initial calculation
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [calculatedWidth]);

  // Table rows for list view
  const tableRows = useMemo(() => {
    const rows: any[] = [];

    // Original request - always shown (first row, always authored by customer)
    rows.push({
      id: "original",
      type: "regular",
      rowLabel: userState.role === "customer" ? "Your original request" : "Customer's original request",
      authorRole: "customer",
      rowClassName: "table-row-regular",
      quantity: "90",
      uom: "cases",
      dueDate: "2023-12-20",
      unitPrice: "$2.80",
      currency: "USD",
      reason: "Initial order",
      note: "Original customer request",
    });

    // Historical rows - shown in "all" view
    if (filterState.viewMode === "all") {
      // First supplier proposal
      rows.push({
        id: "supplier-proposal-1",
        type: "regular",
        rowLabel: userState.role === "supplier" ? "Your proposal" : "Supplier's proposal",
        authorRole: "supplier",
        rowClassName: "table-row-regular",
        quantity: "95",
        uom: "cases",
        dueDate: "2023-12-25",
        unitPrice: "$2.85",
        currency: "USD",
        reason: "Material availability",
        note: "Initial supplier response",
      });

      // Customer counter-request
      rows.push({
        id: "customer-counter-1",
        type: "regular",
        rowLabel: userState.role === "customer" ? "Your request" : "Customer's request",
        authorRole: "customer",
        rowClassName: "table-row-regular",
        quantity: "100",
        uom: "cases",
        dueDate: "2023-12-28",
        unitPrice: "$2.90",
        currency: "USD",
        reason: "Volume discount",
        note: "Requested quantity increase",
      });

      // Second supplier proposal
      rows.push({
        id: "supplier-proposal-2",
        type: "regular",
        rowLabel: userState.role === "supplier" ? "Your proposal" : "Supplier's proposal",
        authorRole: "supplier",
        rowClassName: "table-row-regular",
        quantity: "100",
        uom: "cases",
        dueDate: "2023-12-30",
        unitPrice: "$2.88",
        currency: "USD",
        reason: "Price negotiation",
        note: "Compromise on pricing",
      });
    }

    if (!collaborationState.hasNewCard && !productionComplete && filterState.viewMode === "all") {
      rows.push({
        id: "your-latest",
        type: "regular",
        rowLabel:
          userState.role === "supplier" && collaborationState.activeCardAuthorRole === "supplier"
            ? "Your proposal"
            : collaborationState.activeCardAuthorRole === userState.role
              ? `Your ${userState.role === "supplier" ? "proposal" : "request"}`
              : `${collaborationState.activeCardAuthorRole === "supplier" ? "Supplier's" : "Customer's"} ${collaborationState.activeCardAuthorRole === "supplier" ? "proposal" : "request"}`,
        authorRole: userState.role,
        rowClassName: "table-row-regular",
        quantity: "100",
        uom: "cases",
        dueDate: "2024-01-01",
        unitPrice: "$2.99",
        currency: "USD",
        reason: "Material shortage",
        note: "Initial proposal.",
      });
    }

    if (collaborationState.status !== "accepted" && !productionComplete && collaborationState.activeCardAuthorRole) {
      if (!collaborationState.hasNewCard && !sidebarState.newProposal) {
        rows.push({
          id: `${collaborationState.activeCardAuthorRole}-active`,
          type: "active",
          rowLabel:
            collaborationState.activeCardAuthorRole === userState.role
              ? `Your ${userState.role === "supplier" ? "proposal" : "request"}`
              : `${collaborationState.activeCardAuthorRole === "supplier" ? "Supplier's" : "Customer's"} ${collaborationState.activeCardAuthorRole === "supplier" ? "proposal" : "request"}`,
          authorRole: collaborationState.activeCardAuthorRole,
          rowClassName:
            userState.role === "supplier" ? "table-row-active-user-action" : "table-row-active-user-waiting",
          quantity: "100",
          uom: "cases",
          dueDate: "2024-01-01",
          unitPrice: "$2.99",
          currency: "USD",
          reason: "Material shortage",
          note: "Initial proposal.",
        });
      } else {
        rows.push({
          id: `${collaborationState.activeCardAuthorRole}-regular`,
          type: "regular",
          rowLabel:
            collaborationState.activeCardAuthorRole === userState.role
              ? `Your ${userState.role === "supplier" ? "proposal" : "request"}`
              : `${collaborationState.activeCardAuthorRole === "supplier" ? "Supplier's" : "Customer's"} ${collaborationState.activeCardAuthorRole === "supplier" ? "proposal" : "request"}`,
          authorRole: collaborationState.activeCardAuthorRole,
          rowClassName: "table-row-regular",
          quantity: "100",
          uom: "cases",
          dueDate: "2024-01-01",
          unitPrice: "$2.99",
          currency: "USD",
          reason: "Material shortage",
          note: "Initial proposal.",
        });
      }
    }

    if (
      collaborationState.hasNewCard &&
      !productionComplete &&
      collaborationState.activeCardAuthorRole === userState.role
    ) {
      rows.push({
        id: "your-active",
        type: "active",
        rowLabel: userState.role === "supplier" ? "Your proposal" : "Your request",
        authorRole: userState.role,
        rowClassName: "table-row-active-user-waiting",
        quantity: formData.newProposal.quantity,
        uom: formData.newProposal.uom,
        dueDate: formData.newProposal.productionDueDate,
        unitPrice: formData.newProposal.unitPrice,
        currency: formData.newProposal.currency,
        reason: formData.newProposal.changeReason,
        note: formData.newProposal.changeNote,
      });
    }

    // Add hidden rows to the table
    rows.push(...hiddenRows);

    return rows;
  }, [
    collaborationState,
    userState,
    productionComplete,
    formData,
    hiddenRows,
    sidebarState.newProposal,
    filterState.viewMode,
  ]);

  const columns = [
    {
      label: "",
      dataKey: "rowLabel",
      cellRenderer: ({ row }) => (
        <Flex alignItems="center" gap="x1" pl="x2">
          {row.type === "active" && (
            <Box
              backgroundColor={row.authorRole !== userState.role ? "yellow" : "blue"}
              borderRadius="medium"
              p="x0_25"
              width="x3"
              height="x3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon icon="accessTime" size="x2_5" color={row.authorRole !== userState.role ? "darkGrey" : "white"} />
            </Box>
          )}
          {row.type === "accepted" && (
            <Box
              backgroundColor="green"
              borderRadius="medium"
              p="x0_25"
              width="x3"
              height="x3"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon icon="check" size="x2_5" color="lightGreen" />
            </Box>
          )}
          <Text
            fontSize="small"
            fontWeight={row.type === "active" ? "bold" : "normal"}
            color={row.type === "active" ? "blue" : row.type === "accepted" ? "green" : "midGrey"}
          >
            {row.rowLabel}
          </Text>
        </Flex>
      ),
      width: "20%",
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "5%",
      cellRenderer: ({ cellData }) => (
        <Text textAlign="right" pr="x2">
          {cellData}
        </Text>
      ),
    },
    { label: "UOM", dataKey: "uom", width: "10%" },
    { label: "Due date", dataKey: "dueDate", width: "10%" },
    {
      label: "Unit price",
      dataKey: "unitPrice",
      width: "5%",
      cellRenderer: ({ cellData }) => (
        <Text textAlign="right" pr="x2">
          {cellData}
        </Text>
      ),
    },
    { label: "Currency", dataKey: "currency", width: "10%" },
    { label: "Reason", dataKey: "reason", width: "15%" },
    { label: "Note", dataKey: "note", width: "25%" },
  ];

  const handleAcceptProposal = () => {
    setCollaborationState((prev) => ({
      ...prev,
      status: "accepted",
      showAcceptedCard: true,
    }));
    toast.success(
      `${collaborationState.activeCardAuthorRole === "customer" ? "Request" : "Proposal"} accepted successfully`
    );
  };

  const handleNewProposalClick = () => {
    // Capture the content from the current active row that will be hidden
    const currentActiveRow = tableRows.find((row) => row.type === "active" && row.authorRole === userState.role);

    if (currentActiveRow) {
      // Add the hidden row to the hiddenRows state
      setHiddenRows((prev) => [
        ...prev,
        {
          ...currentActiveRow,
          id: `hidden-${Date.now()}`,
          type: "regular",
          rowLabel: `Your ${userState.role === "supplier" ? "proposal" : "request"}`,
          rowClassName: "table-row-regular",
        },
      ]);
    }

    setSidebarState((prev) => ({ ...prev, newProposal: true }));
  };

  const handleSubmitNewProposal = () => {
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

  const handleCancelPOLineItem = () => {
    toast.success("PO line item cancelled successfully");
  };

  return (
    <>
      <ApplicationFrame>
        <Header
          breakpoints={{ medium: 1200 }}
          renderBreadcrumbs={() => breadcrumbs}
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
                    <TruncatedText fontSize="small" lineHeight="smallTextCompressed" fullWidth maxWidth="184px">
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
              <Flex
                flexDirection="column"
                gap="half"
                width="200px"
                pt="x0_5"
                alignItems="center"
                justifyContent="center"
              >
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
                    <DescriptionDetails>{formData.edit.carryOverSentTo || "N/A"}</DescriptionDetails>
                  </DescriptionGroup>
                </>
              )}
            </DescriptionList>
          </Box>
          <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
            <Tab label="Collaboration">
              <Box>
                {/* View mode switcher */}
                <Flex justifyContent="flex-end" alignItems="center" pt="x2" mb="x1" gap="x2">
                  {/* Actions */}
                  {!sidebarState.newProposal && (
                    <>
                      {collaborationState.activeCardAuthorRole &&
                        collaborationState.activeCardAuthorRole !== userState.role &&
                        !collaborationState.hasNewCard &&
                        collaborationState.status !== "accepted" && (
                          <PrimaryButton onClick={handleAcceptProposal}>
                            Accept {collaborationState.activeCardAuthorRole === "customer" ? "request" : "proposal"}
                          </PrimaryButton>
                        )}
                    </>
                  )}
                  {sidebarState.newProposal && (
                    <>
                      <PrimaryButton onClick={handleSubmitNewProposal}>
                        Submit {userState.role === "supplier" ? "proposal" : "request"}
                      </PrimaryButton>
                      <QuietButton
                        onClick={() => {
                          setHiddenRows((prev) => prev.slice(0, -1));
                          setSidebarState((prev) => ({ ...prev, newProposal: false }));
                        }}
                      >
                        Cancel
                      </QuietButton>
                    </>
                  )}
                  <VerticalDivider />
                  {/* Limited/All Switcher */}
                  <Switcher
                    selected={filterState.viewMode}
                    onChange={(value) => setFilterState((prev) => ({ ...prev, viewMode: value as "all" | "minimal" }))}
                  >
                    <Switch value="minimal">Limited</Switch>
                    <Switch value="all">All</Switch>
                  </Switcher>
                  <VerticalDivider />
                  {/* Card/List Switcher with icons only */}
                  <Flex gap="x1">
                    <Box>
                      <IconicButton
                        icon="apps"
                        onClick={() => {
                          console.log("Card button clicked");
                          setViewMode("card");
                        }}
                        labelHidden
                        tooltip="Card view"
                      />
                    </Box>
                    <Box>
                      <IconicButton
                        icon="more"
                        onClick={() => {
                          console.log("List button clicked");
                          setViewMode("list");
                        }}
                        labelHidden
                        tooltip="List view"
                      />
                    </Box>
                  </Flex>
                </Flex>

                {/* Card View */}
                {console.log("Current viewMode:", viewMode)}
                {viewMode === "card" && (
                  <Box position="relative">
                    <Box ref={scrollContainerRef} overflowX="auto" width="100%">
                      <Flex
                        ref={cardsRowRef}
                        alignItems="stretch"
                        justifyContent="flex-end"
                        py="x2"
                        gap="x2"
                        key={widthKey}
                        style={{
                          width: `${calculatedWidth}px`,
                        }}
                      >
                        {/* Original request card. Always shown in both views */}
                        <POLICard
                          type="regular"
                          baseTitle="original request"
                          author="John Doe"
                          authorRole="customer"
                          userRole={userState.role}
                          date="2024-Jan-01"
                          width="480px"
                        />
                        {/* Old cards - only shown in "all" view */}
                        {filterState.viewMode === "all" && (
                          <>
                            {/* Supplier request card */}
                            <POLICard
                              type="regular"
                              baseTitle={userState.role === "supplier" ? "proposal" : "request"}
                              author="you"
                              authorRole={userState.role}
                              userRole={userState.role}
                              date="2024-Jan-02"
                              width="480px"
                            />
                            {/* Customer request card */}
                            <POLICard
                              type="regular"
                              baseTitle={userState.role === "supplier" ? "request" : "proposal"}
                              author="John Doe"
                              authorRole={userState.role === "supplier" ? "customer" : "supplier"}
                              userRole={userState.role}
                              date="2024-Jan-03"
                              width="480px"
                            />
                            {/* Latest supplier request card */}
                            <POLICard
                              type="regular"
                              baseTitle={userState.role === "supplier" ? "proposal" : "request"}
                              author="you"
                              authorRole={userState.role}
                              userRole={userState.role}
                              date="2024-Jan-01"
                              width="480px"
                            />
                          </>
                        )}
                        {/* User's latest request/proposal - shown first */}
                        {!collaborationState.hasNewCard && !productionComplete && (
                          <POLICard
                            type="regular"
                            baseTitle={`latest ${userState.role === "supplier" ? "proposal" : "request"}`}
                            author="you"
                            authorRole={userState.role}
                            userRole={userState.role}
                            date="2024-Jan-04"
                            width="480px"
                          />
                        )}
                        {/* Customer's latest request - shown after user's proposal */}
                        {collaborationState.status !== "accepted" &&
                          !productionComplete &&
                          collaborationState.activeCardAuthorRole &&
                          !collaborationState.hasNewCard && (
                            <POLICard
                              type="active"
                              baseTitle={`latest ${collaborationState.activeCardAuthorRole === "customer" ? "request" : "proposal"}`}
                              author="John Doe"
                              authorRole={collaborationState.activeCardAuthorRole}
                              userRole={userState.role}
                              date="2024-Jan-05"
                              onAccept={acceptRequest}
                              acceptButtonText={`Accept ${collaborationState.activeCardAuthorRole === "customer" ? "request" : "proposal"}`}
                              width="480px"
                            />
                          )}
                        {/* Customer's latest request converted to regular when new card is created */}
                        {collaborationState.status !== "accepted" &&
                          !productionComplete &&
                          collaborationState.activeCardAuthorRole &&
                          collaborationState.hasNewCard && (
                            <POLICard
                              type="regular"
                              baseTitle={`latest ${collaborationState.activeCardAuthorRole === "customer" ? "request" : "proposal"}`}
                              author="John Doe"
                              authorRole={collaborationState.activeCardAuthorRole}
                              userRole={userState.role}
                              date="2024-Jan-05"
                              width="480px"
                            />
                          )}
                        {/* Accepted card. Card_style_type = accepted. Displayed when request is accepted. */}
                        {(collaborationState.showAcceptedCard || productionComplete) &&
                          !collaborationState.hasNewCard && (
                            <POLICard
                              type="accepted"
                              baseTitle="accepted request"
                              author="John Doe"
                              authorRole={userState.role === "supplier" ? "customer" : "supplier"}
                              userRole={userState.role}
                              date="2024-Jan-05"
                              width="480px"
                            />
                          )}
                        {/* Regular accepted card when there's a new active card */}
                        {(collaborationState.showAcceptedCard || productionComplete) &&
                          collaborationState.hasNewCard && (
                            <POLICard
                              type="regular"
                              baseTitle="accepted request"
                              author="John Doe"
                              authorRole={userState.role === "supplier" ? "customer" : "supplier"}
                              userRole={userState.role}
                              date="2024-Jan-05"
                              width="480px"
                            />
                          )}
                        {/* New active card created by current user - placed just before the New button */}
                        {collaborationState.hasNewCard &&
                          !productionComplete &&
                          collaborationState.activeCardAuthorRole === userState.role && (
                            <POLICard
                              type="active"
                              baseTitle={`latest ${userState.role === "supplier" ? "proposal" : "request"}`}
                              author="you"
                              authorRole={userState.role}
                              userRole={userState.role}
                              date="2024-Jan-06"
                              width="480px"
                            />
                          )}
                        {/* New proposal/requirements. Card_style_type = new. Always at the end */}
                        {collaborationState.status !== "accepted" && !productionComplete && (
                          <Card p="0" width="480px">
                            <Flex justifyContent="center" alignItems="center" height="100%">
                              <QuietButton onClick={() => openSidebar("newProposal")}>
                                {userState.role === "supplier" ? "New proposal" : "New request"}
                              </QuietButton>
                            </Flex>
                          </Card>
                        )}
                      </Flex>
                    </Box>
                    {/* Left gradient - shows when there's room to scroll left */}
                    {scrollState.isOverflowing && scrollState.scrollPosition > 10 && (
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        bottom={0}
                        width="x6"
                        zIndex={1}
                        height="100%"
                        style={{
                          pointerEvents: "none",
                          background:
                            "linear-gradient(to right, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.03) 16px, rgba(0,0,0,0) 48px)",
                        }}
                      />
                    )}
                    {/* Right gradient - shows when there's room to scroll right */}
                    {scrollState.isOverflowing && scrollState.scrollPosition < scrollState.maxScrollLeft - 10 && (
                      <Box
                        position="absolute"
                        top={0}
                        right={0}
                        bottom={0}
                        width="x6"
                        zIndex={1}
                        height="100%"
                        style={{
                          pointerEvents: "none",
                          background:
                            "linear-gradient(to left, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.03) 16px, rgba(0,0,0,0) 48px)",
                        }}
                      />
                    )}
                  </Box>
                )}

                {/* List View */}
                {console.log("Checking list view, viewMode:", viewMode)}
                {viewMode === "list" && (
                  <Box>
                    <Table columns={columns} rows={tableRows.filter((row) => row.type !== "active")} keyField="id" />
                    {/* Render single EditableRow component based on state */}
                    {(() => {
                      // Show accepted EditableRow when production is complete or when proposal is accepted
                      if (productionComplete || collaborationState.status === "accepted") {
                        return (
                          <EditableRow
                            type="accepted"
                            userRole={userState.role}
                            authorRole={collaborationState.activeCardAuthorRole}
                            collaborationStatus={collaborationState.status}
                            formData={{
                              quantity: "100",
                              uom: "cases",
                              dueDate: "2024-01-01",
                              unitPrice: "2.99",
                              currency: "USD",
                              reason: "Material shortage",
                              note: "Initial proposal.",
                            }}
                          />
                        );
                      }

                      // Show new EditableRow when creating new proposal
                      if (!productionComplete && sidebarState.newProposal) {
                        return (
                          <EditableRow
                            type="new"
                            userRole={userState.role}
                            authorRole={userState.role}
                            formData={{
                              quantity:
                                collaborationState.activeCardAuthorRole === userState.role
                                  ? tableRows.find((row) => row.type === "active")?.quantity ||
                                    formData.newProposal.quantity
                                  : formData.newProposal.quantity,
                              uom:
                                collaborationState.activeCardAuthorRole === userState.role
                                  ? tableRows.find((row) => row.type === "active")?.uom || formData.newProposal.uom
                                  : formData.newProposal.uom,
                              dueDate:
                                collaborationState.activeCardAuthorRole === userState.role
                                  ? tableRows.find((row) => row.type === "active")?.dueDate ||
                                    formData.newProposal.productionDueDate
                                  : formData.newProposal.productionDueDate,
                              unitPrice:
                                collaborationState.activeCardAuthorRole === userState.role
                                  ? (tableRows.find((row) => row.type === "active")?.unitPrice || "$2.99").replace(
                                      "$",
                                      ""
                                    )
                                  : formData.newProposal.unitPrice,
                              currency: "USD",
                              reason:
                                collaborationState.activeCardAuthorRole === userState.role
                                  ? tableRows.find((row) => row.type === "active")?.reason ||
                                    formData.newProposal.changeReason
                                  : formData.newProposal.changeReason,
                              note:
                                collaborationState.activeCardAuthorRole === userState.role
                                  ? tableRows.find((row) => row.type === "active")?.note ||
                                    formData.newProposal.changeNote
                                  : formData.newProposal.changeNote,
                            }}
                            onFormDataChange={(field, value) => {
                              setFormData((prev) => ({
                                ...prev,
                                newProposal: {
                                  ...prev.newProposal,
                                  [field === "dueDate"
                                    ? "productionDueDate"
                                    : field === "reason"
                                      ? "changeReason"
                                      : field === "note"
                                        ? "changeNote"
                                        : field]: value,
                                },
                              }));
                            }}
                          />
                        );
                      }

                      // Show active EditableRow when there's an active collaboration
                      const activeRow = tableRows.find((row) => row.type === "active");
                      if (!productionComplete && activeRow && !sidebarState.newProposal) {
                        return (
                          <EditableRow
                            key={activeRow.id}
                            type="active"
                            userRole={userState.role}
                            authorRole={activeRow.authorRole}
                            collaborationStatus={collaborationState.status}
                            formData={{
                              quantity: activeRow.quantity,
                              uom: activeRow.uom,
                              dueDate: activeRow.dueDate,
                              unitPrice: activeRow.unitPrice.replace("$", ""),
                              currency: activeRow.currency,
                              reason: activeRow.reason,
                              note: activeRow.note,
                            }}
                          />
                        );
                      }

                      return null;
                    })()}
                  </Box>
                )}
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
                  onChange={(option) =>
                    setPoStatus(option as "Late" | "Completed" | "At risk" | "On time" | "Cancelled")
                  }
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
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, edit: { ...prev.edit, bomRevision: e.target.value } }))
              }
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

            {/* Assigned tags checkbox group */}
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

        <ToastContainer />
      </ApplicationFrame>
    </>
  );
};
