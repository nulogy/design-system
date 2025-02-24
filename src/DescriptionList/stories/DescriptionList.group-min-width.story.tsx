import React from "react";
import { Flex } from "../../Flex";
import { legacy } from "../../theme/theme";
import { Heading1, Text } from "../../Type";
import { Resizable } from "../../utils/story/resizable";
import DescriptionList from "../DescriptionList";
import { SampleContent } from "./fixtures";

export const GroupMinWidth = () => {
  return (
    <Flex flexDirection="column" gap="x4">
      <Flex flexDirection="column" gap="x2">
        <Heading1 compact>Group Min Width</Heading1>
        <Text fontSize="sm" mb="x4">
          In this example the groupMinWidth is set to 200px, each group is given a minimum width of 200px with the
          remaining space distributed evenly between the groups.
        </Text>
        <Resizable containerWidth="100%" showContainerOutline>
          <DescriptionList groupMinWidth="200px">
            <SampleContent />
          </DescriptionList>
        </Resizable>
      </Flex>
    </Flex>
  );
};

GroupMinWidth.parameters = {
  chromatic: {
    viewports: [
      parseInt(legacy.breakpoints.extraSmall),
      parseInt(legacy.breakpoints.small),
      parseInt(legacy.breakpoints.medium),
      parseInt(legacy.breakpoints.large),
    ],
  },
};
