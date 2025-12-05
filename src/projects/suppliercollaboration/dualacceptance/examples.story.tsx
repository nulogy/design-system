import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Tooltip } from "../../..";
import {
  Box,
  Flex,
  Text,
  Heading4,
  Icon,
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
  IconicButton,
  VerticalDivider,
  StatusIndicator,
  TruncatedText,
  Header as HeaderComponent,
  Summary,
  SummaryDivider,
  DropdownMenu,
  DropdownButton,
} from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Dual acceptance/Examples",
  parameters: {
    layout: "fullscreen",
  },
};

const HeaderVariation = ({
  title,
  userRole,
  poliStatus,
  productionStatus,
  collaborationStatus,
  acceptedRequest,
  acceptedProposal,
  poStatus,
  isReconciled,
  isFlagged,
  activeCardAuthorRole,
}: {
  title: string;
  userRole: "customer" | "supplier";
  poliStatus: "Open" | "Canceled" | "Completed";
  productionStatus: "Not started" | "In progress" | "Completed";
  collaborationStatus: "awaiting" | "accepted";
  acceptedRequest: boolean;
  acceptedProposal: boolean;
  poStatus: "Late" | "At risk" | "On time";
  isReconciled: boolean | null;
  isFlagged: boolean;
  activeCardAuthorRole: "supplier" | "customer" | null;
}) => {
  const theme = useTheme();
  const customerPOLineItemNumber = "POLI-001";
  const customerItemCodeAndDescription = "12345678 – PR 24 SEPHORA ONLINE DELUXE OCT";

  return (
    <Box mb="x4">
      <Heading4 mb="x2">{title}</Heading4>
      <HeaderComponent
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
              <IconicButton icon="chatBubble" labelHidden tooltip="Comments (6)" onClick={() => {}}>
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
            {userRole === "customer" && poliStatus !== "Canceled" && poliStatus !== "Completed" && (
              <>
                <VerticalDivider />
                <DropdownMenu>
                  <DropdownButton onClick={() => {}}>Cancel PO line item</DropdownButton>
                </DropdownMenu>
              </>
            )}
          </Flex>
        )}
        renderSummary={() => {
          if (poliStatus === "Canceled") {
            return (
              <Summary breakpoint={120}>
                <Flex flexDirection="column" width="200px" justifyContent="center" pt="x0_5">
                  <Tooltip
                    tooltip={
                      <Box>
                        <Text fontSize="small" lineHeight="smallRelaxed">
                          7,500 / 15,000 eaches
                        </Text>
                      </Box>
                    }
                  >
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <Box height="x1" width="100%" backgroundColor="grey" borderRadius="medium" />
                    </Flex>
                  </Tooltip>
                  <Flex justifyContent="center">
                    <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                        50%
                      </Text>{" "}
                      produced
                    </Text>
                  </Flex>
                </Flex>
              </Summary>
            );
          }

          if (poliStatus === "Completed") {
            return (
              <Summary breakpoint={120}>
                <Flex flexDirection="column" width="200px" justifyContent="center" pt="x0_5">
                  <Tooltip
                    tooltip={
                      <Box>
                        <Text fontSize="small" lineHeight="smallRelaxed">
                          7,500 / 15,000 eaches
                        </Text>
                      </Box>
                    }
                  >
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <Box height="x1" width="100%" backgroundColor="darkGrey" borderRadius="medium" />
                    </Flex>
                  </Tooltip>
                  <Flex justifyContent="center">
                    <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                        50%
                      </Text>{" "}
                      produced
                    </Text>
                  </Flex>
                </Flex>
              </Summary>
            );
          }

          // Open - show current content
          return (
            <Summary breakpoint={120}>
              <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" pt="x0_5">
                <Flex height="x2_5" alignItems="center" justifyContent="center" gap="x0_5">
                  {(collaborationStatus === "accepted" || acceptedRequest || acceptedProposal) &&
                  acceptedProposal &&
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
                        collaborationStatus === "accepted" || acceptedRequest || acceptedProposal
                          ? "success"
                          : activeCardAuthorRole === userRole
                            ? "warning"
                            : "quiet"
                      }
                    >
                      {collaborationStatus === "accepted" || acceptedRequest || acceptedProposal ? (
                        "Accepted"
                      ) : activeCardAuthorRole === userRole ? (
                        "Requires your response"
                      ) : (
                        <TruncatedText fontSize="smaller" lineHeight="smallerText" fullWidth maxWidth="184px">
                          {`Awaiting ${userRole === "supplier" ? "customer" : "supplier"} response`}
                        </TruncatedText>
                      )}
                    </StatusIndicator>
                  )}
                  {acceptedProposal && isReconciled !== null && (
                    <Tooltip tooltip={isReconciled ? "Request reconciled" : "Request not reconciled"}>
                      <StatusIndicator alignSelf="center" type="quiet">
                        <TruncatedText
                          maxCharacters={9}
                          fontSize="smaller"
                          lineHeight="smallerText"
                          showTooltip={false}
                        >
                          {isReconciled ? "Reconciled" : "Not reconciled"}
                        </TruncatedText>
                      </StatusIndicator>
                    </Tooltip>
                  )}
                </Flex>
                <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                  {collaborationStatus === "accepted" || acceptedRequest || acceptedProposal ? (
                    <>
                      On{" "}
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                        September 24, 2025
                      </Text>
                    </>
                  ) : (
                    <>
                      For{" "}
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
                        2 days
                      </Text>
                    </>
                  )}
                </Text>
              </Flex>
              <SummaryDivider />
              <Flex flexDirection="column" width="200px" justifyContent="center" pt="x0_5">
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
                <Flex justifyContent={productionStatus === "Completed" ? "space-between" : "center"}>
                  <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                    <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
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
              <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" pt="x0_5">
                {poStatus === "Late" && (
                  <>
                    <Flex height="x2_5" alignItems="center" justifyContent="center">
                      <StatusIndicator type="danger">Late</StatusIndicator>
                    </Flex>
                    <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
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
                    <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
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
                    <Text fontSize="small" color="midGrey" lineHeight="smallRelaxed">
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" fontWeight="bold">
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
            {customerItemCodeAndDescription}
          </Text>
        </Flex>
      </HeaderComponent>
    </Box>
  );
};
export const Header = () => {
  const [filters, setFilters] = useState({
    viewedAs: "all" as "all" | "customer" | "supplier",
    poliStatus: "all" as "all" | "Open" | "Canceled" | "Completed",
    collaboration: "all" as
      | "all"
      | "awaiting-customer"
      | "awaiting-supplier"
      | "request-accepted"
      | "proposal-accepted-reconciled"
      | "proposal-accepted-not-reconciled",
    production: "all" as "all" | "Not started" | "In progress" | "Completed",
    milestoneStatus: "all" as "all" | "Late" | "At risk" | "On time",
  });

  // Custom styles to ensure dropdown appears above all content
  const selectStyles = (baseStyles: any) => ({
    ...baseStyles,
    menu: (provided: any, state: any) => ({
      ...baseStyles.menu(provided, state),
      zIndex: 9999,
    }),
  });

  const variations = [
    // Customer - Open - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Not started | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Not started | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Not started | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: In progress | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: In progress | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: In progress | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Completed | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Completed | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Completed | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    // Customer - Open - Awaiting customer's response (requires customer response)
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: Not started | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: Not started | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: Not started | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: In progress | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: In progress | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: In progress | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: Completed | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: Completed | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Collaboration: Awaiting customer's response | Production: Completed | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    // Customer - Open - Proposal accepted (reconciled)
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: Not started | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: Not started | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: Not started | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: In progress | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: In progress | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: In progress | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: Completed | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: Completed | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (reconciled) | Production: Completed | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    // Customer - Open - Proposal accepted (not reconciled)
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: Not started | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: Not started | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: Not started | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: In progress | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: In progress | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: In progress | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: Completed | Milestone status: On time",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: Completed | Milestone status: At risk",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (not reconciled) | Production: Completed | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    // Customer - Canceled
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title: "Viewed as Customer | POLI status: Canceled",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    // Customer - Completed
    {
      title: "Viewed as Customer | POLI status: Completed",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Completed",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Completed",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Completed",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    // Supplier - Open - Awaiting customer's response
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: Not started | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: Not started | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: Not started | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: In progress | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: In progress | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: In progress | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: Completed | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: Completed | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting customer's response | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    // Supplier - Open - Awaiting supplier's response (requires supplier response)
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Not started | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Not started | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Not started | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: In progress | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: In progress | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: In progress | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Completed | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Completed | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Awaiting supplier's response | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    // Supplier - Open - Proposal accepted (reconciled)
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: Not started | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: Not started | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: Not started | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: In progress | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: In progress | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: In progress | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: Completed | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: Completed | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (reconciled) | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    // Supplier - Open - Proposal accepted (not reconciled)
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: Not started | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: Not started | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: Not started | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: In progress | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: In progress | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: In progress | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: Completed | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: Completed | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "At risk" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (not reconciled) | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    // Supplier - Open - Request accepted
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: Not started | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: Not started | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: Not started | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: In progress | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: In progress | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: In progress | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: Completed | Milestone status: On time",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: Completed | Milestone status: At risk",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title:
        "Viewed as Supplier | POLI status: Open | Collaboration: Request accepted | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    // Supplier - Canceled
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "At risk" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
    {
      title: "Viewed as Supplier | POLI status: Canceled",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: false,
      isFlagged: true,
      activeCardAuthorRole: null as null,
    },
    // Supplier - Completed
    {
      title: "Viewed as Supplier | POLI status: Completed",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Not started" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Completed",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
      productionStatus: "In progress" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Completed",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "On time" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Completed",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "On time" as const,
      isReconciled: true,
      isFlagged: false,
      activeCardAuthorRole: null as null,
    },
  ];

  const filteredVariations = variations.filter((variation) => {
    if (filters.viewedAs !== "all" && variation.userRole !== filters.viewedAs) return false;
    if (filters.poliStatus !== "all" && variation.poliStatus !== filters.poliStatus) return false;
    if (filters.collaboration !== "all") {
      if (filters.collaboration === "awaiting-customer") {
        if (variation.collaborationStatus !== "awaiting" || variation.activeCardAuthorRole !== "customer") return false;
      } else if (filters.collaboration === "awaiting-supplier") {
        if (variation.collaborationStatus !== "awaiting" || variation.activeCardAuthorRole !== "supplier") return false;
      } else if (filters.collaboration === "request-accepted") {
        if (variation.collaborationStatus !== "accepted" || !variation.acceptedRequest) return false;
      } else if (filters.collaboration === "proposal-accepted-reconciled") {
        if (
          variation.collaborationStatus !== "accepted" ||
          !variation.acceptedProposal ||
          variation.isReconciled !== true
        )
          return false;
      } else if (filters.collaboration === "proposal-accepted-not-reconciled") {
        if (
          variation.collaborationStatus !== "accepted" ||
          !variation.acceptedProposal ||
          variation.isReconciled !== false
        )
          return false;
      }
    }
    if (filters.production !== "all" && variation.productionStatus !== filters.production) return false;
    if (filters.milestoneStatus !== "all" && variation.poStatus !== filters.milestoneStatus) return false;
    return true;
  });

  // Remove duplicates based on title - keep only the first occurrence of each unique title
  const seenTitles = new Set<string>();
  const uniqueVariations = filteredVariations.filter((variation) => {
    if (seenTitles.has(variation.title)) {
      return false;
    }
    seenTitles.add(variation.title);
    return true;
  });

  return (
    <>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
        `}
      </style>
      <ApplicationFrame>
        <Page>
          <Box p="x4" style={{ overflow: "visible" }}>
            <Box mb="x4" style={{ position: "relative", zIndex: 1000, overflow: "visible" }}>
              <Flex gap="x2" flexWrap="wrap" alignItems="flex-end" style={{ overflow: "visible" }}>
                <Box minWidth="150px">
                  <FieldLabel labelText="Viewed as" mb="x1" />
                  <Select
                    menuPosition="fixed"
                    styles={selectStyles}
                    value={filters.viewedAs}
                    onChange={(value) => setFilters({ ...filters, viewedAs: value as any })}
                    options={[
                      { value: "all", label: "All" },
                      { value: "customer", label: "Customer" },
                      { value: "supplier", label: "Supplier" },
                    ]}
                  />
                </Box>
                <Box minWidth="150px">
                  <FieldLabel labelText="POLI status" mb="x1" />
                <Select
                  menuPosition="fixed"
                  styles={selectStyles}
                  value={filters.poliStatus}
                  onChange={(value) => setFilters({ ...filters, poliStatus: value as any })}
                  options={[
                    { value: "all", label: "All" },
                    { value: "Open", label: "Open" },
                    { value: "Canceled", label: "Canceled" },
                    { value: "Completed", label: "Completed" },
                  ]}
                />
              </Box>
              <Box minWidth="300px">
                <FieldLabel labelText="Collaboration" mb="x1" />
                <Select
                  menuPosition="fixed"
                  styles={selectStyles}
                  disabled={filters.poliStatus === "Completed" || filters.poliStatus === "Canceled"}
                  value={filters.collaboration}
                  onChange={(value) => setFilters({ ...filters, collaboration: value as any })}
                  options={[
                    { value: "all", label: "All" },
                    { value: "awaiting-customer", label: "Awaiting customer's response" },
                    { value: "awaiting-supplier", label: "Awaiting supplier's response" },
                    { value: "request-accepted", label: "Request accepted" },
                    { value: "proposal-accepted-reconciled", label: "Proposal accepted (reconciled)" },
                    { value: "proposal-accepted-not-reconciled", label: "Proposal accepted (not reconciled)" },
                  ]}
                />
              </Box>
              <Box minWidth="150px">
                <FieldLabel labelText="Production" mb="x1" />
                <Select
                  menuPosition="fixed"
                  styles={selectStyles}
                  disabled={filters.poliStatus === "Completed" || filters.poliStatus === "Canceled"}
                  value={filters.production}
                  onChange={(value) => setFilters({ ...filters, production: value as any })}
                  options={[
                    { value: "all", label: "All" },
                    { value: "Not started", label: "Not started" },
                    { value: "In progress", label: "In progress" },
                    { value: "Completed", label: "Completed" },
                  ]}
                />
              </Box>
              <Box minWidth="150px">
                <FieldLabel labelText="Milestone status" mb="x1" />
                <Select
                  menuPosition="fixed"
                  styles={selectStyles}
                  disabled={filters.poliStatus === "Completed" || filters.poliStatus === "Canceled"}
                  value={filters.milestoneStatus}
                  onChange={(value) => setFilters({ ...filters, milestoneStatus: value as any })}
                  options={[
                    { value: "all", label: "All" },
                    { value: "Late", label: "Late" },
                    { value: "At risk", label: "At risk" },
                    { value: "On time", label: "On time" },
                  ]}
                />
              </Box>
            </Flex>
          </Box>
          {uniqueVariations.map((variation, index) => (
            <HeaderVariation
              key={index}
              title={variation.title}
              userRole={variation.userRole}
              poliStatus={variation.poliStatus}
              productionStatus={variation.productionStatus}
              collaborationStatus={variation.collaborationStatus}
              acceptedRequest={variation.acceptedRequest}
              acceptedProposal={variation.acceptedProposal}
              poStatus={variation.poStatus}
              isReconciled={variation.isReconciled}
              isFlagged={variation.isFlagged}
              activeCardAuthorRole={variation.activeCardAuthorRole}
            />
          ))}
        </Box>
      </Page>
    </ApplicationFrame>
    </>
  );
};
const DetailsSectionVariation = ({
  title,
  userRole,
  poliStatus,
  productionStatus,
  supplierPOLineItemNumber = "SPLI-001",
  bomRevision = "Rev 1.2 – 2025-Jan-10",
  needByDate = "2025-02-15",
  closeProductionNote = "Production completed",
  carryOverSentTo = "",
  expressShipment = false,
  validatedForAssembly = false,
}: {
  title: string;
  userRole: "customer" | "supplier";
  poliStatus: "Open" | "Canceled" | "Completed";
  productionStatus: "Not started" | "In progress" | "Completed";
  supplierPOLineItemNumber?: string;
  bomRevision?: string;
  needByDate?: string;
  closeProductionNote?: string;
  carryOverSentTo?: string;
  expressShipment?: boolean;
  validatedForAssembly?: boolean;
}) => {
  const customerPOLineItemNumber = "POLI-001";
  const customerItemCodeAndDescription = "12345678 – PR 24 SEPHORA ONLINE DELUXE OCT";
  const [detailsExpanded, setDetailsExpanded] = useState(true);

  return (
    <Box mb="x4">
      <Heading4 mb="x2">{title}</Heading4>
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
        <IconicButton icon="edit" labelHidden tooltip="Edit details" onClick={() => {}}>
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
                <Text>{supplierPOLineItemNumber || "-"}</Text>
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
                <Text color="darkGrey">{userRole === "customer" ? "Supplier" : "Customer"}</Text>
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
                  {expressShipment && (
                    <StatusIndicator type="quiet">
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Express shipment
                      </Text>
                    </StatusIndicator>
                  )}
                  {validatedForAssembly && (
                    <StatusIndicator type={userRole === "customer" ? "success" : "quiet"}>
                      <Text fontSize="smaller" lineHeight="smallerText">
                        Validated for assembly
                      </Text>
                    </StatusIndicator>
                  )}
                  {!expressShipment && !validatedForAssembly && <Text>-</Text>}
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
                <Text>{bomRevision || "-"}</Text>
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
                      {needByDate
                        ? new Date(needByDate).toLocaleDateString("en-US", {
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
                    <Text>{closeProductionNote || "-"}</Text>
                  </DescriptionDetails>
                </DescriptionGroup>
              </>
            )}
          </DescriptionList>
        </Box>
      )}
    </Box>
  );
};
export const DetailsSection = () => {
  const [filters, setFilters] = useState({
    viewedAs: "all" as "all" | "customer" | "supplier",
    production: "all" as "all" | "Open" | "Closed",
  });

  // Custom styles to ensure dropdown appears above all content
  const selectStyles = (baseStyles: any) => ({
    ...baseStyles,
    menu: (provided: any, state: any) => ({
      ...baseStyles.menu(provided, state),
      zIndex: 9999,
    }),
  });

  const variations = [
    // Customer - Open
    {
      title: "Viewed as Customer | Production: Open",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      expressShipment: false,
      validatedForAssembly: false,
    },
    {
      title: "Viewed as Customer | Production: Open",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      expressShipment: true,
      validatedForAssembly: false,
    },
    {
      title: "Viewed as Customer | Production: Open",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      carryOverSentTo: "PO-00000005",
      expressShipment: false,
      validatedForAssembly: true,
    },
    // Customer - Closed
    {
      title: "Viewed as Customer | Production: Closed",
      userRole: "customer" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Completed" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      expressShipment: false,
      validatedForAssembly: false,
    },
    // Supplier - Open
    {
      title: "Viewed as Supplier | Production: Open",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Not started" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      expressShipment: false,
      validatedForAssembly: false,
    },
    {
      title: "Viewed as Supplier | Production: Open",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "In progress" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      expressShipment: true,
      validatedForAssembly: false,
    },
    {
      title: "Viewed as Supplier | Production: Open",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      carryOverSentTo: "PO-00000005",
      expressShipment: false,
      validatedForAssembly: true,
    },
    // Supplier - Closed
    {
      title: "Viewed as Supplier | Production: Closed",
      userRole: "supplier" as const,
      poliStatus: "Canceled" as const,
      productionStatus: "Completed" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      expressShipment: false,
      validatedForAssembly: false,
    },
  ];

  const filteredVariations = variations.filter((variation) => {
    if (filters.viewedAs !== "all" && variation.userRole !== filters.viewedAs) return false;
    if (filters.production === "all") return true;
    if (filters.production === "Open") {
      return variation.poliStatus === "Open";
    }
    if (filters.production === "Closed") {
      const status = variation.poliStatus as string;
      return status === "Canceled" || status === "Completed";
    }
    return true;
  });

  // Remove duplicates based on title - keep only the first occurrence of each unique title
  const seenTitles = new Set<string>();
  const uniqueVariations = filteredVariations.filter((variation) => {
    if (seenTitles.has(variation.title)) {
      return false;
    }
    seenTitles.add(variation.title);
    return true;
  });

  return (
    <>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
        `}
      </style>
      <ApplicationFrame>
        <Page>
          <Box p="x4" style={{ overflow: "visible" }}>
            <Box mb="x4" style={{ position: "relative", zIndex: 1000, overflow: "visible" }}>
              <Flex gap="x2" flexWrap="wrap" alignItems="flex-end" style={{ overflow: "visible" }}>
                <Box minWidth="150px">
                  <FieldLabel labelText="Viewed as" mb="x1" />
                  <Select
                    menuPosition="fixed"
                    styles={selectStyles}
                    value={filters.viewedAs}
                    onChange={(value) => setFilters({ ...filters, viewedAs: value as any })}
                    options={[
                      { value: "all", label: "All" },
                      { value: "customer", label: "Customer" },
                      { value: "supplier", label: "Supplier" },
                    ]}
                  />
                </Box>
                <Box minWidth="150px">
                  <FieldLabel labelText="Production" mb="x1" />
                <Select
                  menuPosition="fixed"
                  styles={selectStyles}
                  value={filters.production}
                  onChange={(value) => setFilters({ ...filters, production: value as any })}
                  options={[
                    { value: "all", label: "All" },
                    { value: "Open", label: "Open" },
                    { value: "Closed", label: "Closed" },
                  ]}
                />
              </Box>
            </Flex>
          </Box>
          {uniqueVariations.map((variation, index) => (
            <DetailsSectionVariation
              key={index}
              title={variation.title}
              userRole={variation.userRole}
              poliStatus={variation.poliStatus}
              productionStatus={variation.productionStatus}
              supplierPOLineItemNumber={(variation as any).supplierPOLineItemNumber}
              bomRevision={(variation as any).bomRevision}
              needByDate={(variation as any).needByDate}
              closeProductionNote={(variation as any).closeProductionNote}
              carryOverSentTo={(variation as any).carryOverSentTo}
              expressShipment={(variation as any).expressShipment}
              validatedForAssembly={(variation as any).validatedForAssembly}
            />
          ))}
        </Box>
      </Page>
    </ApplicationFrame>
    </>
  );
};
