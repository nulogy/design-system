import React, { useState } from "react";
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
} from "../../..";

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
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [editRow, setEditRow] = useState({
    quantity: "120",
    uom: "cases",
    dueDate: "2024-01-10",
    unitPrice: "$3.10",
    currency: "USD",
    reason: "Price change",
  });

  const handleAcceptProposal = () => {
    setIsAccepted(true);
    toast.success("Proposal accepted successfully");
  };

  const columns = [
    {
      label: "",
      dataKey: "rowLabel",
      cellRenderer: ({ cellData }) => (
        <Text fontSize="small" fontWeight="bold" color="midGrey">
          {cellData}
        </Text>
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

  const rows = [
    {
      id: 0,
      rowLabel: "Customer's original request",
      quantity: "90",
      uom: "cases",
      dueDate: "2023-12-20",
      unitPrice: "$2.80",
      currency: "USD",
      reason: "Initial order",
      note: "Original customer request",
    },
    ...(showNewRequest
      ? [
          {
            id: 1,
            rowLabel: "Supplier's proposal",
            quantity: "100",
            uom: "cases",
            dueDate: "2024-01-01",
            unitPrice: "$2.99",
            currency: "USD",
            reason: "Material shortage",
            note: "Initial proposal.",
          },
        ]
      : []),
  ];

  return (
    <>
      <ApplicationFrame>
        <Header
          breakpoints={{ medium: 1200 }}
          renderBreadcrumbs={() => breadcrumbs}
          title="12345678"
          subtitle="PR 24 SEPHORA ONLINE DELUXE OCT"
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
                <StatusIndicator type={isAccepted ? "success" : "warning"}>
                  {isAccepted ? "Accepted" : "Awaiting your response"}
                </StatusIndicator>
              </Flex>
            </Summary>
          )}
        />
        <Page>
          {/* Action bar above details */}
          <Flex justifyContent="flex-end" alignItems="center" gap="x2" mb="x3">
            <IconicButton icon="edit" aria-label="Edit">
              Edit
            </IconicButton>
            <VerticalDivider />
            <IconicButton icon="chatBubble" aria-label="Comments">
              Comments
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
                <Flex gap="x2" my="x3" justifyContent="flex-end">
                  {!showNewRequest ? (
                    <>
                      {!isAccepted && <PrimaryButton onClick={handleAcceptProposal}>Accept proposal</PrimaryButton>}
                      <QuietButton onClick={() => setShowNewRequest(!showNewRequest)}>New request</QuietButton>
                    </>
                  ) : (
                    <>
                      <PrimaryButton>Submit request</PrimaryButton>
                      <QuietButton onClick={() => setShowNewRequest(false)}>Cancel</QuietButton>
                    </>
                  )}
                </Flex>
                <Box px="x2">
                  <Table columns={columns} rows={rows} keyField="id" />
                </Box>

                {showNewRequest && (
                  /* Your proposal/request */
                  <Flex mt="x2" alignItems="center" py="x1" px="x2" backgroundColor="lightBlue" borderRadius="medium">
                    <Box width="20%" pr="x2">
                      <Text fontSize="small" fontWeight="bold" color="midGrey">
                        Your new request
                      </Text>
                    </Box>
                    <Box width="5%" pr="x2">
                      <Input
                        value={editRow.quantity}
                        onChange={(e) => setEditRow({ ...editRow, quantity: e.target.value })}
                        style={{ maxWidth: "100%", width: "100%" }}
                      />
                    </Box>
                    <Box width="10%" pr="x2">
                      <Input
                        value={editRow.uom}
                        onChange={(e) => setEditRow({ ...editRow, uom: e.target.value })}
                        style={{ maxWidth: "100%", width: "100%" }}
                      />
                    </Box>
                    <Box width="10%" pr="x2">
                      <Input
                        value={editRow.dueDate}
                        onChange={(e) => setEditRow({ ...editRow, dueDate: e.target.value })}
                        style={{ maxWidth: "100%", width: "100%" }}
                      />
                    </Box>
                    <Box width="5%" pr="x2">
                      <Input
                        value={editRow.unitPrice}
                        onChange={(e) => setEditRow({ ...editRow, unitPrice: e.target.value })}
                        style={{ maxWidth: "100%", width: "100%" }}
                      />
                    </Box>
                    <Box width="10%" pr="x2">
                      <Text>USD</Text>
                    </Box>
                    <Box width="15%" pr="x2">
                      <Select
                        value={editRow.reason}
                        onChange={(value) => setEditRow({ ...editRow, reason: value as string })}
                        options={[
                          { value: "", label: "Select reason..." },
                          { value: "Material shortage", label: "Material shortage" },
                          { value: "Price change", label: "Price change" },
                          { value: "Schedule change", label: "Schedule change" },
                          { value: "Quality issue", label: "Quality issue" },
                        ]}
                      />
                    </Box>
                    <Box width="25%">
                      <Input placeholder="Enter note..." style={{ maxWidth: "100%", width: "100%" }} />
                    </Box>
                  </Flex>
                )}

                {!showNewRequest && (
                  /* Supplier's proposal */
                  <Flex
                    mt="x2"
                    alignItems="center"
                    py="x2"
                    px="x2"
                    backgroundColor={isAccepted ? "whiteGrey" : "lightBlue"}
                    borderRadius="medium"
                  >
                    <Box width="20%" pr="x2">
                      <Flex alignItems="center" gap="x1">
                        <Text fontSize="small" fontWeight="bold" color="midGrey">
                          Supplier's proposal
                        </Text>
                        <StatusIndicator type={isAccepted ? "success" : "warning"}>
                          {isAccepted ? "Accepted" : "Awaiting your response"}
                        </StatusIndicator>
                      </Flex>
                    </Box>
                    <Box width="5%" pr="x2" textAlign="right">
                      <Text>100</Text>
                    </Box>
                    <Box width="10%" pr="x2">
                      <Text>cases</Text>
                    </Box>
                    <Box width="10%" pr="x2">
                      <Text>2024-01-01</Text>
                    </Box>
                    <Box width="5%" pr="x2" textAlign="right">
                      <Text>$2.99</Text>
                    </Box>
                    <Box width="10%" pr="x2">
                      <Text>USD</Text>
                    </Box>
                    <Box width="15%" pr="x2">
                      <Text>Material shortage</Text>
                    </Box>
                    <Box width="25%">
                      <Text>Initial proposal.</Text>
                    </Box>
                  </Flex>
                )}
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
        </Page>
      </ApplicationFrame>
      <ToastContainer />
    </>
  );
};
