import React, { useState, useRef, useEffect } from "react";
import { toast } from "../../..";
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
  Tooltip,
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
  Checkbox,
  CheckboxGroup,
  DatePicker,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/POLI details/Supplier",
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

export const DefaultSupplier = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cardsRowRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEditSidebarOpen, setIsEditSidebarOpen] = useState(false);
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false);
  const [isNewProposalSidebarOpen, setIsNewProposalSidebarOpen] = useState(false);
  const [collaborationStatus, setCollaborationStatus] = useState("awaiting");
  const [showAcceptedCard, setShowAcceptedCard] = useState(false);

  // Form state for new proposal sidebar - pre-populated with values from last card
  const [newProposalData, setNewProposalData] = useState({
    quantity: "100",
    uom: "cases",
    productionDueDate: new Date("2024-01-01"),
    unitPrice: "2.99",
    currency: "USD",
    changeReason: "1 - Material shortage",
    changeNote: "Please don't be mad.",
  });
  const [filterOptions, setFilterOptions] = useState({
    includeOriginalRequest: true,
    includeOldRequestsAndProposals: true,
    includeLatestRequestAndProposal: true,
  });
  const [appliedFilters, setAppliedFilters] = useState({
    includeOriginalRequest: true,
    includeOldRequestsAndProposals: true,
    includeLatestRequestAndProposal: true,
  });

  // Form state for edit sidebar
  const [formData, setFormData] = useState({
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
  });

  // Helper function to format date for display
  const formatDateForDisplay = (date: Date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD format
  };

  // Calculate the total width needed for all cards
  const calculateCardsWidth = () => {
    const cardWidth = 480; // Width of each card
    const gapWidth = 16; // gap="x2" = 16px

    // Count visible cards based on applied filters and collaboration status
    let numberOfCards = 0;
    if (appliedFilters.includeOriginalRequest) numberOfCards++;
    if (appliedFilters.includeOldRequestsAndProposals) numberOfCards += 2; // Your proposal + Customer's request
    if (appliedFilters.includeLatestRequestAndProposal) numberOfCards += 2; // Your latest proposal + Customer's latest request

    // Handle accepted status - replace active cards with accepted card
    if (collaborationStatus === "accepted") {
      if (showAcceptedCard) numberOfCards++; // Add accepted card
    } else {
      numberOfCards++; // Add New proposal card
    }

    // Total width = (card width × number of cards) + (gap width × (number of cards - 1))
    return cardWidth * numberOfCards + gapWidth * (numberOfCards - 1);
  };

  // Scroll to right on mount and when tab changes
  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        scrollEl.scrollLeft = scrollEl.scrollWidth;
        // Calculate overflow after scrolling to ensure gradients are visible
        setScrollPosition(scrollEl.scrollLeft);
        setMaxScrollLeft(scrollEl.scrollWidth - scrollEl.clientWidth);
        setIsOverflowing(scrollEl.scrollWidth > scrollEl.clientWidth);
      });
    }
  }, [selectedIndex]); // Scroll when tab changes

  // Handle scroll events and detect overflow
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const handleScroll = () => {
        setScrollPosition(el.scrollLeft);
        setMaxScrollLeft(el.scrollWidth - el.clientWidth);
        setIsOverflowing(el.scrollWidth > el.clientWidth);
        console.log("Scroll debug:", {
          scrollLeft: el.scrollLeft,
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          maxScrollLeft: el.scrollWidth - el.clientWidth,
          isOverflowing: el.scrollWidth > el.clientWidth,
          calculatedCardsWidth: calculateCardsWidth(),
          shouldShowLeftGradient: el.scrollLeft > 10,
          shouldShowRightGradient: el.scrollLeft < el.scrollWidth - el.clientWidth - 10,
          containerRect: el.getBoundingClientRect(),
          containerStyle: window.getComputedStyle(el),
        });
      };

      // Initial check
      handleScroll();

      // Add event listener
      el.addEventListener("scroll", handleScroll);
      return () => el.removeEventListener("scroll", handleScroll);
    }
  }, [selectedIndex, collaborationStatus, showAcceptedCard]); // Re-check when tab changes or status changes

  const requestFields = [
    { label: "Quantity", value: "100" },
    { label: "UOM", value: "cases" },
    { label: "Production due date", value: "2024-Jan-01" },
    { label: "Unit price", value: "2.99" },
    { label: "Currency", value: "USD" },
    { label: "Change reason", value: "1 - Material shortage" },
    { label: "Change note", value: "Please don't be mad." },
  ];

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
        renderSummary={() => (
          <Summary breakpoint={1200}>
            <Flex flexDirection="column">
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                Production progress
              </Text>
              <Text fontWeight="medium" fontSize="heading4" lineHeight="heading4">
                50%{" "}
                <Box as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                  (100,000/200,000)
                </Box>
              </Text>
            </Flex>
            <SummaryDivider />
            <Flex flexDirection="column" gap="half">
              <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                Collaboration status
              </Text>
              <StatusIndicator type={collaborationStatus === "accepted" ? "success" : "warning"}>
                {collaborationStatus === "accepted" ? "Accepted" : "Awaiting customer response"}
              </StatusIndicator>
            </Flex>
          </Summary>
        )}
      />
      <Page>
        {/* Action bar above details */}
        <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x3">
          <IconicButton icon="chatBubble" aria-label="Comments" onClick={() => setIsCommentSidebarOpen(true)}>
            Comments
          </IconicButton>
          <VerticalDivider />
          <IconicButton icon="edit" aria-label="Edit" onClick={() => setIsEditSidebarOpen(true)}>
            Edit
          </IconicButton>
        </Flex>
        {/* Details section */}
        <Box mb="x3" pl="x3">
          <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
            <DescriptionGroup>
              <DescriptionTerm>PO number</DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>4000023874</Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer's item code and description</DescriptionTerm>
              <DescriptionDetails>
                <Link underline={false}>
                  12345678
                  <br />
                  PR 24 SEPHORA ONLINE DELUXE OCT
                </Link>
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer PO line item number</DescriptionTerm>
              <DescriptionDetails>12345</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Supplier PO line item number</DescriptionTerm>
              <DescriptionDetails>23453</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Creation date</DescriptionTerm>
              <DescriptionDetails>2024-01-01</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Customer</DescriptionTerm>
              <DescriptionDetails>MyCustomer</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>BOM revision and release date</DescriptionTerm>
              <DescriptionDetails>
                Revision 2<br />
                2025-Feb-28
              </DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Need by date</DescriptionTerm>
              <DescriptionDetails>2024-01-01</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Ship to</DescriptionTerm>
              <DescriptionDetails>MySupplier TO</DescriptionDetails>
            </DescriptionGroup>
            <DescriptionGroup>
              <DescriptionTerm>Item order type</DescriptionTerm>
              <DescriptionDetails>Standard</DescriptionDetails>
            </DescriptionGroup>
          </DescriptionList>
        </Box>
        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Request details">
            <Box>
              {/* Filters action bar */}
              <Flex justifyContent="flex-end" alignItems="center" pt="x2">
                <IconicButton icon="filter" aria-label="Filters" onClick={() => setIsSidebarOpen(true)}>
                  Filters
                </IconicButton>
              </Flex>
              {/* Cards row with left inner shadow only if overflowing */}

              <Box position="relative">
                <Box ref={scrollContainerRef} overflowX="auto" width="100%">
                  <Flex
                    ref={cardsRowRef}
                    alignItems="stretch"
                    width={calculateCardsWidth()}
                    justifyContent="flex-end"
                    py="x3"
                    gap="x2"
                  >
                    {/* Original request card. Card_type = regular. Can be filtered out. */}
                    {appliedFilters.includeOriginalRequest && (
                      <Card p="0" width="480px">
                        <Box px="x2" py="x1_5" backgroundColor="whiteGrey">
                          <Heading4 mb="0">Original customer's request</Heading4>
                          <Text fontSize="small" color="midGrey">
                            by John Doe on 2024-Jan-01
                          </Text>
                        </Box>
                        <Divider m="0" />
                        <Box px="x2" py="x1" pb="x4">
                          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
                            {requestFields.map((field) => (
                              <DescriptionGroup key={field.label}>
                                <DescriptionTerm>{field.label}</DescriptionTerm>
                                <DescriptionDetails>{field.value}</DescriptionDetails>
                              </DescriptionGroup>
                            ))}
                          </DescriptionList>
                        </Box>
                      </Card>
                    )}
                    {/* Supplier request card. Card_style_type = regular. Can be filtered out.*/}
                    {appliedFilters.includeOldRequestsAndProposals && (
                      <Card p="0" width="480px">
                        <Box px="x2" py="x1_5" backgroundColor="whiteGrey">
                          <Heading4 mb="0">Your proposal</Heading4>
                          <Text fontSize="small" color="midGrey">
                            by you on 2024-Jan-02
                          </Text>
                        </Box>
                        <Divider m="0" />
                        <Box px="x2" py="x1" pb="x4">
                          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
                            {requestFields.map((field) => (
                              <DescriptionGroup key={field.label}>
                                <DescriptionTerm>{field.label}</DescriptionTerm>
                                <DescriptionDetails>{field.value}</DescriptionDetails>
                              </DescriptionGroup>
                            ))}
                          </DescriptionList>
                        </Box>
                      </Card>
                    )}
                    {/* Customer request card. Card_style_type = regular. Can be filtered out. */}
                    {appliedFilters.includeOldRequestsAndProposals && (
                      <Card p="0" width="480px">
                        <Box px="x2" py="x1_5" backgroundColor="whiteGrey">
                          <Heading4 mb="0">Customer's request</Heading4>
                          <Text fontSize="small" color="midGrey">
                            by John Doe on 2024-Jan-03
                          </Text>
                        </Box>
                        <Divider m="0" />
                        <Box px="x2" py="x1" pb="x4">
                          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
                            {requestFields.map((field) => (
                              <DescriptionGroup key={field.label}>
                                <DescriptionTerm>{field.label}</DescriptionTerm>
                                <DescriptionDetails>{field.value}</DescriptionDetails>
                              </DescriptionGroup>
                            ))}
                          </DescriptionList>
                        </Box>
                      </Card>
                    )}
                    {/* Latest supplier request card. Card_style_type = regular. Can be filtered out */}
                    {appliedFilters.includeLatestRequestAndProposal && (
                      <Card p="0" width="480px">
                        <Box px="x2" py="x1_5" backgroundColor="whiteGrey">
                          <Heading4 mb="0">Your proposal</Heading4>
                          <Text fontSize="small" color="midGrey">
                            by you on 2024-Jan-01
                          </Text>
                        </Box>
                        <Divider m="0" />
                        <Box px="x2" py="x1" pb="x4">
                          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
                            {requestFields.map((field) => (
                              <DescriptionGroup key={field.label}>
                                <DescriptionTerm>{field.label}</DescriptionTerm>
                                <DescriptionDetails>{field.value}</DescriptionDetails>
                              </DescriptionGroup>
                            ))}
                          </DescriptionList>
                        </Box>
                      </Card>
                    )}
                    {/* Active proposal. Card_style_type = active. Displayed if the proposal is still active. */}
                    {appliedFilters.includeLatestRequestAndProposal && collaborationStatus !== "accepted" && (
                      <Card p="0" borderColor="yellow" overflow="hidden" width="480px">
                        <Box px="x2" py="x1_5" pr="x1_5" backgroundColor="lightYellow">
                          <Flex justifyContent="space-between">
                            <Heading4 mb="0">Customer's latest request</Heading4>
                            <Box backgroundColor="yellow" borderRadius="medium" p="x0_25" width="x3" height="x3">
                              <Tooltip tooltip="Awaiting supplier response">
                                <Icon icon="accessTime" size="x2_5" color="darkGrey" />
                              </Tooltip>
                            </Box>
                          </Flex>

                          <Text fontSize="small" color="midGrey" pr="x0_5">
                            by John Doe on 2024-Jan-05
                          </Text>
                        </Box>
                        <Divider m="0" />
                        <Box px="x2" py="x1">
                          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
                            {requestFields.map((field) => (
                              <DescriptionGroup key={field.label}>
                                <DescriptionTerm>{field.label}</DescriptionTerm>
                                <DescriptionDetails>{field.value}</DescriptionDetails>
                              </DescriptionGroup>
                            ))}
                          </DescriptionList>
                        </Box>
                        <Box p="x2" pt="x1">
                          <PrimaryButton
                            fullWidth
                            onClick={() => {
                              setCollaborationStatus("accepted");
                              setShowAcceptedCard(true);
                              toast.success("Request accepted successfully");
                            }}
                          >
                            Accept request
                          </PrimaryButton>
                        </Box>
                      </Card>
                    )}
                    {/* Accepted card. Card_style_type = accepted. Displayed when request is accepted. */}
                    {showAcceptedCard && (
                      <Card p="0" borderColor="green" width="480px">
                        <Box px="x2" py="x1_5" backgroundColor="lightGreen">
                          <Flex justifyContent="space-between">
                            <Heading4 mb="0">Accepted request</Heading4>
                            <Box backgroundColor="green" borderRadius="medium" p="3px" width="24px" height="24px">
                              <Icon icon="check" size="18px" color="lightGreen" />
                            </Box>
                          </Flex>
                          <Text fontSize="small" color="midGrey">
                            by John Doe on 2024-Jan-05
                          </Text>
                        </Box>
                        <Divider m="0" />
                        <Box px="x2" py="x1" pb="x4">
                          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
                            {requestFields.map((field) => (
                              <DescriptionGroup key={field.label}>
                                <DescriptionTerm>{field.label}</DescriptionTerm>
                                <DescriptionDetails>{field.value}</DescriptionDetails>
                              </DescriptionGroup>
                            ))}
                          </DescriptionList>
                        </Box>
                      </Card>
                    )}
                    {/* New proposal/requirements. Card_style_type = new. Displayed if the proposal is still active */}
                    {collaborationStatus !== "accepted" && (
                      <Card p="0" width="480px">
                        <Flex justifyContent="center" alignItems="center" height="100%">
                          <QuietButton onClick={() => setIsNewProposalSidebarOpen(true)}>New proposal</QuietButton>
                        </Flex>
                      </Card>
                    )}
                  </Flex>
                </Box>
                {/* Left gradient - shows when there's room to scroll left */}
                {isOverflowing && scrollPosition > 10 && (
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    bottom={0}
                    width="48px"
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
                {isOverflowing && scrollPosition < maxScrollLeft - 10 && (
                  <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    width="48px"
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
              <Text>Production records content goes here.</Text>
            </Box>
          </Tab>
          <Tab label="Milestones performance">
            <Box p="x4">
              <Text>Milestones performance content goes here.</Text>
            </Box>
          </Tab>
          <Tab label="Attachments (5)">
            <Box p="x4">
              <Text>Attachments content goes here.</Text>
            </Box>
          </Tab>
          <Tab label="History log">
            <Box p="x4">
              <Text>History log content goes here.</Text>
            </Box>
          </Tab>
        </Tabs>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          title="Filters"
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton
                onClick={() => {
                  setAppliedFilters(filterOptions);
                  setIsSidebarOpen(false);
                }}
              >
                Apply filters
              </PrimaryButton>
              <QuietButton
                onClick={() => {
                  setFilterOptions(appliedFilters);
                  setIsSidebarOpen(false);
                }}
              >
                Cancel
              </QuietButton>
            </Flex>
          }
        >
          <CheckboxGroup
            labelText="Include"
            name="filterOptions"
            checkedValue={Object.entries(filterOptions)
              .filter(([key, value]) => value)
              .map(([key]) => key)}
            onChange={(checkedValues) => {
              setFilterOptions({
                includeOriginalRequest: checkedValues.includes("includeOriginalRequest"),
                includeOldRequestsAndProposals: checkedValues.includes("includeOldRequestsAndProposals"),
                includeLatestRequestAndProposal: checkedValues.includes("includeLatestRequestAndProposal"),
              });
            }}
          >
            <Checkbox value="includeOriginalRequest" labelText="Original request" />
            <Checkbox value="includeOldRequestsAndProposals" labelText="Old requests and proposals" />
            <Checkbox value="includeLatestRequestAndProposal" labelText="Latest request and proposal" disabled />
          </CheckboxGroup>
        </Sidebar>
        <Sidebar
          isOpen={isEditSidebarOpen}
          onClose={() => setIsEditSidebarOpen(false)}
          title="Edit PO line item details"
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={() => setIsEditSidebarOpen(false)}>Save</PrimaryButton>
              <QuietButton onClick={() => setIsEditSidebarOpen(false)}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3" py="x1">
            <FieldLabel labelText="PO number">
              <Input
                value={formData.poNumber}
                onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="Customer's item code">
              <Input
                value={formData.customerItemCode}
                onChange={(e) => setFormData({ ...formData, customerItemCode: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="Customer's item description">
              <Input
                value={formData.customerItemDescription}
                onChange={(e) => setFormData({ ...formData, customerItemDescription: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="Customer PO line item number">
              <Input
                value={formData.customerPOLineItemNumber}
                onChange={(e) => setFormData({ ...formData, customerPOLineItemNumber: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="Supplier PO line item number">
              <Input
                value={formData.supplierPOLineItemNumber}
                onChange={(e) => setFormData({ ...formData, supplierPOLineItemNumber: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="Creation date">
              <DatePicker
                selected={formData.creationDate}
                onChange={(date) => setFormData({ ...formData, creationDate: date })}
              />
            </FieldLabel>
            <FieldLabel labelText="Customer">
              <Input
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="BOM revision">
              <Input
                value={formData.bomRevision}
                onChange={(e) => setFormData({ ...formData, bomRevision: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="BOM release date">
              <DatePicker
                selected={formData.bomReleaseDate}
                onChange={(date) => setFormData({ ...formData, bomReleaseDate: date })}
              />
            </FieldLabel>
            <FieldLabel labelText="Need by date">
              <DatePicker
                selected={formData.needByDate}
                onChange={(date) => setFormData({ ...formData, needByDate: date })}
              />
            </FieldLabel>
            <FieldLabel labelText="Ship to">
              <Input value={formData.shipTo} onChange={(e) => setFormData({ ...formData, shipTo: e.target.value })} />
            </FieldLabel>
          </Flex>
        </Sidebar>
        <Sidebar
          isOpen={isCommentSidebarOpen}
          onClose={() => setIsCommentSidebarOpen(false)}
          title="Comments"
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={() => setIsCommentSidebarOpen(false)}>Comment</PrimaryButton>
              <QuietButton onClick={() => setIsCommentSidebarOpen(false)}>Clear</QuietButton>
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
          isOpen={isNewProposalSidebarOpen}
          onClose={() => setIsNewProposalSidebarOpen(false)}
          title="New proposal"
          footer={
            <Flex gap="x2" justifyContent="flex-start">
              <PrimaryButton onClick={() => setIsNewProposalSidebarOpen(false)}>Submit proposal</PrimaryButton>
              <QuietButton onClick={() => setIsNewProposalSidebarOpen(false)}>Cancel</QuietButton>
            </Flex>
          }
        >
          <Flex flexDirection="column" gap="x3" py="x1">
            <FieldLabel labelText="Quantity">
              <Input
                value={newProposalData.quantity}
                onChange={(e) => setNewProposalData({ ...newProposalData, quantity: e.target.value })}
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
                value={newProposalData.uom}
                onChange={(option) => setNewProposalData({ ...newProposalData, uom: String(option) })}
              />
            </FieldLabel>
            <FieldLabel labelText="Production due date">
              <DatePicker
                selected={newProposalData.productionDueDate}
                onChange={(date) => setNewProposalData({ ...newProposalData, productionDueDate: date })}
              />
            </FieldLabel>
            <FieldLabel labelText="Unit price">
              <Input
                value={newProposalData.unitPrice}
                onChange={(e) => setNewProposalData({ ...newProposalData, unitPrice: e.target.value })}
              />
            </FieldLabel>
            <FieldLabel labelText="Currency">
              <Input value={newProposalData.currency} disabled />
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
                value={newProposalData.changeReason}
                onChange={(option) => setNewProposalData({ ...newProposalData, changeReason: String(option) })}
              />
            </FieldLabel>
            <FieldLabel labelText="Change note">
              <Textarea
                value={newProposalData.changeNote}
                onChange={(e) => setNewProposalData({ ...newProposalData, changeNote: e.target.value })}
                style={{ height: "9em" }}
              />
            </FieldLabel>
          </Flex>
        </Sidebar>
      </Page>
    </ApplicationFrame>
  );
};

DefaultSupplier.storyName = "Default";
