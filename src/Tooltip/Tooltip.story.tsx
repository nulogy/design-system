import React from "react";
import {
  Box,
  Button,
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
  Divider,
  Flex,
  Icon,
  Link,
  StatusIndicator,
  Text,
  Tooltip,
} from "../index";

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
  <Tooltip placement="bottom" tooltip={<Link href="/"> Link </Link>} defaultOpen>
    <Button> Button </Button>
  </Tooltip>
);

WithLinkPassedIn.story = {
  name: "with Link passed in",
};

export const WithButtonPassedIn = () => (
  <Tooltip placement="bottom" tooltip={<Button href="/"> Button </Button>} defaultOpen>
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
  <Tooltip tooltip="See me on hover!" defaultOpen>
    <CustomComponent />
  </Tooltip>
);

const CustomComponent = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  (props, forwardedRef) => (
    <span ref={forwardedRef} {...props}>
      <Text inline>This component uses the forwardedRef from the Tooltip wrapping it</Text>
    </span>
  )
);

const CustomTooltip = () => (
  <Flex flexDirection="column" width="320px" p="x1_5">
    <Text fontSize="smaller" fontWeight="medium" textTransform="uppercase" color="midGrey">
      Purchase Order
    </Text>
    <Text color="darkGrey">PO 12389</Text>
    <Divider />
    <DescriptionList>
      <DescriptionTerm>Customer</DescriptionTerm>
      <DescriptionDetails>Nulogy</DescriptionDetails>
      <DescriptionTerm>
        <Text display="inline-flex" alignItems="end">
          Order number
          <Icon icon="info" size="x3" paddingLeft="half" />
        </Text>
      </DescriptionTerm>
      <DescriptionDetails>
        <Link href="/customer-details">P12-90381-2039</Link>
      </DescriptionDetails>
      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>
        <StatusIndicator type="success">Paid</StatusIndicator>
      </DescriptionDetails>
      <DescriptionTerm>Amount</DescriptionTerm>
      <DescriptionDetails>$202.12</DescriptionDetails>
      <DescriptionTerm>Amount after exchange</DescriptionTerm>
      <DescriptionDetails>
        <Flex as="span" alignItems="center" gap="half">
          US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
        </Flex>
      </DescriptionDetails>
    </DescriptionList>
  </Flex>
);

export const WithCustomTooltip = () => (
  <Flex alignItems="center" gap="half">
    <Text fontSize="small" color="darkGrey">
      You can embed custom components in the tooltip
    </Text>

    <Tooltip maxWidth="340px" tooltip={<CustomTooltip />} defaultOpen>
      <Icon icon="info" size="x3" color="darkGrey" />
    </Tooltip>
  </Flex>
);
