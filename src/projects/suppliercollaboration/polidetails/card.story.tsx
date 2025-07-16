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
  List,
  ListItem,
} from "../../..";
import { POLICard } from "./components/POLICard";

export default {
  title: "Projects/Supplier Collaboration/POLI details/Card",
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

export const DefaultCard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardsRowRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Scroll state
  const [scrollState, setScrollState] = useState({
    scrollPosition: 0,
    maxScrollLeft: 0,
    isOverflowing: false,
  });

  // Sidebar state
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
    activeCardAuthorRole: null as "supplier" | "customer" | null,
  });

  // User state
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
    viewMode: "supplier" as "supplier" | "customer",
  });

  // Production complete state
  const [productionComplete, setProductionComplete] = useState(false);

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

    // Limited view: Original + User's latest + Latest + New proposal button
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

      // Handle accepted card in Limited mode
      if (collaborationState.showAcceptedCard) {
        numberOfCards++;
        cardBreakdown.push("Accepted card (Limited mode)");
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

    // Handle new proposal button card (always at the end when not accepted)
    if (collaborationState.status !== "accepted") {
      numberOfCards++;
      cardBreakdown.push("New proposal button");
    }

    // Handle new active card created by current user
    if (collaborationState.hasNewCard && collaborationState.activeCardAuthorRole === userState.role) {
      numberOfCards++;
      cardBreakdown.push("New active card by current user");
    }

    const totalWidth = (cardWidth + cardBorderWidth) * numberOfCards + effectiveGapWidth * (numberOfCards - 1);

    console.log("Width calculation breakdown:", {
      numberOfCards,
      cardWidth: cardWidth + cardBorderWidth,
      totalWidth,
      status: collaborationState.status,
      showAccepted: collaborationState.showAcceptedCard,
      hasNewCard: collaborationState.hasNewCard,
      activeAuthor: collaborationState.activeCardAuthorRole,
      cardBreakdown,
    });

    return totalWidth;
  };

  // Force width recalculation
  const [widthKey, setWidthKey] = useState(0);
  const calculatedWidth = useMemo(() => {
    const width = calculateCardsWidth();
    console.log("Memoized width calculation:", width);
    return width;
  }, [
    userState.role,
    collaborationState.status,
    collaborationState.showAcceptedCard,
    collaborationState.hasNewCard,
    collaborationState.activeCardAuthorRole,
  ]);

  // Sidebar handlers
  const openSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: true }));
  };

  const closeSidebar = (sidebar: keyof typeof sidebarState) => {
    setSidebarState((prev) => ({ ...prev, [sidebar]: false }));
  };

  // Collaboration handlers
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
    closeSidebar("newProposal");
    toast.success(`${userState.role === "supplier" ? "Proposal" : "Request"} submitted successfully`);
  };

  // Scroll effects
  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      requestAnimationFrame(() => {
        scrollEl.scrollLeft = scrollEl.scrollWidth;
        setScrollState({
          scrollPosition: scrollEl.scrollLeft,
          maxScrollLeft: scrollEl.scrollWidth - scrollEl.clientWidth,
          isOverflowing: scrollEl.scrollWidth > scrollEl.clientWidth,
        });
      });
    }
  }, [selectedIndex]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const handleScroll = () => {
        setScrollState({
          scrollPosition: el.scrollLeft,
          maxScrollLeft: el.scrollWidth - el.clientWidth,
          isOverflowing: el.scrollWidth > el.clientWidth,
        });
      };

      handleScroll();
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [selectedIndex, collaborationState.status, collaborationState.showAcceptedCard]);

  // Initialize active card author role
  useEffect(() => {
    console.log("Initializing active card author role:", {
      status: collaborationState.status,
      userRole: userState.role,
      currentActiveAuthor: collaborationState.activeCardAuthorRole,
    });

    if (collaborationState.status === "accepted") {
      setCollaborationState((prev) => ({ ...prev, activeCardAuthorRole: null }));
    } else {
      setCollaborationState((prev) => ({
        ...prev,
        activeCardAuthorRole: userState.role === "supplier" ? "customer" : "supplier",
      }));
    }
  }, [collaborationState.status, userState.role]);

  // Update width key when cards change
  useEffect(() => {
    console.log("Width recalculation triggered by:", {
      status: collaborationState.status,
      showAccepted: collaborationState.showAcceptedCard,
      hasNewCard: collaborationState.hasNewCard,
      activeAuthor: collaborationState.activeCardAuthorRole,
      userRole: userState.role,
    });

    setWidthKey((prev) => prev + 1);

    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      // Force recalculation of width and scroll position
      requestAnimationFrame(() => {
        // Scroll to the right to show the latest cards
        scrollEl.scrollLeft = scrollEl.scrollWidth;

        // Update scroll state
        setScrollState((prev) => ({
          ...prev,
          scrollPosition: scrollEl.scrollLeft,
          maxScrollLeft: scrollEl.scrollWidth - scrollEl.clientWidth,
          isOverflowing: scrollEl.scrollWidth > scrollEl.clientWidth,
        }));
      });
    }
  }, [
    collaborationState.status,
    collaborationState.showAcceptedCard,
    collaborationState.hasNewCard,
    collaborationState.activeCardAuthorRole,
    userState.role,
  ]);

  // Force DOM update when calculated width changes
  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      // Update scroll position
      requestAnimationFrame(() => {
        scrollEl.scrollLeft = scrollEl.scrollWidth;
        setScrollState((prev) => ({
          ...prev,
          scrollPosition: scrollEl.scrollLeft,
          maxScrollLeft: scrollEl.scrollWidth - scrollEl.clientWidth,
          isOverflowing: scrollEl.scrollWidth > scrollEl.clientWidth,
        }));
      });
    }
  }, [calculatedWidth]);

  const tableColumns = [
    {
      key: "itemCode",
      label: "Item Code",
      cellRenderer: ({ row }) => <Text>{row.itemCode}</Text>,
    },
    {
      key: "description",
      label: "Description",
      cellRenderer: ({ row }) => <Text>{row.description}</Text>,
    },
    {
      key: "quantity",
      label: "Quantity",
      cellRenderer: ({ row }) => <Text>{row.quantity}</Text>,
    },
    {
      key: "uom",
      label: "UOM",
      cellRenderer: ({ row }) => <Text>{row.uom}</Text>,
    },
    {
      key: "unitPrice",
      label: "Unit Price",
      cellRenderer: ({ row }) => <Text>{row.unitPrice}</Text>,
    },
    {
      key: "totalPrice",
      label: "Total Price",
      cellRenderer: ({ row }) => <Text>{row.totalPrice}</Text>,
    },
    {
      key: "status",
      label: "Status",
      cellRenderer: ({ row }) => (
        <Text color={row.status === "active" ? "green" : row.status === "pending" ? "orange" : "grey"}>
          {row.status}
        </Text>
      ),
    },
  ];

  const tableData = [
    {
      id: 1,
      itemCode: "ITEM-001",
      description: "Raw materials for production",
      quantity: "100",
      uom: "PCS",
      unitPrice: "$15.50",
      totalPrice: "$1,550.00",
      status: "active",
    },
    {
      id: 2,
      itemCode: "ITEM-002",
      description: "Packaging materials",
      quantity: "50",
      uom: "BOX",
      unitPrice: "$8.75",
      totalPrice: "$437.50",
      status: "pending",
    },
    {
      id: 3,
      itemCode: "ITEM-003",
      description: "Quality control supplies",
      quantity: "25",
      uom: "SET",
      unitPrice: "$45.00",
      totalPrice: "$1,125.00",
      status: "completed",
    },
  ];

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
        {/* Details section */}
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
              <Flex justifyContent="flex-end" alignItems="center" pt="x2" mb="x1">
                {(collaborationState.showAcceptedCard || productionComplete) && !productionComplete && (
                  <>
                    <IconicButton
                      icon="add"
                      aria-label={userState.role === "supplier" ? "New proposal" : "New request"}
                      onClick={() => openSidebar("newProposal")}
                    >
                      {userState.role === "supplier" ? "New proposal" : "New request"}
                    </IconicButton>
                    <VerticalDivider />
                  </>
                )}
              </Flex>
              {/* Cards row with left inner shadow only if overflowing */}
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

                    {/* Customer's latest request - shown after original request */}
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
                    {(collaborationState.showAcceptedCard || productionComplete) && !collaborationState.hasNewCard && (
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
                    {(collaborationState.showAcceptedCard || productionComplete) && collaborationState.hasNewCard && (
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
            {/* Non-editable fields */}
            <FieldLabel labelText="PO number">
              <Input value={formData.edit.poNumber} disabled />
            </FieldLabel>
            <FieldLabel labelText="Customer's PO line item number">
              <Input value={formData.edit.customerPOLineItemNumber} disabled />
            </FieldLabel>
            {/* Supplier's PO line item number - editable only by supplier */}
            {userState.role === "supplier" ? (
              <FieldLabel labelText="Supplier's PO line item number">
                <Input
                  value={formData.edit.supplierPOLineItemNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      edit: { ...formData.edit, supplierPOLineItemNumber: e.target.value },
                    })
                  }
                />
              </FieldLabel>
            ) : (
              <FieldLabel labelText="Supplier's PO line item number">
                <Input value={formData.edit.supplierPOLineItemNumber} disabled />
              </FieldLabel>
            )}
            <FieldLabel labelText="Created on">
              <Input value={formatDateForDisplay(formData.edit.creationDate)} disabled />
            </FieldLabel>
            <FieldLabel labelText={userState.role === "supplier" ? "Customer" : "Supplier"}>
              <Input value={formData.edit.customer} disabled />
            </FieldLabel>
            <FieldLabel labelText="Customer's item code">
              <Input value={formData.edit.customerItemCode} disabled />
            </FieldLabel>
            <FieldLabel labelText="Item description">
              <Input value={formData.edit.customerItemDescription} disabled />
            </FieldLabel>
            <FieldLabel labelText="Supplier's item code">
              <Input value="SUP-123456" disabled />
            </FieldLabel>
            <FieldLabel labelText="Item order type">
              <Input value="Standard" disabled />
            </FieldLabel>
            <FieldLabel labelText="Priority">
              <Input value="?" disabled />
            </FieldLabel>
            <FieldLabel labelText="BOM revision and release date">
              <Select
                options={[
                  { value: "Revision 1", label: "Revision 1" },
                  { value: "Revision 2", label: "Revision 2" },
                  { value: "Revision 3", label: "Revision 3" },
                  { value: "Revision 4", label: "Revision 4" },
                ]}
                value={formData.edit.bomRevision}
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    edit: { ...formData.edit, bomRevision: String(option) },
                  })
                }
              />
            </FieldLabel>
            <FieldLabel labelText="Production start date">
              <Input value="2025-Feb-20" disabled />
            </FieldLabel>
            <FieldLabel labelText="Ship to">
              <Input value={formData.edit.shipTo} disabled />
            </FieldLabel>
            <FieldLabel labelText="Need by date">
              <DatePicker
                selected={formData.edit.needByDate}
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    edit: { ...formData.edit, needByDate: date },
                  })
                }
              />
            </FieldLabel>
            {productionComplete && (
              <>
                <FieldLabel labelText="Close production note">
                  <Input value="Production completed successfully" disabled />
                </FieldLabel>
                <FieldLabel labelText="Carry over sent to">
                  <Input value={formData.edit.carryOverSentTo || "N/A"} disabled />
                </FieldLabel>
              </>
            )}
          </Flex>
        </Sidebar>
        <Sidebar
          isOpen={sidebarState.comments}
          onClose={() => closeSidebar("comments")}
          title="Comments"
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={() => closeSidebar("comments")}>Comment</PrimaryButton>
              <QuietButton onClick={() => closeSidebar("comments")}>Clear</QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3" py="x1">
            <Box p="x3">
              <Text>Comment content will go here.</Text>
            </Box>
          </Flex>
        </Sidebar>
        <Sidebar
          isOpen={sidebarState.newProposal}
          onClose={() => closeSidebar("newProposal")}
          title={userState.role === "supplier" ? "New proposal" : "New request"}
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={submitNewProposal}>
                {userState.role === "supplier" ? "Submit proposal" : "Submit request"}
              </PrimaryButton>
              <QuietButton onClick={() => closeSidebar("newProposal")}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3" py="x1">
            <FieldLabel labelText="Quantity">
              <Input
                value={formData.newProposal.quantity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newProposal: { ...formData.newProposal, quantity: e.target.value },
                  })
                }
              />
            </FieldLabel>
            <FieldLabel labelText="UOM">
              <Select
                options={[
                  { value: "cases", label: "cases" },
                  { value: "pieces", label: "pieces" },
                  { value: "boxes", label: "boxes" },
                  { value: "units", label: "units" },
                ]}
                value={formData.newProposal.uom}
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    newProposal: { ...formData.newProposal, uom: String(option) },
                  })
                }
              />
            </FieldLabel>
            <FieldLabel labelText="Production due date">
              <DatePicker
                selected={formData.newProposal.productionDueDate}
                onChange={(date) =>
                  setFormData({
                    ...formData,
                    newProposal: { ...formData.newProposal, productionDueDate: date },
                  })
                }
              />
            </FieldLabel>
            <FieldLabel labelText="Unit price">
              <Input
                value={formData.newProposal.unitPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newProposal: { ...formData.newProposal, unitPrice: e.target.value },
                  })
                }
              />
            </FieldLabel>
            <FieldLabel labelText="Currency">
              <Input value={formData.newProposal.currency} disabled />
            </FieldLabel>
            <FieldLabel labelText="Change reason">
              <Select
                options={[
                  { value: "1 - Material shortage", label: "1 - Material shortage" },
                  { value: "2 - Price change", label: "2 - Price change" },
                  { value: "3 - Quality issue", label: "3 - Quality issue" },
                  { value: "4 - Delivery delay", label: "4 - Delivery delay" },
                  { value: "5 - Specification change", label: "5 - Specification change" },
                ]}
                value={formData.newProposal.changeReason}
                onChange={(option) =>
                  setFormData({
                    ...formData,
                    newProposal: { ...formData.newProposal, changeReason: String(option) },
                  })
                }
                placeholder="Select change reason..."
              />
            </FieldLabel>
            <FieldLabel labelText="Change note">
              <Textarea
                value={formData.newProposal.changeNote}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    newProposal: { ...formData.newProposal, changeNote: e.target.value },
                  })
                }
                style={{ height: "9em" }}
              />
            </FieldLabel>
          </Flex>
        </Sidebar>
      </Page>

      {/* Role toggle - NOT PART OF THE APP */}
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
            onChange={(value) => setUserState({ ...userState, role: value as "supplier" | "customer" })}
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
              value={collaborationState.activeCardAuthorRole || ""}
              onChange={(option) =>
                setCollaborationState((prev) => ({ ...prev, activeCardAuthorRole: option as "supplier" | "customer" }))
              }
              placeholder="Select author role"
              menuPlacement="top"
              width="160px"
            />
          </Flex>
          <VerticalDivider />
          <Flex gap="x1" justifyContent="center" alignItems="center">
            <Text fontSize="small" color="midGrey" width="120px" textAlign="right">
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
          <Flex gap="x1" justifyContent="center" alignItems="center">
            <Checkbox
              id="productionComplete"
              checked={productionComplete}
              onChange={(e) => setProductionComplete(e.target.checked)}
              labelText="Production complete"
            />
          </Flex>
        </Flex>
      </Box>
    </ApplicationFrame>
  );
};

DefaultCard.storyName = "Default";
