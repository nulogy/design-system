import React from "react";
import { Flex, PrimaryButton, QuietButton, Text } from "../../../../..";
import { CollaborationCard2Footer as StyledFooter } from "./CollaborationCard2.parts";
import { CollaborationCard2FooterProps } from "./lib/types";

export function CollaborationCard2Footer({
  primaryAction,
  secondaryAction,
  meta,
  onPrimaryAction,
  onSecondaryAction,
  children,
}: CollaborationCard2FooterProps) {
  return (
    <StyledFooter>
      {children}
      {(primaryAction || secondaryAction) && (
        <Flex gap="x1" mb={meta ? "x1" : "0"}>
          {primaryAction && (
            <PrimaryButton fullWidth onClick={onPrimaryAction}>
              {primaryAction}
            </PrimaryButton>
          )}
          {secondaryAction && (
            <QuietButton fullWidth onClick={onSecondaryAction}>
              {secondaryAction}
            </QuietButton>
          )}
        </Flex>
      )}
      {meta && (
        <Text fontSize="small" color="midGrey" lineHeight="smallCompressed">
          {meta}
        </Text>
      )}
    </StyledFooter>
  );
}
