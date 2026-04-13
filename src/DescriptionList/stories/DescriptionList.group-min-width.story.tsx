import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flex } from "../../Flex";
import { Heading1, Text } from "../../Type";
import { legacy } from "../../theme/theme";
import { Resizable } from "../../utils/story/resizable";
import DescriptionList from "../DescriptionList";
import { SampleContent } from "./fixtures";

export default {
  title: "Components/DescriptionList/GroupMinWidth",
} satisfies Meta<typeof DescriptionList>;

type Story = StoryObj<typeof DescriptionList>;

export const GroupMinWidth: Story = {
  render: () => (
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
  ),
  parameters: {
    chromatic: {
      viewports: [
        parseInt(legacy.breakpoints.extraSmall, 10),
        parseInt(legacy.breakpoints.small, 10),
        parseInt(legacy.breakpoints.medium, 10),
        parseInt(legacy.breakpoints.large, 10),
      ],
    },
  },
};
