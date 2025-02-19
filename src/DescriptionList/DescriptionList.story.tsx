import { transparentize } from "polished";
import { Resizable } from "re-resizable";
import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Box } from "../Box";
import { IconicButton } from "../Button";
import { Checkbox } from "../Checkbox";
import { Divider as HorizontalDivider } from "../Divider";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import { Input } from "../Input";
import Sidebar from "../Layout/Sidebar";
import { Link } from "../Link";
import { NDSOptionValue, Select } from "../Select";
import { StatusIndicator } from "../StatusIndicator";
import { Textarea } from "../Textarea";
import { DefaultNDSThemeType } from "../theme";
import { Breakpoints } from "../theme/theme.type";
import { Tooltip } from "../Tooltip";
import { Heading1, Heading3, Heading4, Text } from "../Type";
import { dashed } from "../utils/story/dashed";
import type { Density as DensityType, Layout } from "./DescriptionList";
import { DescriptionList } from "./DescriptionList";
import { DescriptionDetails, DescriptionGroup, DescriptionTerm } from "./DescriptionList.parts";

export default {
  title: "Components/DescriptionList",
  component: DescriptionList,
};

const OutlinedDt = styled(DescriptionTerm)<{ $outlined: boolean; $highlighted?: boolean }>(
  ({ $outlined, $highlighted, theme }) => ({
    backgroundClip: "content-box",
    backgroundColor: $highlighted
      ? transparentize($outlined ? 0.7 : 0.9, theme.colors.categorical1)
      : $outlined
        ? transparentize(0.9, theme.colors.categorical1)
        : undefined,
    transition: "background-color 0.25s ease-in-out",
  })
);

const OutlinedDd = styled(DescriptionDetails)<{ $outlined: boolean; $highlighted?: boolean }>(
  ({ $outlined, $highlighted, theme }) => ({
    backgroundClip: "content-box",
    backgroundColor: $highlighted
      ? transparentize($outlined ? 0.7 : 0.9, theme.colors.categorical2)
      : $outlined
        ? transparentize(0.9, theme.colors.categorical2)
        : undefined,
    transition: "background-color 0.25s ease-in-out",
  })
);

const DashedBox = dashed(Box);

const SampleContent = () => (
  <>
    <DescriptionGroup>
      <DescriptionTerm>Customer</DescriptionTerm>
      <DescriptionDetails>Nulogy</DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>
        <Text display="inline-flex" alignItems="end">
          Order number
          <Tooltip tooltip="The unique identifier assigned to this order when it was placed by the customer.">
            <Icon icon="info" size="x3" paddingLeft="half" />
          </Tooltip>
        </Text>
      </DescriptionTerm>
      <DescriptionDetails>
        <Link href="/customer-details">P12-90381-2039</Link>
      </DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>Status</DescriptionTerm>
      <DescriptionDetails>
        <StatusIndicator type="success">Paid</StatusIndicator>
      </DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>Amount</DescriptionTerm>
      <DescriptionDetails>$202.12</DescriptionDetails>
    </DescriptionGroup>
    <DescriptionGroup>
      <DescriptionTerm>Amount after exchange</DescriptionTerm>
      <DescriptionDetails>
        <Flex as="span" alignItems="center" gap="half">
          US $202.12 <Icon icon="arrowForward" color="midGrey" /> CA $287.43
        </Flex>
      </DescriptionDetails>
    </DescriptionGroup>
  </>
);

export function Inline() {
  return (
    <DescriptionList layout="inline">
      <SampleContent />
    </DescriptionList>
  );
}

export function Stacked() {
  return (
    <DescriptionList layout="stacked">
      <SampleContent />
    </DescriptionList>
  );
}

export function Auto() {
  return (
    <DescriptionList layout="auto" autoLayoutBreakpoint="640px">
      <SampleContent />
    </DescriptionList>
  );
}

