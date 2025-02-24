import React from "react";
import { Flex } from "../../Flex";
import { Heading1, Text } from "../../Type";
import DescriptionList from "../DescriptionList";
import { SampleContent } from "./fixtures";

export default {
  title: "Components/DescriptionList/Sizing",
  component: DescriptionList,
};

const SizingDemo = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <Flex flexDirection="column" gap="x4">
    <Flex flexDirection="column" gap="x1">
      <Heading1 compact>{title}</Heading1>
      {description && <Text fontSize="sm">{description}</Text>}
    </Flex>
    {children}
  </Flex>
);

export const Density = () => (
  <SizingDemo title="Density">
    <Flex gap="x4">
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Compact
        </Text>
        <DescriptionList layout="stacked" density="compact">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Medium
        </Text>
        <DescriptionList layout="stacked" density="medium">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Relaxed
        </Text>
        <DescriptionList layout="stacked" density="relaxed">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  </SizingDemo>
);

export const FontSize = () => (
  <SizingDemo title="Font Size">
    <Flex gap="x4" flexDirection={{ extraSmall: "column", small: "row" }}>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Small
        </Text>
        <DescriptionList layout="stacked" fontSize="small" lineHeight="smallTextBase">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Medium (Default)
        </Text>
        <DescriptionList layout="stacked">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Large
        </Text>
        <DescriptionList layout="stacked" fontSize="large" lineHeight="heading3">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  </SizingDemo>
);

export const LineHeight = () => (
  <SizingDemo title="Line Height">
    <Flex gap="x4" flexDirection={{ extraSmall: "column", small: "row" }}>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Base
        </Text>
        <DescriptionList layout="stacked" lineHeight="base">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Text as="h4" fontWeight="bold">
          Base Relaxed
        </Text>
        <DescriptionList layout="stacked" lineHeight="baseRelaxed">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  </SizingDemo>
);
