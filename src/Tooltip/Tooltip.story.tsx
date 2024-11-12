import React from "react";
import { Button, Box, Link, Flex, Text, Tooltip } from "../index";

export default {
  title: "Components/Tooltip",
  parameters: {
    chromatic: { disable: true },
  },
};

export const _Tooltip = () => (
  <Flex p="x8">
    <Tooltip tooltip="I am a Tooltip!">
      <Button> Button </Button>
    </Tooltip>
  </Flex>
);

export const WithWrappedText = () => (
  <Flex p="x8">
    <Tooltip
      placement="bottom"
      tooltip="I am a Tooltip! I have very long text, and my default max-width is 24em (based on 14px font-size), which is equal to 336px, or approximately 45 characters."
      defaultOpen
    >
      <Button> Button </Button>
    </Tooltip>
  </Flex>
);

WithWrappedText.story = {
  name: "with wrapped text",
};

export const WithCustomMaxWidth = () => (
  <Flex p="x8">
    <Tooltip
      placement="bottom"
      tooltip="I am a Tooltip! I have very long text, but I have a smaller maxWidth prop that causes me to wrap frequently."
      maxWidth="128px"
      defaultOpen
    >
      <Button> Button </Button>
    </Tooltip>
  </Flex>
);

WithCustomMaxWidth.story = {
  name: "with custom maxWidth",
};

export const WithPlacement = () => (
  <>
    <Flex my="x6" mx="x8" justifyContent="space-around">
      <Tooltip placement="top-start" tooltip="top-start" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="top" tooltip="top" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="top-end" tooltip="top-end" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
    </Flex>
    <Flex my="x6" mx="x8" justifyContent="space-around">
      <Tooltip placement="left-start" tooltip="left-start" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="left" tooltip="left" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="left-end" tooltip="left-end" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
    </Flex>
    <Flex my="x6" mx="x8" justifyContent="space-around">
      <Tooltip placement="right-start" tooltip="right-start" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="right" tooltip="right" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="right-end" tooltip="right-end" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
    </Flex>
    <Flex my="x6" mx="x8" justifyContent="space-around">
      <Tooltip placement="bottom-start" tooltip="bottom-start" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="bottom" tooltip="bottom" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
      <Tooltip placement="bottom-end" tooltip="bottom-end" defaultOpen>
        <Button>Tooltip trigger</Button>
      </Tooltip>
    </Flex>
  </>
);

WithPlacement.story = {
  name: "with placement",
};

export const WithLinkPassedIn = () => (
  <Tooltip placement="bottom" tooltip={<Link href="/"> Link </Link>}>
    <Button> Button </Button>
  </Tooltip>
);

WithLinkPassedIn.story = {
  name: "with Link passed in",
};

export const WithButtonPassedIn = () => (
  <Tooltip placement="bottom" tooltip={<Button href="/"> Button </Button>}>
    <Button> Button </Button>
  </Tooltip>
);

WithButtonPassedIn.story = {
  name: "with Button passed in",
};

export const WithCustomShowDelay = () => (
  <Tooltip placement="bottom" tooltip="Tooltip" showDelay="1000">
    <Button> Button </Button>
  </Tooltip>
);

WithCustomShowDelay.story = {
  name: "with custom showDelay",
};

export const WithCustomHideDelay = () => (
  <Tooltip placement="bottom" tooltip="Tooltip" hideDelay="1000">
    <Button> Button </Button>
  </Tooltip>
);

WithCustomHideDelay.story = {
  name: "with custom hideDelay",
};

export const WithOtherFocusableElements = () => (
  <>
    <Tooltip placement="bottom" tooltip="Tooltip">
      <Button> Button </Button>
    </Tooltip>
    <Tooltip placement="bottom" tooltip="Tooltip">
      <Link href="/"> Link </Link>
    </Tooltip>
    <Tooltip placement="bottom" tooltip="Tooltip">
      <Text mr="x2" inline bg="blue">
        Inline Text
      </Text>
    </Tooltip>
    <Tooltip placement="bottom" tooltip="Tooltip">
      <Box width="200px" bg="blue">
        Box width 200px
      </Box>
    </Tooltip>
    <Tooltip placement="bottom" tooltip="Tooltip">
      <Box bg="blue">Box</Box>
    </Tooltip>
  </>
);

WithOtherFocusableElements.story = {
  name: "with other focusable elements",
};

export const OpenByDefault = () => (
  <Tooltip tooltip="I am an open Tooltip!" defaultOpen>
    <Button>Hover me</Button>
  </Tooltip>
);

OpenByDefault.story = {
  name: "open by default",
};

export const WithCustomComponent = () => (
  <Tooltip tooltip="See me on hover!">
    <CustomComponent />
  </Tooltip>
);

export const WithRef = () => {
  const ref = React.useRef(null);

  return (
    <Tooltip tooltip="I am a Tooltip!" ref={ref}>
      <Button> Button </Button>
    </Tooltip>
  );
};

const CustomComponent = React.forwardRef<HTMLDivElement, { [key: string]: any }>((props, forwardedRef) => (
  <span ref={forwardedRef} {...props}>
    <Text inline>This component uses the forwardedRef from the Tooltip wrapping it</Text>
  </span>
));