export function Density() {
  return (
    <Flex flexDirection="column" gap="x4">
      <Heading3 compact>Density</Heading3>
      <Flex gap="x4">
        <Flex flexDirection="column" gap="x2" flex={1}>
          <Heading4>Compact</Heading4>
          <DescriptionList layout="stacked" density="compact">
            <SampleContent />
          </DescriptionList>
        </Flex>
        <Flex flexDirection="column" gap="x2" flex={1}>
          <Heading4>Medium</Heading4>
          <DescriptionList layout="stacked" density="medium">
            <SampleContent />
          </DescriptionList>
        </Flex>
        <Flex flexDirection="column" gap="x2" flex={1}>
          <Heading4>Relaxed</Heading4>
          <DescriptionList layout="stacked" density="relaxed">
            <SampleContent />
          </DescriptionList>
        </Flex>
      </Flex>
    </Flex>
  );
}

export function Divider() {
  return (
    <Flex
      gap="x4"
      flexDirection={{ extraSmall: "column", small: "row" }}
      alignItems={{ extraSmall: "stretch", small: "flex-start" }}
    >
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading3>Stacked</Heading3>
        <DescriptionList layout="stacked" showDivider>
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading3>Inline</Heading3>
        <DescriptionList layout="inline" descriptionTermMaxWidth="50%" showDivider>
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading3>Auto</Heading3>
        <DescriptionList layout="auto" autoLayoutBreakpoint="640px" showDivider>
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function FontSizeAndLineHeight() {
  return (
    <Flex
      gap="x4"
      flexDirection={{ extraSmall: "column", small: "row" }}
      alignItems={{ extraSmall: "stretch", small: "flex-start" }}
    >
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading4>Small font size, base line height</Heading4>
        <DescriptionList layout="stacked" fontSize="sm" lineHeight="base">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading4>Medium font size, base relaxed line height</Heading4>
        <DescriptionList layout="stacked" fontSize="md" lineHeight="baseRelaxed">
          <SampleContent />
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2" flex={1}>
        <Heading4>Large font size, base line height</Heading4>
        <DescriptionList layout="stacked" fontSize="lg" lineHeight="base">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

FontSizeAndLineHeight.story = {
  name: "Font size & line height",
};

export function GroupMinWidth() {
  return (
    <Flex flexDirection="column" gap="x4">
      <Flex flexDirection="column">
        <Heading3 compact>Group min width</Heading3>
        <Text fontSize="sm" mb="x4">
          The group min width is set to 200px. The first column will be 200px wide and the second column will take the
        </Text>
        <DescriptionList groupMinWidth="200px">
          <SampleContent />
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function Columns() {
  const [outlined, setOutlined] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <Heading3>Columns</Heading3>
      <Checkbox labelText="Show outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
      <Flex flexDirection="column">
        <Heading4>The number of columns is set to 2</Heading4>
        <DescriptionList columns={2}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column">
        <Heading4>The number of columns is set to 3</Heading4>
        <DescriptionList columns={3}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column">
        <Heading4>The number of columns is set to 4</Heading4>
        <DescriptionList columns={4}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column">
        <Heading4>Extra small: 1 column, Small: 2 columns, Medium: 3 columns, Large: 6 columns</Heading4>
        <DescriptionList columns={{ extraSmall: 1, small: 2, medium: 3, large: 6 }}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function WithColumnSpan() {
  const [outlined, setOutlined] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <label htmlFor="outlined">
        <Checkbox
          id="outlined"
          labelText="Show outline"
          defaultChecked={outlined}
          onClick={() => setOutlined(!outlined)}
        />
      </label>
      <Flex flexDirection="column" gap="x2">
        <Heading3>2 columns, span 2</Heading3>
        <DescriptionList layout="stacked" columns={2}>
          <DescriptionGroup columnSpan={2}>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>3 columns, span 3</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup columnSpan={3}>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>This value is very long and it will span 3 columns</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>4 columns, span 4</Heading3>
        <DescriptionList layout="stacked" columns={4}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup columnSpan={4}>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>
              This value is very long and it spans 4 columns, so it will take the space of 4 columns and not wrap
            </OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>
              This value is very long but it only spans 1 column, so it will only take the space of 1 column
            </OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function WithRowSpan() {
  const [outlined, setOutlined] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <Checkbox labelText="Show outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
      <Flex flexDirection="column" gap="x2">
        <Heading3>2 columns, span 2</Heading3>
        <DescriptionList layout="stacked" columns={2}>
          <DescriptionGroup rowSpan={2}>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>3 columns, span 3</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup rowSpan={3}>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>This value is very long and it will span 3 columns</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>4 columns, span 4</Heading3>
        <DescriptionList layout="stacked" columns={4}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup rowSpan={4}>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>
              This value is very long and it spans 4 rows, so it will take the space of 4 rows and not wrap
            </OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>
              This value is very long but it only spans 1 row, so it will only take the space of 1 row
            </OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function WithColumnAndRowSpan() {
  const [outlined, setOutlined] = useState(false);

  return (
    <Flex flexDirection="column" gap="x4">
      <Checkbox labelText="Show outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
      <Flex flexDirection="column" gap="x2">
        <Heading3>2 columns, span 2</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DescriptionGroup rowSpan={2} columnSpan={2}>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>3 columns, span 3</Heading3>
        <DescriptionList layout="stacked" columns={3}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup rowSpan={3} columnSpan={3}>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>This value is very long and it will span 3 columns</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 4</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 6</OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
      <Flex flexDirection="column" gap="x2">
        <Heading3>4 columns, span 4</Heading3>
        <DescriptionList layout="stacked" columns={4}>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 1</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 1</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 2</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 2</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 3</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 3</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup rowSpan={4} columnSpan={4}>
            <OutlinedDt $outlined={outlined}>Key 4</OutlinedDt>
            <OutlinedDd $outlined={outlined}>
              This value is very long and it spans 4 rows, so it will take the space of 4 rows and not wrap
            </OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 5</OutlinedDt>
            <OutlinedDd $outlined={outlined}>Value 5</OutlinedDd>
          </DescriptionGroup>
          <DescriptionGroup>
            <OutlinedDt $outlined={outlined}>Key 6</OutlinedDt>
            <OutlinedDd $outlined={outlined}>
              This value is very long but it only spans 1 row, so it will only take the space of 1 row
            </OutlinedDd>
          </DescriptionGroup>
        </DescriptionList>
      </Flex>
    </Flex>
  );
}

export function Playground() {
  const [hoveredGroupIndex, setHoveredGroupIndex] = useState<number | null>(null);
  const [outlined, setOutlined] = useState(false);
  const [containerOutline, setContainerOutline] = useState(true);
  const [layout, setLayout] = useState<Layout>("stacked");
  const [density, setDensity] = useState<DensityType>("medium");
  const [descriptionTermMaxWidth, setDescriptionTermMaxWidth] = useState("320px");
  const [fontSize, setFontSize] = useState<keyof DefaultNDSThemeType["fontSizes"]>("medium");
  const [lineHeight, setLineHeight] = useState<keyof DefaultNDSThemeType["lineHeights"]>("base");
  const initialBreakpointColumns = [{ breakpoint: "extraSmall" as keyof Breakpoints, columns: 1 }];
  const [columns, setColumns] = useState<number | Partial<Record<keyof Breakpoints, number>> | undefined>(1);
  const [breakpointColumns, setBreakpointColumns] =
    useState<Array<{ breakpoint: keyof Breakpoints; columns: number }>>(initialBreakpointColumns);
  const [groupMinWidth, setGroupMinWidth] = useState<string | undefined>(undefined);
  const [containerWidth, setContainerWidth] = useState<string | undefined>("720px");
  const [showDivider, setShowDivider] = useState(false);
  const [autoLayoutBreakpoint, setAutoLayoutBreakpoint] = useState("640px");
  const [rowSpan] = useState(0);
  const [columnSpan] = useState(0);
  const [additionalGroups, setAdditionalGroups] = useState<
    Array<{ dt: string; dd: string; rowSpan: number; columnSpan: number; isExpanded: boolean }>
  >([]);
  const [DtValue] = useState("Key");
  const [DdValue] = useState("Value");
  const theme = useTheme();

  const updateGroup = (index: number, updates: Partial<(typeof additionalGroups)[0]>) => {
    setAdditionalGroups((groups) =>
      groups.map((group, i) => {
        if (i === index) {
          return { ...group, ...updates };
        }
        return group;
      })
    );
  };

  const deleteGroup = (index: number) => {
    setAdditionalGroups((groups) => groups.filter((_, i) => i !== index));
  };

  const addRandomGroup = () => {
    setAdditionalGroups([
      ...additionalGroups,
      {
        dt: DtValue,
        dd: DdValue,
        rowSpan: rowSpan,
        columnSpan: columnSpan,
        isExpanded: false,
      },
    ]);
  };

  const toggleGroupExpansion = (index: number) => {
    setAdditionalGroups((groups) =>
      groups.map((group, i) => (i === index ? { ...group, isExpanded: !group.isExpanded } : group))
    );
  };

  const DescriptionListElement = (
    <DescriptionList
      layout={layout}
      density={density}
      columns={columns}
      groupMinWidth={groupMinWidth}
      showDivider={showDivider}
      autoLayoutBreakpoint={autoLayoutBreakpoint}
      descriptionTermMaxWidth={descriptionTermMaxWidth}
      fontSize={fontSize}
      lineHeight={lineHeight}
    >
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Customer
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          Nulogy
        </OutlinedDd>
      </DescriptionGroup>
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Order number
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          <Link href="/customer-details">P12-90381-2039</Link>
        </OutlinedDd>
      </DescriptionGroup>
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Status
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          <StatusIndicator type="success">Paid</StatusIndicator>
        </OutlinedDd>
      </DescriptionGroup>
      <DescriptionGroup>
        <OutlinedDt $outlined={outlined} $highlighted={false}>
          Amount
        </OutlinedDt>
        <OutlinedDd $outlined={outlined} $highlighted={false}>
          $202.12
        </OutlinedDd>
      </DescriptionGroup>
      {additionalGroups.map((group, index) => (
        <DescriptionGroup rowSpan={group.rowSpan} columnSpan={group.columnSpan} key={index}>
          <OutlinedDt $outlined={outlined} $highlighted={hoveredGroupIndex === index}>
            {group.dt}
          </OutlinedDt>
          <OutlinedDd $outlined={outlined} $highlighted={hoveredGroupIndex === index}>
            {group.dd}
          </OutlinedDd>
        </DescriptionGroup>
      ))}
    </DescriptionList>
  );

  return (
    <Flex>
      <Sidebar
        height="100%"
        width="450px"
        hideCloseButton
        isOpen
        title="Controls"
        overlay="hide"
        top="0px"
        bottom="0px"
      >
        <Flex flexDirection="column" gap="x2">
          <Flex gap="x2" flexDirection="column">
            <Input
              value={descriptionTermMaxWidth}
              onChange={(e) => setDescriptionTermMaxWidth(e.target.value)}
              labelText="Description Term Max Width"
              placeholder="e.g., 320px"
            />
            <Select
              value={layout}
              onChange={(value) => setLayout(value as Layout)}
              options={[
                { value: "stacked", label: "Stacked" },
                { value: "inline", label: "Inline" },
                { value: "auto", label: "Auto" },
              ]}
              labelText="Layout"
            />
            <Input
              value={autoLayoutBreakpoint}
              onChange={(e) => setAutoLayoutBreakpoint(e.target.value)}
              labelText="Auto Layout Breakpoint"
              placeholder="e.g., 640px"
              disabled={layout !== "auto"}
            />
          </Flex>
          <Select
            value={density}
            onChange={(value) => setDensity(value as DensityType)}
            options={[
              { value: "compact", label: "Compact" },
              { value: "medium", label: "Medium" },
              { value: "relaxed", label: "Relaxed" },
            ]}
            labelText="Density"
          />
          <Select
            value={fontSize}
            onChange={(value) => setFontSize(value as keyof DefaultNDSThemeType["fontSizes"])}
            options={Object.keys(theme.fontSizes).map((size) => ({
              value: size,
              label: size,
            }))}
            labelText="Font Size"
          />
          <Select
            value={lineHeight}
            onChange={(value) => setLineHeight(value as keyof DefaultNDSThemeType["lineHeights"])}
            options={Object.keys(theme.lineHeights).map((height) => ({
              value: height,
              label: height,
            }))}
            labelText="Line Height"
          />
          <Flex flexDirection="column" gap="x2">
            <Flex justifyContent="space-between" alignItems="center">
              <Text fontWeight="bold">Columns</Text>
              <IconicButton
                onClick={() => {
                  const currentColumnValue = breakpointColumns[0].columns;
                  const availableBreakpoints = Object.keys(theme.breakpoints).filter(
                    (breakpoint) =>
                      !breakpointColumns.some((col) => col.breakpoint === breakpoint || breakpoint === "map")
                  );

                  if (breakpointColumns.length === 1) {
                    // First time adding a breakpoint, convert the single column to a breakpoint
                    const firstBreakpoint = breakpointColumns[0].breakpoint;
                    setBreakpointColumns([
                      { breakpoint: firstBreakpoint, columns: currentColumnValue },
                      { breakpoint: availableBreakpoints[0] as keyof Breakpoints, columns: currentColumnValue },
                    ]);
                    setColumns({
                      [firstBreakpoint]: currentColumnValue,
                      [availableBreakpoints[0]]: currentColumnValue,
                    });
                  } else {
                    // Add another breakpoint
                    const nextBreakpoint = availableBreakpoints[0] as keyof Breakpoints;
                    setBreakpointColumns([
                      ...breakpointColumns,
                      { breakpoint: nextBreakpoint, columns: currentColumnValue },
                    ]);
                    setColumns(
                      Object.fromEntries(
                        [...breakpointColumns, { breakpoint: nextBreakpoint, columns: currentColumnValue }].map(
                          ({ breakpoint, columns }) => [breakpoint, columns]
                        )
                      )
                    );
                  }
                }}
                icon="add"
                tooltip="Add column per breakpoint"
                disabled={breakpointColumns.length >= Object.keys(theme.breakpoints).length - 1}
              />
            </Flex>
            <Flex flexDirection="column" gap="x2">
              {breakpointColumns.map((breakpointColumn, index) => (
                <Flex key={index} gap="x2" alignItems="flex-end">
                  {breakpointColumns.length > 1 && (
                    <Select
                      minWidth="240px"
                      value={breakpointColumn.breakpoint}
                      onChange={(value: NDSOptionValue) => {
                        const newBreakpointColumns = [...breakpointColumns];
                        newBreakpointColumns[index] = { ...breakpointColumn, breakpoint: value as keyof Breakpoints };
                        setBreakpointColumns(newBreakpointColumns);
                        setColumns(
                          Object.fromEntries(
                            newBreakpointColumns.map(({ breakpoint, columns }) => [breakpoint, columns])
                          )
                        );
                      }}
                      options={Object.keys(theme.breakpoints)
                        .filter(
                          (breakpoint) =>
                            breakpoint === breakpointColumn.breakpoint ||
                            !breakpointColumns.some((col) => col.breakpoint === breakpoint || breakpoint === "map")
                        )
                        .map((breakpoint) => ({
                          value: breakpoint,
                          label: `${breakpoint} (${theme.breakpoints[breakpoint]})`,
                        }))}
                      labelText={index === 0 ? "Breakpoint" : undefined}
                    />
                  )}
                  <Input
                    inputWidth={breakpointColumns.length === 1 ? undefined : "95px"}
                    type="number"
                    value={breakpointColumn.columns}
                    onChange={(e) => {
                      const newValue = Math.max(1, Number(e.target.value));
                      const newBreakpointColumns = [...breakpointColumns];
                      newBreakpointColumns[index] = {
                        ...breakpointColumn,
                        columns: newValue,
                      };
                      setBreakpointColumns(newBreakpointColumns);
                      if (breakpointColumns.length === 1) {
                        setColumns(newValue);
                      } else {
                        setColumns(
                          Object.fromEntries(
                            newBreakpointColumns.map(({ breakpoint, columns }) => [breakpoint, columns])
                          )
                        );
                      }
                    }}
                    labelText={
                      breakpointColumns.length === 1 ? "Number of columns" : index === 0 ? "Columns" : undefined
                    }
                    placeholder="Number of columns"
                    min={1}
                  />
                  {breakpointColumns.length > 1 && (
                    <IconicButton
                      icon="delete"
                      onClick={() => {
                        const newBreakpointColumns = breakpointColumns.filter((_, i) => i !== index);
                        if (newBreakpointColumns.length === 1) {
                          // Convert back to single number when only one breakpoint remains
                          setColumns(newBreakpointColumns[0].columns);
                          setBreakpointColumns(newBreakpointColumns);
                        } else {
                          setBreakpointColumns(newBreakpointColumns);
                          setColumns(
                            Object.fromEntries(
                              newBreakpointColumns.map(({ breakpoint, columns }) => [breakpoint, columns])
                            )
                          );
                        }
                      }}
                    />
                  )}
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Input
            value={groupMinWidth ?? ""}
            onChange={(e) => {
              const value = e.target.value || undefined;
              setGroupMinWidth(value);
              if (value) setColumns(undefined);
            }}
            labelText="Group Min Width"
            placeholder="e.g., 200px"
            disabled={!!columns}
          />
          <Checkbox labelText="Show divider" checked={showDivider} onChange={() => setShowDivider(!showDivider)} />
          <HorizontalDivider />
          <Text fontWeight="bold">Debugging</Text>
          <Checkbox labelText="Show Group outline" checked={outlined} onChange={() => setOutlined(!outlined)} />
          <Input
            value={containerWidth}
            onChange={(e) => setContainerWidth(e.target.value)}
            labelText="Container Width"
            placeholder="e.g., 720px"
          />
          <Checkbox
            labelText="Show container outline"
            checked={containerOutline}
            onChange={() => setContainerOutline(!containerOutline)}
          />

          <HorizontalDivider />
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">Additional Groups</Text>
            <IconicButton onClick={addRandomGroup} icon="add" />
          </Flex>
          <Box>
            {additionalGroups.length === 0 && (
              <Text fontSize="sm" color="midGrey">
                No additional groups
              </Text>
            )}
            <Flex flexDirection="column">
              {additionalGroups.map((group, index) => (
                <>
                  {index > 0 && <HorizontalDivider />}
                  <Box
                    key={index}
                    onMouseEnter={() => setHoveredGroupIndex(index)}
                    onMouseLeave={() => setHoveredGroupIndex(null)}
                  >
                    <Flex justifyContent="space-between" alignItems="center" mb={group.isExpanded ? "x2" : "none"}>
                      <Flex alignItems="center" gap="x2">
                        <IconicButton
                          icon={group.isExpanded ? "downArrow" : "rightArrow"}
                          onClick={() => toggleGroupExpansion(index)}
                        />
                        <Text>Group {index + 1}</Text>
                      </Flex>
                      <IconicButton onClick={() => deleteGroup(index)} icon="delete" />
                    </Flex>
                    {group.isExpanded && (
                      <Flex flexDirection="column" gap="x2">
                        <Input
                          value={group.dt}
                          onChange={(e) => updateGroup(index, { dt: e.target.value })}
                          labelText="Description Term"
                        />
                        <Textarea
                          value={group.dd}
                          onChange={(e) => updateGroup(index, { dd: e.target.value })}
                          labelText="Description Data"
                        />
                        <Flex gap="x2">
                          <Input
                            type="number"
                            value={group.rowSpan}
                            onChange={(e) => updateGroup(index, { rowSpan: Number(e.target.value) })}
                            labelText="Row Span"
                            min={1}
                          />
                          <Input
                            type="number"
                            value={group.columnSpan}
                            onChange={(e) => updateGroup(index, { columnSpan: Number(e.target.value) })}
                            labelText="Column Span"
                            min={1}
                          />
                        </Flex>
                      </Flex>
                    )}
                  </Box>
                </>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Sidebar>
      <Box flex={1}>
        <Heading1 mb="x3">DescriptionList Playground</Heading1>
        <Resizable
          enable={{
            right: true,
          }}
          size={{
            width: containerWidth,
          }}
          onResizeStop={(_, __, ref) => {
            setContainerWidth(`${ref.getBoundingClientRect().width}px`);
          }}
          handleComponent={{
            right: <ResizeHandle />,
          }}
        >
          {containerOutline ? (
            <DashedBox flex={1}>{DescriptionListElement}</DashedBox>
          ) : (
            <Box flex={1}>{DescriptionListElement}</Box>
          )}
        </Resizable>
      </Box>
    </Flex>
  );
}

const ResizeHandle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4rem;
  width: 4px;
  right: 4px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.grey};
`;

Playground.parameters = {
  chromatic: { disable: true },
};
