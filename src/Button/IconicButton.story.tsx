import React from "react";
import { IconicButton } from "../index";
import { Flex } from "../Flex";
import { StatusIndicator } from "../StatusIndicator";
import { Box } from "../Box";

export default {
  title: "Components/IconicButton",
};

export const WithoutALabel = () => <IconicButton icon="delete" />;

WithoutALabel.story = {
  name: "without a label",
};

export const WithLabel = () => <IconicButton icon="delete">Delete</IconicButton>;

WithLabel.story = {
  name: "with label",
};

export const WithALongLabel = () => (
  <IconicButton icon="user">I am an Iconic Button with a really really really long label</IconicButton>
);

WithALongLabel.story = {
  name: "with a long label",
};

export const SetToDisabled = () => (
  <>
    <IconicButton icon="cancel" disabled>
      Cancel
    </IconicButton>
    <IconicButton icon="lock" disabled>
      Lock
    </IconicButton>
  </>
);

SetToDisabled.story = {
  name: "set to disabled",
};

export const WithAHiddenLabel = () => (
  <IconicButton ml="x6" labelHidden icon="user">
    Hidden Label
  </IconicButton>
);

WithAHiddenLabel.story = {
  name: "with a hidden label",
};

export const WithACustomIconSize = () => (
  <IconicButton icon="user" iconSize="50px" labelHidden>
    I am an Iconic Button
  </IconicButton>
);

WithACustomIconSize.story = {
  name: "with a custom icon size",
};

export const WithACustomColor = () => (
  <IconicButton color="red" icon="close">
    Close
  </IconicButton>
);

WithACustomColor.story = {
  name: "with a custom color",
};

export const WithATooltipAndLabel = () => (
  <IconicButton tooltip="Stop job" icon="close">
    Stop
  </IconicButton>
);

WithATooltipAndLabel.story = {
  name: "with a tooltip and label",
};

export const WithAComplicatedTooltipAndLabel = () => (
  <IconicButton tooltip={<Box>Hello</Box>} icon="close">
    Please stop
  </IconicButton>
);

WithAComplicatedTooltipAndLabel.story = {
  name: "with a complicated tooltip and label",
};

export const rightAligned = () => (
  <Flex px="x3" height="150px">
    <Flex justifyContent="flex-end" alignItems="flex-start" width="100%">
      <IconicButton icon="rightArrow" labelHidden>
        I am an Iconic Button
      </IconicButton>
      <IconicButton icon="leftArrow" labelHidden>
        I am an Iconic Button 2
      </IconicButton>
    </Flex>
  </Flex>
);

rightAligned.parameters = {
  chromatic: { diffThreshold: 0.3 },
};

export const WithACustomFontSize = () => (
  <Flex flexDirection="column">
    <IconicButton fontSize="small" tooltip="Stop job" icon="close">
      This is an IconicButton with a small font size
    </IconicButton>
    <IconicButton fontSize="large" tooltip="Stop job" icon="close">
      This is an IconicButton with a large font size
    </IconicButton>
    <IconicButton fontSize="48px" tooltip="Stop job" icon="close">
      This is an IconicButton with 48px font size
    </IconicButton>
  </Flex>
);

WithACustomFontSize.story = {
  name: "with a custom font size",
};

export const WithNonTextChildren = () => (
  <IconicButton fontSize="small" aria-label="warnings" icon="warning">
    <Flex>
      <Box as="span" pr="x1">
        Warnings
      </Box>
      <StatusIndicator type="informative">3</StatusIndicator>
    </Flex>
  </IconicButton>
);

WithNonTextChildren.story = {
  name: "with non text children",
};

export const WithCustomHoverBackgroundThemeColor = () => (
  <IconicButton hoverBackgroundColor="lightYellow" fontSize="small" aria-label="warnings" icon="warning">
    <Flex>
      <Box as="span" pr="x1">
        Warnings
      </Box>
    </Flex>
  </IconicButton>
);

export const WithCustomHoverBackgroundNonThemeColor = () => (
  <IconicButton hoverBackgroundColor="#FA8072" fontSize="small" aria-label="warnings" icon="warning">
    <Flex>
      <Box as="span" pr="x1">
        Warnings
      </Box>
    </Flex>
  </IconicButton>
);

export const WithLargerIcons = () => <IconicButton icon="chatBubble">Add comment</IconicButton>;
