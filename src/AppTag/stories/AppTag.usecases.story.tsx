import React from "react";
import { AppTag } from "..";
import { Flex, InlineFlex } from "../../Flex";
import { Icon } from "../../Icon";
import { Link } from "../../Link";
import { StatusIndicator } from "../../StatusIndicator";
import { TruncatedText } from "../../TruncatedText";
import { Heading1, Text } from "../../Type";
import { Code } from "../../utils/story/code";
import { Table } from "../../Table";
import { Tooltip } from "../../Tooltip";

export default {
  title: "Components/AppTag/Usecases",
  component: AppTag,
};

export const WithALink = () => {
  return (
    <Flex flexDirection="column" gap="x2">
      <Flex flexDirection="column" gap="x1">
        <Heading1 compact>AppTag with Link</Heading1>
        <Text fontSize="sm">
          These examples show the <Code>Link</Code> component used with the <Code>forApp</Code> prop. See the{" "}
          <Link href="/?path=/story/components-link--with-app-tag">With AppTag</Link> Link story for more examples.
        </Text>
      </Flex>
      <InlineFlex flexDirection="column" gap="x2">
        <Link href="#app" forApp="digital-quality-inspection">
          POLI-120392
        </Link>
        <Link underline={false} href="#app" forApp="supplier-collaboration">
          POLI-120392
        </Link>
      </InlineFlex>
    </Flex>
  );
};

WithALink.storyName = "With a Link";

export const WithText = () => {
  return (
    <InlineFlex flexDirection="column" gap="x2">
      <InlineFlex alignItems="center" gap="half">
        <Text>Entity reference</Text>
        <AppTag app="digital-quality-inspection" type="active" />
      </InlineFlex>
      <InlineFlex alignItems="center" gap="half">
        <Text color="midGrey">Inactive entity reference</Text>
        <AppTag app="supplier-collaboration" type="inactive" />
      </InlineFlex>
    </InlineFlex>
  );
};

WithText.storyName = "With text";

export const WithMessages = () => {
  const columns = [
    { label: "Use-case", dataKey: "type", width: "20%" },
    { label: "Example", dataKey: "example", width: "80%" },
  ];

  const rows = [
    {
      id: "status-indicator",
      type: "Using a StatusIndicator",
      example: (
        <InlineFlex alignItems="center" gap="half">
          <AppTag app="digital-quality-inspection" type="active" />
          <StatusIndicator type="informative">New</StatusIndicator>
        </InlineFlex>
      ),
    },
    {
      id: "custom-component",
      type: "Using a custom component",
      example: (
        <InlineFlex alignItems="center" gap="half">
          <AppTag app="digital-quality-inspection" type="active" />
          <InlineFlex alignItems="center" gap="x0_25" bg="lightRed" pl="x0_5" pr="x1" borderRadius="rounded">
            <Icon icon="error" size="x2" color="red" />
            <Text fontSize="smaller" letterSpacing="0.05em" textTransform="uppercase" fontWeight="medium" color="red">
              Transaction failed
            </Text>
          </InlineFlex>
        </InlineFlex>
      ),
    },
    {
      id: "icon-text",
      type: "Using Icon and Text",
      example: (
        <InlineFlex alignItems="center" gap="half">
          <AppTag app="digital-quality-inspection" type="active" />
          <InlineFlex alignItems="center" gap="x0_25" pl="x0_5" pr="x1" borderRadius="rounded">
            <Icon icon="warning" size="x2" color="yellow" />
            <Text fontSize="small" color="black">
              Requires attention
            </Text>
          </InlineFlex>
        </InlineFlex>
      ),
    },
    {
      id: "text-icon",
      type: "Using Text and Icon",
      example: (
        <InlineFlex alignItems="center" gap="half">
          <AppTag app="digital-quality-inspection" type="active" />
          <InlineFlex alignItems="center" gap="x0_75">
            <Text fontSize="small">Processing</Text>
            <Icon icon="loading" />
          </InlineFlex>
        </InlineFlex>
      ),
    },
    {
      id: "text-only",
      type: "Using Text",
      example: (
        <InlineFlex alignItems="center" gap="half">
          <AppTag app="digital-quality-inspection" type="active" />
          <Text fontSize="small">Processed</Text>
        </InlineFlex>
      ),
    },
    {
      id: "truncated-text",
      type: "Using TruncatedText",
      example: (
        <InlineFlex alignItems="center" gap="half">
          <AppTag app="digital-quality-inspection" type="active" />
          <TruncatedText fontSize="small" color="red">
            Transaction failed because the supplier did not provide the required information.
          </TruncatedText>
        </InlineFlex>
      ),
    },
  ];

  return (
    <Flex flexDirection="column" gap="x2">
      <Table rowHovers={false} columns={columns} rows={rows} />
    </Flex>
  );
};

WithMessages.storyName = "With messages";

export const WithTooltip = () => {
  return (
    <Flex flexDirection="column" gap="x2">
      <Tooltip tooltip="This is a tooltip">
        <InlineFlex alignItems="center" gap="half" alignSelf="flex-start">
          <Text>Entity reference</Text>
          <AppTag app="digital-quality-inspection" type="active" />
        </InlineFlex>
      </Tooltip>
    </Flex>
  );
};

WithTooltip.storyName = "With Tooltip";
