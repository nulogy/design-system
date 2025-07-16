import React from "react";
import {
  Box,
  Flex,
  Text,
  Heading4,
  PrimaryButton,
  QuietButton,
  Divider,
  TruncatedText,
  Card,
  Input,
  Select,
} from "../../../..";
import { border } from "styled-system";

type CollaborationCardType = "focus" | "quiet" | "readOnly" | "edit";

interface CollaborationCardProps {
  title: string;
  author: string;
  date: string;
  type?: CollaborationCardType;
  data: {
    quantity: string;
    uom: string;
    dueDate: string;
    unitPrice: string;
    currency: string;
    changeReason: string;
    changeNote: string;
  };
  onAccept?: () => void;
  acceptButtonText?: string;
  buttonLabel?: string;
}

export const CollaborationCard: React.FC<CollaborationCardProps> = ({
  title,
  author,
  date,
  type = "focus",
  data,
  onAccept,
  acceptButtonText = "Accept request",
  buttonLabel,
}) => {
  const isFocus = type === "focus";
  const isQuiet = type === "quiet";
  const isReadOnly = type === "readOnly";
  const isEdit = type === "edit";

  const cardProps = isFocus
    ? {
        flexDirection: "column" as const,
        width: "25%" as const,
        p: "0" as const,
        borderColor: "yellow" as const,
        boxShadow: "medium" as const,
        overflow: "hidden" as const,
      }
    : isEdit
      ? {
          flexDirection: "column" as const,
          width: "25%" as const,
          p: "0" as const,
          boxShadow: "focus" as const,
          overflow: "hidden" as const,
          border: "none" as const,
        }
      : {
          flexDirection: "column" as const,
          width: "25%" as const,
          p: "0" as const,
          overflow: "hidden" as const,
          border: "none" as const,
          boxShadow: "none" as const,
        };

  const bodyFlexProps = isFocus ? { px: "x1" as const } : {};

  const textPadding = isFocus ? "p" : "px";
  const textPaddingValue = isFocus ? "x1" : "x2";
  const verticalPadding = isEdit ? "x0_5" : "x1_5";
  const horizontalPadding = isEdit ? "x1" : textPaddingValue;

  return (
    <Card {...cardProps}>
      {/* CARD HEADER */}
      <Flex
        flexDirection="column"
        p="x2"
        backgroundColor={isFocus ? "lightYellow" : isEdit ? "lightBlue" : "transparent"}
      >
        <Flex justifyContent="space-between">
          <Heading4 mb="0" color="darkGrey">
            {title}
          </Heading4>
        </Flex>
        <Text fontSize="small" color="midGrey" lineHeight="smallCompressed">
          by {author} on {date}
        </Text>
      </Flex>
      {/* CARD BODY */}
      <Flex flexDirection="column" {...bodyFlexProps}>
        {!isFocus && <Divider m="0" />}
        {isEdit ? (
          <>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.quantity} mb="1px" />
            </Box>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.uom} mb="1px" />
            </Box>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.dueDate} mb="1px" />
            </Box>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.unitPrice} mb="1px" />
            </Box>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.currency} mb="1px" />
            </Box>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.changeReason} mb="1px" />
            </Box>
            <Box px={horizontalPadding} py={verticalPadding}>
              <Input value={data.changeNote} mb="1px" />
            </Box>
          </>
        ) : (
          <>
            <Text {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.quantity}
            </Text>
            <Divider m="0" />
            <Text {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.uom}
            </Text>
            <Divider m="0" />
            <Text {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.dueDate}
            </Text>
            <Divider m="0" />
            <Text {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.unitPrice}
            </Text>
            <Divider m="0" />
            <Text {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.currency}
            </Text>
            <Divider m="0" />
            <Text {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.changeReason}
            </Text>
            <Divider m="0" />
            <TruncatedText fullWidth {...{ [textPadding]: textPaddingValue }} py={verticalPadding}>
              {data.changeNote}
            </TruncatedText>
            <Divider m="0" />
          </>
        )}
      </Flex>
      {/* CARD FOOTER */}
      {!isReadOnly && (
        <Flex p="x2" gap="x1">
          {isEdit ? (
            <>
              <PrimaryButton fullWidth onClick={onAccept}>
                Submit
              </PrimaryButton>
              <QuietButton fullWidth onClick={() => {}}>
                Cancel
              </QuietButton>
            </>
          ) : isFocus ? (
            <PrimaryButton fullWidth onClick={onAccept}>
              {buttonLabel || acceptButtonText}
            </PrimaryButton>
          ) : (
            <QuietButton fullWidth onClick={onAccept}>
              {buttonLabel || acceptButtonText}
            </QuietButton>
          )}
        </Flex>
      )}
    </Card>
  );
};
