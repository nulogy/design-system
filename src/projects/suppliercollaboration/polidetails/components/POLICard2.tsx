import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading4,
  Icon,
  PrimaryButton,
  QuietButton,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Tooltip,
  Card,
  Divider,
} from "../../../..";
import { requestFields } from "../utils/polidetailsHelpers";

export type POLICard2Type = "regular" | "active" | "accepted";

interface POLICard2Props {
  type: POLICard2Type;
  baseTitle: string; // The base title without role-specific modifications
  author: string;
  authorRole: "supplier" | "customer";
  userRole: "supplier" | "customer"; // Current user's role
  date: string;
  onAccept?: () => void;
  acceptButtonText?: string;
  onNewProposal?: () => void;
  newProposalButtonText?: string;
  width?: string; // Optional width prop
  emptyHeader?: boolean; // Optional prop to make header empty
}

export const POLICard2: React.FC<POLICard2Props> = ({
  type,
  baseTitle,
  author,
  authorRole,
  userRole,
  date,
  onAccept,
  acceptButtonText,
  onNewProposal,
  newProposalButtonText,
  width = "480px",
  emptyHeader = false,
}) => {
  const getCardStyles = () => {
    switch (type) {
      case "active":
        // Different styles based on whether user needs to act or is waiting
        if (authorRole !== userRole) {
          // User needs to act - yellow styling
          return {
            borderColor: "yellow" as const,
            backgroundColor: "lightYellow" as const,
            overflow: "hidden" as const,
          };
        } else {
          // User is waiting for other party - blue styling
          return {
            borderColor: "blue" as const,
            backgroundColor: "lightBlue" as const,
            overflow: "hidden" as const,
          };
        }
      case "accepted":
        return {
          borderColor: "green" as const,
          backgroundColor: "lightGreen" as const,
        };
      default:
        return {
          backgroundColor: "whiteGrey" as const,
        };
    }
  };

  const getStatusIcon = () => {
    switch (type) {
      case "active":
        // Only show icon if author role doesn't match user role (user needs to act)
        if (authorRole !== userRole) {
          return (
            <Box backgroundColor="yellow" borderRadius="medium" p="x0_25" width="x3" height="x3">
              <Tooltip tooltip="Awaiting response">
                <Icon icon="accessTime" size="x2_5" color="darkGrey" />
              </Tooltip>
            </Box>
          );
        }
        return null;
      case "accepted":
        return (
          <Box backgroundColor="green" borderRadius="medium" p="x0_25" width="x3" height="x3">
            <Icon icon="check" size="x2_5" color="lightGreen" />
          </Box>
        );
      default:
        return null;
    }
  };

  const styles = getCardStyles();

  // Generate title based on authorRole and userRole
  const getTitle = () => {
    // For accepted cards, title depends on who is accepting
    if (type === "accepted") {
      // If userRole is supplier, they're accepting a request (from customer)
      // If userRole is customer, they're accepting a proposal (from supplier)
      return userRole === "supplier" ? "Accepted request" : "Accepted proposal";
    }

    if (authorRole === userRole) {
      // Card is authored by current user
      return `Your ${baseTitle}`;
    } else {
      // Card is authored by other party
      const otherParty = authorRole === "supplier" ? "Supplier's" : "Customer's";
      return `${otherParty} ${baseTitle}`;
    }
  };

  return (
    <Card
      p="0"
      width={width}
      {...(styles.borderColor && { borderColor: styles.borderColor })}
      {...(styles.overflow && { overflow: styles.overflow })}
    >
      {!emptyHeader ? (
        <>
          <Box px="x2" py="x1_5" pr={type === "active" ? "x1_5" : "x2"} backgroundColor={styles.backgroundColor}>
            <Flex justifyContent="space-between">
              <Heading4 mb="0">{getTitle()}</Heading4>
              {getStatusIcon()}
            </Flex>
            <Text fontSize="small" color="midGrey" pr={type === "active" ? "x0_5" : undefined}>
              by {author} on {date}
            </Text>
          </Box>
          <Divider m="0" />
        </>
      ) : (
        <Box px="x2" py="x1_5" pr={type === "active" ? "x1_5" : "x2"} backgroundColor={styles.backgroundColor} height="x8" />
      )}
      <Box px="x2" py="x1" pb={type === "active" || type === "accepted" ? "x1" : "x4"}>
        {emptyHeader ? (
          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
            {requestFields.map((field) => (
              <React.Fragment key={field.label}>
                <Text fontWeight="bold" display="inline" mr="x1">{field.label}:</Text>
                <Text display="inline" mr="x2">{field.value}</Text>
              </React.Fragment>
            ))}
          </DescriptionList>
        ) : (
          <DescriptionList layout="inline" showDivider descriptionTermMaxWidth="12em">
            {requestFields.map((field) => (
              <DescriptionGroup key={field.label}>
                <DescriptionTerm>{field.label}</DescriptionTerm>
                <DescriptionDetails>{field.value}</DescriptionDetails>
              </DescriptionGroup>
            ))}
          </DescriptionList>
        )}
      </Box>
      {type === "active" && (
        <Box p="x2" pt="x1">
          {authorRole === userRole ? (
            // User is waiting for other party
            <Text color="midGrey" textAlign="center">
              Awaiting {userRole === "supplier" ? "customer" : "supplier"} response
            </Text>
          ) : (
            // User needs to act - show both buttons if available
            <Flex gap="x2">
              {onAccept && acceptButtonText && (
                <PrimaryButton fullWidth onClick={onAccept}>
                  {acceptButtonText}
                </PrimaryButton>
              )}
              {onNewProposal && newProposalButtonText && (
                <QuietButton fullWidth onClick={onNewProposal}>
                  {newProposalButtonText}
                </QuietButton>
              )}
            </Flex>
          )}
        </Box>
      )}
      {type === "accepted" && (
        <Box p="x2" pt="x1">
          <Text color="midGrey" textAlign="center">
            {authorRole === "customer" ? "Request" : "Proposal"} made by {author} on {date}
          </Text>
        </Box>
      )}
    </Card>
  );
}; 