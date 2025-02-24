import React from "react";
import { Flex } from "../../Flex";
import { Heading1, Text } from "../../Type";
import DescriptionList from "../DescriptionList";
import { Code } from "../../utils/story/code";
import { Resizable } from "../../utils/story/resizable";
import { legacy } from "../../theme/theme";
import { Icon } from "../../Icon";
import { Link } from "../../Link";
import { SampleContent } from "./fixtures";

export default {
  title: "Components/DescriptionList/Layout",
  component: DescriptionList,
};

export const Inline = () => {
  return (
    <Flex flexDirection="column" gap="x2">
      <Heading1 compact>Inline Layout</Heading1>
      <DescriptionList layout="inline">
        <SampleContent />
      </DescriptionList>
    </Flex>
  );
};

export const Stacked = () => {
  return (
    <Flex flexDirection="column" gap="x2">
      <Heading1 compact>Stacked Layout</Heading1>
      <DescriptionList layout="stacked">
        <SampleContent />
      </DescriptionList>
    </Flex>
  );
};

export const Auto = () => {
  return (
    <Flex flexDirection="column" gap="x2">
      <Flex flexDirection="column" gap="x1">
        <Heading1 compact>Auto Layout</Heading1>
        <Text fontSize="sm">
          Automatically switches between <Code>stacked</Code> and <Code>inline</Code> layouts based on the specified
          container width. Default breakpoint is set to <Code>640px</Code>.
        </Text>
        <Flex alignItems="center" gap="half" mb="x2">
          <Icon icon="info" color="midGrey" />
          <Text fontSize="sm" color="darkGrey">
            The breakpoint is based on the container width, not the viewport width. See component{" "}
            <Link href="https://github.com/nulogy/design-system/blob/master/src/DescriptionList/README.md">
              documentation
            </Link>
            .
          </Text>
        </Flex>
      </Flex>
      <Resizable containerWidth="100%" showContainerOutline>
        <DescriptionList layout="auto" autoLayoutBreakpoint="640px">
          <SampleContent />
        </DescriptionList>
      </Resizable>
    </Flex>
  );
};

Auto.parameters = {
  chromatic: {
    viewports: [
      parseInt(legacy.breakpoints.extraSmall),
      parseInt(legacy.breakpoints.small),
      parseInt(legacy.breakpoints.medium),
    ],
  },
};
