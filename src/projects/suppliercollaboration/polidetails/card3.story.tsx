import React, { useState } from "react";
import { Divider, toast, Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
  Heading4,
  PrimaryButton,
  QuietButton,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  ApplicationFrame,
  Page,
  Breadcrumbs,
  Link,
  IconicButton,
  VerticalDivider,
  ToastContainer,
  BrandedNavBar,
  StatusIndicator,
  TruncatedText,
  Header,
  Summary,
  SummaryDivider,
  Tab,
  Tabs,
  List,
  ListItem,
  Card,
} from "../../..";
import {
  CollaborationCard2,
  CollaborationCard2Header,
  CollaborationCard2Body,
  CollaborationCard2Footer,
} from "./components/CollaborationCard2";

export default {
  title: "Projects/Supplier Collaboration/POLI details/Card3",
  parameters: {
    layout: "fullscreen",
  },
};

export const DefaultCard3 = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // User state
  const [userState, setUserState] = useState({
    role: "supplier" as "supplier" | "customer",
  });

  // Production complete state
  const [productionComplete, setProductionComplete] = useState(false);

  // PO status state
  const [poStatus, setPoStatus] = useState("At risk" as "Late" | "Completed" | "At risk" | "On time" | "Cancelled");

  // Focused card state
  const [focusedCard, setFocusedCard] = useState<string | null>("customerLatestRequest");
  const [editingCard, setEditingCard] = useState<string | null>(null);

  // Function to handle focusing a card
  const handleFocusCard = (cardId: string) => {
    setFocusedCard(cardId);
    setEditingCard(null); // Clear editing state when focusing
  };

  // Function to handle editing a card
  const handleEditCard = (cardId: string) => {
    setEditingCard(cardId);
    setFocusedCard(null); // Clear focus state when editing
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
              <StatusIndicator alignSelf="center" type="quiet">
                Awaiting response
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
                  <DescriptionDetails>N/A</DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>

        <Tabs selectedIndex={selectedIndex} onTabClick={(e, index) => setSelectedIndex(index)}>
          <Tab label="Collaboration">
            <Flex p="x3">
              {/* Column headers */}
              <CollaborationCard2 type="label">
                <CollaborationCard2Header title="Column Headers" />
                <CollaborationCard2Body>
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    Quantity
                  </Text>
                  <Divider m="0" />
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    UOM
                  </Text>
                  <Divider m="0" />
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    Production due date
                  </Text>
                  <Divider m="0" />
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    Unit price
                  </Text>
                  <Divider m="0" />
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    Currency
                  </Text>
                  <Divider m="0" />
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    Change reason
                  </Text>
                  <Divider m="0" />
                  <Text fontWeight="bold" fontSize="small" lineHeight="smallRelaxed" color="darkGrey">
                    Change note
                  </Text>
                  <Divider m="0" />
                </CollaborationCard2Body>
              </CollaborationCard2>

              {/* Customer's original request */}
              <CollaborationCard2 type="readOnly">
                <CollaborationCard2Header title="Customer's original request" meta="by John D. on January 21, 2025" />
                <CollaborationCard2Body>
                  <Text>200</Text>
                  <Divider m="0" />
                  <Text>UOM</Text>
                  <Divider m="0" />
                  <Text>24-Jan-2025</Text>
                  <Divider m="0" />
                  <Text>$2.99</Text>
                  <Divider m="0" />
                  <Text>CAD</Text>
                  <Divider m="0" />
                  <Text>Some reason</Text>
                  <Divider m="0" />
                  <Text>Some note</Text>
                  <Divider m="0" />
                </CollaborationCard2Body>
              </CollaborationCard2>

              {/* Your latest proposal */}
              <CollaborationCard2
                type={
                  editingCard === "yourLatestProposal"
                    ? "edit"
                    : focusedCard === "yourLatestProposal"
                      ? "awaitingYou"
                      : "awaitingOtherParty"
                }
              >
                <CollaborationCard2Header
                  title="Your latest proposal"
                  meta="by Nick S. on January 23, 2025"
                  icon={editingCard === "yourLatestProposal" ? "edit" : "info"}
                />
                <CollaborationCard2Body>
                  <Text>300</Text>
                  <Divider m="0" />
                  <Text>UOM</Text>
                  <Divider m="0" />
                  <Text>24-Jan-2025</Text>
                  <Divider m="0" />
                  <Text>$2.99</Text>
                  <Divider m="0" />
                  <Text>CAD</Text>
                  <Divider m="0" />
                  <Text>Some reason</Text>
                  <Divider m="0" />
                  <Text>Some note</Text>
                  <Divider m="0" />
                </CollaborationCard2Body>
                <CollaborationCard2Footer
                  primaryAction={editingCard === "yourLatestProposal" ? "Submit" : "Update proposal"}
                  secondaryAction={editingCard === "yourLatestProposal" ? "Cancel" : undefined}
                  onPrimaryAction={() => {
                    if (editingCard === "yourLatestProposal") {
                      handleFocusCard("yourLatestProposal");
                    } else {
                      handleEditCard("yourLatestProposal");
                    }
                  }}
                  onSecondaryAction={() => {
                    if (editingCard === "yourLatestProposal") {
                      handleFocusCard("yourLatestProposal");
                    }
                  }}
                />
              </CollaborationCard2>

              {/* Customer's latest request */}
              <CollaborationCard2
                type={
                  editingCard === "customerLatestRequest"
                    ? "edit"
                    : focusedCard === "customerLatestRequest"
                      ? "awaitingYou"
                      : "awaitingOtherParty"
                }
              >
                <CollaborationCard2Header
                  title="Customer's latest request"
                  meta="by John D. on January 24, 2025"
                  icon={editingCard === "customerLatestRequest" ? "edit" : "info"}
                />
                <CollaborationCard2Body>
                  <Text>300</Text>
                  <Divider m="0" />
                  <Text>UOM</Text>
                  <Divider m="0" />
                  <Text>24-Jan-2025</Text>
                  <Divider m="0" />
                  <Text>$2.99</Text>
                  <Divider m="0" />
                  <Text>CAD</Text>
                  <Divider m="0" />
                  <Text>Some reason</Text>
                  <Divider m="0" />
                  <Text>Some note</Text>
                  <Divider m="0" />
                </CollaborationCard2Body>
                <CollaborationCard2Footer
                  primaryAction={editingCard === "customerLatestRequest" ? "Submit" : "Update proposal"}
                  secondaryAction={editingCard === "customerLatestRequest" ? "Cancel" : undefined}
                  onPrimaryAction={() => {
                    if (editingCard === "customerLatestRequest") {
                      handleFocusCard("customerLatestRequest");
                    } else {
                      handleEditCard("customerLatestRequest");
                    }
                  }}
                  onSecondaryAction={() => {
                    if (editingCard === "customerLatestRequest") {
                      handleFocusCard("customerLatestRequest");
                    }
                  }}
                />
              </CollaborationCard2>
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
      </Page>
    </ApplicationFrame>
  );
};

DefaultCard3.storyName = "Default";
