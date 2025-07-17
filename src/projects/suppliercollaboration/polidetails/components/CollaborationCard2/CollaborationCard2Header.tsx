import React from "react";
import { Flex, Heading4, Text, Icon } from "../../../../..";
import { CollaborationCard2Header as StyledHeader } from "./CollaborationCard2.parts";
import { CollaborationCard2HeaderProps } from "./lib/types";

export function CollaborationCard2Header({ title, meta, icon, children }: CollaborationCard2HeaderProps) {
  return (
    <StyledHeader>
      <Flex justifyContent="space-between" alignItems="flex-start" gap="x1">
        <Flex flexDirection="column" flex={1}>
          <Heading4 mb="x0_5" color="darkGrey">
            {title}
          </Heading4>
          {meta && (
            <Text fontSize="small" color="midGrey" lineHeight="smallCompressed">
              {meta}
            </Text>
          )}
        </Flex>
        {icon && <Icon icon={icon} size="x3" color="midGrey" />}
      </Flex>
      {children}
    </StyledHeader>
  );
} 