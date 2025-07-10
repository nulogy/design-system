import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Box,
  Flex,
  Text,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  Table,
  IconicButton,
  VerticalDivider,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Header,
  Summary,
  SummaryDivider,
  StatusIndicator,
  Tab,
  Tabs,
  Switcher,
  Switch,
  Input,
  PrimaryButton,
  QuietButton,
  Select,
  toast,
  ToastContainer,
  Checkbox,
  Icon,
  List,
  ListItem,
} from "../../..";
import { EditableRow } from "./components/EditableRow";

export default {
  title: "Projects/Supplier Collaboration/POLI details/Table",
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
  const [sidebarState, setSidebarState] = useState({
    filters: false,
    edit: false,
    comments: false,
    newProposal: false,
  });
  const [collaborationState, setCollaborationState] = useState({
    status: "awaiting" as "awaiting" | "accepted",
    showAcceptedCard: false,
    hasNewCard: false,
    activeCardAuthorRole: "supplier" as "supplier" | "customer" | null,
  });
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
    viewMode: "supplier" as "supplier" | "customer",
  });
  const [productionComplete, setProductionComplete] = useState(false);
  const [formData, setFormData] = useState({
    newProposal: {
      quantity: "100",
      uom: "cases",
      productionDueDate: "2024-01-01",
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
      creationDate: "2024-01-01",
      customer: "MyCustomer",
      bomRevision: "Revision 2",
      bomReleaseDate: "2025-02-28",
      needByDate: "2024-01-01",
      shipTo: "MySupplier TO",
      carryOverSentTo: "",
      shortCloseReason: "",
    },
  });

  const [hiddenRows, setHiddenRows] = useState<any[]>([]);

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

    // Only add active/latest rows (no redundant "Your proposal" rows)
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

    // Do NOT add hiddenRows or any other regular rows

    return rows;
  }, [collaborationState, userState, productionComplete, formData, sidebarState.newProposal]);

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
              {row.authorRole !== userState.role ? (
                <Icon icon="accessTime" size="x2_5" color="darkGrey" />
              ) : (
                <Icon icon="accessTime" size="x2_5" color="white" />
              )}
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

  return (
    <>
      <ApplicationFrame>
        <Header
          breakpoints={{ medium: 1200 }}
          renderBreadcrumbs={() => breadcrumbs}
          title="12345678"
          subtitle="12345678 – PR 24 SEPHORA ONLINE DELUXE OCT"
          renderSummary={() => (
            <Summary breakpoint={1200}>
              <Flex flexDirection="column">
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                  Production progress
                </Text>
                <Text fontWeight="medium" fontSize="heading4" lineHeight="heading4">
                  {productionComplete ? "100%" : "50%"}{" "}
                  <Box as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                    {productionComplete ? "(200,000/200,000)" : "(100,000/200,000)"}
                  </Box>
                </Text>
              </Flex>
              <SummaryDivider />
              <Flex flexDirection="column" gap="half">
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                  Collaboration status
                </Text>
                <StatusIndicator
                  type={
                    productionComplete || collaborationState.status === "accepted"
                      ? "success"
                      : collaborationState.activeCardAuthorRole !== userState.role
                        ? "warning"
                        : "quiet"
                  }
                >
                  {productionComplete || collaborationState.status === "accepted"
                    ? "Accepted"
                    : collaborationState.activeCardAuthorRole === userState.role
                      ? `Awaiting ${userState.role === "supplier" ? "customer" : "supplier"} response`
                      : "Awaiting your response"}
                </StatusIndicator>
              </Flex>
            </Summary>
          )}
        />
        <Page>
          <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x3">
            <IconicButton icon="edit" aria-label="Edit">
              Edit
            </IconicButton>
            <IconicButton icon="chatBubble" aria-label="Comments">
              Comments
            </IconicButton>
          </Flex>
          <Box mb="x3" pl="x3">
            <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 5 }}>
              <DescriptionGroup>
                <DescriptionTerm>PO number</DescriptionTerm>
                <DescriptionDetails>
                  <Link underline={false}>4000023874</Link>
                </DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Customer's PO line item number</DescriptionTerm>
                <DescriptionDetails>12345</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Supplier's PO line item number</DescriptionTerm>
                <DescriptionDetails>23453</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Created on</DescriptionTerm>
                <DescriptionDetails>2025-Feb-01</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>{userState.role === "supplier" ? "Customer" : "Supplier"}</DescriptionTerm>
                <DescriptionDetails>MyCustomer</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>
                  {userState.role === "supplier" ? "Customer's item code and description" : "Item code and description"}
                </DescriptionTerm>
                <DescriptionDetails>
                  <Link underline={false}>12345678 – PR 24 SEPHORA ONLINE DELUXE OCT</Link>
                </DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Supplier's item code</DescriptionTerm>
                <DescriptionDetails>SUP-123456</DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>BOM revision and release date</DescriptionTerm>
                <DescriptionDetails>
                  <Text color="lightGrey">Revision 2 – 2025-Feb-28</Text>
                </DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Priority</DescriptionTerm>
                <DescriptionDetails>
                  <Text color="lightGrey">?</Text>
                </DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Materials availability date</DescriptionTerm>
                <DescriptionDetails>
                  <Text color="lightGrey">2025-Feb-15</Text>
                </DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Production start date</DescriptionTerm>
                <DescriptionDetails>
                  <Text color="lightGrey">2025-Feb-20</Text>
                </DescriptionDetails>
              </DescriptionGroup>
              <DescriptionGroup>
                <DescriptionTerm>Need by date</DescriptionTerm>
                <DescriptionDetails>
                  <Text color="lightGrey">2025-Feb-28</Text>
                </DescriptionDetails>
              </DescriptionGroup>
              {productionComplete && (
                <>
                  <DescriptionGroup>
                    <DescriptionTerm>Close production note</DescriptionTerm>
                    <DescriptionDetails>Production completed successfully</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Carry over sent to</DescriptionTerm>
                    <DescriptionDetails>{formData.edit.carryOverSentTo || "N/A"}</DescriptionDetails>
                  </DescriptionGroup>
                </>
              )}
            </DescriptionList>
          </Box>
          <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
            <Tab label="Collaboration">
              <Box>
                <Flex gap="x2" my="x3" justifyContent="flex-end" alignItems="center">
                  {!sidebarState.newProposal ? (
                    <>
                      {/* Show Accept button for active rows when user needs to act */}
                      {collaborationState.activeCardAuthorRole &&
                        collaborationState.activeCardAuthorRole !== userState.role &&
                        !collaborationState.hasNewCard &&
                        collaborationState.status !== "accepted" && (
                          <PrimaryButton onClick={handleAcceptProposal}>
                            Accept {collaborationState.activeCardAuthorRole === "customer" ? "request" : "proposal"}
                          </PrimaryButton>
                        )}
                      <QuietButton onClick={handleNewProposalClick}>
                        New {userState.role === "supplier" ? "proposal" : "request"}
                      </QuietButton>
                    </>
                  ) : (
                    <>
                      <PrimaryButton onClick={handleSubmitNewProposal}>
                        Submit {userState.role === "supplier" ? "proposal" : "request"}
                      </PrimaryButton>
                      <QuietButton
                        onClick={() => {
                          // Remove the last hidden row (the one we just added)
                          setHiddenRows((prev) => prev.slice(0, -1));
                          // Close the new proposal form
                          setSidebarState((prev) => ({ ...prev, newProposal: false }));
                        }}
                      >
                        Cancel
                      </QuietButton>
                    </>
                  )}
                </Flex>
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
                              ? (tableRows.find((row) => row.type === "active")?.unitPrice || "$2.99").replace("$", "")
                              : formData.newProposal.unitPrice,
                          currency: "USD",
                          reason:
                            collaborationState.activeCardAuthorRole === userState.role
                              ? tableRows.find((row) => row.type === "active")?.reason ||
                                formData.newProposal.changeReason
                              : formData.newProposal.changeReason,
                          note:
                            collaborationState.activeCardAuthorRole === userState.role
                              ? tableRows.find((row) => row.type === "active")?.note || formData.newProposal.changeNote
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
            </Tab>
            <Tab label="Milestone performance">
              <Box p="x4">
                <Text>Milestone performance content goes here.</Text>
              </Box>
            </Tab>
            <Tab label="Production/Materials planning">
              <Box p="x4">
                <Text>Materials availability report that surfaces:</Text>
                <List mt="x2">
                  <ListItem>Can run (now)</ListItem>
                  <ListItem>Can run (Production start date)</ListItem>
                  <ListItem>Materials availability date</ListItem>
                  <ListItem>Production start date</ListItem>
                  <ListItem>BOM revision and release date</ListItem>
                  <ListItem>Priority</ListItem>
                </List>
              </Box>
            </Tab>
            <Tab label="Production execution/records">
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
            <Tab label="Delivery">
              <Box p="x4">
                <DescriptionList layout="stacked" columns={{ extraSmall: 1, small: 2, medium: 3, large: 4 }}>
                  <DescriptionGroup>
                    <DescriptionTerm>Need by date</DescriptionTerm>
                    <DescriptionDetails>2025-Feb-28</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Ship to</DescriptionTerm>
                    <DescriptionDetails>MySupplier TO</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Shipped quantity</DescriptionTerm>
                    <DescriptionDetails>100 cases</DescriptionDetails>
                  </DescriptionGroup>
                  <DescriptionGroup>
                    <DescriptionTerm>Received quantity</DescriptionTerm>
                    <DescriptionDetails>95 cases</DescriptionDetails>
                  </DescriptionGroup>
                </DescriptionList>
              </Box>
            </Tab>
            <Tab label="Attachments">
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
        </Page>
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
          <Flex alignItems="center" gap="x2">
            <Checkbox
              id="productionComplete"
              checked={productionComplete}
              onChange={(e) => setProductionComplete(e.target.checked)}
              labelText="Production complete"
            />
            <VerticalDivider />
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
          </Flex>
        </Box>
        <ToastContainer />
      </ApplicationFrame>
    </>
  );
};
