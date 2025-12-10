import React, { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { Tooltip, toast } from "../../..";
import { ReconciledIcon } from "./ReconciledIcon";
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
  Card,
  Switcher,
  Switch,
  Divider,
  PrimaryButton,
  QuietButton,
  Input,
  Textarea,
  Modal,
  Radio,
  Alert,
  Sidebar,
  DatePicker,
  AsyncSelect,
  ToastContainer,
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
  productionStatus: "Not started" | "In progress" | "Completed" | "Carry over";
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
                <Flex flexDirection="column" width="200px" justifyContent="center" gap="x0_5">
                  <Tooltip
                    tooltip={
                      <Box>
                        <Text fontSize="small" lineHeight="smallRelaxed">
                          {productionStatus === "Not started"
                            ? "0 / 15,000 eaches"
                            : productionStatus === "Completed" || productionStatus === "Carry over"
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
                        backgroundColor={
                          productionStatus === "Not started"
                            ? "lightGrey"
                            : productionStatus === "Completed" || productionStatus === "Carry over"
                              ? "darkGrey"
                              : "grey"
                        }
                        borderRadius="medium"
                      />
                    </Flex>
                  </Tooltip>
                  <Flex
                    justifyContent={
                      productionStatus === "Completed" || productionStatus === "Carry over" ? "space-between" : "center"
                    }
                    alignItems="center"
                    gap={productionStatus === "Completed" || productionStatus === "Carry over" ? "x2" : "x0_5"}
                  >
                    <Text
                      fontSize="small"
                      color="midGrey"
                      lineHeight="smallTextCompressed"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        {productionStatus === "Not started"
                          ? "0%"
                          : productionStatus === "Completed" || productionStatus === "Carry over"
                            ? "98%"
                            : "50%"}
                      </Text>{" "}
                      produced
                    </Text>
                    {(productionStatus === "Completed" || productionStatus === "Carry over") && (
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
                <Flex flexDirection="column" width="200px" justifyContent="center" gap="x0_5">
                  <Tooltip
                    tooltip={
                      <Box>
                        <Text fontSize="small" lineHeight="smallRelaxed">
                          {productionStatus === "Not started"
                            ? "0 / 15,000 eaches"
                            : productionStatus === "Completed" || productionStatus === "Carry over"
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
                  <Flex
                    justifyContent={
                      productionStatus === "Completed" || productionStatus === "Carry over" ? "space-between" : "center"
                    }
                    alignItems="center"
                    gap={productionStatus === "Completed" || productionStatus === "Carry over" ? "x2" : "x0_5"}
                  >
                    <Text
                      fontSize="small"
                      color="midGrey"
                      lineHeight="smallTextCompressed"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                        {productionStatus === "Not started"
                          ? "0%"
                          : productionStatus === "Completed" || productionStatus === "Carry over"
                            ? "98%"
                            : "50%"}
                      </Text>{" "}
                      produced
                    </Text>
                    {(productionStatus === "Completed" || productionStatus === "Carry over") && (
                      <StatusIndicator type="quiet">
                        <Flex alignItems="center" gap="x0_5">
                          Completed
                        </Flex>
                      </StatusIndicator>
                    )}
                  </Flex>
                </Flex>
                <SummaryDivider />
                <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" gap="x0_5">
                  {poStatus === "Late" && (
                    <>
                      <Flex height="x2_5" alignItems="center" justifyContent="center">
                        <StatusIndicator type="danger">Late</StatusIndicator>
                      </Flex>
                      <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
                        <Text as="span" fontSize="small" lineHeight="smallTextCompressed" fontWeight="bold">
                          2 days
                        </Text>{" "}
                        late
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
                          2 days
                        </Text>{" "}
                        early
                      </Text>
                    </>
                  )}
                </Flex>
              </Summary>
            );
          }

          // Open - show current content
          return (
            <Summary breakpoint={120}>
              <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" gap="x0_5">
                <Flex height="x2_5" alignItems="center" justifyContent="center" gap="x0_5">
                  {acceptedProposal && isReconciled !== null ? (
                    <Tooltip tooltip={isReconciled ? "Accepted – Request updated" : "Accepted – Request retained"}>
                      <Flex alignItems="center" gap="x0_5">
                        {(collaborationStatus === "accepted" || acceptedRequest || acceptedProposal) &&
                        acceptedProposal &&
                        isFlagged &&
                        isReconciled !== false ? (
                          <StatusIndicator alignSelf="center" type="success">
                            <Flex alignItems="center" gap="x0_25">
                              Accepted
                              <Icon icon="error" size="x1_75" color="white" mr="-6px" />
                            </Flex>
                          </StatusIndicator>
                        ) : (
                          <Box
                            backgroundColor={acceptedProposal && isReconciled === false ? "lightGreen" : "transparent"}
                            borderRadius="8px"
                            display="inline-block"
                            lineHeight="0"
                          >
                            <StatusIndicator
                              alignSelf="center"
                              type={
                                acceptedProposal && isReconciled === false
                                  ? "neutral"
                                  : collaborationStatus === "accepted" || acceptedRequest || acceptedProposal
                                    ? "success"
                                    : activeCardAuthorRole === userRole
                                      ? "warning"
                                      : "quiet"
                              }
                              style={
                                acceptedProposal && isReconciled === false
                                  ? {
                                      backgroundColor: "transparent",
                                      borderColor: "transparent",
                                      color: theme.colors.green,
                                    }
                                  : undefined
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
                          </Box>
                        )}
                        <Box display="flex" alignItems="center" justifyContent="center">
                          <ReconciledIcon variant={isReconciled ? "standard" : "flagged"} size={20} />
                        </Box>
                      </Flex>
                    </Tooltip>
                  ) : (
                    <>
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
                    </>
                  )}
                </Flex>
                <Text fontSize="small" color="midGrey" lineHeight="smallTextCompressed">
                  {collaborationStatus === "accepted" || acceptedRequest || acceptedProposal ? (
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
              <Flex flexDirection="column" width="200px" justifyContent="center" gap="x0_5">
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
                <Flex
                  justifyContent={productionStatus === "Completed" ? "space-between" : "center"}
                  alignItems="center"
                  gap="x0_5"
                >
                  <Text
                    fontSize="small"
                    color="midGrey"
                    lineHeight="smallTextCompressed"
                    style={{ whiteSpace: "nowrap" }}
                  >
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
              <Flex flexDirection="column" alignItems="center" width="200px" justifyContent="center" gap="x0_5">
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

  // Reset production filter to "all" if "Completed" is selected when POLI status is "Canceled"
  useEffect(() => {
    if (filters.poliStatus === "Canceled" && filters.production === "Completed") {
      setFilters((prevFilters) => ({ ...prevFilters, production: "all" }));
    }
  }, [filters.poliStatus, filters.production]);

  // Reset production filter to "all" if "Not started" is selected when POLI status is "Completed"
  useEffect(() => {
    if (filters.poliStatus === "Completed" && filters.production === "Not started") {
      setFilters((prevFilters) => ({ ...prevFilters, production: "all" }));
    }
  }, [filters.poliStatus, filters.production]);

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
    // Customer - Open - Proposal accepted (request updated)
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: Not started | Milestone status: On time",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: Not started | Milestone status: At risk",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: Not started | Milestone status: Late",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: In progress | Milestone status: On time",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: In progress | Milestone status: At risk",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: In progress | Milestone status: Late",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: Completed | Milestone status: On time",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: Completed | Milestone status: At risk",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request updated) | Production: Completed | Milestone status: Late",
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
    // Customer - Open - Proposal accepted (request retained)
    {
      title:
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: Not started | Milestone status: On time",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: Not started | Milestone status: At risk",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: Not started | Milestone status: Late",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: In progress | Milestone status: On time",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: In progress | Milestone status: At risk",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: In progress | Milestone status: Late",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: Completed | Milestone status: On time",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: Completed | Milestone status: At risk",
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
        "Viewed as Customer | POLI status: Open | Proposal accepted (request retained) | Production: Completed | Milestone status: Late",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: In progress",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Completed | Production: Not started",
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
      title: "Viewed as Customer | POLI status: Completed | Production: In progress",
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
      title: "Viewed as Customer | POLI status: Completed | Production: Completed",
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
      title: "Viewed as Customer | POLI status: Completed | Production: Completed",
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
    // Customer - Completed - Late
    {
      title: "Viewed as Customer | POLI status: Completed | Production: Not started | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
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
      title: "Viewed as Customer | POLI status: Completed | Production: In progress | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
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
      title: "Viewed as Customer | POLI status: Completed | Production: Completed | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Customer | POLI status: Completed | Production: Completed | Milestone status: Late",
      userRole: "customer" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
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
    // Supplier - Open - Proposal accepted (request updated)
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: Not started | Milestone status: On time",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: Not started | Milestone status: At risk",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: Not started | Milestone status: Late",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: In progress | Milestone status: On time",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: In progress | Milestone status: At risk",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: In progress | Milestone status: Late",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: Completed | Milestone status: On time",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: Completed | Milestone status: At risk",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request updated) | Production: Completed | Milestone status: Late",
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
    // Supplier - Open - Proposal accepted (request retained)
    {
      title:
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: Not started | Milestone status: On time",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: Not started | Milestone status: At risk",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: Not started | Milestone status: Late",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: In progress | Milestone status: On time",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: In progress | Milestone status: At risk",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: In progress | Milestone status: Late",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: Completed | Milestone status: On time",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: Completed | Milestone status: At risk",
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
        "Viewed as Supplier | POLI status: Open | Proposal accepted (request retained) | Production: Completed | Milestone status: Late",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: In progress",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Canceled | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Completed | Production: Not started",
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
      title: "Viewed as Supplier | POLI status: Completed | Production: In progress",
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
      title: "Viewed as Supplier | POLI status: Completed | Production: Completed",
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
      title: "Viewed as Supplier | POLI status: Completed | Production: Completed",
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
    // Supplier - Completed - Late
    {
      title: "Viewed as Supplier | POLI status: Completed | Production: Not started | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
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
      title: "Viewed as Supplier | POLI status: Completed | Production: In progress | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
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
      title: "Viewed as Supplier | POLI status: Completed | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "awaiting" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      poStatus: "Late" as const,
      isReconciled: null as null,
      isFlagged: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title: "Viewed as Supplier | POLI status: Completed | Production: Completed | Milestone status: Late",
      userRole: "supplier" as const,
      poliStatus: "Completed" as const,
      productionStatus: "Completed" as const,
      collaborationStatus: "accepted" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      poStatus: "Late" as const,
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
                      { value: "proposal-accepted-reconciled", label: "Proposal accepted (request updated)" },
                      { value: "proposal-accepted-not-reconciled", label: "Proposal accepted (request retained)" },
                    ]}
                  />
                </Box>
                <Box minWidth="150px">
                  <FieldLabel labelText="Production" mb="x1" />
                  <Select
                    menuPosition="fixed"
                    styles={selectStyles}
                    value={filters.production}
                    onChange={(value) => {
                      setFilters({ ...filters, production: value as any });
                    }}
                    options={[
                      { value: "all", label: "All" },
                      ...(filters.poliStatus === "Completed" ? [] : [{ value: "Not started", label: "Not started" }]),
                      { value: "In progress", label: "In progress" },
                      ...(filters.poliStatus === "Canceled" ? [] : [{ value: "Completed", label: "Completed" }]),
                    ]}
                  />
                </Box>
                <Box minWidth="150px">
                  <FieldLabel labelText="Milestone status" mb="x1" />
                  <Select
                    menuPosition="fixed"
                    styles={selectStyles}
                    disabled={filters.poliStatus === "Canceled"}
                    value={filters.milestoneStatus}
                    onChange={(value) => setFilters({ ...filters, milestoneStatus: value as any })}
                    options={[
                      { value: "all", label: "All" },
                      { value: "Late", label: "Late" },
                      ...(filters.poliStatus === "Completed" ? [] : [{ value: "At risk", label: "At risk" }]),
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
  customTag = true,
}: {
  title: string;
  userRole: "customer" | "supplier";
  poliStatus: "Open" | "Canceled" | "Completed";
  productionStatus: "Not started" | "In progress" | "Completed" | "Carry over";
  supplierPOLineItemNumber?: string;
  bomRevision?: string;
  needByDate?: string;
  closeProductionNote?: string;
  carryOverSentTo?: string;
  expressShipment?: boolean;
  validatedForAssembly?: boolean;
  customTag?: boolean;
}) => {
  const customerPOLineItemNumber = "POLI-001";
  const customerItemCodeAndDescription = "12345678 – PR 24 SEPHORA ONLINE DELUXE OCT";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    supplierPOLineItemNumber: supplierPOLineItemNumber || "",
    bomRevision: bomRevision || "",
    needByDate: needByDate ? new Date(needByDate) : (null as Date | null),
    priority: "High",
    customerLotCode: "LOT-2024-001",
    supplierLotCode: "SUP-LOT-001",
    closeProductionNote: closeProductionNote || "",
    carryOverSentTo: carryOverSentTo || "",
  });
  const [assignedTags, setAssignedTags] = useState({
    validatedForAssembly: validatedForAssembly,
    expressShipment: expressShipment,
    customTag: customTag,
  });

  // Update formData when props change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      supplierPOLineItemNumber: supplierPOLineItemNumber || "",
      bomRevision: bomRevision || "",
      needByDate: needByDate ? new Date(needByDate) : null,
      closeProductionNote: closeProductionNote || "",
      carryOverSentTo: carryOverSentTo || "",
    }));
    setAssignedTags({
      validatedForAssembly: validatedForAssembly,
      expressShipment: expressShipment,
      customTag: customTag,
    });
  }, [
    supplierPOLineItemNumber,
    bomRevision,
    needByDate,
    closeProductionNote,
    carryOverSentTo,
    validatedForAssembly,
    expressShipment,
    customTag,
  ]);

  // Load options for BOM revision
  const loadOptions = async (inputValue: string) => {
    const mockOptions = [
      { value: "Rev 1.0 – 2025-Jan-01", label: "Rev 1.0 – 2025-Jan-01" },
      { value: "Rev 1.1 – 2025-Jan-05", label: "Rev 1.1 – 2025-Jan-05" },
      { value: "Rev 1.2 – 2025-Jan-10", label: "Rev 1.2 – 2025-Jan-10" },
      { value: "Rev 2.0 – 2025-Feb-01", label: "Rev 2.0 – 2025-Feb-01" },
    ];
    return mockOptions.filter((option) => option.label.toLowerCase().includes(inputValue.toLowerCase()));
  };

  return (
    <Box mb="x4">
      <Heading4 mb="x2">{title}</Heading4>
      {/* Action bar above details */}
      <Flex justifyContent="flex-end" alignItems="center" gap="x0_5" mb="x3">
        <IconicButton icon="edit" labelHidden tooltip="Edit details" onClick={() => setSidebarOpen(true)}>
          Edit details
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
              {customTag ? <StatusIndicator type="warning">Custom tag</StatusIndicator> : <Text>-</Text>}
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
          {(productionStatus === "Completed" || productionStatus === "Carry over") && (
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
              {productionStatus === "Carry over" && (
                <DescriptionGroup>
                  <DescriptionTerm>
                    <Text color="darkGrey">Carry over sent to</Text>
                  </DescriptionTerm>
                  <DescriptionDetails>
                    {carryOverSentTo ? <Link underline={false}>{carryOverSentTo}</Link> : <Text>-</Text>}
                  </DescriptionDetails>
                </DescriptionGroup>
              )}
            </>
          )}
        </DescriptionList>
      </Box>

      {/* Edit Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        title="Edit details"
        footer={
          <Flex gap="x2" justifyContent="flex-start">
            <PrimaryButton
              onClick={() => {
                setSidebarOpen(false);
                toast.success("PO line item details saved");
              }}
            >
              Save
            </PrimaryButton>
            <QuietButton onClick={() => setSidebarOpen(false)}>Cancel</QuietButton>
          </Flex>
        }
      >
        <Flex flexDirection="column" gap="x3" py="x1">
          {/* PO number - disabled */}
          <Input labelText="PO number" id="poNumber" value="PO-00000004" disabled />

          {/* Customer's PO line item number - disabled */}
          <Input
            labelText="Customer's PO line item number"
            id="customerPOLineItemNumber"
            value={customerPOLineItemNumber}
            disabled
          />

          {/* Supplier's PO line item number - editable only by supplier */}
          {userRole === "supplier" && (
            <Input
              labelText="Supplier's PO line item number"
              id="supplierPOLineItemNumber"
              value={formData.supplierPOLineItemNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, supplierPOLineItemNumber: e.target.value }))}
            />
          )}

          {/* Created on - disabled */}
          <Input labelText="Created on" id="createdOn" value="February 1, 2025" disabled />

          {/* Customer / Supplier - disabled */}
          <Input
            labelText={userRole === "customer" ? "Supplier" : "Customer"}
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

          {/* Assigned tags multiselect - editable only by customer */}
          {userRole === "customer" ? (
            <Select
              labelText="Tags"
              multiselect
              value={[
                ...(assignedTags.validatedForAssembly ? ["validatedForAssembly"] : []),
                ...(assignedTags.expressShipment ? ["expressShipment"] : []),
                ...(assignedTags.customTag ? ["customTag"] : []),
              ]}
              onChange={(values) => {
                const selectedValues = Array.isArray(values) ? values : [];
                setAssignedTags({
                  validatedForAssembly: selectedValues.includes("validatedForAssembly"),
                  expressShipment: selectedValues.includes("expressShipment"),
                  customTag: selectedValues.includes("customTag"),
                });
              }}
              options={[
                { value: "validatedForAssembly", label: "Validated for assembly" },
                { value: "expressShipment", label: "Express shipment" },
                { value: "customTag", label: "Custom tag" },
              ]}
            />
          ) : (
            <Input
              labelText="Tags"
              id="tagsDisplay"
              value={
                [
                  ...(assignedTags.validatedForAssembly ? ["Validated for assembly"] : []),
                  ...(assignedTags.expressShipment ? ["Express shipment"] : []),
                  ...(assignedTags.customTag ? ["Custom tag"] : []),
                ].join(", ") || "-"
              }
              disabled
            />
          )}

          {/* Priority - editable only by customer */}
          {userRole === "customer" ? (
            <Select
              labelText="Priority"
              id="priority"
              value={formData.priority}
              onChange={(value) => setFormData((prev) => ({ ...prev, priority: value as string }))}
              options={[
                { value: "Low", label: "Low" },
                { value: "Medium", label: "Medium" },
                { value: "High", label: "High" },
                { value: "Urgent", label: "Urgent" },
              ]}
            />
          ) : (
            <Input labelText="Priority" id="priorityDisplay" value={formData.priority} disabled />
          )}

          {/* Customer's lot code - editable only by customer */}
          {userRole === "customer" ? (
            <Input
              labelText="Customer's lot code"
              id="customerLotCode"
              value={formData.customerLotCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, customerLotCode: e.target.value }))}
            />
          ) : (
            <Input
              labelText="Customer's lot code"
              id="customerLotCodeDisplay"
              value={formData.customerLotCode}
              disabled
            />
          )}

          {/* Supplier's lot code - editable only by supplier */}
          {userRole === "supplier" && (
            <Input
              labelText="Supplier's lot code"
              id="supplierLotCode"
              value={formData.supplierLotCode}
              onChange={(e) => setFormData((prev) => ({ ...prev, supplierLotCode: e.target.value }))}
            />
          )}

          {/* Item order type - disabled for both customer and supplier */}
          <Input labelText="Item order type" id="itemOrderType" value="Standard" disabled />

          {/* BOM revision and release date - editable by supplier and customer */}
          <AsyncSelect
            labelText="BOM revision and release date"
            placeholder="Start typing"
            loadOptions={loadOptions}
            value={formData.bomRevision}
            onChange={(value) => setFormData((prev) => ({ ...prev, bomRevision: value as string }))}
          />

          {/* Ship to - disabled */}
          <Input labelText="Ship to" id="shipTo" value="Warehouse A - 123 Main St, City, State 12345" disabled />

          {/* Need by date - editable only by customer, shown only if production complete or carry over */}
          {(productionStatus === "Completed" || productionStatus === "Carry over") && (
            <>
              {userRole === "customer" ? (
                <Flex flexDirection="column" gap="x1">
                  <FieldLabel htmlFor="needByDate" labelText="Need by date" />
                  <Box>
                    <DatePicker
                      id="needByDate"
                      selected={formData.needByDate}
                      onChange={(date) => setFormData((prev) => ({ ...prev, needByDate: date }))}
                    />
                  </Box>
                </Flex>
              ) : (
                <Input
                  labelText="Need by date"
                  id="needByDateDisplay"
                  value={
                    formData.needByDate
                      ? new Date(formData.needByDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"
                  }
                  disabled
                />
              )}
            </>
          )}

          {/* Close production note - disabled, shown only if production complete or carry over */}
          {(productionStatus === "Completed" || productionStatus === "Carry over") && (
            <Input
              labelText="Close production note"
              id="closeProductionNote"
              value={formData.closeProductionNote || "-"}
              disabled
            />
          )}

          {/* Carry over sent to - disabled, shown only if carry over */}
          {productionStatus === "Carry over" && (
            <Input
              labelText="Carry over sent to"
              id="carryOverSentTo"
              value={carryOverSentTo || formData.carryOverSentTo || "-"}
              disabled
            />
          )}
        </Flex>
      </Sidebar>
    </Box>
  );
};
export const DetailsSection = () => {
  const [filters, setFilters] = useState({
    viewedAs: "all" as "all" | "customer" | "supplier",
    production: "all" as "all" | "Open" | "Closed" | "Carry over",
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
      poliStatus: "Open" as const,
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
      poliStatus: "Open" as const,
      productionStatus: "Completed" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      expressShipment: false,
      validatedForAssembly: false,
    },
    // Customer - Carry over
    {
      title: "Viewed as Customer | Production: Carry over",
      userRole: "customer" as const,
      poliStatus: "Open" as const,
      productionStatus: "Carry over" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      carryOverSentTo: "PO-00000005",
      expressShipment: false,
      validatedForAssembly: false,
    },
    // Supplier - Carry over
    {
      title: "Viewed as Supplier | Production: Carry over",
      userRole: "supplier" as const,
      poliStatus: "Open" as const,
      productionStatus: "Carry over" as const,
      supplierPOLineItemNumber: "SPLI-001",
      bomRevision: "Rev 1.2 – 2025-Jan-10",
      needByDate: "2025-02-15",
      closeProductionNote: "Production completed",
      carryOverSentTo: "PO-00000005",
      expressShipment: false,
      validatedForAssembly: false,
    },
  ];

  const filteredVariations = variations.filter((variation) => {
    if (filters.viewedAs !== "all" && variation.userRole !== filters.viewedAs) return false;
    if (filters.production === "all") return true;
    if (filters.production === "Open") {
      // Open means production is not completed (Not started or In progress)
      // Also exclude variations with "Production: Closed" in the title
      return (
        (variation.productionStatus === "Not started" || variation.productionStatus === "In progress") &&
        !variation.title.includes("Production: Closed")
      );
    }
    if (filters.production === "Closed") {
      // Closed means production is completed
      // Also exclude variations with "Production: Open" in the title
      return variation.productionStatus === "Completed" && !variation.title.includes("Production: Open");
    }
    if (filters.production === "Carry over") {
      // Carry over means production status is Carry over
      // Also exclude variations with "Production: Open" in the title
      return variation.productionStatus === "Carry over" && !variation.title.includes("Production: Open");
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
                      { value: "Carry over", label: "Carry over" },
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
        <ToastContainer />
      </ApplicationFrame>
    </>
  );
};

const CollaborationVariation = ({
  title,
  userRole,
  collaborationStatus,
  poliStatus,
  acceptedRequest,
  acceptedProposal,
  isReconciled,
  supplierProposalMade,
  activeCardAuthorRole,
}: {
  title: string;
  userRole: "customer" | "supplier";
  collaborationStatus:
    | "awaiting-supplier"
    | "awaiting-customer"
    | "accepted"
    | "accepted-updated"
    | "accepted-retained";
  poliStatus: "Open" | "Canceled" | "Completed";
  acceptedRequest: boolean;
  acceptedProposal: boolean;
  isReconciled: boolean | null;
  supplierProposalMade: boolean;
  activeCardAuthorRole: "supplier" | "customer" | null;
}) => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState<"request" | "proposal" | null>(null);
  const [isAcceptanceModalOpen, setIsAcceptanceModalOpen] = useState(false);
  const [acceptanceOption, setAcceptanceOption] = useState<"without-flagging" | "with-flagging">("without-flagging");
  const [acceptedItems, setAcceptedItems] = useState<{
    request: boolean;
    proposal: boolean;
  }>({
    request: acceptedRequest,
    proposal: acceptedProposal,
  });
  const [hasRequestChanges, setHasRequestChanges] = useState(false);
  const [hasProposalChanges, setHasProposalChanges] = useState(false);
  const [formData, setFormData] = useState({
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

  const enterEditMode = (mode: "request" | "proposal") => {
    setEditMode(mode);
    // Reset change tracking when entering edit mode
    if (mode === "request") {
      setHasRequestChanges(false);
    } else {
      setHasProposalChanges(false);
    }
  };

  const exitEditMode = () => {
    setEditMode(null);
    setHasRequestChanges(false);
    setHasProposalChanges(false);
  };

  const handleFormChange = (mode: "request" | "proposal", field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [mode]: {
        ...prev[mode],
        [field]: value,
      },
    }));
    // Mark that changes have been made
    if (mode === "request") {
      setHasRequestChanges(true);
    } else {
      setHasProposalChanges(true);
    }
  };

  const handleSubmitRequest = () => {
    exitEditMode();
    toast.success("Request updated");
  };

  const handleSubmitProposal = () => {
    exitEditMode();
    toast.success("Proposal updated");
  };

  const handleAcceptCustomerRequest = () => {
    setAcceptedItems((prev) => ({ ...prev, request: true }));
    toast.success("Request accepted");
  };

  const handleAcceptSupplierProposal = () => {
    setIsAcceptanceModalOpen(true);
  };

  const handleAcceptanceConfirm = () => {
    setAcceptedItems((prev) => ({ ...prev, proposal: true }));
    if (acceptanceOption === "without-flagging") {
      toast.success("Proposal accepted");
    } else {
      toast.success("Proposal accepted");
    }
    setIsAcceptanceModalOpen(false);
  };

  const handleAcceptanceCancel = () => {
    setIsAcceptanceModalOpen(false);
    setAcceptanceOption("without-flagging"); // Reset to default
  };

  return (
    <Box mb="x4">
      <Card p="x1" mt="x0" mx="auto" minWidth="696px" maxWidth="1126px">
        <Flex flexDirection="column" gap="x2">
          <Flex gap="x3" p="x2" pb="0">
            <Flex flexDirection="column" gap="x0_5" mt="x9" pl="x2_5" flex={1} minWidth="160px" maxWidth="200px">
              <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                Quantity
              </Text>
              <Text fontSize="small" lineHeight="smallRelaxed" fontWeight="bold" my="x1">
                Due date
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
            <Box minWidth="236px" maxWidth="420px" flex={1}>
              <Flex flexDirection="column" gap="x0_25" mb="x3">
                <Flex alignItems="center" gap="x1">
                  <Heading4 mb="0">{userRole === "customer" ? "Your request" : "Customer's request"}</Heading4>
                  {(editMode !== "request" || !hasRequestChanges) &&
                    (acceptedRequest || acceptedProposal ? (
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
                        {!acceptedRequest &&
                          !acceptedProposal &&
                          userRole === "supplier" &&
                          activeCardAuthorRole === "customer" && (
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
                        {!acceptedRequest &&
                          !acceptedProposal &&
                          userRole === "customer" &&
                          activeCardAuthorRole === "customer" && (
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
                    ))}
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
                    <Box width="100%">
                      <Input
                        value={formData.request.quantity}
                        placeholder="1"
                        suffix={formData.request.unit}
                        suffixWidth="160px"
                        onChange={(e) => handleFormChange("request", "quantity", e.target.value)}
                      />
                    </Box>
                    <Box width="100%">
                      <Input
                        value={formData.request.productionDueDate}
                        placeholder="Enter production due date"
                        onChange={(e) => handleFormChange("request", "productionDueDate", e.target.value)}
                      />
                    </Box>
                    <Box width="100%">
                      <Flex alignItems="flex-start">
                        <Box flex={1} maxWidth="calc(100% - 160px)">
                          <Input
                            value={formData.request.unitPrice}
                            placeholder="1"
                            onChange={(e) => handleFormChange("request", "unitPrice", e.target.value)}
                          />
                        </Box>
                        <Box width="160px" pt="x1" pb="x1" pl="x1">
                          <Text>
                            {formData.request.currency}{" "}
                            <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                              (per each)
                            </Text>
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                    <Box width="100%">
                      <Box height="40px"></Box>
                    </Box>
                    <Box width="100%">
                      <Textarea
                        value={formData.request.note}
                        placeholder="Enter note"
                        style={{ height: "152px" }}
                        onChange={(e) => handleFormChange("request", "note", e.target.value)}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Text
                      my="x1"
                      style={{
                        textDecoration: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "none";
                          if (!supplierProposalMade) return "none";
                          const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                          const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                          const isDifferent = requestQty !== proposalQty;
                          if (!isDifferent) return "none";

                          // Only underline if this column (Customer's request) has a status icon
                          // Icon appears when: (supplier viewing and customer made request) OR (customer viewing and customer made request)
                          const hasIcon =
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "supplier" &&
                              activeCardAuthorRole === "customer") ||
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "customer" &&
                              activeCardAuthorRole === "customer");

                          if (hasIcon && activeCardAuthorRole !== null) {
                            return "underline";
                          }
                          return "none";
                        })(),
                        textDecorationColor: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                          if (!supplierProposalMade) return "transparent";
                          const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                          const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                          const isDifferent = requestQty !== proposalQty;
                          if (!isDifferent) return "transparent";

                          // Only underline if this column has an icon
                          const hasIcon =
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "supplier" &&
                              activeCardAuthorRole === "customer") ||
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "customer" &&
                              activeCardAuthorRole === "customer");

                          if (hasIcon && activeCardAuthorRole !== null) {
                            // Grey when awaiting your response (activeCardAuthorRole === userRole)
                            // Yellow when awaiting other party's response (activeCardAuthorRole !== userRole)
                            if (activeCardAuthorRole === userRole) {
                              return theme.colors.grey;
                            } else {
                              return theme.colors.yellow;
                            }
                          }
                          return "transparent";
                        })(),
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {formData.request.quantity} {formData.request.unit}
                    </Text>
                    <Text my="x1">{formData.request.productionDueDate}</Text>
                    <Text
                      my="x1"
                      style={{
                        textDecoration: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "none";
                          if (!supplierProposalMade) return "none";
                          const requestPrice = parseFloat(formData.request.unitPrice.replace(/,/g, "")) || 0;
                          const proposalPrice = parseFloat(formData.proposal.unitPrice.replace(/,/g, "")) || 0;
                          const isDifferent = requestPrice !== proposalPrice;
                          if (!isDifferent) return "none";

                          // If awaiting supplier's response (customer made request), underline customer's request values in grey
                          if (collaborationStatus === "awaiting-supplier" || activeCardAuthorRole === "customer") {
                            return "underline";
                          }
                          return "none";
                        })(),
                        textDecorationColor: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                          if (!supplierProposalMade) return "transparent";
                          const requestPrice = parseFloat(formData.request.unitPrice.replace(/,/g, "")) || 0;
                          const proposalPrice = parseFloat(formData.proposal.unitPrice.replace(/,/g, "")) || 0;
                          const isDifferent = requestPrice !== proposalPrice;
                          if (!isDifferent) return "transparent";

                          // If awaiting supplier's response, underline customer's request values in grey
                          if (collaborationStatus === "awaiting-supplier" || activeCardAuthorRole === "customer") {
                            return theme.colors.grey;
                          }
                          return "transparent";
                        })(),
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {formData.request.unitPrice} {formData.request.currency}{" "}
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                        (per each)
                      </Text>
                    </Text>
                    <Text my="x1" height="x3"></Text>
                    <Box my="x1" minHeight="96px">
                      <TruncatedText maxCharacters={300} showTooltip={true}>
                        {formData.request.note}
                      </TruncatedText>
                    </Box>
                  </>
                )}
              </Flex>
            </Box>

            {/* Supplier's proposal */}
            <Box maxWidth="420px" minWidth="236px" flex={1}>
              <Flex flexDirection="column" gap="x0_25" mb="x3">
                <Flex alignItems="center" gap="x1">
                  <Heading4 mb="0" color={!supplierProposalMade && editMode !== "proposal" ? "midGrey" : undefined}>
                    {userRole === "customer" ? "Supplier's proposal" : "Your proposal"}
                  </Heading4>
                  {(editMode !== "proposal" || !hasProposalChanges) &&
                    (acceptedRequest || acceptedProposal ? (
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
                          <Icon
                            icon="check"
                            size="x2_5"
                            color={acceptedProposal && isReconciled === false ? "grey" : "green"}
                          />
                        </Box>
                      </Tooltip>
                    ) : (
                      <>
                        {(!acceptedRequest &&
                          !acceptedProposal &&
                          userRole === "supplier" &&
                          activeCardAuthorRole === "supplier") ||
                        (userRole === "customer" && activeCardAuthorRole === "supplier") ? (
                          <Tooltip
                            tooltip={
                              userRole === "supplier" && activeCardAuthorRole === "supplier"
                                ? "Awaiting customer's response"
                                : "Requires your response"
                            }
                          >
                            <Box
                              backgroundColor={
                                userRole === "supplier" && activeCardAuthorRole === "supplier" ? "whiteGrey" : "yellow"
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
                    ))}
                </Flex>
                <Text color="midGrey" fontSize="small" lineHeight="smallCompact">
                  {supplierProposalMade ? (
                    userRole === "customer" ? (
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
                  ) : userRole === "customer" ? (
                    "Supplier have not made a proposal yet"
                  ) : (
                    "You have not made a proposal yet"
                  )}
                </Text>
              </Flex>
              <Flex flexDirection="column" gap="x0_5">
                {editMode === "proposal" ? (
                  <>
                    <Box width="100%">
                      <Input
                        value={formData.proposal.quantity}
                        placeholder="1"
                        suffix={formData.proposal.unit}
                        suffixWidth="160px"
                        onChange={(e) => handleFormChange("proposal", "quantity", e.target.value)}
                      />
                    </Box>
                    <Box width="100%">
                      <Input
                        value={formData.proposal.productionDueDate}
                        placeholder="Enter production due date"
                        onChange={(e) => handleFormChange("proposal", "productionDueDate", e.target.value)}
                      />
                    </Box>
                    <Box width="100%">
                      <Flex alignItems="flex-start">
                        <Box flex={1} maxWidth="calc(100% - 160px)">
                          <Input
                            value={formData.proposal.unitPrice}
                            placeholder="1"
                            onChange={(e) => handleFormChange("proposal", "unitPrice", e.target.value)}
                          />
                        </Box>
                        <Box width="160px" pt="x1" pb="x1" pl="x1">
                          <Text>
                            {formData.proposal.currency}{" "}
                            <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                              (per each)
                            </Text>
                          </Text>
                        </Box>
                      </Flex>
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
                        width="100%"
                        placeholder="Select reason"
                        onChange={(value) => handleFormChange("proposal", "reason", String(value || ""))}
                      />
                    </Box>
                    <Box width="100%">
                      <Textarea
                        value={formData.proposal.note}
                        placeholder="Enter note"
                        style={{ height: "152px" }}
                        onChange={(e) => handleFormChange("proposal", "note", e.target.value)}
                      />
                    </Box>
                  </>
                ) : supplierProposalMade ? (
                  <>
                    <Text
                      my="x1"
                      style={{
                        textDecoration: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "none";
                          if (!supplierProposalMade) return "none";
                          const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                          const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                          const isDifferent = requestQty !== proposalQty;
                          if (!isDifferent) return "none";

                          // Only underline if this column (Supplier's proposal) has a status icon
                          // Icon appears when: (supplier viewing and supplier made proposal) OR (customer viewing and supplier made proposal)
                          const hasIcon =
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "supplier" &&
                              activeCardAuthorRole === "supplier") ||
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "customer" &&
                              activeCardAuthorRole === "supplier");

                          if (hasIcon && activeCardAuthorRole !== null) {
                            return "underline";
                          }
                          return "none";
                        })(),
                        textDecorationColor: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                          if (!supplierProposalMade) return "transparent";
                          const requestQty = parseFloat(formData.request.quantity.replace(/,/g, "")) || 0;
                          const proposalQty = parseFloat(formData.proposal.quantity.replace(/,/g, "")) || 0;
                          const isDifferent = requestQty !== proposalQty;
                          if (!isDifferent) return "transparent";

                          // Only underline if this column has an icon
                          const hasIcon =
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "supplier" &&
                              activeCardAuthorRole === "supplier") ||
                            (!acceptedRequest &&
                              !acceptedProposal &&
                              userRole === "customer" &&
                              activeCardAuthorRole === "supplier");

                          if (hasIcon && activeCardAuthorRole !== null) {
                            // Grey when awaiting your response (activeCardAuthorRole === userRole)
                            // Yellow when awaiting other party's response (activeCardAuthorRole !== userRole)
                            if (activeCardAuthorRole === userRole) {
                              return theme.colors.grey;
                            } else {
                              return theme.colors.yellow;
                            }
                          }
                          return "transparent";
                        })(),
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {formData.proposal.quantity} {formData.proposal.unit}
                    </Text>
                    <Text my="x1">{formData.proposal.productionDueDate}</Text>
                    <Text
                      my="x1"
                      style={{
                        textDecoration: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "none";
                          if (!supplierProposalMade) return "none";
                          const requestPrice = parseFloat(formData.request.unitPrice.replace(/,/g, "")) || 0;
                          const proposalPrice = parseFloat(formData.proposal.unitPrice.replace(/,/g, "")) || 0;
                          const isDifferent = requestPrice !== proposalPrice;
                          if (!isDifferent) return "none";

                          // If awaiting customer's response (supplier made proposal), underline supplier's proposal values in grey
                          if (collaborationStatus === "awaiting-customer" || activeCardAuthorRole === "supplier") {
                            return "underline";
                          }
                          return "none";
                        })(),
                        textDecorationColor: (() => {
                          // No underlining if accepted
                          if (acceptedItems.request || acceptedItems.proposal) return "transparent";
                          if (!supplierProposalMade) return "transparent";
                          const requestPrice = parseFloat(formData.request.unitPrice.replace(/,/g, "")) || 0;
                          const proposalPrice = parseFloat(formData.proposal.unitPrice.replace(/,/g, "")) || 0;
                          const isDifferent = requestPrice !== proposalPrice;
                          if (!isDifferent) return "transparent";

                          // If awaiting customer's response, underline supplier's proposal values in grey
                          if (collaborationStatus === "awaiting-customer" || activeCardAuthorRole === "supplier") {
                            return theme.colors.grey;
                          }
                          return "transparent";
                        })(),
                        textDecorationThickness: "2px",
                        textUnderlineOffset: "4px",
                      }}
                    >
                      {formData.proposal.unitPrice} {formData.proposal.currency}{" "}
                      <Text as="span" fontSize="small" lineHeight="smallRelaxed" color="midGrey">
                        (per each)
                      </Text>
                    </Text>
                    <Text my="x1">{formData.proposal.reason || "-"}</Text>
                    <Box my="x1">
                      <TruncatedText maxCharacters={300} showTooltip={true}>
                        {formData.proposal.note}
                      </TruncatedText>
                    </Box>
                  </>
                ) : (
                  <>
                    <Text my="x1" color="midGrey">
                      -
                    </Text>
                    <Text my="x1" color="midGrey">
                      -
                    </Text>
                    <Text my="x1" color="midGrey">
                      -
                    </Text>
                    <Text my="x1" minHeight="96px" color="midGrey">
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
                  disabled={
                    poliStatus === "Canceled" || (editMode === "request" ? !hasRequestChanges : !hasProposalChanges)
                  }
                  onClick={() => {}}
                >
                  {editMode === "request" ? "Submit request" : "Submit proposal"}
                </PrimaryButton>
                <QuietButton onClick={exitEditMode} disabled={poliStatus === "Canceled"}>
                  Cancel
                </QuietButton>
              </>
            ) : (
              <>
                {userRole === "supplier" && (
                  <>
                    <QuietButton onClick={() => enterEditMode("proposal")} disabled={poliStatus === "Canceled"}>
                      Update proposal
                    </QuietButton>
                    <QuietButton
                      onClick={handleAcceptCustomerRequest}
                      disabled={
                        acceptedRequest ||
                        poliStatus === "Canceled" ||
                        activeCardAuthorRole === null ||
                        collaborationStatus === "accepted-updated" ||
                        collaborationStatus === "accepted-retained"
                      }
                    >
                      Accept customer's request
                    </QuietButton>
                  </>
                )}
                {userRole === "customer" && (
                  <>
                    <QuietButton onClick={() => enterEditMode("request")} disabled={poliStatus === "Canceled"}>
                      Update request
                    </QuietButton>
                    <QuietButton
                      onClick={handleAcceptSupplierProposal}
                      disabled={
                        acceptedProposal ||
                        poliStatus === "Canceled" ||
                        !supplierProposalMade ||
                        activeCardAuthorRole === null
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

      {/* Acceptance Modal */}
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
    </Box>
  );
};

export const Collaboration = () => {
  const [filters, setFilters] = useState<{
    viewedAs: "customer" | "supplier";
    collaboration: "awaiting-supplier" | "awaiting-customer" | "accepted" | "accepted-updated" | "accepted-retained";
    poliStatus: "open-completed" | "canceled";
    supplierProposal: "yes" | "no";
  }>({
    viewedAs: "customer",
    collaboration: "awaiting-supplier",
    poliStatus: "open-completed",
    supplierProposal: "yes",
  });

  // Combined alert visibility state
  const [isCombinedAlertVisible, setIsCombinedAlertVisible] = useState(true);

  // What's new section expandable state
  const [isWhatsNewExpanded, setIsWhatsNewExpanded] = useState(false);

  // Other notes section expandable state
  const [isOtherNotesExpanded, setIsOtherNotesExpanded] = useState(false);

  const selectStyles = (baseStyles: any) => ({
    ...baseStyles,
    menu: (provided: any, state: any) => ({
      ...baseStyles.menu(provided, state),
      zIndex: 9999,
    }),
  });

  // Generate title based on current filters
  const getAlertTitle = () => {
    const viewedAs = filters.viewedAs === "customer" ? "Customer" : "Supplier";
    const supplierProposal = filters.supplierProposal === "yes" ? "Made" : "Not made";

    let collaboration = "";
    if (filters.collaboration === "awaiting-supplier") {
      collaboration = "Awaiting supplier's response";
    } else if (filters.collaboration === "awaiting-customer") {
      collaboration = "Awaiting customer's response";
    } else if (filters.collaboration === "accepted-updated") {
      collaboration = "Accepted – Request updated";
    } else if (filters.collaboration === "accepted-retained") {
      collaboration = "Accepted – Request retained";
    } else if (filters.collaboration === "accepted") {
      collaboration = "Accepted";
    }

    let poliStatus = "";
    if (filters.poliStatus === "open-completed") {
      poliStatus = "Open and Completed";
    } else if (filters.poliStatus === "canceled") {
      poliStatus = "Canceled";
    } else {
      poliStatus = "Open";
    }

    return `Viewed as ${viewedAs} | Supplier's proposal: ${supplierProposal} | Collaboration: ${collaboration} | POLI status: ${poliStatus}`;
  };

  // Calculate notes based on filter combinations
  const getNotes = (hasVariations: boolean = true) => {
    const notes: string[] = [];

    // Supplier - No - Awaiting supplier's response - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "awaiting-supplier" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        'If the organization is configured with dual acceptance, clicking Accept customer\'s request changes the status to "Accepted – Request updated". No confirmation modal is displayed.'
      );
      notes.push(
        'If the organization is configured with standard acceptance, clicking Accept customer\'s request changes the status to "Accepted". No confirmation modal is displayed.'
      );
      notes.push("Submitting updated proposal changes the status to Awaiting customer's response.");
    }

    // Supplier - No - Awaiting customer's response - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "awaiting-customer" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        "This state is not possible since the Supplier has not made a proposal, so there is nothing to be accepted by customer."
      );
    }

    // Supplier - No - Accepted – Request updated - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "accepted-updated" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push("Updating proposal changes the state to Awaiting customer's response.");
    }

    // Supplier - No - Accepted – Request retained - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "accepted-retained" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        "This state is not possible since the Supplier has not made a proposal, so there is nothing to be accepted by customer."
      );
    }

    // Customer - No - Awaiting customer's response
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "awaiting-customer"
    ) {
      notes.push(
        "This state is not possible since the Supplier has not made a proposal, so there is nothing to respond to."
      );
    }

    // Customer - No - Accepted – Request updated
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "accepted-updated"
    ) {
      // Only show this note if not canceled
      if (filters.poliStatus !== "canceled") {
        notes.push("The Accept supplier button is disabled because no proposal is made yet.");
      }
      if (filters.poliStatus === "open-completed") {
        notes.push("Updating request changes the state to Awaiting supplier's response.");
      }
    }

    // Customer - No - Accepted – Request retained
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "no" &&
      filters.collaboration === "accepted-retained"
    ) {
      // For canceled and open-completed, show "This state is not possible" note
      if (filters.poliStatus === "canceled" || filters.poliStatus === "open-completed") {
        notes.push(
          "This state is not possible since the Supplier has not made a proposal, so there is nothing to be accepted by customer."
        );
      } else {
        // For other statuses, show the disabled button note
        notes.push("The Accept supplier button is disabled because no proposal is made yet.");
      }
    }

    // Customer - Yes - Accepted – Request updated - Open and Completed
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "accepted-updated" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push("Updating request changes the state to Awaiting supplier's response.");
    }

    // Customer - Yes - Accepted – Request retained - Open and Completed
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "accepted-retained" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push("Updating request changes the state to Awaiting supplier's response.");
    }

    // Customer - Yes - Awaiting supplier's response - Open and Completed
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "awaiting-supplier" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        'If the organization is configured with dual acceptance, clicking Accept supplier\'s proposal changes the status to "Accepted – Request updated" or "Accepted – Request retained", depending on the selection in the confirmation modal.'
      );
      notes.push(
        'If the organization is configured with standard acceptance, clicking Accept supplier\'s proposal changes the status to "Accepted" and no confirmation modal is displayed.'
      );
    }

    // Customer - Yes - Awaiting customer's response - Open and Completed
    if (
      filters.viewedAs === "customer" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "awaiting-customer" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        'If the organization is configured with dual acceptance, clicking Accept supplier\'s proposal changes the status to "Accepted – Request updated" or "Accepted – Request retained", depending on the selection in the confirmation modal.'
      );
      notes.push(
        'If the organization is configured with standard acceptance, clicking Accept supplier\'s proposal changes the status to "Accepted" and no confirmation modal is displayed.'
      );
      notes.push("Submitting updated request changes the status to Awaiting supplier's response.");
    }

    // Supplier - Yes - Awaiting supplier's response - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "awaiting-supplier" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        'If the organization is configured with dual acceptance, clicking Accept customer\'s request changes the status to "Accepted – Request updated". No confirmation modal is displayed.'
      );
      notes.push(
        'If the organization is configured with standard acceptance, clicking Accept customer\'s request changes the status to "Accepted". No confirmation modal is displayed.'
      );
      notes.push("Submitting updated proposal changes the status to Awaiting customer's response.");
    }

    // Supplier - Yes - Awaiting customer's response - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "awaiting-customer" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push(
        'If the organization is configured with dual acceptance, clicking Accept customer\'s request changes the status to "Accepted – Request updated". No confirmation modal is displayed.'
      );
      notes.push(
        'If the organization is configured with standard acceptance, clicking Accept customer\'s request changes the status to "Accepted". No confirmation modal is displayed.'
      );
      notes.push("Updating proposal maintains current state.");
    }

    // Supplier - Yes - Accepted – Request updated - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "accepted-updated" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push("Updating proposal changes the state to Awaiting customer's response.");
    }

    // Supplier - Yes - Accepted – Request retained - Open and Completed
    if (
      filters.viewedAs === "supplier" &&
      filters.supplierProposal === "yes" &&
      filters.collaboration === "accepted-retained" &&
      filters.poliStatus === "open-completed"
    ) {
      notes.push("Updating proposal changes the state to Awaiting customer's response.");
    }

    // All canceled ones - only show if there are variations to render
    if (filters.poliStatus === "canceled" && hasVariations) {
      notes.push("Actions are disabled for canceled POLIs.");
    }

    return notes;
  };

  const variations = [
    // ===== SUPPLIER'S PROPOSAL: NOT MADE =====

    // Open - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Not made | Collaboration: Awaiting supplier's response | POLI status: Open",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Not made | Collaboration: Awaiting your response | POLI status: Open",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },

    // Open - Accepted (supplier accepted request without proposal)
    {
      title: "Viewed as Customer | Supplier's proposal: Not made | Collaboration: Accepted | POLI status: Open",
      userRole: "customer" as const,
      collaborationStatus: "accepted" as const,
      poliStatus: "Open" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      isReconciled: true,
      supplierProposalMade: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Supplier | Supplier's proposal: Not made | Collaboration: Accepted | POLI status: Open",
      userRole: "supplier" as const,
      collaborationStatus: "accepted" as const,
      poliStatus: "Open" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      isReconciled: true,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },

    // Canceled - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Not made | Collaboration: Awaiting supplier's response | POLI status: Canceled",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Not made | Collaboration: Awaiting your response | POLI status: Canceled",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },

    // Canceled - Accepted
    {
      title: "Viewed as Customer | Supplier's proposal: Not made | Collaboration: Accepted | POLI status: Canceled",
      userRole: "customer" as const,
      collaborationStatus: "accepted" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      isReconciled: true,
      supplierProposalMade: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Supplier | Supplier's proposal: Not made | Collaboration: Accepted | POLI status: Canceled",
      userRole: "supplier" as const,
      collaborationStatus: "accepted" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      isReconciled: true,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },

    // Completed - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Not made | Collaboration: Awaiting supplier's response | POLI status: Completed",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Not made | Collaboration: Awaiting your response | POLI status: Completed",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },

    // Completed - Accepted
    {
      title: "Viewed as Customer | Supplier's proposal: Not made | Collaboration: Accepted | POLI status: Completed",
      userRole: "customer" as const,
      collaborationStatus: "accepted" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      isReconciled: true,
      supplierProposalMade: false,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title: "Viewed as Supplier | Supplier's proposal: Not made | Collaboration: Accepted | POLI status: Completed",
      userRole: "supplier" as const,
      collaborationStatus: "accepted" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: true,
      acceptedProposal: false,
      isReconciled: true,
      supplierProposalMade: false,
      activeCardAuthorRole: "customer" as const,
    },

    // ===== SUPPLIER'S PROPOSAL: MADE =====

    // Open - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Awaiting supplier's response | POLI status: Open",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Awaiting your response | POLI status: Open",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "customer" as const,
    },

    // Completed - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Awaiting supplier's response | POLI status: Completed",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Awaiting your response | POLI status: Completed",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "customer" as const,
    },

    // Canceled - Awaiting supplier's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Awaiting supplier's response | POLI status: Canceled",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "customer" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Awaiting your response | POLI status: Canceled",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-supplier" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "customer" as const,
    },

    // Open - Awaiting customer's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Awaiting your response | POLI status: Open",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-customer" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Awaiting customer's response | POLI status: Open",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-customer" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Open - Accepted – Request updated
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Accepted – Request updated | POLI status: Open",
      userRole: "customer" as const,
      collaborationStatus: "accepted-updated" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: true,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Accepted – Request updated | POLI status: Open",
      userRole: "supplier" as const,
      collaborationStatus: "accepted-updated" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: true,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Open - Accepted – Request retained
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Accepted – Request retained | POLI status: Open",
      userRole: "customer" as const,
      collaborationStatus: "accepted-retained" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: false,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Accepted – Request retained | POLI status: Open",
      userRole: "supplier" as const,
      collaborationStatus: "accepted-retained" as const,
      poliStatus: "Open" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: false,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Canceled - Awaiting customer's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Awaiting your response | POLI status: Canceled",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-customer" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Awaiting customer's response | POLI status: Canceled",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-customer" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Canceled - Accepted – Request updated
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Accepted – Request updated | POLI status: Canceled",
      userRole: "customer" as const,
      collaborationStatus: "accepted-updated" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: true,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Accepted – Request updated | POLI status: Canceled",
      userRole: "supplier" as const,
      collaborationStatus: "accepted-updated" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: true,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Canceled - Accepted – Request retained
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Accepted – Request retained | POLI status: Canceled",
      userRole: "customer" as const,
      collaborationStatus: "accepted-retained" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: false,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Accepted – Request retained | POLI status: Canceled",
      userRole: "supplier" as const,
      collaborationStatus: "accepted-retained" as const,
      poliStatus: "Canceled" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: false,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Completed - Awaiting customer's response
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Awaiting your response | POLI status: Completed",
      userRole: "customer" as const,
      collaborationStatus: "awaiting-customer" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Awaiting customer's response | POLI status: Completed",
      userRole: "supplier" as const,
      collaborationStatus: "awaiting-customer" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: false,
      isReconciled: null,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Completed - Accepted – Request updated
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Accepted – Request updated | POLI status: Completed",
      userRole: "customer" as const,
      collaborationStatus: "accepted-updated" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: true,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Accepted – Request updated | POLI status: Completed",
      userRole: "supplier" as const,
      collaborationStatus: "accepted-updated" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: true,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },

    // Completed - Accepted – Request retained
    {
      title:
        "Viewed as Customer | Supplier's proposal: Made | Collaboration: Accepted – Request retained | POLI status: Completed",
      userRole: "customer" as const,
      collaborationStatus: "accepted-retained" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: false,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
    {
      title:
        "Viewed as Supplier | Supplier's proposal: Made | Collaboration: Accepted – Request retained | POLI status: Completed",
      userRole: "supplier" as const,
      collaborationStatus: "accepted-retained" as const,
      poliStatus: "Completed" as const,
      acceptedRequest: false,
      acceptedProposal: true,
      isReconciled: false,
      supplierProposalMade: true,
      activeCardAuthorRole: "supplier" as const,
    },
  ];

  const filteredVariations = variations.filter((variation) => {
    if (variation.userRole !== filters.viewedAs) return false;
    // When "Viewed as" matches the awaiting status, interpret it as "awaiting your response"
    if (filters.collaboration === "awaiting-supplier" && filters.viewedAs === "supplier") {
      // Supplier viewing "awaiting supplier's response" = awaiting your response
      if (variation.userRole !== "supplier" || variation.collaborationStatus !== "awaiting-supplier") return false;
    } else if (filters.collaboration === "awaiting-customer" && filters.viewedAs === "customer") {
      // Customer viewing "awaiting customer's response" = awaiting your response
      if (variation.userRole !== "customer" || variation.collaborationStatus !== "awaiting-customer") return false;
    } else if (filters.collaboration === "awaiting-customer" && filters.viewedAs === "supplier") {
      // Supplier viewing "awaiting customer's response" = standard filtering
      if (variation.collaborationStatus !== "awaiting-customer") return false;
    } else if (filters.collaboration === "awaiting-supplier" && filters.viewedAs === "customer") {
      // Customer viewing "awaiting supplier's response" = standard filtering
      if (variation.collaborationStatus !== "awaiting-supplier") return false;
    } else if (filters.collaboration === "accepted-updated" && filters.supplierProposal === "no") {
      // "Accepted – Request updated" when supplier proposal is not made = supplier accepted request (same as "Accepted")
      if (variation.collaborationStatus !== "accepted") return false;
    } else {
      // Standard filtering for other collaboration statuses
      if (variation.collaborationStatus !== filters.collaboration) return false;
    }
    if (filters.poliStatus === "open-completed" && variation.poliStatus === "Canceled") return false;
    if (filters.poliStatus === "canceled" && variation.poliStatus !== "Canceled") return false;
    if (filters.supplierProposal === "yes" && !variation.supplierProposalMade) return false;
    if (filters.supplierProposal === "no" && variation.supplierProposalMade) return false;
    return true;
  });

  // Deduplicate variations when filter is "open-completed" - prefer Open over Completed
  const deduplicatedVariations =
    filters.poliStatus === "open-completed"
      ? filteredVariations.filter((variation, index, self) => {
          // Find if there's another variation with the same properties except POLI status
          const duplicate = self.find(
            (v, i) =>
              i !== index &&
              v.userRole === variation.userRole &&
              v.collaborationStatus === variation.collaborationStatus &&
              v.supplierProposalMade === variation.supplierProposalMade &&
              v.acceptedRequest === variation.acceptedRequest &&
              v.acceptedProposal === variation.acceptedProposal &&
              v.isReconciled === variation.isReconciled &&
              v.activeCardAuthorRole === variation.activeCardAuthorRole &&
              ((variation.poliStatus === "Open" && v.poliStatus === "Completed") ||
                (variation.poliStatus === "Completed" && v.poliStatus === "Open"))
          );
          // Keep Open, remove Completed if duplicate exists
          if (duplicate) {
            return variation.poliStatus === "Open";
          }
          return true;
        })
      : filteredVariations;

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
                <Box>
                  <FieldLabel labelText="Viewed as" mb="x1" />
                  <Switcher
                    selected={filters.viewedAs}
                    onChange={(value) => setFilters({ ...filters, viewedAs: value as "customer" | "supplier" })}
                  >
                    <Switch value="customer">Customer</Switch>
                    <Switch value="supplier">Supplier</Switch>
                  </Switcher>
                </Box>
                <Box>
                  <FieldLabel labelText="Supplier proposal made" mb="x1" />
                  <Switcher
                    selected={filters.supplierProposal}
                    onChange={(value) => setFilters({ ...filters, supplierProposal: value as "yes" | "no" })}
                  >
                    <Switch value="yes">Yes</Switch>
                    <Switch value="no">No</Switch>
                  </Switcher>
                </Box>
                <Box>
                  <FieldLabel labelText="Collaboration" mb="x1" />
                  <Switcher
                    selected={filters.collaboration}
                    onChange={(value) => setFilters({ ...filters, collaboration: value as any })}
                  >
                    <Switch value="awaiting-supplier">Awaiting supplier's response</Switch>
                    <Switch value="awaiting-customer">Awaiting customer's response</Switch>
                    <Switch value="accepted-updated">Accepted – Request updated</Switch>
                    <Switch value="accepted-retained">Accepted – Request retained</Switch>
                  </Switcher>
                </Box>
                <Box>
                  <FieldLabel labelText="POLI status" mb="x1" />
                  <Switcher
                    selected={filters.poliStatus}
                    onChange={(value) => setFilters({ ...filters, poliStatus: value as any })}
                  >
                    <Switch value="open-completed">Open and Completed</Switch>
                    <Switch value="canceled">Canceled</Switch>
                  </Switcher>
                </Box>
              </Flex>
            </Box>
            {/* Combined Alert with notes and What's new */}
            {(() => {
              const notes = getNotes(deduplicatedVariations.length > 0);
              const hasNotes = notes.length > 0;

              if ((hasNotes || isCombinedAlertVisible) && isCombinedAlertVisible) {
                return (
                  <Alert type="informative" title={getAlertTitle()} mt="x4" mb="x4">
                    <Flex flexDirection="column" gap="x3" mt="x2">
                      {/* Notes section */}
                      {hasNotes && (
                        <Box>
                          <Box as="ul" style={{ margin: 0, paddingLeft: "20px" }}>
                            {notes.map((note, index) => (
                              <Text
                                key={index}
                                as="li"
                                fontSize="small"
                                lineHeight="smallRelaxed"
                                mb={index < notes.length - 1 ? "x0_5" : 0}
                              >
                                {note}
                              </Text>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {/* What's new expandable section */}
                      <Box>
                        <Flex
                          alignItems="center"
                          gap="x1"
                          onClick={() => setIsWhatsNewExpanded(!isWhatsNewExpanded)}
                          style={{ cursor: "pointer" }}
                          mb={isWhatsNewExpanded ? "x2" : 0}
                        >
                          <IconicButton
                            icon={isWhatsNewExpanded ? "collapse" : "expand"}
                            labelHidden
                            tooltip={isWhatsNewExpanded ? "Collapse" : "Expand"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsWhatsNewExpanded(!isWhatsNewExpanded);
                            }}
                          />
                          <Text fontSize="small" fontWeight="bold">
                            What's new?
                          </Text>
                        </Flex>
                        {isWhatsNewExpanded && (
                          <Box as="ul" style={{ margin: 0, paddingLeft: "20px" }}>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              UOM toggle (refer to Details/Default story for implementation)
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Dynamic title and action labeling (e.g., "Yours")
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Description line below title (author, date)
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Status icons displayed next to column titles
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              New visual style for indicating changed values: yellow and grey underlines are applied to
                              Quantity, Due date, and Unit price fields only
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Unit of measure added to Unit price label
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Reason row added to the form
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed">
                              In edit mode, suppliers can specify the unit that has a conversion ratio defined and also
                              in customer default unit
                            </Text>
                          </Box>
                        )}
                      </Box>

                      {/* Other notes expandable section */}
                      <Box>
                        <Flex
                          alignItems="center"
                          gap="x1"
                          onClick={() => setIsOtherNotesExpanded(!isOtherNotesExpanded)}
                          style={{ cursor: "pointer" }}
                          mb={isOtherNotesExpanded ? "x2" : 0}
                        >
                          <IconicButton
                            icon={isOtherNotesExpanded ? "collapse" : "expand"}
                            labelHidden
                            tooltip={isOtherNotesExpanded ? "Collapse" : "Expand"}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsOtherNotesExpanded(!isOtherNotesExpanded);
                            }}
                          />
                          <Text fontSize="small" fontWeight="bold">
                            Other notes
                          </Text>
                        </Flex>
                        {isOtherNotesExpanded && (
                          <Box as="ul" style={{ margin: 0, paddingLeft: "20px" }}>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              When entering edit mode, the submit button is disabled and the status icon remains
                              visible. Once the first edit is made, the submit button becomes enabled and the status
                              icon is removed from the column being edited.
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Status icons have tooltips.
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed" mb="x0_5">
                              Success toast is displayed after accepting or updating proposal/request. — Proposal
                              updated. — Request updated. — Proposal accepted. — Request accepted.
                            </Text>
                            <Text as="li" fontSize="small" lineHeight="smallRelaxed">
                              Note is truncated.
                            </Text>
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </Alert>
                );
              }
              return null;
            })()}
            {deduplicatedVariations.map((variation, index) => {
              // Modify title to show "Open and Completed" when filter is "open-completed"
              let displayTitle = variation.title;
              if (
                filters.poliStatus === "open-completed" &&
                (variation.poliStatus === "Open" || variation.poliStatus === "Completed")
              ) {
                displayTitle = displayTitle.replace(
                  /POLI status: (Open|Completed)/g,
                  "POLI status: Open and Completed"
                );
              }
              // When "Accepted – Request updated" is selected with "Supplier's proposal: Not made",
              // show "Accepted – Request updated" in title instead of "Accepted"
              if (
                filters.collaboration === "accepted-updated" &&
                filters.supplierProposal === "no" &&
                variation.collaborationStatus === "accepted"
              ) {
                displayTitle = displayTitle.replace(
                  /Collaboration: Accepted/g,
                  "Collaboration: Accepted – Request updated"
                );
              }
              // When viewed as Customer and collaboration is "awaiting-customer", show "Awaiting customer's response" instead of "Awaiting your response"
              if (filters.viewedAs === "customer" && variation.collaborationStatus === "awaiting-customer") {
                displayTitle = displayTitle.replace(
                  /Collaboration: Awaiting your response/g,
                  "Collaboration: Awaiting customer's response"
                );
              }
              return (
                <CollaborationVariation
                  key={index}
                  title={displayTitle}
                  userRole={variation.userRole}
                  collaborationStatus={variation.collaborationStatus}
                  poliStatus={variation.poliStatus}
                  acceptedRequest={variation.acceptedRequest}
                  acceptedProposal={variation.acceptedProposal}
                  isReconciled={variation.isReconciled}
                  supplierProposalMade={variation.supplierProposalMade}
                  activeCardAuthorRole={variation.activeCardAuthorRole}
                />
              );
            })}
          </Box>
        </Page>
      </ApplicationFrame>
    </>
  );
};
